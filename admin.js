
const $=id=>document.getElementById(id);
const endpoints=["https://overpass-api.de/api/interpreter","https://overpass.kumi.systems/api/interpreter"];
const hav=(a,b,c,d)=>{const R=6371000,r=x=>x*Math.PI/180,p1=r(a),p2=r(c),dp=r(c-a),dl=r(d-b),h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.sqrt(h))};
const compact=o=>btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
async function geocode(q){const r=await fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q="+encodeURIComponent(q),{headers:{Accept:"application/json"}});const j=await r.json();if(!j.length)throw Error("Starting place not found. Try a more specific name or postcode.");return{a:+j[0].lat,o:+j[0].lon,n:j[0].display_name}}
async function fetchOverpass(query, timeoutMs=26000){
  const endpoints=[
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass-api.de/api/interpreter",
    "https://overpass.nchc.org.tw/api/interpreter"
  ];
  let lastError=null;
  for(const ep of endpoints){
    try{
      const controller=new AbortController();
      const timer=setTimeout(()=>controller.abort("timeout"),timeoutMs);
      const response=await fetch(ep+"?data="+encodeURIComponent(query),{
        method:"GET",
        headers:{"Accept":"application/json"},
        signal:controller.signal
      });
      clearTimeout(timer);
      if(!response.ok) throw new Error("Map server returned "+response.status);
      const type=response.headers.get("content-type")||"";
      if(!type.includes("json")) throw new Error("Map server returned an invalid response");
      return await response.json();
    }catch(err){
      lastError=err;
    }
  }
  throw lastError||new Error("All map servers were unavailable");
}
async function pois(a,o,radius){
  const buildQuery=r=>`[out:json][timeout:25];
  (
    nwr(around:${r},${a},${o})["name"]["historic"];
    nwr(around:${r},${a},${o})["name"]["tourism"];
    nwr(around:${r},${a},${o})["name"]["leisure"~"park|garden|nature_reserve"];
    nwr(around:${r},${a},${o})["name"]["amenity"~"marketplace|place_of_worship|arts_centre|theatre"];
    nwr(around:${r},${a},${o})["name"]["natural"];
  );
  out center 100;`;

  const radii=[radius,Math.max(1200,Math.round(radius*0.65)),Math.max(800,Math.round(radius*0.4))];
  let lastError=null;
  for(const r of radii){
    try{
      const result=await fetchOverpass(buildQuery(r));
      if(result && Array.isArray(result.elements) && result.elements.length){
        result._usedRadius=r;
        return result;
      }
    }catch(err){
      lastError=err;
    }
  }
  throw new Error(
    lastError && lastError.name==="AbortError"
      ? "The nearby-place search timed out. Try again, use fewer stops, or choose a smaller distance."
      : "The nearby-place search is temporarily unavailable. Try again in a moment."
  );
}
function select(elements,start,count,max,circular){const seen=new Set(),items=elements.map(x=>{const a=x.lat||(x.center&&x.center.lat),o=x.lon||(x.center&&x.center.lon),t=x.tags||{};return{n:t.name,a,o,d:a?hav(start.a,start.o,a,o):1e9,k:t.historic?"historic":t.tourism?"tourism":t.leisure?"leisure":t.amenity?"amenity":"natural"}}).filter(x=>x.n&&x.a&&x.d>80&&x.d<max).filter(x=>{const k=x.n.toLowerCase();if(seen.has(k))return false;seen.add(k);return true});
items.sort((x,y)=>x.d-y.d);const chosen=[];for(const x of items){if(chosen.some(c=>hav(c.a,c.o,x.a,x.o)<180))continue;chosen.push(x);if(chosen.length===count)break}if(circular)chosen.sort((x,y)=>Math.atan2(x.a-start.a,x.o-start.o)-Math.atan2(y.a-start.a,y.o-start.o));return chosen}
function routeMiles(start,stops,circular){let m=0,p=start;for(const s of stops){m+=hav(p.a,p.o,s.a,s.o);p=s}if(circular&&stops.length)m+=hav(p.a,p.o,start.a,start.o);return m/1609.344}
function makeLinks(quest){const payload=compact(quest),base=location.href.replace(/index\.html.*$/,"").split("?")[0],e=base+"player.html?c=e&a="+payload,r=base+"player.html?c=r&a="+payload;
$("qrE").innerHTML="";$("qrR").innerHTML="";try{new QRCode($("qrE"),{text:e,width:160,height:160,correctLevel:QRCode.CorrectLevel.L});new QRCode($("qrR"),{text:r,width:160,height:160,correctLevel:QRCode.CorrectLevel.L})}catch(err){throw Error("The route was created, but the QR code was too large. Try fewer stops.")}
$("linkE").href=e;$("linkR").href=r;
$("copyE").dataset.url=e;$("copyR").dataset.url=r;
$("links").classList.remove("hidden")}
$("generate").addEventListener("click",async()=>{$("loading").textContent="Finding places and building the mystery…";$("loading").classList.remove("hidden");$("confirmation").classList.remove("show");$("error").innerHTML="";$("preview").classList.add("hidden");$("links").classList.add("hidden");
try{const start=await geocode($("start").value.trim()),miles=+$("distance").value,count=+$("count").value,circular=$("finishMode").value==="circular",radius=Math.max(900,Math.min(5500,miles*600)),data=await pois(start.a,start.o,radius),selected=select(data.elements,start,count,data._usedRadius||radius,circular);if(selected.length<3)throw Error("Not enough suitable mapped places were found. Try fewer stops, a slightly larger distance, or a nearby town centre.");
const clues="ADVENTURE".slice(0,selected.length).split("");const adv={i:Date.now().toString(36),t:$("style").value,s:start.n,d:miles,b:+$("breakEvery").value,c:circular,p:selected.map((x,i)=>[x.n,+x.a.toFixed(6),+x.o.toFixed(6),x.k,clues[i]])};
$("summary").textContent=`${selected.length} stops • estimated route ${routeMiles(start,selected,circular).toFixed(1)} miles • requested ${miles} miles`;
$("route").innerHTML=selected.map((x,i)=>`<div class="result stop"><div class="num">${i+1}</div><div><strong>${x.n}</strong><div class="muted">${x.k} discovery</div><div class="tiny muted">Mystery clue ${i+1} will unlock here.</div></div></div>`).join("");$("preview").classList.remove("hidden");makeLinks(adv);$("confirmation").innerHTML=`✅ <strong>Quest created successfully.</strong><br>${selected.length} stops were generated around ${start.n}. The child links and QR codes below contain the route.`;$("confirmation").classList.add("show");$("confirmation").scrollIntoView({behavior:"smooth",block:"center"})}catch(e){$("error").innerHTML=`<div class="result error"><strong>Quest not created</strong><p>${e.message}</p></div>`}finally{$("loading").classList.add("hidden")}})

async function copyQuestLink(button){
  const url=button.dataset.url;
  if(!url)return;
  try{
    await navigator.clipboard.writeText(url);
    const original=button.textContent;
    button.textContent="✅ Link copied";
    setTimeout(()=>button.textContent=original,1800);
  }catch(e){
    window.prompt("Copy this link:",url);
  }
}
$("copyE").addEventListener("click",()=>copyQuestLink($("copyE")));
$("copyR").addEventListener("click",()=>copyQuestLink($("copyR")));

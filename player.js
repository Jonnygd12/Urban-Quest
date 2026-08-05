
const $=id=>document.getElementById(id),params=new URLSearchParams(location.search),child=params.get("c")==="r"?"erin":"ellis";
document.body.classList.add(child);
const decode=s=>JSON.parse(decodeURIComponent(escape(atob(s.replaceAll("-","+").replaceAll("_","/")))));
let adv;try{adv=decode(params.get("a")||"")}catch(e){document.body.innerHTML="<div class='app'><div class='card error'><h1>Quest link invalid</h1><p>Generate a new link from the parent dashboard.</p></div></div>";throw e}
const profile=child==="ellis"?{n:"Ellis",e:"⚽🎮",sub:"Football, gaming and discovery missions."}:{n:"Erin",e:"🖤🎸",sub:"Music, photography, atmosphere and mystery."};
const taskSets={
ellis:{personal:["Find something that belongs in a Roblox map","Spot a football colour, badge or sports item","Choose the best football celebration spot"],creative:["Invent a Roblox obstacle for this place","Estimate how many football pitches fit nearby","Create a game achievement for this discovery"]},
erin:{personal:["Take a photo that could be an album cover","Find the most atmospheric detail","Choose a song that fits this place"],creative:["Invent a film title for this place","Write a one-line music-video concept","Name a song that fits the atmosphere"]}
};
const stops=adv.p.map((p,i)=>({name:p[0],lat:p[1],lon:p[2],kind:p[3],clue:p[4],intro:`Explore ${p[0]} and find something most visitors miss.`,fact:`${p[0]} is mapped as a ${p[3]} place near the chosen starting point. Look for signs, dates, architecture or natural details that explain why it is notable.`}));
let state=JSON.parse(localStorage.getItem(`ab9-${child}-${adv.i}`)||"null")||{current:0,score:0,done:{},completed:[],badges:[],photos:[],responses:{},bonus:{},clues:[]},lastCoords=null,watchId=null,currentScreen="home",galleryReturn="home";
const save=()=>localStorage.setItem(`ab9-${child}-${adv.i}`,JSON.stringify(state)),show=id=>{currentScreen=id;document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})},hav=(a,b,c,d)=>{const R=6371000,r=x=>x*Math.PI/180,p1=r(a),p2=r(c),dp=r(c-a),dl=r(d-b),h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.sqrt(h))};
function tasks(i){const s=stops[i],set=taskSets[child],main=[{id:`${i}m0`,title:`Reach ${s.name}`,points:30,badge:"📍 Location reached",required:true,type:"Main mission"},{id:`${i}m1`,title:set.personal[i%set.personal.length],points:25,badge:child==="ellis"?"🎮 Custom Explorer":"📸 Creative Explorer",required:false,type:"Personal mission"}],bonus=[{id:`${i}b0`,title:"Find an old sign, date or inscription",points:35,badge:"🔎 Detail Hunter",type:"Hidden discovery"},{id:`${i}b1`,title:"Find the smallest detail most people would miss",points:25,badge:"👀 Eagle Eyes",type:"Bonus challenge"},{id:`${i}b2`,title:"Find an unusual doorway, carving or symbol",points:25,badge:"🗝️ Secret Finder",type:"Bonus challenge"},{id:`${i}b3`,title:set.creative[i%set.creative.length],points:25,badge:child==="ellis"?"🎮 Game Designer":"🎬 Creative Director",type:"Bonus challenge"}];return{main,bonus}}
function all(i){const t=tasks(i);return[...t.main,...t.bonus]}
function responseNeeded(t){return/(invent|estimate|create a game achievement|write a|name a|choose a song)/i.test(t.title)}
function taskHtml(t){const d=!!state.done[t.id],dir=/^(reach|find)/i.test(t.title)&&!/smallest detail/i.test(t.title);return`<div class="task ${d?"done":""}"><div class="taskline"><input type="checkbox" data-task="${t.id}" ${d?"checked":""}><div><div class="tiny muted">${t.type}${t.required?" • REQUIRED":""}</div><div class="task-title">${t.title}</div><div class="reward">+${t.points} pts • ${t.badge}</div>${dir?`<button class="dir" data-dir="${t.title}">🧭 Directions</button>`:""}${responseNeeded(t)?`<textarea class="response" data-response="${t.id}" placeholder="Type your answer...">${state.responses[t.id]||""}</textarea><div class="saved">${state.responses[t.id]?"Saved to dossier":""}</div>`:""}</div></div></div>`}
function render(){const i=state.current,s=stops[i],t=tasks(i),arr=all(i);$("stopNo").textContent=`${i+1} OF ${stops.length}`;$("stopName").textContent=s.name;$("intro").textContent=s.intro;$("photoPrompt").textContent=child==="ellis"?`Take a victory photo at ${s.name}.`:`Take an atmospheric photo at ${s.name}.`;$("mainTasks").innerHTML=t.main.map(taskHtml).join("");$("bonusTasks").innerHTML=t.bonus.map(taskHtml).join("");$("bonusTasks").classList.toggle("show",!!state.bonus[i]);$("bonusToggle").textContent=state.bonus[i]?"🙈 Hide hidden challenges":"🔍 Reveal hidden challenges";document.querySelectorAll("[data-task]").forEach(x=>x.addEventListener("change",e=>toggle(e.target.dataset.task,e.target.checked)));document.querySelectorAll("[data-dir]").forEach(x=>x.addEventListener("click",()=>{
  const destination=`${s.lat},${s.lon}`;
  const url="https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(destination)+"&travelmode=walking";
  window.open(url,"_blank");
}));document.querySelectorAll("[data-response]").forEach(x=>x.addEventListener("input",e=>{state.responses[e.target.dataset.response]=e.target.value;e.target.nextElementSibling.textContent=e.target.value.trim()?"Saved to dossier":"";save()}));const done=arr.filter(x=>state.done[x.id]).length;$("taskCount").textContent=`${done} / ${arr.length}`;$("stopFill").style.width=`${done/arr.length*100}%`;$("confirm").disabled=!t.main.filter(x=>x.required).every(x=>state.done[x.id]);$("prev").disabled=i===0;$("score").textContent=`${state.score} pts`;renderPhotos();save()}
function toggle(id,on){const t=all(state.current).find(x=>x.id===id);if(on&&!state.done[id]){state.done[id]=1;state.score+=t.points;if(!state.badges.includes(t.badge))state.badges.push(t.badge)}else if(!on&&state.done[id]){delete state.done[id];state.score=Math.max(0,state.score-t.points)}render()}
function gps(){if(!navigator.geolocation)return alert("Location unavailable");if(watchId!==null)navigator.geolocation.clearWatch(watchId);$("gps").textContent="📍 Active";watchId=navigator.geolocation.watchPosition(p=>{lastCoords={lat:p.coords.latitude,lon:p.coords.longitude,accuracy:p.coords.accuracy};const s=stops[state.current],d=hav(lastCoords.lat,lastCoords.lon,s.lat,s.lon),shown=d<1000?`${Math.round(d)} m`:`${(d/1000).toFixed(1)} km`;$("location").innerHTML=`<strong>Current mission:</strong> ${s.name}<br><span class="muted">${shown} away • GPS accuracy ±${Math.round(p.coords.accuracy)} m</span>${d<=80?'<div class="badge">🎉 You are here!</div>':""}`;save()},e=>$("location").textContent="Location error: "+e.message,{enableHighAccuracy:true,maximumAge:15000,timeout:15000})}
async function compress(file){return new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{let w=im.width,h=im.height,m=1280;if(w>h&&w>m){h*=m/w;w=m}else if(h>=w&&h>m){w*=m/h;h=m}const c=document.createElement("canvas");c.width=Math.round(w);c.height=Math.round(h);c.getContext("2d").drawImage(im,0,0,c.width,c.height);ok(c.toDataURL("image/jpeg",.8))};im.onerror=no;im.src=r.result};r.onerror=no;r.readAsDataURL(file)})}
async function addPhotos(files){$("photoStatus").classList.add("show");$("photoStatus").textContent="Saving…";let n=0;for(const f of [...files])try{state.photos.push({stop:state.current,data:await compress(f),name:stops[state.current].name});n++}catch(e){}save();renderPhotos();$("photoInput").value="";$("photoStatus").textContent=`✅ ${n} photo${n===1?"":"s"} saved.`;show("mission")}
function renderPhotos(){$("photos").innerHTML=state.photos.filter(x=>x.stop===state.current).map(x=>`<img src="${x.data}" alt="${x.name}">`).join("")}
function complete(){if(!state.completed.includes(state.current))state.completed.push(state.current);const s=stops[state.current],done=all(state.current).filter(x=>state.done[x.id]);if(!state.clues.includes(s.clue))state.clues.push(s.clue);$("summaryText").textContent=`You completed ${done.length} of ${all(state.current).length} tasks at ${s.name}.`;$("clueBox").innerHTML=`<div class="tiny muted">MYSTERY CLUE UNLOCKED</div><div class="clue">${s.clue}</div><div class="muted">Collected clues: ${state.clues.join(" ")}</div>`;$("earned").innerHTML=done.map(x=>`<span class="badge">${x.badge}</span>`).join("");$("next").textContent=state.current===stops.length-1?"Open final dossier":"Continue to next stop";save();show("summary")}
function finish(){const total=stops.length*6,done=Object.keys(state.done).length,r=done/total,grade=r>=.85?"PLATINUM":r>=.65?"GOLD":r>=.45?"SILVER":"BRONZE";$("finishTitle").textContent="Quest complete";$("grade").textContent=grade;$("finishMessage").textContent=`Mystery message: ${state.clues.join(" ")}`;const answers=Object.entries(state.responses).filter(x=>x[1].trim()).map(([k,v])=>`<div class="result"><strong>Saved answer</strong><div>${v}</div></div>`).join("")||"<p class='muted'>No written answers.</p>",photos=state.photos.map(x=>`<img src="${x.data}" alt="${x.name}">`).join("")||"<p class='muted'>No photos.</p>";$("dossier").innerHTML=`<div class="dossier-head"><div><div class="tiny muted">FINAL CASE FILE</div><h2>${profile.n}'s ${adv.t}</h2><div class="muted">${grade} rank</div></div><div class="stamp">MISSION<br>COMPLETE</div></div><div class="grid"><div class="stat"><strong>${state.score}</strong><span class="tiny muted">points</span></div><div class="stat"><strong>${state.badges.length}</strong><span class="tiny muted">badges</span></div></div><h3>🧩 Mystery solved</h3><div class="fact clue">${state.clues.join(" ")}</div><h3>🏅 Badges</h3>${state.badges.map(x=>`<span class="badge">${x}</span>`).join("")}<h3>✍️ Answers</h3>${answers}<h3>📸 Photos</h3><div class="photo-grid">${photos}</div>`;show("finish")}

async function aroundMe(){
  $("aroundResult").textContent="Finding something interesting near your real GPS position…";
  if(!lastCoords){
    $("aroundResult").textContent="Start GPS first.";
    return;
  }

  const wikiUrl=
    "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&generator=geosearch"+
    `&ggsprimary=all&ggsnamespace=0&ggsradius=1000&ggslimit=8&ggscoord=${lastCoords.lat}%7C${lastCoords.lon}`+
    "&prop=coordinates%7Cextracts%7Cpageimages%7Cinfo&exintro=1&explaintext=1&exsentences=2&piprop=thumbnail&pithumbsize=300&inprop=url";

  try{
    const response=await fetch(wikiUrl,{headers:{"Accept":"application/json"}});
    if(!response.ok) throw new Error("Wikipedia nearby search failed");
    const data=await response.json();
    const pages=Object.values((data.query&&data.query.pages)||{})
      .map(page=>{
        const coord=(page.coordinates&&page.coordinates[0])||{};
        return {
          title:page.title,
          extract:page.extract||"",
          url:page.fullurl||("https://en.wikipedia.org/wiki/"+encodeURIComponent(page.title.replaceAll(" ","_"))),
          image:page.thumbnail&&page.thumbnail.source,
          lat:coord.lat,
          lon:coord.lon,
          distance:(coord.lat!==undefined&&coord.lon!==undefined)
            ? hav(lastCoords.lat,lastCoords.lon,coord.lat,coord.lon)
            : 999999
        };
      })
      .sort((a,b)=>a.distance-b.distance)
      .slice(0,5);

    if(pages.length){
      $("aroundResult").innerHTML=
        `<p class="muted">Interesting documented places within roughly 1 km of your current GPS position:</p>`+
        pages.map(p=>`
          <div class="result">
            ${p.image?`<img src="${p.image}" alt="${p.title}" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-bottom:9px">`:""}
            <strong>${p.title}</strong>
            <div class="muted">${Math.round(p.distance)} m away</div>
            <p>${p.extract||"A documented place near your current location."}</p>
            <button class="primary smallbtn" data-wiki-url="${p.url}">Read more</button>
            ${p.lat!==undefined?`<button class="secondary smallbtn" data-wiki-map="${p.lat},${p.lon}">Map</button>`:""}
          </div>`).join("");

      document.querySelectorAll("[data-wiki-url]").forEach(b=>
        b.addEventListener("click",()=>window.open(b.dataset.wikiUrl,"_blank"))
      );
      document.querySelectorAll("[data-wiki-map]").forEach(b=>
        b.addEventListener("click",()=>{
          const [a,o]=b.dataset.wikiMap.split(",");
          window.open(`https://www.google.com/maps/search/?api=1&query=${a},${o}`,"_blank");
        })
      );
      return;
    }
  }catch(e){
    console.warn("Wikipedia nearby lookup failed",e);
  }

  try{
    const reverseUrl=
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lastCoords.lat}&lon=${lastCoords.lon}&zoom=18`;
    const response=await fetch(reverseUrl,{headers:{"Accept":"application/json"}});
    const place=await response.json();
    const display=place.display_name||`${lastCoords.lat.toFixed(5)}, ${lastCoords.lon.toFixed(5)}`;

    $("aroundResult").innerHTML=`
      <div class="result">
        <div class="tiny muted">YOUR CURRENT GPS LOCATION</div>
        <strong>${display}</strong>
        <p class="muted">No suitable nearby Wikipedia article was found, but this is your actual location.</p>
        <button id="aroundGoogle" class="primary">Explore nearby places in Google Maps</button>
      </div>`;
    $("aroundGoogle").addEventListener("click",()=>{
      window.open(
        "https://www.google.com/maps/search/?api=1&query="+
        encodeURIComponent(`points of interest near ${lastCoords.lat},${lastCoords.lon}`),
        "_blank"
      );
    });
  }catch(e){
    $("aroundResult").innerHTML=`
      <div class="result">
        <strong>Your GPS position</strong>
        <p>${lastCoords.lat.toFixed(5)}, ${lastCoords.lon.toFixed(5)}</p>
        <button id="aroundGoogle" class="primary">Explore nearby places in Google Maps</button>
      </div>`;
    $("aroundGoogle").addEventListener("click",()=>{
      window.open(
        "https://www.google.com/maps/search/?api=1&query="+
        encodeURIComponent(`points of interest near ${lastCoords.lat},${lastCoords.lon}`),
        "_blank"
      );
    });
  }
}

async function nearby(kind){if(!lastCoords)return $("breakResult").textContent="Start GPS first.";const labels={toilets:"public toilets",cafe:"cafes",restaurant:"restaurants",bench:"parks and seating"},query=labels[kind]+" near "+lastCoords.lat+","+lastCoords.lon;$("breakResult").innerHTML=`<div class="result"><button id="quickMap" class="primary">Open nearby ${labels[kind]} in Google Maps</button></div>`;$("quickMap").addEventListener("click",()=>window.open("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(query),"_blank"))}
$("brand").textContent=profile.n.toUpperCase()+" ADVENTURE";$("emoji").textContent=profile.e;$("title").textContent=`${profile.n}: ${adv.t}`;$("subtitle").textContent=`${profile.sub} Starting near ${adv.s}`;$("stopStat").textContent=stops.length;$("mileStat").textContent=adv.d+" mi";$("score").textContent=state.score+" pts";
$("start").addEventListener("click",()=>{render();show("mission");gps()});$("gps").addEventListener("click",gps);$("bonusToggle").addEventListener("click",()=>{state.bonus[state.current]=!state.bonus[state.current];render()});$("fact").addEventListener("click",()=>{$("factBox").textContent=stops[state.current].fact;$("factBox").classList.toggle("show")});$("photoInput").addEventListener("change",async e=>addPhotos(e.target.files));$("confirm").addEventListener("click",complete);$("next").addEventListener("click",()=>{if(state.current>=stops.length-1)return finish();state.current++;save();render();show("mission")});$("return").addEventListener("click",()=>{render();show("mission")});$("prev").addEventListener("click",()=>{if(state.current){state.current--;render()}});$("overview").addEventListener("click",()=>{$("overallText").textContent=`${state.completed.length} of ${stops.length} stops • ${state.score} points • clues ${state.clues.join(" ")}`;$("overallFill").style.width=`${state.completed.length/stops.length*100}%`;$("route").innerHTML=stops.map((s,i)=>`<div class="result"><strong>${state.completed.includes(i)?"✅":i===state.current?"📍":"🔒"} ${i+1}. ${s.name}</strong></div>`).join("");show("overviewScreen")});$("resume").addEventListener("click",()=>{render();show("mission")});function gallery(from){galleryReturn=from;$("galleryGrid").innerHTML=state.photos.length?state.photos.map(x=>`<img src="${x.data}" alt="${x.name}">`).join(""):"No photos yet.";show("gallery")}$("galleryHome").addEventListener("click",()=>gallery("home"));$("galleryBtn").addEventListener("click",()=>gallery("overviewScreen"));$("finishGallery").addEventListener("click",()=>gallery("finish"));$("galleryBack").addEventListener("click",()=>show(galleryReturn));$("reset").addEventListener("click",()=>{localStorage.removeItem(`ab9-${child}-${adv.i}`);location.reload()});$("print").addEventListener("click",()=>window.print());$("around").addEventListener("click",()=>{$("aroundOverlay").classList.add("show");aroundMe()});$("aroundRefresh").addEventListener("click",aroundMe);$("aroundClose").addEventListener("click",()=>$("aroundOverlay").classList.remove("show"));$("breaks").addEventListener("click",()=>{$("breakOverlay").classList.add("show");$("breakResult").innerHTML=""});$("breakClose").addEventListener("click",()=>$("breakOverlay").classList.remove("show"));document.querySelectorAll("[data-break]").forEach(x=>x.addEventListener("click",()=>nearby(x.dataset.break)));

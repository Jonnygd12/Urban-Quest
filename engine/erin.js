
const collectables=['🎫 Quest Pass', '🌿 Ivy Leaf', '🌺 Rooftop Flower', '🐉 City Dragon', '🎨 Colour Token', '👃 Golden Nose', '🎬 Film Reel', '🦁 Bronze Lion', '🚤 River Compass', '⚡ Power Core']; const unlockSecrets=['London Bridge has been rebuilt many times. The crossing is ancient, but the bridge and station you see today are only the latest chapters.', 'The surviving tower is much older than the garden around it, so several centuries of London overlap in one view.', 'The rooftop garden sits above streets followed by thousands of workers every day, yet many people below never realise it is there.', 'The dragon symbols around the City mark the historic boundary and identity of the City of London.', 'Neal’s Yard was once an overlooked service courtyard before becoming one of London’s brightest hidden corners.', 'The noses were installed secretly in the 1990s. For years, many people assumed they had always been part of the buildings.', 'Leicester Square’s film statues form a free trail called Scenes in the Square.', 'The small structure in the south-east corner was used as a police observation post and is often called London’s smallest police station.', 'The Thames is still a working transport route, not just scenery. River buses share the water with cargo, service and sightseeing vessels.', 'Battersea Power Station appeared on the cover of Pink Floyd’s Animals, making its four chimneys famous far beyond London.']; const mysteryLetters=["L", "O", "O", "K", "C", "L", "O", "S", "E", "R"];
const route=[{"name": "London Bridge Station", "subtitle": "Quest Launch", "lat": 51.5052, "lon": -0.0864, "duration": "10 mins", "intro": "Your quest begins in one of London’s busiest transport hubs. Most people rush straight out. Your job is to slow down and notice the city.", "fact": "London Bridge has been a crossing point for centuries, although the present station and modern bridge are much newer than the first crossings here.", "look": "Before leaving, find a view of The Shard and decide whether it looks more like a castle, rocket or game tower.", "photo": "Take the opening team photo with The Shard somewhere in the frame.", "secret": "Find a station sign that includes both the National Rail and Underground symbols.", "nextMode": "walk", "nextLabel": "St Dunstan in the East"}, {"name": "St Dunstan in the East", "subtitle": "The Forgotten Garden", "lat": 51.5097, "lon": -0.0825, "duration": "25–30 mins", "intro": "A ruined church where trees and ivy have taken over the old stone walls.", "fact": "The church was badly damaged during the Blitz. Instead of fully rebuilding it, the ruins became a public garden.", "look": "Find branches, roots or ivy using the ruined windows and walls as part of the garden.", "photo": "Use a ruined arch to frame the trees beyond.", "secret": "Find a tree growing against or through the ruins.", "nextMode": "walk", "nextLabel": "Garden at 120"}, {"name": "Garden at 120", "subtitle": "The Secret Skyline", "lat": 51.5142, "lon": -0.0817, "duration": "25 mins", "intro": "A free rooftop garden hidden above the streets of the City.", "fact": "From this rooftop, centuries of London sit side by side: church towers, Victorian roofs and modern skyscrapers.", "look": "Spot Tower Bridge, The Shard and St Paul’s Cathedral.", "photo": "Use the planting to frame the skyline instead of photographing only buildings.", "secret": "Find the strangest-shaped building you can see and give it a nickname.", "nextMode": "walk", "nextLabel": "Leadenhall Market"}, {"name": "Leadenhall Market", "subtitle": "The Dragon’s Market", "lat": 51.5128, "lon": -0.0836, "duration": "30–40 mins", "intro": "An ornate covered market full of colour, carved details and film connections.", "fact": "Trading has taken place around this site for centuries, and parts of the market appeared in the first Harry Potter film.", "look": "Find a City of London dragon symbol and study the decorated roof.", "photo": "Stand beneath the central crossing and photograph the roof above.", "secret": "Find three different football-team colours somewhere in the market.", "nextMode": "transit", "nextLabel": "Neal’s Yard"}, {"name": "Neal’s Yard", "subtitle": "The Hidden Courtyard", "lat": 51.5145, "lon": -0.1268, "duration": "20 mins", "intro": "A tiny burst of colour tucked behind the busy streets of Covent Garden.", "fact": "The courtyard was once overlooked and run-down before being transformed into one of London’s most colourful corners.", "look": "Find the smallest doorway, brightest wall and most unusual shop sign.", "photo": "Take a photograph that uses as many colours as possible.", "secret": "Find somewhere that looks completely different when viewed through a reflection.", "nextMode": "walk", "nextLabel": "Seven Noses of Soho"}, {"name": "Seven Noses of Soho", "subtitle": "The Nose Hunters", "lat": 51.5136, "lon": -0.1321, "duration": "40–50 mins", "intro": "Small sculpted noses are hidden on buildings around Soho. Finding three is enough to complete this operation.", "fact": "Artist Rick Buckley secretly installed noses around London in the 1990s as a protest against increasing surveillance.", "look": "Find any three noses. Look above normal eye level and around doorways and building corners.", "photo": "Take one close-up photograph without giving away the whole location.", "secret": "Invent a reason why the noses might be watching the streets.", "nextMode": "walk", "nextLabel": "Leicester Square"}, {"name": "Leicester Square", "subtitle": "Lights, Camera, London", "lat": 51.5104, "lon": -0.1301, "duration": "20–25 mins", "intro": "The heart of London’s cinema district, surrounded by giant screens, theatres and film history.", "fact": "Major film premieres have taken place here for decades, with stars walking the red carpet outside the cinemas.", "look": "Find three film-related statues or references around the square.", "photo": "Create a movie-poster photograph using a cinema or illuminated sign.", "secret": "Spot a street performer or someone dressed as a character.", "nextMode": "walk", "nextLabel": "Trafalgar Square"}, {"name": "Trafalgar Square", "subtitle": "The Lion’s Challenge", "lat": 51.508, "lon": -0.1281, "duration": "25–30 mins", "intro": "A huge open square filled with monuments, fountains, art and some very famous lions.", "fact": "Nelson’s Column commemorates Admiral Nelson and is guarded by four enormous bronze lions.", "look": "Count the lions, find the smallest police-box-like structure and look for the newest artwork on the Fourth Plinth.", "photo": "Use forced perspective to make someone look as though they are holding Nelson’s Column.", "secret": "Find the tiny former police observation point built into a lamp base.", "nextMode": "walk", "nextLabel": "Embankment Pier"}, {"name": "Embankment Pier", "subtitle": "The River Expedition", "lat": 51.5067, "lon": -0.1223, "duration": "Boat journey", "intro": "Board an Uber Boat towards Battersea Power Station Pier. The journey is part of the quest.", "fact": "The Thames has shaped London for thousands of years, carrying people, goods and ideas through the city.", "look": "Spot the London Eye, Big Ben, St Paul’s and at least three bridges.", "photo": "Take one photograph through the boat window that captures London moving past.", "secret": "Choose the riverside building that would make the best secret headquarters.", "nextMode": "boat", "nextLabel": "Battersea Power Station Pier"}, {"name": "Battersea Power Station", "subtitle": "The Giant of the Thames", "lat": 51.4817, "lon": -0.144, "duration": "45–60 mins", "intro": "The final operation explores the Power Station itself and the surrounding riverside estate.", "fact": "The building’s four chimneys define its silhouette. Coal once arrived by rail and river to help generate electricity for London.", "look": "Count the four chimneys, find restored industrial details and look for traces of the old railway or cranes.", "photo": "Ellis: create a FIFA-style stadium loading-screen photo. Erin: create an indie-rock album cover.", "secret": "If the building had never become shops and restaurants, what would you turn it into?", "nextMode": "finish", "nextLabel": ""}]; const personal=["Imagine arriving here before electric lights. What would feel most unsettling?", "Would you rebuild these ruins after the Blitz, or preserve them as evidence of what happened?", "Choose the building that would look most sinister after dark and explain why.", "Imagine this market before refrigeration. Which sight, sound or smell would be hardest to forget?", "Find the quietest corner. What might this courtyard have looked like before it became colourful?", "Develop your own theory about why the noses were hidden instead of displayed publicly.", "Choose a film character who would look believable appearing here after midnight.", "Imagine waiting here for wartime news. What might people have been whispering about?", "Invent a believable dark river legend, then decide what evidence would prove it false.", "If you could interview one power-station worker from 1935, what would you ask?"]; const profile="erin";
const archives=[{"title": "The Gateway to Old London", "history": "For centuries this crossing brought travellers into a city of markets, mud, animals, smoke and danger. London Bridge was not simply a route—it was an arrival point into another world.", "legend": "Stories describe old bridge approaches as places of noise, crime and spectacle. Some are exaggerated, but the area genuinely could be overwhelming.", "question": "What would frighten you most about arriving here alone three hundred years ago?"}, {"title": "The Church the Blitz Left Behind", "history": "Bombing in 1941 destroyed much of the church. London later chose not to erase every trace of the damage, allowing the ruins to become a memorial-like garden.", "legend": "Ruined churches attract ghost stories, but the strongest atmosphere here comes from documented destruction and survival.", "question": "Does leaving a ruined building preserve history better than rebuilding it?"}, {"title": "London Above the Streets", "history": "From this roof, church towers and modern skyscrapers reveal repeated cycles of destruction, rebuilding and wealth.", "legend": "The mystery is not supernatural: thousands walk below without knowing the garden exists.", "question": "Which building would make the best setting for a psychological thriller?"}, {"title": "The Market Before Refrigeration", "history": "Meat, poultry and game were sold here long before modern refrigeration. The market would have been crowded with blood, feathers, animals, carts and strong smells.", "legend": "City dragons are boundary symbols, but they make the old financial district feel like guarded territory.", "question": "Which detail around you gives the strongest clue that this place is older than its modern shops?"}, {"title": "The Yard Nobody Wanted", "history": "This was once a practical service courtyard rather than a colourful destination. London is full of back spaces that changed purpose as neighbourhoods became wealthier.", "legend": "Its cheerful appearance hides a less glamorous past of deliveries, waste and cramped working spaces.", "question": "Would the yard be more interesting if it had been preserved exactly as it was?"}, {"title": "The Faces Watching Soho", "history": "The noses were installed secretly in the 1990s as a response to surveillance. Their hidden placement turned buildings into silent observers.", "legend": "A Soho myth claims finding all seven brings endless wealth. It is folklore, not historical fact.", "question": "Does hidden art become more powerful because people have to discover it?"}, {"title": "The Square After Midnight", "history": "Leicester Square grew around entertainment, nightlife and cinemas. Large crowds and bright lights disguise how quickly its mood changes after venues close.", "legend": "Premiere glamour sits beside older stories of theatres, nightlife and people disappearing into the surrounding streets.", "question": "What would be most different here if every electric sign suddenly went dark?"}, {"title": "Crowds Waiting for News", "history": "Trafalgar Square has held celebrations, protests and wartime gatherings. Crowds stood here during periods when nobody knew what would happen next.", "legend": "The tiny police observation post is often called the smallest police station, though that is more nickname than official title.", "question": "How would the square feel if the crowd was waiting for news of war rather than a celebration?"}, {"title": "The River That Kept London Alive", "history": "The Thames carried food, fuel, waste, passengers and disease. It was essential, dangerous and far busier than the calm river seen by many visitors today.", "legend": "Stories of fog, wrecks and lost treasure blur fact and folklore, but the river really does preserve objects from London’s past.", "question": "Which is more unsettling: what the river carried, or what may still lie beneath it?"}, {"title": "Inside the Giant", "history": "The turbine halls were filled with deafening machinery, heat, coal dust and workers responsible for keeping London supplied with electricity.", "legend": "During its abandoned years, the empty building became an eerie industrial shell famous in music, film and urban-exploration stories.", "question": "Would you rather witness it operating at full power or explore it empty before restoration?"}];
const $=id=>document.getElementById(id); const key="uq-day-erin-v1";
let state=JSON.parse(localStorage.getItem(key)||"null")||{index:0,score:0,done:{},completed:[],responses:{},photos:[],coords:null,collectables:[],letters:[],radarClaims:[]};
state.collectables=state.collectables||[];
state.letters=state.letters||[];
state.radarClaims=state.radarClaims||[];
let currentScreen="home";
let usingOperationArea=false;

function locationErrorMessage(error){
  if(error && error.code===1){
    return "Location has been blocked for this website on this device. Change the site permission to Allow, then try again.";
  }
  if(error && error.code===2){
    return "Your position could not be determined. Check that Location Services are switched on and try again.";
  }
  if(error && error.code===3){
    return "The location request timed out. Move somewhere with a clearer signal and try again.";
  }
  return "Live location is unavailable on this device.";
}

function showLocationHelp(message){
  $("locationHelpMessage").textContent=message;
  $("locationHelpOverlay").classList.add("show");
}

async function checkLocationPermission(){
  if(!navigator.permissions || !navigator.permissions.query) return;
  try{
    const result=await navigator.permissions.query({name:"geolocation"});
    if(result.state==="denied"){
      $("gpsBtn").textContent="📍 Blocked";
      $("gpsBtn").title="Location is blocked for this site";
    }else if(result.state==="granted"){
      $("gpsBtn").textContent="📍 Ready";
    }
    result.addEventListener("change",()=>{
      if(result.state==="granted") $("gpsBtn").textContent="📍 Ready";
      else if(result.state==="denied") $("gpsBtn").textContent="📍 Blocked";
      else $("gpsBtn").textContent="📍 GPS";
    });
  }catch(e){}
}
function save(){localStorage.setItem(key,JSON.stringify(state))}
function show(id){currentScreen=id;document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");scrollTo(0,0)}
function missions(i){const s=route[i];return[
{id:i+"-reach",title:"Reach "+s.name,points:30,required:true},
{id:i+"-personal",title:personal[i],points:30,response:/invent|choose|estimate|title|song|turn it into/i.test(personal[i])},
{id:i+"-secret",title:s.secret,points:40,response:/invent|what would|choose/i.test(s.secret)},
{id:i+"-look",title:s.look,points:25}
]}
function missionHtml(m){const done=!!state.done[m.id];return `<div class="mission ${done?"done":""}"><div class="missionRow"><input type="checkbox" data-mission="${m.id}" ${done?"checked":""}><div><strong>${m.title}</strong><div class="reward">+${m.points} Quest Points</div>${m.response?`<textarea data-response="${m.id}" placeholder="Save your answer to the Case File…">${typeof state.responses[m.id]==="string"?state.responses[m.id]:(state.responses[m.id]?.answer||"")}</textarea>`:""}</div></div></div>`}
function render(){const s=route[state.index],ms=missions(state.index);$("opNo").textContent=(state.index+1)+" OF "+route.length;$("opTitle").textContent=s.name;$("opSubtitle").textContent=s.subtitle+" • "+s.duration;$("opIntro").textContent=s.intro;$("missions").innerHTML=ms.map(missionHtml).join("");document.querySelectorAll("[data-mission]").forEach(x=>x.addEventListener("change",e=>toggle(e.target.dataset.mission,e.target.checked)));document.querySelectorAll("[data-response]").forEach(x=>x.addEventListener("input",e=>{state.responses[e.target.dataset.response]={
  question: missions(state.index).find(m=>m.id===e.target.dataset.response)?.title||"Saved mission response",
  answer: e.target.value,
  place: route[state.index].name
};save()}));const n=ms.filter(m=>state.done[m.id]).length;$("fill").style.width=(n/ms.length*100)+"%";$("countText").textContent=n+" of "+ms.length+" missions complete";$("completeBtn").disabled=!ms.filter(m=>m.required).every(m=>state.done[m.id]);$("scorePill").textContent=state.score+" QP";renderPhotos();save()}
function toggle(id,on){const m=missions(state.index).find(x=>x.id===id);if(on&&!state.done[id]){state.done[id]=1;state.score+=m.points}else if(!on&&state.done[id]){delete state.done[id];state.score=Math.max(0,state.score-m.points)}render()}
function hav(a,b,c,d){const R=6371000,r=x=>x*Math.PI/180,p1=r(a),p2=r(c),dp=r(c-a),dl=r(d-b),h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.sqrt(h))}
function gps(){
  usingOperationArea=false;
  if(!navigator.geolocation){
    showLocationHelp("This browser does not support live location.");
    return;
  }

  $("gpsBtn").textContent="📍 Finding…";
  $("locationBox").textContent="Finding your position…";

  navigator.geolocation.getCurrentPosition(
    p=>{
      state.coords={lat:p.coords.latitude,lon:p.coords.longitude};
      const s=route[state.index];
      const d=hav(p.coords.latitude,p.coords.longitude,s.lat,s.lon);
      $("locationBox").innerHTML=`<strong>${s.name}</strong> is ${d<1000?Math.round(d)+" m":(d/1000).toFixed(1)+" km"} away.<br><span class="tiny muted">Accuracy ±${Math.round(p.coords.accuracy)} m</span>`;
      $("gpsBtn").textContent="📍 Active";
      save();
    },
    error=>{
      const message=locationErrorMessage(error);
      $("locationBox").innerHTML=`<strong>Live GPS unavailable</strong><br><span class="tiny muted">${message}</span>`;
      $("gpsBtn").textContent=error.code===1?"📍 Blocked":"📍 Retry";
      showLocationHelp(message);
    },
    {enableHighAccuracy:true,timeout:20000,maximumAge:10000}
  );
}
async function compress(file){return new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{let w=im.width,h=im.height,m=1280;if(w>h&&w>m){h*=m/w;w=m}else if(h>=w&&h>m){w*=m/h;h=m}const c=document.createElement("canvas");c.width=Math.round(w);c.height=Math.round(h);c.getContext("2d").drawImage(im,0,0,c.width,c.height);ok(c.toDataURL("image/jpeg",.78))};im.onerror=no;im.src=r.result};r.onerror=no;r.readAsDataURL(file)})}
async function addPhotos(files){$("photoStatus").textContent="Saving…";let n=0;for(const f of [...files])try{state.photos.push({stop:state.index,data:await compress(f),name:route[state.index].name});n++}catch(e){}save();renderPhotos();$("photoInput").value="";$("photoStatus").textContent="✅ "+n+" photo"+(n===1?"":"s")+" saved."}
function renderPhotos(){$("photos").innerHTML=state.photos.filter(p=>p.stop===state.index).map(p=>`<img src="${p.data}" alt="${p.name}">`).join("")}
function complete(){
  const current=state.index;
  const ms=missions(current);
  if(!state.completed.includes(current)) state.completed.push(current);
  const collectable=collectables[current];
  const letter=mysteryLetters[current];
  if(!state.collectables.includes(collectable)) state.collectables.push(collectable);
  if(!state.letters.includes(letter)) state.letters.push(letter);
  save();

  $("rewardPlace").textContent=route[current].name;
  $("rewardSecret").textContent=unlockSecrets[current];
  $("rewardCollectable").textContent=collectable;
  $("rewardLetter").textContent=letter;
  const phrase="LOOKCLOSER";
const liveLetters=phrase.split("").map((letter,index)=>state.letters.length>index?letter:"•");
$("letterProgress").textContent="Hidden phrase: "+liveLetters.slice(0,4).join(" ")+"   "+liveLetters.slice(4).join(" ");
  const points=ms.filter(m=>state.done[m.id]).reduce((sum,m)=>sum+m.points,0);
  $("rewardPoints").textContent="You completed "+ms.filter(m=>state.done[m.id]).length+" missions and earned "+points+" Quest Points here.";
  $("rewardContinue").textContent=current===route.length-1?"Open Final Case File":"Reveal Next Destination";
  show("reward");
}
function continueAfterReward(){
  if(state.index===route.length-1){finish();return}
  const previous=route[state.index];
  state.index++;
  save();
  const next=route[state.index];
  $("nextName").textContent=next.name;
  if(previous.nextMode==="boat"){
    $("travelText").textContent="Walk to the pier, board an Uber Boat towards Battersea Power Station Pier, then begin the final operation.";
  }else if(previous.nextMode==="transit"){
    $("travelText").textContent="This is the longest transfer. Use the directions button and choose walking or public transport depending on energy levels.";
  }else{
    $("travelText").textContent="Follow walking directions to the next operation.";
  }
  show("travel");
}
function directions(){const s=route[state.index];let url;if(s.name==="Battersea Power Station")url="https://www.google.com/maps/dir/?api=1&destination=51.4817,-0.1440&travelmode=transit";else url=`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lon}&travelmode=walking`;window.open(url,"_blank")}
function discover(){const s=route[state.index],unlocked=state.completed.includes(state.index);$("discoverTitle").textContent="📖 "+s.name;$("discoverCards").innerHTML=`<div class="discovery"><div class="eyebrow">🤯 AMAZING FACT</div><h3>${s.fact}</h3></div><div class="discovery"><div class="eyebrow">👀 LOOK CLOSER</div><p>${s.look}</p></div><div class="discovery"><div class="eyebrow">📸 BEST PHOTO</div><p>${s.photo}</p></div><div class="discovery"><div class="eyebrow">🔒 SECRET</div><p>${unlocked?s.secret:"Complete this operation to unlock the secret."}</p></div>`;$("discoverOverlay").classList.add("show")}

async function radar(){
  $("radarOverlay").classList.add("show");
  if(!state.coords){
    $("radarResult").innerHTML="Finding your GPS position…";
    if(!navigator.geolocation){
      $("radarResult").innerHTML=`<div class="discovery"><strong>Live location is unavailable.</strong><button id="radarUseStop">Use current operation area</button></div>`;
      $("radarUseStop").addEventListener("click",()=>{state.coords={lat:route[state.index].lat,lon:route[state.index].lon};usingOperationArea=true;radar();});
      return;
    }
    try{
      const position=await new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject,{enableHighAccuracy:true,timeout:20000,maximumAge:10000}));
      state.coords={lat:position.coords.latitude,lon:position.coords.longitude};
      usingOperationArea=false;
      save();
    }catch(e){
      const message=locationErrorMessage(e);
      $("radarResult").innerHTML=`<div class="discovery"><strong>Live GPS unavailable</strong><p>${message}</p><button id="radarHelp">Location help</button><button id="radarUseStop" class="secondary">Use current operation area</button></div>`;
      $("radarHelp").addEventListener("click",()=>showLocationHelp(message));
      $("radarUseStop").addEventListener("click",()=>{state.coords={lat:route[state.index].lat,lon:route[state.index].lon};usingOperationArea=true;radar();});
      return;
    }
  }
  $("radarResult").innerHTML=usingOperationArea?"Scanning around "+route[state.index].name+"…":"Scanning within about 700 metres of your live position…";
  const lat=state.coords.lat,lon=state.coords.lon;
  const url="https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&generator=geosearch"+
    "&ggsnamespace=0&ggsradius=700&ggslimit=7&ggscoord="+lat+"%7C"+lon+
    "&prop=coordinates%7Cextracts%7Cinfo&exintro=1&explaintext=1&exsentences=2&inprop=url";
  try{
    const response=await fetch(url);
    if(!response.ok) throw new Error("Nearby search failed");
    const json=await response.json();
    const pages=Object.values((json.query&&json.query.pages)||{}).map(page=>{
      const c=(page.coordinates&&page.coordinates[0])||{};
      return {
        id:String(page.pageid),
        title:page.title,
        text:page.extract||"A documented place near your current position.",
        url:page.fullurl,
        lat:c.lat,
        lon:c.lon,
        distance:(c.lat!==undefined)?hav(lat,lon,c.lat,c.lon):999999
      };
    }).sort((a,b)=>a.distance-b.distance).slice(0,5);

    if(!pages.length) throw new Error("No nearby articles");
    $("radarResult").innerHTML=pages.map(p=>{
      const claimed=state.radarClaims.includes(p.id);
      return `<div class="discovery">
        <div class="eyebrow">📍 ${Math.round(p.distance)} M AWAY</div>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
        <div class="grid">
          <button class="secondary" data-radar-directions="${p.lat},${p.lon}">Directions</button>
          <button class="secondary" data-radar-read="${p.url}">Read More</button>
        </div>
        <button data-radar-claim="${p.id}" ${claimed?"disabled":""}>${claimed?"✅ Discovery Claimed":"Claim +15 QP"}</button>
      </div>`;
    }).join("");

    document.querySelectorAll("[data-radar-directions]").forEach(b=>b.addEventListener("click",()=>{
      const [a,o]=b.dataset.radarDirections.split(",");
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${a},${o}&travelmode=walking`,"_blank");
    }));
    document.querySelectorAll("[data-radar-read]").forEach(b=>b.addEventListener("click",()=>window.open(b.dataset.radarRead,"_blank")));
    document.querySelectorAll("[data-radar-claim]").forEach(b=>b.addEventListener("click",()=>{
      const id=b.dataset.radarClaim;
      if(state.radarClaims.includes(id))return;
      state.radarClaims.push(id);
      state.score+=15;
      save();
      $("scorePill").textContent=state.score+" QP";
      b.disabled=true;
      b.textContent="✅ Discovery Claimed";
    }));
  }catch(e){
    $("radarResult").innerHTML=`<div class="discovery"><strong>No detailed nearby discovery was returned.</strong><p class="muted">You can still explore interesting places using your exact GPS position.</p><button id="radarFallback">Explore Nearby in Google Maps</button></div>`;
    $("radarFallback").addEventListener("click",()=>window.open("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent("points of interest near "+lat+","+lon),"_blank"));
  }
}


function openArchive(){const a=archives[state.index],place=route[state.index].name;$('archiveTitle').textContent='CASE FILE: '+place;$('archiveBody').innerHTML=`<div class="archiveSection"><h3>📜 Historical Record</h3><p>${a.history}</p></div><div class="archiveSection"><h3>👻 London Legend</h3><p>${a.legend}</p><p class="tiny muted">Folklore is separated from verified history.</p></div><div class="archiveSection"><h3>🧠 Investigator's Question</h3><p>${a.question}</p></div><div class="archiveSection"><h3>📚 Source Types</h3><p>Official local-history records • Historic England • museums and recognised archives</p></div>`;$('archiveOverlay').classList.add('show')}
function overview(){$("routeList").innerHTML=route.map((s,i)=>`<div class="routeItem"><strong>${state.completed.includes(i)?"✅":i===state.index?"📍":"🔒"} ${i+1}. ${s.name}</strong><div class="tiny muted">${s.subtitle} • ${s.duration}</div></div>`).join("");show("overview")}
function finish(){const total=route.length*4,done=Object.keys(state.done).length,ratio=done/total,rank=ratio>=.85?"MASTER EXPLORER":ratio>=.65?"GOLD EXPLORER":ratio>=.45?"SILVER EXPLORER":"URBAN EXPLORER";$("rank").textContent=rank;$("finishText").textContent="You completed the Hidden London route from London Bridge to Battersea.";$("finalScore").textContent=state.score;$("finalOps").textContent=state.completed.length;$("finalPhotos").textContent=state.photos.length;
$("finalCollectables").innerHTML=`<div class="rewardGrid">`+state.collectables.map((item,index)=>{
  const secret=unlockSecrets[index]||"A hidden London discovery.";
  const place=route[index]?route[index].name:"Hidden London";
  const icon=(item.match(/^\S+/)||["🧭"])[0];
  const name=item.replace(/^\S+\s*/,"");
  return `<div class="rewardCard">
    <div class="rewardIcon">${icon}</div>
    <div class="rewardPlace">${place}</div>
    <div class="rewardName">${name}</div>
    <p>${secret}</p>
  </div>`;
}).join("")+`</div>`;
const targetPhrase="LOOKCLOSER";
const revealed=targetPhrase.split("").map((letter,index)=>state.letters.length>index?letter:"•");
const firstWord=revealed.slice(0,4).join(" ");
const secondWord=revealed.slice(4).join(" ");
$("finalLetters").innerHTML=`<div class="mysteryPhrase">
  <div class="eyebrow">HIDDEN LONDON MESSAGE</div>
  <div class="letters">${firstWord}<span class="wordGap"></span>${secondWord}</div>
  <div class="phraseHint">${state.letters.length===route.length?"Mystery solved: LOOK CLOSER":"Each completed operation reveals the next letter in the phrase."}</div>
</div>`;$("answers").innerHTML=Object.entries(state.responses)
  .map(([id,value])=>{
    const legacy=typeof value==="string";
    const answer=legacy?value:(value.answer||"");
    if(!answer.trim()) return "";
    let question=legacy?"Saved mission response":(value.question||"Saved mission response");
    let place=legacy?"":(value.place||"");
    if(legacy){
      for(let i=0;i<route.length;i++){
        const mission=missions(i).find(m=>m.id===id);
        if(mission){question=mission.title;place=route[i].name;break}
      }
    }
    return `<div class="answerCard">
      <div class="answerPlace">${place||"Urban Quest"}</div>
      <div class="answerQuestion">${question}</div>
      <div class="answerText">“${answer}”</div>
    </div>`;
  }).join("")||"<p class='muted'>No written answers saved.</p>";$("gallery").innerHTML=state.photos.map(p=>`<img src="${p.data}" alt="${p.name}">`).join("");show("finish")}
$("startBtn").addEventListener("click",()=>{render();show("operation");gps()});$("overviewHome").addEventListener("click",overview);$("resetBtn").addEventListener("click",()=>{localStorage.removeItem(key);location.reload()});$("gpsBtn").addEventListener("click",gps);
$("retryLocationBtn").addEventListener("click",()=>{$("locationHelpOverlay").classList.remove("show");gps()});
$("useOperationAreaBtn").addEventListener("click",()=>{
  state.coords={lat:route[state.index].lat,lon:route[state.index].lon};
  usingOperationArea=true;
  save();
  $("locationBox").innerHTML=`<strong>Using ${route[state.index].name} area</strong><br><span class="tiny muted">Live GPS is off, but Radar and nearby searches can still work around this operation.</span>`;
  $("gpsBtn").textContent="📍 Area";
  $("locationHelpOverlay").classList.remove("show");
});
$("closeLocationHelp").addEventListener("click",()=>$("locationHelpOverlay").classList.remove("show"));
checkLocationPermission();$("radarBtn").addEventListener("click",radar);$("radarRefresh").addEventListener("click",radar);$("closeRadar").addEventListener("click",()=>$("radarOverlay").classList.remove("show"));$("discoverBtn").addEventListener("click",discover);$("archiveBtn").addEventListener("click",openArchive);$("closeArchive").addEventListener("click",()=>$("archiveOverlay").classList.remove("show"));$("closeDiscover").addEventListener("click",()=>$("discoverOverlay").classList.remove("show"));$("photoInput").addEventListener("change",e=>addPhotos(e.target.files));$("completeBtn").addEventListener("click",complete);$("rewardContinue").addEventListener("click",continueAfterReward);$("rewardDiscover").addEventListener("click",discover);$("directionsBtn").addEventListener("click",directions);$("nextOperationBtn").addEventListener("click",()=>{render();show("operation");gps()});$("routeBtn").addEventListener("click",overview);$("resumeBtn").addEventListener("click",()=>{render();show("operation")});$("pitBtn").addEventListener("click",()=>$("pitOverlay").classList.add("show"));$("closePit").addEventListener("click",()=>$("pitOverlay").classList.remove("show"));document.querySelectorAll("[data-pit]").forEach(b=>b.addEventListener("click",()=>{if(!state.coords)return gps();window.open("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(b.dataset.pit+" near "+state.coords.lat+","+state.coords.lon),"_blank")}));$("energyBtn").addEventListener("click",()=>$("energyOverlay").classList.add("show"));$("closeEnergy").addEventListener("click",()=>$("energyOverlay").classList.remove("show"));document.querySelectorAll("[data-energy]").forEach(b=>b.addEventListener("click",()=>{$("energyAdvice").textContent=b.dataset.energy}));$("scorePill").textContent=state.score+" QP";

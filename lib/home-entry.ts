// Initial-document policy only: App Router transitions and history traversal stay native.
export const homeEntryScript = `(()=>{
  const navigation=performance.getEntriesByType('navigation')[0];
  const traversal=navigation?navigation.type==='back_forward':performance.navigation?.type===2;
  if(location.pathname!=='/'||traversal)return;
  const initialHash=location.hash;
  history.scrollRestoration='manual';
  let interrupted=false;
  const events=['wheel','touchstart','pointerdown','keydown'];
  const release=()=>{
    history.scrollRestoration='auto';
    events.forEach(type=>removeEventListener(type,stop));
    removeEventListener('popstate',release);
  };
  const stop=()=>{interrupted=true;release()};
  const position=()=>{
    if(interrupted||location.pathname!=='/'||location.hash!==initialHash)return;
    if(!initialHash){scrollTo({top:0,left:0,behavior:'instant'});return}
    let id;
    try{id=decodeURIComponent(initialHash.slice(1))}catch{release();return}
    const target=document.getElementById(id);
    if(target)target.scrollIntoView({block:'start',behavior:'instant'});
    else release();
  };
  events.forEach(type=>addEventListener(type,stop,{passive:true,once:true}));
  if(!initialHash)position();
  else addEventListener('DOMContentLoaded',position,{once:true});
  addEventListener('pageshow',event=>{if(!event.persisted)position()},{once:true});
  // Keep the selected entry until interaction: native restoration may occur late.
  // A departing document must not change an incoming reload's shared entry mode.
  addEventListener('popstate',release,{once:true});
})();`;

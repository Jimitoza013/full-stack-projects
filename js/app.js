const notifications=document.getElementById('notifications');

function showToast(title,msg){
  const t=document.createElement('div');
  t.className='toast';
  t.innerHTML=`<div class="toast-icon">✦</div><div><b>${title}</b><p>${msg}</p></div><button onclick="this.parentElement.remove()">×</button>`;
  notifications.appendChild(t);
  setTimeout(()=>{t.classList.add('hide');setTimeout(()=>t.remove(),300)},5200);
}
setTimeout(()=>showToast('You’re all set','Product design review starts in 30 minutes.'),1100);
setTimeout(()=>showToast('Calendar updated','1 new event was added to your week.'),4300);

function openModal(){document.getElementById('modalBackdrop').classList.add('show');setTimeout(()=>document.getElementById('eventName').focus(),80)}
function closeModal(){document.getElementById('modalBackdrop').classList.remove('show')}
function createEvent(){
  const name=document.getElementById('eventName').value.trim()||'Untitled event';
  closeModal();
  showToast('Event created',`${name} has been added to your schedule.`);
  document.getElementById('eventName').value='';
}
function filterEvents(type,btn){
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
  document.querySelectorAll('.event-day').forEach(day=>{
    day.style.display=(type==='all'||(type==='today'&&day.dataset.day==='today')||type==='week')?'block':'none';
  });
}
function searchEvents(){
  const q=document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.event').forEach(e=>e.style.display=e.dataset.title.toLowerCase().includes(q)?'grid':'none');
}
function applyTheme(theme){
  document.documentElement.classList.toggle('dark', theme==='dark');
  const btn=document.getElementById('themeToggle');
  if(btn){
    const dark=theme==='dark';
    btn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
    btn.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');
  }
}
function toggleTheme(){
  const next=document.documentElement.classList.contains('dark')?'light':'dark';
  applyTheme(next);
  localStorage.setItem('orbit-theme',next);
  showToast(next==='dark'?'Dark mode enabled':'Light mode enabled',
    next==='dark'?'A calmer dark workspace is ready.':'Back to the bright workspace.');
}
(function(){
  const saved=localStorage.getItem('orbit-theme');
  const preferred=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light';
  applyTheme(saved || preferred);
})();

function toggleMobile(){
  const nav=document.querySelector('.navlinks');
  const visible=nav.style.display==='flex';
  nav.style.display=visible?'none':'flex';
  nav.style.position='absolute';nav.style.top='78px';nav.style.left='10px';nav.style.right='10px';
  nav.style.padding='10px';nav.style.background='var(--nav-bg)';nav.style.backdropFilter='blur(20px)';
  nav.style.border='1px solid var(--line)';nav.style.borderRadius='17px';nav.style.flexDirection='column';
}
const premiumNav=document.querySelector('.nav');
window.addEventListener('scroll',()=>premiumNav&&premiumNav.classList.toggle('scrolled',window.scrollY>18),{passive:true});

if(window.matchMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.addEventListener('pointermove',e=>{
    if(!premiumNav)return;
    const r=premiumNav.getBoundingClientRect();
    if(e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom){
      premiumNav.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      premiumNav.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    }
  },{passive:true});
}

const orbitNav=document.querySelector('.nav');
window.addEventListener('scroll',()=>{
  if(orbitNav) orbitNav.classList.toggle('scrolled',window.scrollY>18);
},{passive:true});
if(orbitNav && window.matchMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  orbitNav.addEventListener('pointermove',(e)=>{
    const r=orbitNav.getBoundingClientRect();
    orbitNav.style.setProperty('--nav-x',((e.clientX-r.left)/r.width*100)+'%');
    orbitNav.style.setProperty('--nav-y',((e.clientY-r.top)/r.height*100)+'%');
  });
}

document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

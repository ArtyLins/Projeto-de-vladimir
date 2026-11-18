"use strict";
let welcomeSeen=false;
try{welcomeSeen=localStorage.getItem('spatial-welcome-seen')==='seen';}catch{}

function hideWelcome(){finishIntroduction(false);document.getElementById('welcome-card').hidden=true;}
function showWelcome(){
  finishIntroduction(false);
  if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}
  closeModuleCatalog();controlDrawer.classList.remove('open');
  document.getElementById('welcome-card').hidden=false;
  welcomeSeen=true;
  try{localStorage.setItem('spatial-welcome-seen','seen');}catch{}
  document.getElementById('welcome-close').focus({preventScroll:true});
}
for(const button of document.querySelectorAll('[data-welcome-view]'))button.addEventListener('click',()=>{openLabPanel(button.dataset.welcomeView);const panel=document.querySelector('.menu-panel.active');const target=panel.querySelector('input:not([type=checkbox]):not([type=file]),select,button');if(!matchMedia('(pointer:coarse)').matches)target?.focus({preventScroll:true});});
for(const id of ['welcome-close','welcome-explore'])document.getElementById(id).addEventListener('click',()=>{hideWelcome();document.getElementById('welcome-help').focus({preventScroll:true});});
document.getElementById('welcome-help').addEventListener('click',showWelcome);
document.getElementById('welcome-project').addEventListener('click',()=>document.getElementById('project-file').click());
window.addEventListener('keydown',event=>{if(!document.getElementById('welcome-card').hidden&&event.key==='Escape'){hideWelcome();document.getElementById('welcome-help').focus({preventScroll:true});}});
// The card is independent of scene data: reopening help never resets a graph.

document.getElementById('clear-graph').addEventListener('click',()=>{initializeEmptyScene();status.textContent='Gráfico limpo. Escolha uma ferramenta para gerar outro.';});

let introTimer;
function finishIntroduction(reveal=true){
  const intro=document.getElementById('opening-intro');
  if(intro.hidden)return;
  intro.hidden=true;clearTimeout(introTimer);
  if(reveal&&!welcomeSeen){document.getElementById('welcome-card').classList.add('welcome-reveal');showWelcome();}
}
document.getElementById('intro-skip').addEventListener('click',()=>finishIntroduction());
document.getElementById('opening-intro').addEventListener('animationend',event=>{if(event.animationName==='opening-overlay')finishIntroduction();});
window.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.getElementById('opening-intro').hidden)finishIntroduction();});
if(document.documentElement.dataset.reduceMotion==='true'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)finishIntroduction();
else introTimer=setTimeout(()=>finishIntroduction(),3000);

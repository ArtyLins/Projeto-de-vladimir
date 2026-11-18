"use strict";
const mobileTouch=()=>matchMedia('(pointer: coarse)').matches||navigator.maxTouchPoints>0;
let portraitAccepted=false,lookPointer=null,lookLast=null;
const touchMoves=new Map();
function clearTouchMovement(){if(window.resetMobileJoystick)window.resetMobileJoystick();for(const key of touchMoves.values())movementKeys.delete(key);touchMoves.clear();lookPointer=null;lookLast=null;for(const b of document.querySelectorAll('[data-move]'))b.classList.remove('pressed');}
function syncMobileWalking(){const enabled=mobileTouch()&&walkingMode;document.getElementById('mobile-movement').hidden=!enabled;document.getElementById('mobile-look-hint').hidden=!enabled;const button=document.getElementById('mobile-walk-toggle');button.textContent=enabled?'Sair da caminhada':'Ativar caminhada';button.setAttribute('aria-pressed',String(enabled));document.body.classList.toggle('mobile-walking',enabled);if(mobileTouch())controls.enabled=!enabled;if(!enabled)clearTouchMovement();}
const desktopWalking=setWalkingMode;setWalkingMode=function(enabled){desktopWalking(enabled);syncMobileWalking();};
async function requestMobileLandscape(){
 if(!mobileTouch())return;
 try{if(!document.fullscreenElement&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();if(screen.orientation?.lock)await screen.orientation.lock('landscape');}catch{}
 updateOrientationPrompt();
 if(innerHeight>innerWidth)document.getElementById('mobile-orientation-note').textContent='Se a tela não virar, gire o aparelho e verifique a rotação automática.';
}
function updateOrientationPrompt(){const portrait=innerHeight>innerWidth;document.getElementById('mobile-orientation').hidden=!mobileTouch()||!portrait||portraitAccepted;if(!portrait)clearTouchMovement();}
document.getElementById('mobile-landscape').addEventListener('click',requestMobileLandscape);
document.getElementById('mobile-portrait').addEventListener('click',()=>{portraitAccepted=true;updateOrientationPrompt();});
document.getElementById('mobile-walk-toggle').addEventListener('click',()=>{const enabled=!walkingMode;if(enabled){hideWelcome();closeModuleCatalog();controlDrawer.classList.remove('open');portraitAccepted=true;updateOrientationPrompt();requestMobileLandscape();}walkToggle.checked=enabled;setWalkingMode(enabled);if(enabled)status.textContent='Caminhada: use o controle de movimento e arraste a cena para olhar.';});
for(const button of document.querySelectorAll('[data-move]')){
 button.addEventListener('pointerdown',e=>{if(!walkingMode)return;e.preventDefault();button.setPointerCapture(e.pointerId);touchMoves.set(e.pointerId,button.dataset.move);movementKeys.add(button.dataset.move);button.classList.add('pressed');});
 const release=e=>{const key=touchMoves.get(e.pointerId);touchMoves.delete(e.pointerId);if(![...touchMoves.values()].includes(key))movementKeys.delete(key);button.classList.remove('pressed');};
 for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,release);
 button.addEventListener('contextmenu',e=>e.preventDefault());
}
renderer.domElement.addEventListener('pointerdown',e=>{if(!mobileTouch()||!walkingMode||e.pointerType==='mouse'||lookPointer!==null)return;e.preventDefault();e.stopImmediatePropagation();lookPointer=e.pointerId;lookLast=[e.clientX,e.clientY];renderer.domElement.setPointerCapture(e.pointerId);},true);
renderer.domElement.addEventListener('pointermove',e=>{if(e.pointerId!==lookPointer||!walkingMode)return;e.preventDefault();e.stopImmediatePropagation();yaw-=(e.clientX-lookLast[0])*.005*(window.getMobileSensitivity?.()||1);pitch=THREE.MathUtils.clamp(pitch-(e.clientY-lookLast[1])*.005*(window.getMobileSensitivity?.()||1),-Math.PI/2+.05,Math.PI/2-.05);lookLast=[e.clientX,e.clientY];applyWalkLook();},true);
for(const name of ['pointerup','pointercancel','lostpointercapture'])renderer.domElement.addEventListener(name,e=>{if(e.pointerId===lookPointer){lookPointer=null;lookLast=null;e.stopImmediatePropagation();}},true);
window.addEventListener('blur',clearTouchMovement);document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTouchMovement();});window.addEventListener('resize',()=>{clearTouchMovement();updateOrientationPrompt();});document.addEventListener('fullscreenchange',clearTouchMovement);
updateOrientationPrompt();syncMobileWalking();

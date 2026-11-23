"use strict";
const preferenceKey='spatial-math-preferences-v1';
const preferenceIds=[
 'palette-select',...Object.values(colorControls).map(el=>el.id),'intersection-width','axis-label-size','axis-show-numbers','axis-show-letters','grid-toggle','axes-toggle','color-toggle','intersection-toggle','animation-speed','animation-follow',
 'mobile-speed','mobile-sensitivity','mobile-control-mode','mobile-left-handed',
 'a11y-scale','a11y-motion','a11y-contrast','a11y-shortcuts',
 'a11y-curve-width','a11y-marker-size','a11y-label-size','a11y-grid-strength','a11y-spacing','reading-size','cart-audio-events','cart-audio-points',
 'layer-surfaces','layer-paths','layer-vectors','layer-markers','layer-contours','layer-analysis','layer-grid','layer-axes'
];
const preferenceMessage=document.getElementById('preferences-status');
function preferenceValue(el){return el.type==='checkbox'?el.checked:el.value;}
const preferenceDefaults=Object.fromEntries(preferenceIds.map(id=>{const el=document.getElementById(id);return [id,el.type==='checkbox'?el.defaultChecked:el.tagName==='SELECT'?([..el.options].find(o=>o.defaultSelected)?.value||el.value):el.value];}));

function validPreference(el,value){
 if(!el)return false;
 if(el.type==='checkbox')return typeof value==='boolean';
 if(typeof value!=='string')return false;
 if(el.type==='color')return /^#[0-9a-f]{6}$/i.test(value);
 if(el.tagName==='SELECT')return [...el.options].some(o=>o.value===value);
 if(el.type==='range'||el.type==='number'){
  const n=Number(value),step=Number(el.step||1),min=el.min!==''?Number(el.min):-Infinity,max=el.max!==''?Number(el.max):Infinity;
  return value.trim()!==''&&Number.isFinite(n)&&n>=min&&n<=max&&(!el.step||step<=0||Math.abs((n-min)/step-Math.round((n-min)/step))<1e-7);
 }
 return false;
}

function savePreferences(){
 const inputs=Object.fromEntries(preferenceIds.map(id=>{const el=document.getElementById(id);return [id,el?preferenceValue(el):preferenceDefaults[id]];}));
 try{
  localStorage.setItem(preferenceKey,JSON.stringify({version:1,inputs,theme:isNightTheme()?'dark':'light'}));
  preferenceMessage.textContent='Preferências salvas neste navegador.';
 }catch{
  preferenceMessage.textContent='Não foi possível salvar as preferências neste navegador.';
 }
}

function applyPreferences(settings){
 if(!settings||settings.version!==1||!settings.inputs||typeof settings.inputs!=='object'||Array.isArray(settings.inputs)){
  try{localStorage.removeItem(preferenceKey);}catch{}
  return;
 }
 let restored=0;
 for(const id of preferenceIds){
  const el=document.getElementById(id),value=settings.inputs[id];
  if(!el||!Object.hasOwn(settings.inputs,id)||!validPreference(el,value))continue;
  if(el.type==='checkbox')el.checked=value;else el.value=value;restored++;
 }
 if(typeof applyPalette==='function')applyPalette(paletteSelect.value);
 for(const el of Object.values(colorControls)){const value=settings.inputs[el.id];if(validPreference(el,value))el.value=value;}
 document.getElementById('intersection-width-value').textContent=document.getElementById('intersection-width').value;
 document.getElementById('animation-speed-value').textContent=Number(document.getElementById('animation-speed').value).toFixed(2)+'×';
 if(typeof applyMobileSettings==='function')applyMobileSettings();
 if(typeof applyLayerVisibility==='function')applyLayerVisibility();
 for(const id of ['grid-toggle','axes-toggle'])document.getElementById(id).dispatchEvent(new Event('change'));
 for(const id of ['a11y-scale','a11y-motion','a11y-contrast','a11y-shortcuts','a11y-curve-width','a11y-marker-size','a11y-label-size','a11y-grid-strength','a11y-spacing','reading-size','cart-audio-events','cart-audio-points']){
  const el=document.getElementById(id);
  if(el)el.dispatchEvent(new Event('change'));
 }
 if(settings.theme==='dark'||settings.theme==='light')setNightTheme(settings.theme==='dark');else if(typeof refreshScenePalette==='function')refreshScenePalette();
 if(typeof refreshActiveIntersection==='function')refreshActiveIntersection();
 return restored;
}

try{
 const raw=localStorage.getItem(preferenceKey);
 if(raw){
  const saved=JSON.parse(raw);
  applyPreferences(saved);
 }
}catch{
 try{localStorage.removeItem(preferenceKey);}catch{}
}

for(const type of ['input','change'])document.addEventListener(type,event=>{if(preferenceIds.includes(event.target.id))savePreferences();});
document.getElementById('theme-toggle').addEventListener('click',savePreferences);
document.getElementById('preferences-reset').addEventListener('click',()=>{
 try{
  localStorage.removeItem(preferenceKey);
  localStorage.removeItem('spatial-mobile-settings');
  localStorage.removeItem('spatial-accessibility-v1');
  localStorage.removeItem('spatial-advanced-accessibility-v1');
  localStorage.removeItem('spatial-math-theme');
 }catch{}
 applyPreferences({version:1,inputs:preferenceDefaults,theme:'light'});
 if(typeof stopCues==='function')stopCues();
 savePreferences();
});

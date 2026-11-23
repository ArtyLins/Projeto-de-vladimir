"use strict";
const preferenceKey='spatial-math-preferences-v1';
const preferenceIds=['palette-select',...Object.values(colorControls).map(el=>el.id),'intersection-width','surface-opacity','axis-label-size','axis-show-numbers','axis-show-letters','grid-toggle','axes-toggle','color-toggle','mobile-speed','mobile-sensitivity','mobile-control-mode','mobile-left-handed','animation-speed','animation-follow'];
const preferenceMessage=document.getElementById('preferences-status');
function preferenceValue(el){return el.type==='checkbox'?el.checked:el.value;}
const preferenceDefaults=Object.fromEntries(preferenceIds.map(id=>{const el=document.getElementById(id);return [id,el.type==='checkbox'?el.defaultChecked:el.tagName==='SELECT'?[...el.options].find(o=>o.defaultSelected)?.value||el.options[0].value:el.defaultValue];}));
function validPreference(el,value){
 if(el.type==='checkbox')return typeof value==='boolean';
 if(typeof value!=='string')return false;
 if(el.type==='color')return /^#[0-9a-f]{6}$/i.test(value);
 if(el.tagName==='SELECT')return [...el.options].some(o=>o.value===value);
 if(el.type==='range'){const n=Number(value),step=Number(el.step||1),min=Number(el.min||0);return value.trim()!==''&&Number.isFinite(n)&&n>=min&&n<=Number(el.max)&&Math.abs((n-min)/step-Math.round((n-min)/step))<1e-7;}
 return false;
}
function savePreferences(){
 const inputs=Object.fromEntries(preferenceIds.map(id=>[id,preferenceValue(document.getElementById(id))]));
 try{localStorage.setItem(preferenceKey,JSON.stringify({version:1,inputs,theme:isNightTheme()?'dark':'light'}));preferenceMessage.textContent='Preferências salvas neste navegador.';}catch{preferenceMessage.textContent='Este navegador não permitiu salvar as preferências.';}
}
function applyPreferences(settings){
 if(!settings||settings.version!==1||!settings.inputs||typeof settings.inputs!=='object')return;
 for(const id of preferenceIds){const el=document.getElementById(id),value=settings.inputs[id];if(validPreference(el,value)){if(el.type==='checkbox')el.checked=value;else el.value=value;}}
 applyPalette(paletteSelect.value);
 // Restore custom colors after selecting the palette, which sets its own defaults.
 for(const el of Object.values(colorControls)){const value=settings.inputs[el.id];if(validPreference(el,value))el.value=value;}
 document.getElementById('intersection-width-value').textContent=document.getElementById('intersection-width').value;
 document.getElementById('surface-opacity-value').textContent=document.getElementById('surface-opacity').value+'%';
 document.getElementById('animation-speed-value').textContent=Number(document.getElementById('animation-speed').value).toFixed(2)+'×';
 applyMobileSettings();
 for(const id of ['grid-toggle','axes-toggle'])document.getElementById(id).dispatchEvent(new Event('change'));
 if(settings.theme==='dark'||settings.theme==='light')setNightTheme(settings.theme==='dark');else refreshScenePalette();
 refreshActiveIntersection();
}
try{const saved=JSON.parse(localStorage.getItem(preferenceKey)||'null');if(saved)applyPreferences(saved);}catch{}
for(const type of ['input','change'])document.addEventListener(type,event=>{if(preferenceIds.includes(event.target.id))savePreferences();});
document.getElementById('theme-toggle').addEventListener('click',savePreferences);
document.getElementById('preferences-reset').addEventListener('click',()=>{
 try{localStorage.removeItem('spatial-mobile-settings');}catch{}
 applyPreferences({version:1,inputs:preferenceDefaults,theme:'light'});savePreferences();
});

'use strict';
(()=>{
const $=id=>document.getElementById(id),key='spatial-accessibility-v1',ids=['a11y-scale','a11y-motion','a11y-contrast','a11y-shortcuts'],bases=new WeakMap();let scale=1,scaling=false,scaleTimer=0,announceTimer=0,lastView=null,lastCatalogTrigger=null,lastDrawerTrigger=null,descReturn=null;
const systemMotion=matchMedia('(prefers-reduced-motion: reduce)');
try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved){if(['1','1.25','1.5','2'].includes(saved.scale))$('a11y-scale').value=saved.scale;for(const [name,id]of [['motion','a11y-motion'],['contrast','a11y-contrast'],['shortcuts','a11y-shortcuts']])if(typeof saved[name]==='boolean')$(id).checked=saved[name];}else $('a11y-motion').checked=systemMotion.matches;}catch{$('a11y-motion').checked=systemMotion.matches;}
window.announceAccessibility=text=>{clearTimeout(announceTimer);$('a11y-announcer').textContent='';announceTimer=setTimeout(()=>$('a11y-announcer').textContent=text,150);};
function save(){try{localStorage.setItem(key,JSON.stringify({scale:$('a11y-scale').value,motion:$('a11y-motion').checked,contrast:$('a11y-contrast').checked,shortcuts:$('a11y-shortcuts').checked}));$('a11y-status').textContent='Ajustes de acessibilidade salvos.';}catch{$('a11y-status').textContent='Não foi possível salvar neste navegador.';}}
function resizeText(){
 scaling=true;
 const elements=[...document.querySelectorAll('button,a,input,select,textarea,label,summary,p,h1,h2,h3,small,span,strong,pre,output,th,td,caption,li')].filter(el=>!el.closest('.sr-only')&&!el.matches('.cart-swatch'));
 // Measure before applying the multiplier, including nested text and new result rows.
 for(const el of elements)if(bases.has(el))el.style.fontSize=bases.get(el)+'px';
 const measured=[];for(const el of elements)if(!bases.has(el)&&el.getClientRects().length){const old=el.style.fontSize;el.style.removeProperty('font-size');const base=parseFloat(getComputedStyle(el).fontSize);el.style.fontSize=old;measured.push([el,base]);}
 for(const [el,base]of measured)bases.set(el,base);
 for(const el of elements){const base=bases.get(el);if(base)el.style.fontSize=(scale===1?base:Math.max(base,12)*scale)+'px';}
 scaling=false;window.Cartesian2D?.requestDraw();
}
function apply(){scale=Number($('a11y-scale').value);document.body.classList.toggle('a11y-large',scale>1);document.documentElement.dataset.a11yContrast=String($('a11y-contrast').checked);document.documentElement.dataset.reduceMotion=String($('a11y-motion').checked||systemMotion.matches);if(document.documentElement.dataset.reduceMotion==='true'){finishIntroduction();controls.enableDamping=false;for(const [id,stop]of [['ode-play',()=>{odePlaying=false;}],['phase-play',()=>{phasePlaying=false;}],['field-play',()=>{fieldPlaying=false;}],['param-play',()=>{paramPlaying=false;}]]){stop();const el=$(id);if(el)el.textContent='Simular';}$('animation-follow').checked=false;}
 else controls.enableDamping=true;
 resizeText();window.dispatchEvent(new Event('resize'));window.Cartesian2D?.refresh();}
for(const id of ids)$(id).addEventListener('change',()=>{apply();save();});systemMotion.addEventListener?.('change',apply);
$('a11y-reset').addEventListener('click',()=>{$('a11y-scale').value='1';$('a11y-motion').checked=systemMotion.matches;$('a11y-contrast').checked=false;$('a11y-shortcuts').checked=true;apply();save();});
$('accessibility-entry').addEventListener('click',()=>openLabPanel('accessibility'));document.querySelector('[data-a11y-view]').addEventListener('click',()=>openLabPanel('appearance'));
function description(){if(Cartesian2D.active())return Cartesian2D.description;return ['Cena tridimensional do Spatial Math 3D. Coordenadas matemáticas X e Y no plano; Z representa a altura.',labSnapshot.title,labSnapshot.summary,$('lab-inspector-summary').textContent,selectedPoint?$('calc-readout').textContent:'Nenhum ponto selecionado.','Posição da câmera: X '+$('axis-x-value').textContent+', Y '+$('axis-y-value').textContent+', Z '+$('axis-z-value').textContent+'.','Use os menus para consultar as fórmulas e resultados. A representação espacial também pode ser explorada pelos controles de câmera.'].filter(Boolean).join('\n\n');}
function showDescription(){hideWelcome();descReturn=document.activeElement;$('a11y-scene-description').textContent=description();if(!$('a11y-description-dialog').open)$('a11y-description-dialog').showModal();$('a11y-scene-description').focus();}
$('a11y-description-open').addEventListener('click',showDescription);$('a11y-description-close').addEventListener('click',()=>$('a11y-description-dialog').close());$('a11y-description-dialog').addEventListener('close',()=>descReturn?.focus({preventScroll:true}));
for(const link of document.querySelectorAll('.skip-link'))link.addEventListener('click',e=>{e.preventDefault();if(link.hash==='#a11y-scene-description')showDescription();else{openLabPanel('accessibility');$('a11y-scale').focus();}});
const sceneCanvas=renderer.domElement;sceneCanvas.tabIndex=0;sceneCanvas.setAttribute('role','img');sceneCanvas.setAttribute('aria-label','Cena matemática 3D. Setas giram a câmera, mais e menos ajustam a distância, Home recentra. Consulte a descrição textual em Acessibilidade.');
sceneCanvas.addEventListener('keydown',e=>{if(walkingMode||e.ctrlKey||e.altKey||e.metaKey)return;const key=e.key;if(['+','=','-','Home'].includes(key)){e.preventDefault();e.stopPropagation();document.querySelector('[data-camera="'+(key==='Home'?'reset':key==='-'?'out':'in')+'"]').click();return;}if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key))return;e.preventDefault();e.stopPropagation();const offset=camera.position.clone().sub(controls.target),spherical=new THREE.Spherical().setFromVector3(offset);if(key==='ArrowLeft')spherical.theta-=.12;if(key==='ArrowRight')spherical.theta+=.12;if(key==='ArrowUp')spherical.phi-=.12;if(key==='ArrowDown')spherical.phi+=.12;spherical.makeSafe();camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));camera.lookAt(controls.target);controls.update();});
// Optional single-character shortcuts must not intercept screen-reader navigation.
window.addEventListener('keydown',e=>{if(!e.ctrlKey&&!e.altKey&&!e.metaKey&&!$('a11y-shortcuts').checked&&!isTyping(e)&&['f','r','/'].includes(e.key.toLowerCase())){e.preventDefault();e.stopImmediatePropagation();}},true);
function visibleFocusables(root){return [...root.querySelectorAll('button,a[href],input,select,textarea,summary,[tabindex="0"]')].filter(el=>!el.disabled&&!el.closest('[inert]')&&el.getClientRects().length>0);}
function syncFocus(){
 const welcome=$('welcome-card'),intro=$('opening-intro'),tutorial=$('mobile-tutorial'),orientation=$('mobile-orientation');
 const overlay=!intro.hidden?intro:!orientation.hidden?orientation:!welcome.hidden?welcome:null;
 const is2d=Cartesian2D.active();
 for(const child of document.querySelector('.app-shell').children){if(child===workspaceElement())continue;child.inert=!!overlay&&!(child===welcome||child.contains(welcome))||is2d&&!child.contains(welcome);}
 // The welcome is nested alongside the canvas; restrict its siblings as well.
 if(welcome.parentElement)for(const child of welcome.parentElement.children)if(child!==welcome&&!child.contains(welcome))child.inert=!!overlay||is2d;
 document.querySelector('.top-nav').inert=!!overlay;
 $('control-drawer').inert=!!overlay||!$('control-drawer').classList.contains('open');
 $('module-catalog').inert=!!overlay||$('module-catalog').hidden;
 $('cart-workspace').inert=!!overlay||!is2d;
 for(const id of ['mobile-actions-bar','mobile-walk-ui','mobile-axis-compass'])$(id).inert=!!overlay||is2d;
 const panel=document.querySelector('.menu-panel.active');for(const p of document.querySelectorAll('.menu-panel'))p.inert=p!==panel;
 if(panel!==lastView){lastView=panel;if($('control-drawer').classList.contains('open')&&!overlay){const heading=panel.querySelector('h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}}
 if(document.activeElement.closest?.('[inert]')&&!overlay&&!tutorial.open){if(!$('module-catalog').hidden)$('catalog-close').focus({preventScroll:true});else if($('control-drawer').classList.contains('open'))$('drawer-close').focus({preventScroll:true});else if(is2d)$('cart-canvas').focus({preventScroll:true});else (lastDrawerTrigger?.getClientRects().length&&!lastDrawerTrigger.closest('[inert]')?lastDrawerTrigger:$('accessibility-entry')).focus({preventScroll:true});}
 clearTimeout(scaleTimer);scaleTimer=setTimeout(resizeText,40);
}
function workspaceElement(){return $('cart-workspace');}
for(const b of document.querySelectorAll('.nav-category'))b.addEventListener('click',()=>lastCatalogTrigger=b);
for(const b of document.querySelectorAll('.nav-item,[data-welcome-view],#accessibility-entry'))b.addEventListener('click',()=>{const view=b.dataset.view||b.dataset.welcomeView;lastDrawerTrigger=b.getClientRects().length?b:document.querySelector('.nav-category[data-category="'+(moduleGroups[view]||'tools')+'"]')||$('accessibility-entry');});
$('catalog-close').addEventListener('click',()=>lastCatalogTrigger?.focus({preventScroll:true}));$('drawer-close').addEventListener('click',()=>{const target=Cartesian2D.active()?$('cart-canvas'):lastDrawerTrigger;if(target?.getClientRects().length)target.focus({preventScroll:true});});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')){queueMicrotask(()=>{if(!$('control-drawer').classList.contains('open')&&$('module-catalog').hidden&&!document.activeElement.getClientRects().length)(lastCatalogTrigger||$('accessibility-entry')).focus();});}if(e.key!=='Tab')return;const card=!$('opening-intro').hidden?$('opening-intro'):!$('mobile-orientation').hidden?$('mobile-orientation'):!$('welcome-card').hidden?$('welcome-card'):null;if(!card)return;const els=visibleFocusables(card);if(!els.length)return;const first=els[0],last=els.at(-1);if(e.shiftKey&&(document.activeElement===first||!card.contains(document.activeElement))){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||!card.contains(document.activeElement))){e.preventDefault();first.focus();}});
const obs=new MutationObserver(syncFocus);for(const el of [$('control-drawer'),$('module-catalog'),$('welcome-card'),$('opening-intro'),$('mobile-orientation'),$('cart-workspace')])obs.observe(el,{attributes:true,attributeFilter:['hidden','class']});
const textObserver=new MutationObserver(()=>{if(!scaling){clearTimeout(scaleTimer);scaleTimer=setTimeout(resizeText,80);}});for(const root of [$('control-drawer'),$('module-catalog'),$('welcome-card'),$('cart-workspace')])textObserver.observe(root,{childList:true,subtree:true});
for(const output of document.querySelectorAll('.ode-readout, #project-status, #preferences-status, #calc-readout')){output.setAttribute('role','status');output.setAttribute('aria-live','polite');}
for(const el of document.querySelectorAll('input,select,textarea')){
 if(el.labels?.length||el.hasAttribute('aria-label')||el.hasAttribute('aria-labelledby'))continue;
 const title=el.getAttribute('title')||el.id?.replaceAll('-',' ')||'Entrada matemática';el.setAttribute('aria-label',title);
}
// Every old canvas retains a text alternative through the results dialog.
for(const c of document.querySelectorAll('canvas'))if(c!==canvasElement()&&c!==sceneCanvas){c.setAttribute('role','img');if(!c.getAttribute('aria-label'))c.setAttribute('aria-label','Representação gráfica. Consulte os resultados textuais em Acessibilidade.');}
function canvasElement(){return $('cart-canvas');}
const previousSnapshot=setLabSnapshot;setLabSnapshot=function(data){previousSnapshot(data);announceAccessibility((data.title||'Cena atualizada')+'. '+(data.summary||''));};
new ResizeObserver(()=>{const bottom=Math.ceil(document.querySelector('.top-nav').getBoundingClientRect().bottom);document.documentElement.style.setProperty('--a11y-nav-bottom',bottom+'px');}).observe(document.querySelector('.top-nav'));
const previousApply=applyProject;applyProject=function(project){const prefs=ids.map(id=>$(id).type==='checkbox'?$(id).checked:$(id).value);previousApply(project);ids.forEach((id,i)=>{if($(id).type==='checkbox')$(id).checked=prefs[i];else $(id).value=prefs[i];});apply();};
apply();syncFocus();
})();

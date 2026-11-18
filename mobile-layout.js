"use strict";
function organizeMobileLayout(){
 if(!mobileTouch())return;
 const bar=document.getElementById('mobile-actions-bar');
 const quick=document.querySelector('.mobile-quick-actions'),recorderPanel=document.getElementById('recording-controls');
 if(quick.parentElement!==bar)bar.append(quick);
 if(recorderPanel.parentElement!==bar)bar.append(recorderPanel);
 const back=document.getElementById('mobile-return-scene');back.textContent='Voltar à cena';back.setAttribute('aria-label','Voltar ao gráfico e fechar painéis');
 const toggle=document.getElementById('mobile-tools-toggle');toggle.textContent=document.body.classList.contains('mobile-tools-hidden')?'Mostrar':'Recolher';toggle.setAttribute('aria-label','Mostrar ou recolher controles de câmera e resultados');
 const update=()=>document.documentElement.style.setProperty('--mobile-bar-bottom',Math.ceil(bar.getBoundingClientRect().bottom)+'px');
 new ResizeObserver(update).observe(bar);update();
 if(!recordingSupported())recordMessage.textContent='Gravação indisponível neste navegador.';
}
organizeMobileLayout();

// Keep panels inside the visible area when browser bars or the keyboard resize it.
function updateMobilePanelViewport(){
 if(!mobileTouch())return;
 const view=window.visualViewport;
 document.documentElement.style.setProperty('--mobile-visible-height',(view?view.height:window.innerHeight)+'px');
 document.documentElement.style.setProperty('--mobile-visible-top',(view?view.offsetTop:0)+'px');
}
window.addEventListener('resize',updateMobilePanelViewport);
window.visualViewport?.addEventListener('resize',updateMobilePanelViewport);
window.visualViewport?.addEventListener('scroll',updateMobilePanelViewport);
updateMobilePanelViewport();

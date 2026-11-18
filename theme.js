"use strict";
function updateThemeButton(){const dark=isNightTheme(),button=document.getElementById('theme-toggle');button.textContent=dark?'☀':'☾';button.setAttribute('aria-pressed',String(dark));button.title=dark?'Ativar tema claro':'Ativar tema noturno';button.setAttribute('aria-label',button.title);}
function setNightTheme(dark){document.documentElement.dataset.theme=dark?'dark':'light';try{localStorage.setItem('spatial-math-theme',dark?'dark':'light');}catch(e){}updateThemeButton();updateBackground();refreshScenePalette();}
document.getElementById('theme-toggle').addEventListener('click',()=>setNightTheme(!isNightTheme()));
updateThemeButton();updateBackground();

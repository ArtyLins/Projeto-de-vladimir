"use strict";
const tutorialSearch=document.getElementById('tutorial-search');
tutorialSearch.addEventListener('input',()=>{
 const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const query=normalize(tutorialSearch.value).trim();let matches=0;
 for(const guide of document.querySelectorAll('.tutorial-guide')){guide.hidden=!normalize(guide.textContent).includes(query);if(!guide.hidden)matches++;}
 document.getElementById('tutorial-empty').hidden=matches>0;
});
for(const button of document.querySelectorAll('[data-tutorial-view]'))button.addEventListener('click',()=>openLabPanel(button.dataset.tutorialView));

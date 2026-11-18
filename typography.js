'use strict';
/* Canvas text cannot inherit CSS fonts. Use the same family explicitly. */
window.SpatialTypography=(()=>{
 const family='"Space Grotesk", Arial, sans-serif';
 const ready=document.fonts?Promise.all([400,500,600,700].map(weight=>document.fonts.load(`${weight} 16px "Space Grotesk"`))).catch(()=>[]):Promise.resolve();
 const canvas=(size,weight=400)=>`${weight} ${Math.max(1,Number(size)||14)}px ${family}`;
 window.addEventListener('load',()=>ready.then(()=>requestAnimationFrame(()=>{
  if(typeof refreshScenePalette==='function')refreshScenePalette();
  window.Cartesian2D?.requestDraw();
  window.dispatchEvent(new Event('resize'));
 })));
 return {family,canvas,ready};
})();

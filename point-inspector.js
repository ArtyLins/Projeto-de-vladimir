"use strict";
function hidePointInspector(){document.getElementById('point-inspector').hidden=true;}
function clearPointSelection(){
  clearRenderGroup(analysisGroup);selectedPoint=null;selectedFormula=null;calcUI('summary').textContent='';calcUI('readout').textContent='Selecione um ponto ou informe suas coordenadas.';hidePointInspector();refreshLabInspector();status.textContent='Seleção removida. Clique na superfície para selecionar outro ponto.';
}
function renderPointInspector(d,error=''){
  if(!selectedPoint){hidePointInspector();return;}
  const write=(id,value)=>document.getElementById('point-'+id).textContent=value,fmt=mathNumber,{x,y,world}=selectedPoint;
  status.textContent=`Ponto selecionado: (${fmt(x)}, ${fmt(y)}, ${fmt(world.y)})`;
  write('formula','z = '+selectedPoint.formulaText);write('coordinates',`P = (${fmt(x)}, ${fmt(y)}, ${fmt(world.y)})`);
  write('partials',d?`∂f/∂x ≈ ${fmt(d.fx)}
∂f/∂y ≈ ${fmt(d.fy)}`:'Não disponível');
  write('gradient',d?`∇f ≈ (${fmt(d.fx)}, ${fmt(d.fy)})
Magnitude ≈ ${fmt(d.norm)}`:'Não disponível');
  write('normal',d?`n ≈ (${fmt(-d.fx)}, ${fmt(-d.fy)}, 1)`:'Não disponível');
  write('tangent',d?`z ≈ ${fmt(d.z)} + (${fmt(d.fx)})(x − (${fmt(x)})) + (${fmt(d.fy)})(y − (${fmt(y)}))`:'Não foi possível estimar o plano tangente.');
  write('note',error||(selectedFormula.smoothRisk?'Expressão com possível quebra de suavidade. A estimativa local não prova diferenciabilidade.':'Derivadas estimadas numericamente. Os coeficientes exibidos são arredondados.'));
  document.getElementById('point-inspector').hidden=false;
  document.getElementById('point-inspector-results').hidden=false;document.getElementById('point-clear').disabled=false;
  document.getElementById('point-input-x').value=String(x);document.getElementById('point-input-y').value=String(y);document.getElementById('point-input-status').textContent='';
}
document.getElementById('point-clear').addEventListener('click',clearPointSelection);
document.getElementById('calc-clear-selection').addEventListener('click',clearPointSelection);
document.getElementById('point-close').addEventListener('click',hidePointInspector);
document.getElementById('point-collapse').addEventListener('click',event=>{const body=document.getElementById('point-inspector-body');body.hidden=!body.hidden;event.currentTarget.textContent=body.hidden?'+':'−';event.currentTarget.setAttribute('aria-expanded',String(!body.hidden));event.currentTarget.setAttribute('aria-label',body.hidden?'Expandir detalhes':'Recolher detalhes');});

function openPointEditor(){
  document.getElementById('point-inspector').hidden=false;document.getElementById('point-inspector-body').hidden=false;
  const collapse=document.getElementById('point-collapse');collapse.textContent='−';collapse.setAttribute('aria-expanded','true');collapse.setAttribute('aria-label','Recolher detalhes');
  document.getElementById('point-inspector-results').hidden=!selectedPoint;document.getElementById('point-clear').disabled=!selectedPoint;
  if(!selectedPoint){document.getElementById('point-input-x').value=calcUI('x').value;document.getElementById('point-input-y').value=calcUI('y').value;document.getElementById('point-note').textContent='Selecione um ponto para consultar o plano tangente.';}
  document.getElementById('point-input-status').textContent='';document.getElementById('point-input-x').focus();
}
document.getElementById('point-open').addEventListener('click',openPointEditor);
document.getElementById('point-input-form').addEventListener('submit',event=>{
  event.preventDefault();const output=document.getElementById('point-input-status');
  try{
    const raw=['x','y'].map(id=>document.getElementById('point-input-'+id).value),[x,y]=raw.map(Number);
    if(raw.some(v=>!v.trim())||![x,y].every(Number.isFinite))throw Error('Informe X e Y válidos.');
    if(Math.max(Math.abs(x),Math.abs(y))>Number(rangeInput.value)/2)throw Error('O ponto deve estar dentro do domínio exibido.');
    const text=selectedPoint&&surfaceGroup.visible?selectedPoint.formulaText:formulaInput.value;
    if(text.trim().toLowerCase().startsWith('sphere'))throw Error('A análise de ponto exige uma superfície z=f(x,y).');
    const f=compileFormula(text),z=f(x,y);if(!Number.isFinite(z)||Math.abs(z)>5.5)throw Error('A altura real ultrapassa o recorte visual ±5.5. Escolha outro ponto.');
    calcSettings();
    if(!surfaceGroup.visible||!surfaceGroup.children.length){renderPlot();if(labSnapshot.kind!=='surface'||!surfaceGroup.children.length)throw Error('Não foi possível gerar a superfície.');}
    selectCalculatedPoint(x,y,text);output.textContent='Ponto selecionado. Z e o plano tangente foram atualizados.';
  }catch(error){output.textContent=error.message;}
});

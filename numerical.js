'use strict';
// Dormand–Prince 5(4). The tolerance controls a local embedded estimate, not global error.
function adaptiveRK45(f,t0,initial,end,{maxStep=.1,rtol=1e-6,atol=1e-9,limit=10000,bound=1e6}={}) {
  if(![t0,end,maxStep,rtol,atol,bound,...initial].every(Number.isFinite)||maxStep<=0||rtol<1e-12||atol<1e-14||rtol>1||atol>1||!initial.length)throw Error('Configuração inválida do RK45.');
  const direction=Math.sign(end-t0),points=[{t:t0,state:[...initial]}];let t=t0,y=[...initial],h=direction*Math.min(maxStep,Math.abs(end-t0)),rejected=0,accepted=0,reason='',attempts=0;
  const A=[[],[1/5],[3/40,9/40],[44/45,-56/15,32/9],[19372/6561,-25360/2187,64448/6561,-212/729],[9017/3168,-355/33,46732/5247,49/176,-5103/18656],[35/384,0,500/1113,125/192,-2187/6784,11/84]],C=[0,1/5,3/10,4/5,8/9,1,1],B=[35/384,0,500/1113,125/192,-2187/6784,11/84,0],E=[35/384-5179/57600,0,500/1113-7571/16695,125/192-393/640,-2187/6784+92097/339200,11/84-187/2100,-1/40];
  const checked=(tt,state)=>{const v=f(tt,state);if(!Array.isArray(v)||v.length!==y.length||v.some(a=>!Number.isFinite(a)))throw Error('fora do domínio real');return v;};
  checked(t,y);
  while(direction*(end-t)>0&&accepted<limit&&attempts<limit*4){
    attempts++;h=direction*Math.min(Math.abs(h),maxStep,Math.abs(end-t));
    if(Math.abs(h)<16*Number.EPSILON*Math.max(1,Math.abs(t))||t+h===t){reason='passo mínimo: tolerância ou domínio não resolvido';break;}
    let next,error=Infinity;
    try{
      const K=[];
      for(let i=0;i<7;i++){const state=y.map((v,j)=>v+h*A[i].reduce((sum,a,k)=>sum+a*K[k][j],0));K.push(checked(t+C[i]*h,state));}
      next=y.map((v,j)=>v+h*B.reduce((sum,b,k)=>sum+b*K[k][j],0));
      error=Math.max(...y.map((v,j)=>Math.abs(h*E.reduce((sum,e,k)=>sum+e*K[k][j],0))/(atol+rtol*Math.max(Math.abs(v),Math.abs(next[j])))));
      if(next.some(v=>!Number.isFinite(v)))error=Infinity;
    }catch{error=Infinity;}
    if(error<=1){
      if(next.some(v=>Math.abs(v)>bound)){reason='limite da visualização ou divergência';break;}
      t=Math.abs(h)>=Math.abs(end-t)?end:t+h;y=next;points.push({t,state:[...y]});accepted++;
    }else rejected++;
    const factor=error===0?5:Number.isFinite(error)?Math.max(.1,Math.min(5,.9*error**(-.2))):.2;
    h*=error<=1?factor:Math.min(.9,factor);
  }
  if(direction*(end-t)>0&&!reason)reason='limite de passos/tentativas';
  return {points,reason,accepted,rejected};
}
// Interpolate by physical time rather than sample index (essential for adaptive steps).
function trackFrame(points,progress,key='t'){
  if(!points.length)return null;const start=points[0][key],end=points.at(-1)[key],target=start+(end-start)*Math.max(0,Math.min(1,progress)),direction=end>=start?1:-1;
  if(points.length===1)return {a:points[0],b:points[0],mix:0,index:0,time:start};
  let lo=0,hi=points.length-1;while(hi-lo>1){const mid=(lo+hi)>>1;if(direction*(points[mid][key]-target)<=0)lo=mid;else hi=mid;}
  const a=points[lo],b=points[hi],mix=b[key]===a[key]?0:(target-a[key])/(b[key]-a[key]);return {a,b,mix,index:lo,time:target};
}
// Sampled marching squares with a residual check to avoid drawing many pole crossings.
function zeroContour(f,extent,n=80){
  if(!Number.isFinite(extent)||extent<=0||!Number.isInteger(n)||n<2)return {segments:[],skipped:0};
  const values=[],segments=[],at=(i,j)=>values[i*(n+1)+j];let skipped=0;
  for(let i=0;i<=n;i++)for(let j=0;j<=n;j++){try{const v=f(-extent+2*extent*i/n,-extent+2*extent*j/n);values.push(Number.isFinite(v)?v:NaN);}catch{values.push(NaN);}}
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){
    const corners=[[i,j],[i+1,j],[i+1,j+1],[i,j+1]],v=corners.map(([a,b])=>at(a,b));if(v.some(a=>!Number.isFinite(a))){skipped++;continue;}
    if(v.every(a=>Math.abs(a)<1e-14))continue;const hits=[];
    for(let k=0;k<4;k++){
      const l=(k+1)%4;if((v[k]<0)===(v[l]<0)&&v[k]!==0&&v[l]!==0)continue;if(v[k]===0&&v[l]===0)continue;
      let left=0,right=1,fl=v[k];const p=corners[k],q=corners[l],point=u=>[-extent+2*extent*(p[0]+(q[0]-p[0])*u)/n,-extent+2*extent*(p[1]+(q[1]-p[1])*u)/n];
      let u=v[k]===0?0:v[l]===0?1:.5,valid=true;
      if(v[k]!==0&&v[l]!==0)for(let z=0;z<24;z++){u=(left+right)/2;const [x,y]=point(u);let fm;try{fm=f(x,y);}catch{valid=false;break;}if(!Number.isFinite(fm)){valid=false;break;}if((fl<0)===(fm<0)){left=u;fl=fm;}else right=u;}
      const xy=point(u);try{if(!Number.isFinite(f(...xy))||Math.abs(f(...xy))>1e-5*Math.max(Number.MIN_VALUE,Math.abs(v[k]),Math.abs(v[l])))valid=false;}catch{valid=false;}
      if(valid&&!hits.some(p=>Math.hypot(p[0]-xy[0],p[1]-xy[1])<1e-9))hits.push(xy);
    }
    if(hits.length===2)segments.push(hits);else if(hits.length===4){let center;try{center=f(-extent+2*extent*(i+.5)/n,-extent+2*extent*(j+.5)/n);}catch{continue;}if(!Number.isFinite(center))continue;const pairs=(center<0)===(v[0]<0)?[[0,1],[2,3]]:[[0,3],[1,2]];for(const [a,b]of pairs)segments.push([hits[a],hits[b]]);}
  }return {segments,skipped};
}
function scalarEquilibria(f,min,max,n=240){
  const roots=[],step=(max-min)/n,safe=x=>{try{const v=f(x);return Number.isFinite(v)?v:NaN;}catch{return NaN;}},add=x=>{if(x<min-1e-9||x>max+1e-9||!Number.isFinite(x)||Math.abs(safe(x))>1e-8||roots.some(p=>Math.abs(p-x)<1e-5))return;roots.push(x);};
  let a=min,fa=safe(a);add(a);
  for(let i=1;i<=n;i++){const b=min+i*step,fb=safe(b);add(b);
    if(Number.isFinite(fa)&&Number.isFinite(fb)&&fa*fb<0){let l=a,r=b,fl=fa;for(let k=0;k<45;k++){const m=(l+r)/2,fm=safe(m);if(!Number.isFinite(fm))break;if(fl*fm<=0)r=m;else{l=m;fl=fm;}}add((l+r)/2);}
    a=b;fa=fb;
  }
  // Newton seeds also capture some even-multiplicity roots, missed by sign changes.
  for(let i=0;i<=32;i++){let x=min+(max-min)*i/32;for(let k=0;k<45;k++){const v=safe(x),h=1e-5*Math.max(1,Math.abs(x)),d=(safe(x+h)-safe(x-h))/(2*h);if(!Number.isFinite(v)||!Number.isFinite(d)||Math.abs(d)<1e-14)break;if(v===0)break;const next=x-v/d;if(next<min||next>max||!Number.isFinite(next))break;x=next;}add(x);}
  return roots.sort((a,b)=>a-b);
}
if(typeof module!=='undefined')module.exports={adaptiveRK45,trackFrame,zeroContour,scalarEquilibria};
// A local sampling warning, not a proof of differentiability.
function checkSmoothNeighborhood(f,x,y,h){
  const center=f(x,y);if(!Number.isFinite(center))throw Error('Ponto fora do domínio real.');
  for(const [dx,dy]of [[1,0],[0,1],[1,1],[1,-1]]){
    const sample=s=>{const v=f(x+s*dx,y+s*dy);if(!Number.isFinite(v))throw Error('A vizinhança do ponto está fora do domínio real.');return v;};
    const measure=step=>{const p=sample(step),m=sample(-step),pp=sample(2*step),mm=sample(-2*step),right=(p-center)/step,left=(center-m)/step,right2=(pp-2*p+center)/(step*step),left2=(center-2*m+mm)/(step*step);return {gap:Math.abs(right-left),scale:Math.max(1,Math.abs(right),Math.abs(left)),gap2:Math.abs(right2-left2),scale2:Math.max(1,Math.abs(right2),Math.abs(left2))};};
    const a=measure(h),b=measure(h/2);
    if((b.gap>.03*b.scale&&b.gap>.8*a.gap)||(b.gap2>.03*b.scale2&&b.gap2>.8*a.gap2))throw Error('Amostras indicam uma quebra de suavidade neste ponto. Gradiente, Hessiana e plano tangente não são apresentados. Escolha um ponto dentro de uma região suave ou refine o passo.');
  }
}
if(typeof module!=='undefined')module.exports.checkSmoothNeighborhood=checkSmoothNeighborhood;

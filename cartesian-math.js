/* Numerical helpers shared by the Cartesian tool and its regression tests. */
(function(root){
'use strict';
const value=(fn,x)=>{try{const y=fn(x);return Number.isFinite(y)&&Math.abs(y)<=1e12?y:NaN;}catch{return NaN;}};
function derivative(fn,x){
 const h=1e-4*Math.max(1,Math.abs(x)),y=value(fn,x),l=value(fn,x-h),r=value(fn,x+h),l2=value(fn,x-h/2),r2=value(fn,x+h/2);
 if(![y,l,r,l2,r2].every(Number.isFinite))throw Error('Derivada indisponível neste ponto.');
 const a=(y-l)/h,b=(r-y)/h,d=(r2-l2)/h,d0=(r-l)/(2*h);
 if(Math.abs(a-b)>.015*(1+Math.abs(d))||Math.abs(d-d0)>.002*(1+Math.abs(d)))throw Error('Não há suavidade numérica suficiente para a tangente.');
 return d;
}
function roots(input,min,max,n=1200){
 const checks=sample(input,min,max,Math.min(n,300)).map(p=>p.y).filter(Number.isFinite),magnitude=Math.max(...checks.map(Math.abs),0);
 if(!magnitude)return [];
 const fn=x=>value(input,x)/magnitude;
 const result=[],step=(max-min)/n,add=x=>{if(Number.isFinite(value(fn,x))&&Math.abs(value(fn,x))<1e-10&&!result.some(r=>Math.abs(r-x)<Math.max(1e-7,step*.1)))result.push(x);};
 let previous=value(fn,min);if(Math.abs(previous)<1e-9)add(min);
 for(let i=1;i<=n;i++){
  const x=min+i*step,y=value(fn,x),left=x-step;
  if(Math.abs(y)<1e-9)add(x);
  if(Number.isFinite(previous)&&Number.isFinite(y)&&Math.sign(previous)!==Math.sign(y)){
   let a=left,b=x,fa=previous;for(let j=0;j<55;j++){const m=(a+b)/2,fm=value(fn,m);if(!Number.isFinite(fm))break;if(Math.abs(fm)<1e-12){a=b=m;break;}if(Math.sign(fm)===Math.sign(fa)){a=m;fa=fm;}else b=m;}add((a+b)/2);
  }
  // Tangential roots: minimize |f| only around a sampled local minimum.
  if(i<n){const next=value(fn,x+step);if(Number.isFinite(y)&&Math.abs(y)<Math.abs(previous)&&Math.abs(y)<Math.abs(next)){
   let a=left,b=x+step;for(let j=0;j<45;j++){const p=a+(b-a)/3,q=b-(b-a)/3;if(Math.abs(value(fn,p))<Math.abs(value(fn,q)))b=q;else a=p;}add((a+b)/2);
  }}previous=y;
 }
 return result.sort((a,b)=>a-b).slice(0,80);
}
function sample(fn,min,max,n=1000){return Array.from({length:n+1},(_,i)=>{const x=min+(max-min)*i/n;return{x,y:value(fn,x)};});}
function segmentOK(fn,a,b,ySpan){
 if(!Number.isFinite(a.y)||!Number.isFinite(b.y))return false;
 const m=value(fn,(a.x+b.x)/2);if(!Number.isFinite(m))return false;
 return Math.abs(m-(a.y+b.y)/2)<Math.max(ySpan*.025,Math.abs(a.y-b.y)*.35);
}
function extrema(fn,min,max){
 const d=x=>{try{return derivative(fn,x);}catch{return NaN;}};
 return roots(d,min,max,800).filter(x=>x>min+(max-min)*1e-6&&x<max-(max-min)*1e-6).map(x=>{
  const h=(max-min)*1e-4,l=d(x-h),r=d(x+h);return{x,y:value(fn,x),type:l<0&&r>0?'mínimo local':l>0&&r<0?'máximo local':null};
 }).filter(p=>p.type&&Number.isFinite(p.y));
}
function integral(fn,a,b){
 if(a===b)return {value:0,difference:0};
 if(![a,b].every(Number.isFinite))throw Error('Limites inválidos.');
 const simpson=n=>{const h=(b-a)/n;let s=0;for(let i=0;i<=n;i++){const y=value(fn,a+i*h);if(!Number.isFinite(y))throw Error('Integral indisponível: domínio inválido ou possível singularidade.');s+=(i===0||i===n?1:i%2?4:2)*y;}return s*h/3;};
 const coarse=simpson(512),fine=simpson(1024),finer=simpson(2048),d=Math.abs(finer-fine);
 if(d>1e-4*(1+Math.abs(finer))||d>Math.abs(fine-coarse)*1.1+1e-9)throw Error('Integral não convergiu; verifique singularidades e limites.');
 return {value:finer,difference:d};
}
function behavior(fn,min,max,n=400){
 const step=(max-min)/n,points=sample(fn,min,max,n),intervals=[],gaps=[];
 for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i];let kind;
  if(!Number.isFinite(a.y)||!Number.isFinite(b.y))kind='sem amostra finita';
  else{
   const x=(a.x+b.x)/2;let slope;
   try{slope=derivative(fn,x);}catch{slope=NaN;}
   if(!Number.isFinite(slope))kind='possível descontinuidade, quebra ou variação rápida';
   else{
    const tol=1e-7*(1+Math.abs(slope)); // A sinalização usa derivada, não apenas diferenças de y.
    kind=Math.abs(slope)<=tol?'aproximadamente constante':slope>0?'crescente (f′(x)>0)':'decrescente (f′(x)<0)';
   }
  }
  const list=kind.includes('amostra finita')||kind.startsWith('possível')?gaps:intervals,last=list.at(-1);
  if(last&&last.kind===kind&&Math.abs(last.b-a.x)<=step*1.001)last.b=b.x;else list.push({a:a.x,b:b.x,kind});
 }
 return {intervals:intervals.slice(0,24),gaps:gaps.slice(0,24),truncated:intervals.length>24||gaps.length>24};
}
const api={value,derivative,roots,sample,segmentOK,extrema,integral,behavior};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CartesianMath=api;
})(typeof window!=='undefined'?window:globalThis);

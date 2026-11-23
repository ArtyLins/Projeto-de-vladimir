'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {odeEulerStep,odeHeunStep,odeRK4Step,integrateFixedODE}=require('../numerical');

test('Euler, Heun and RK4 match reference values',()=>{
  const f=(x,y)=>y;
  assert.ok(Math.abs(odeEulerStep(f,0,1,.1)-1.1)<1e-12);
  assert.ok(Math.abs(odeHeunStep(f,0,1,.1)-1.105)<1e-12);
  assert.ok(Math.abs(odeRK4Step(f,0,1,.1)-1.1051708333333332)<1e-12);
});

test('fixed-step solutions respect initial conditions',()=>{
  const cases=[
    {f:(x,y)=>y,x0:-2,y0:3,end:1,exact:x=>3*Math.exp(x+2)},
    {f:(x,y)=>2*x,x0:-1,y0:-1,end:1,exact:x=>x*x-2}
  ];
  for(const method of ['euler','heun','rk4']){
    for(const c of cases){
      const r=integrateFixedODE(c.f,c.x0,c.y0,c.end,.05,method);
      assert.equal(r.stopped,false);
      assert.equal(r.points[0].x,c.x0);
      assert.equal(r.points[0].y,c.y0);
      assert.ok(r.points.at(-1).x===c.end);
      assert.ok(Math.abs(r.points.at(-1).y-c.exact(c.end))<.5);
    }
  }
});

test('errors decrease coherently as the step is refined',()=>{
  const exact=x=>Math.exp(x);
  const errors={};
  for(const method of ['euler','heun','rk4']){
    errors[method]=[.2,.1].map(h=>{
      const r=integrateFixedODE((x,y)=>y,0,1,1,h,method);
      return Math.max(...r.points.map(p=>Math.abs(p.y-exact(p.x))));
    });
  }
  assert.ok(errors.euler[1]<errors.euler[0]);
  assert.ok(errors.heun[1]<errors.heun[0]);
  assert.ok(errors.rk4[1]<errors.rk4[0]);
  assert.ok(errors.euler[0]/errors.euler[1]<2.5);
  assert.ok(errors.heun[0]/errors.heun[1]<5);
  assert.ok(errors.rk4[0]/errors.rk4[1]<20);
});

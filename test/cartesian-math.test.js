'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const M=require('../cartesian-math');

test('reference quadratic has roots, minimum and derivative',()=>{
  const fn=x=>x*x-1;
  const roots=M.roots(fn,-3,3);
  assert.ok(roots.some(x=>Math.abs(x+1)<1e-6));
  assert.ok(roots.some(x=>Math.abs(x-1)<1e-6));
  assert.ok(Math.abs(M.derivative(fn,0))<1e-7);
  assert.ok(Math.abs(M.derivative(fn,2)-4)<1e-5);
  const extrema=M.extrema(fn,-3,3);
  assert.ok(extrema.some(p=>p.type==='mínimo local'&&Math.abs(p.x)<1e-5&&Math.abs(p.y+1)<1e-5));
});

test('behavior reports increasing and decreasing intervals for cubic',()=>{
  const fn=x=>x*x*x-3*x;
  const b=M.behavior(fn,-3,3,240);
  assert.ok(b.intervals.some(p=>p.kind.includes('crescente')&&p.a< -1.1&&p.b>-1.1));
  assert.ok(b.intervals.some(p=>p.kind.includes('decrescente')&&p.a<0&&p.b>0));
});

test('singular or undefined samples are reported as gaps',()=>{
  const fn=x=>1/x;
  const b=M.behavior(fn,-1,1,200);
  assert.ok(b.gaps.length>0);
});

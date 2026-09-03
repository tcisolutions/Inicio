
const canvas=document.createElement('canvas');
canvas.id='particles';
document.body.prepend(canvas);
const ctx=canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
resize();
addEventListener('resize',resize);
const dots=[...Array(90)].map(()=>({
 x:Math.random()*innerWidth,
 y:Math.random()*innerHeight,
 r:Math.random()*2+1,
 vy:Math.random()*0.5+0.15
}));
(function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle='rgba(56,189,248,.55)';
 dots.forEach(d=>{
   d.y-=d.vy;
   if(d.y<0)d.y=canvas.height;
   ctx.beginPath();
   ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
   ctx.fill();
 });
 requestAnimationFrame(draw);
})();

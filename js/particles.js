
document.addEventListener("DOMContentLoaded",()=>{
  const canvas=document.createElement("canvas");
  canvas.id="particles";
  document.body.prepend(canvas);

  const ctx=canvas.getContext("2d");
  function resize(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  }
  resize();
  window.addEventListener("resize",resize);

  const dots=[...Array(80)].map(()=>({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2+1,
    v:Math.random()*0.5+0.2
  }));

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="rgba(56,189,248,.5)";
    dots.forEach(d=>{
      d.y-=d.v;
      if(d.y<0)d.y=canvas.height;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
});

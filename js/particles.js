const canvas = document.createElement("canvas");

canvas.id = "particleCanvas";

document.getElementById("particles").appendChild(canvas);

const ctx = canvas.getContext("2d");

let w,h;

function resize(){

  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

}

window.addEventListener("resize",resize);

resize();

const particles = [];

for(let i=0;i<80;i++){

  particles.push({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*2+1,
    dx:(Math.random()-.5)*0.4,
    dy:(Math.random()-.5)*0.4
  });

}

function animate(){

  ctx.clearRect(0,0,w,h);

  particles.forEach(p=>{

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(56,189,248,.45)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if(p.x<0||p.x>w) p.dx*=-1;
    if(p.y<0||p.y>h) p.dy*=-1;

  });

  requestAnimationFrame(animate);

}

animate();
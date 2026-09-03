/* ==========================================
   TECHNICAL CENTER PAY PRO
   particles.js V2 (SIN CONFLICTOS)
========================================== */

const particleCanvas = document.getElementById("particles");

if(particleCanvas){

    const ctx = particleCanvas.getContext("2d");

    function resize(){
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const particles=[];

    for(let i=0;i<80;i++){
        particles.push({
            x:Math.random()*particleCanvas.width,
            y:Math.random()*particleCanvas.height,
            vx:(Math.random()-.5)*0.4,
            vy:(Math.random()-.5)*0.4,
            r:Math.random()*2+1
        });
    }

    function draw(){

        ctx.clearRect(0,0,particleCanvas.width,particleCanvas.height);

        particles.forEach((p,index)=>{

            p.x += p.vx;
            p.y += p.vy;

            if(p.x<0||p.x>particleCanvas.width) p.vx*=-1;
            if(p.y<0||p.y>particleCanvas.height) p.vy*=-1;

            ctx.beginPath();
            ctx.fillStyle="rgba(56,189,248,.8)";
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fill();

            particles.forEach((p2)=>{

                const dist=Math.hypot(p.x-p2.x,p.y-p2.y);

                if(dist<140){

                    ctx.beginPath();
                    ctx.strokeStyle=`rgba(56,189,248,${1-dist/140})`;
                    ctx.lineWidth=.3;
                    ctx.moveTo(p.x,p.y);
                    ctx.lineTo(p2.x,p2.y);
                    ctx.stroke();
                }

            });

        });

        requestAnimationFrame(draw);

    }

    draw();
}
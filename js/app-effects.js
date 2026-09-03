
document.querySelectorAll('.fade-up').forEach(el=>{
 const obs=new IntersectionObserver(entries=>{
   entries.forEach(e=>{
     if(e.isIntersecting)e.target.classList.add('visible');
   });
 });
 obs.observe(el);
});

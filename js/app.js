const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }

  });

},{
  threshold:.15
});

document.querySelectorAll(
  ".glass,.fade-up,.fade-left,.fade-right,.zoom-in"
).forEach(el=>observer.observe(el));

window.addEventListener("scroll",()=>{

  const nav = document.querySelector(".navbar");

  if(window.scrollY>60){
    nav.classList.add("scrolled");
  }else{
    nav.classList.remove("scrolled");
  }

});
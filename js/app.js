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

/* ==============================================
   CARRUSEL DE PROMOCIONES
============================================== */

const promoSlider =
document.getElementById("promoContainer");

const nextPromo =
document.getElementById("nextPromo");

const prevPromo =
document.getElementById("prevPromo");

if(nextPromo){

nextPromo.onclick=()=>{

    promoSlider.scrollBy({
        left:360,
        behavior:"smooth"
    });

};

}

if(prevPromo){

prevPromo.onclick=()=>{

    promoSlider.scrollBy({
        left:-360,
        behavior:"smooth"
    });

};

}

/* Auto Scroll */

if(promoSlider){

setInterval(()=>{

    promoSlider.scrollBy({
        left:340,
        behavior:"smooth"
    });

    if(
      promoSlider.scrollLeft +
      promoSlider.clientWidth >=
      promoSlider.scrollWidth-20
    ){

        promoSlider.scrollTo({
            left:0,
            behavior:"smooth"
        });

    }

},7000);

}

/* ==============================================
   BANNER DINÁMICO
============================================== */

function loadBanner(){

    const banner =
    localStorage.getItem("tc_banner");

    if(banner){

        document.getElementById("bannerText")
        .textContent=banner;

    }

}

loadBanner();

/* ==============================================
   LOADER
============================================== */

window.addEventListener("load",()=>{

    document.getElementById("loader")
    .classList.add("hide");

});

/* ==============================================
   BOTÓN VOLVER ARRIBA
============================================== */

const backTop =
document.getElementById("backTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backTop.classList.add("show");

    }else{

        backTop.classList.remove("show");

    }

});

backTop.onclick=()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

};
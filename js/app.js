
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("header");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  const topBtn = document.createElement("button");
  topBtn.id = "topBtn";
  topBtn.innerHTML = "↑";
  document.body.appendChild(topBtn);

  topBtn.onclick = () => window.scrollTo({top:0,behavior:"smooth"});

  window.addEventListener("scroll",()=>{
    topBtn.style.display = window.scrollY > 400 ? "flex":"none";
  });
});

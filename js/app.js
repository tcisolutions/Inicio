const KEY='tc_promos';
const defaultPromos=[{title:'Cambio de cristal iPhone',price:'Desde $999',desc:'Promoción de temporada'},{title:'Cambio de batería Samsung',price:'Desde $699',desc:'Garantía incluida'}];
if(!localStorage.getItem(KEY))localStorage.setItem(KEY,JSON.stringify(defaultPromos));
function render(){const c=document.getElementById('promoList');c.innerHTML='';JSON.parse(localStorage.getItem(KEY)).forEach(p=>c.innerHTML+=`<div class="promoCard"><h3>${p.title}</h3><b>${p.price}</b><p>${p.desc}</p></div>`);}
render();
function copy(t){navigator.clipboard.writeText(t);alert('Cuenta copiada');}
function wa(){const m=document.getElementById('monto').value||'0';window.open('https://wa.me/524431922958?text='+encodeURIComponent('Hola Technical Center, ya realicé mi pago. Monto: $'+m),'_blank');}
function admin(){const pass=prompt('Contraseña');if(pass!=='TC2026*')return;const t=prompt('Título');if(!t)return;const p=prompt('Precio');const d=prompt('Descripción');const arr=JSON.parse(localStorage.getItem(KEY));arr.unshift({title:t,price:p,desc:d});localStorage.setItem(KEY,JSON.stringify(arr));render();alert('Promoción publicada');}

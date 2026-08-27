const selected = [];
const selection = document.querySelector("#selection");
const empty = document.querySelector("#empty");

function render(){
  selection.innerHTML = "";
  empty.textContent = selected.length ? "Produits sélectionnés :" : "Aucun produit sélectionné.";
  selected.forEach((name,i)=>{
    const row=document.createElement("div");
    row.className="selected";
    row.innerHTML=`<span>${name}</span><button class="filter" data-remove="${i}">Retirer</button>`;
    selection.appendChild(row);
  });
  document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{selected.splice(Number(b.dataset.remove),1);render()});
}
document.querySelectorAll(".select").forEach(b=>b.onclick=()=>{
  const name=b.dataset.product;
  if(!selected.includes(name)) selected.push(name);
  render();
  location.hash="demande";
});
document.querySelector("#clear").onclick=()=>{selected.length=0;render()};
document.querySelector("#send").onclick=()=>{
  if(!selected.length){alert("Sélectionnez au moins un produit.");return}
  const msg="Bonjour BOKORI,%0A%0AJe souhaite avoir des informations sur :%0A- "+selected.join("%0A- ")+"%0A%0AMerci.";
  window.open("https://wa.me/23562118511?text="+msg,"_blank");
};
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{
  if(!b.dataset.filter)return;
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
  document.querySelectorAll(".product").forEach(p=>p.style.display=(b.dataset.filter==="all"||p.dataset.category===b.dataset.filter)?"":"none");
});
render();

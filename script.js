const selectionne = [];

const selection = document.querySelector("#selection");
const vide = document.querySelector("#empty");

function render() {
  selection.innerHTML = "";

  if (selectionne.length === 0) {
    vide.style.display = "block";
    return;
  }

  vide.style.display = "none";

  selectionne.forEach((produit, index) => {
    const item = document.createElement("div");
    item.className = "selected-item";

    item.innerHTML = `
      <span>${produit}</span>
      <button type="button" data-remove="${index}">Retirer</button>
    `;

    selection.appendChild(item);
  });

  document.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      selectionne.splice(Number(button.dataset.remove), 1);
      render();
    });
  });
}


/* CHOIX DES PRODUITS */
document.querySelectorAll(".select").forEach(button => {
  button.addEventListener("click", () => {
    const produit = button.dataset.product;

    if (!selectionne.includes(produit)) {
      selectionne.push(produit);
    }

    render();

    const demande = document.querySelector("#demande");

    if (demande) {
      demande.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


/* VIDER LA SÉLECTION */
const clearButton = document.querySelector("#clear");

if (clearButton) {
  clearButton.addEventListener("click", () => {
    selectionne.length = 0;
    render();
  });
}


/* ENVOYER SUR WHATSAPP */
const sendButton = document.querySelector("#send");

if (sendButton) {
  sendButton.addEventListener("click", () => {

    if (selectionne.length === 0) {
      alert("Veuillez sélectionner au moins un produit.");
      return;
    }

    const message =
      "Bonjour BOKORI, je suis intéressé(e) par :\n\n" +
      selectionne.map(produit => "• " + produit).join("\n") +
      "\n\nJe souhaite avoir plus d'informations.";

    /* NUMÉRO WHATSAPP : 69829393 */
    const numeroWhatsApp = "23569829393";

    const url =
      "https://wa.me/" +
      numeroWhatsApp +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank");
  });
}


/* FILTRES DES PRODUITS */
document.querySelectorAll(".filter").forEach(filter => {
  filter.addEventListener("click", () => {

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    filter.classList.add("active");

    const categorie = filter.dataset.filter;

    document.querySelectorAll(".product").forEach(product => {

      if (
        categorie === "all" ||
        product.dataset.category === categorie
      ) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }

    });
  });
});


/* AFFICHAGE INITIAL */
render();

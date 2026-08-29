const selectionne = [];

const selection = document.querySelector("#selection");
const vide = document.querySelector("#empty");

function rendre() {
    selection.innerHTML = "";

    if (selectionne.length > 0) {
        vide.textContent = "Produits sélectionnés :";
    } else {
        vide.textContent = "Aucun produit sélectionné.";
    }

    selectionne.forEach((nom, i) => {
        const rangee = document.createElement("div");
        rangee.className = "selectionne";

        rangee.innerHTML = `
            <span>${nom}</span>
            <button class="filtre" data-remove="${i}">
                Retirer
            </button>
        `;

        selection.appendChild(rangee);
    });

    document.querySelectorAll("[data-remove]").forEach(button => {
        button.onclick = () => {
            const index = Number(button.dataset.remove);
            selectionne.splice(index, 1);
            rendre();
        };
    });
}

document.querySelectorAll(".select").forEach(button => {
    button.onclick = () => {
        const nom = button.dataset.produit;

        if (!selectionne.includes(nom)) {
            selectionne.push(nom);
        }

        rendre();

        window.location.hash = "demande";
    };
});

document.querySelector("#clear").onclick = () => {
    selectionne.length = 0;
    rendre();
};

document.querySelector("#send").onclick = () => {
    if (selectionne.length === 0) {
        alert("Sélectionnez au moins un produit.");
        return;
    }

    const MSG =
        "Bonjour BOKORI, je souhaite avoir des informations sur : " +
        selectionne.join(" - ") +
        " Merci.";

    window.open(
        "https://wa.me/23562118511?text=" + encodeURIComponent(MSG),
        "_blank"
    );
};

document.querySelectorAll(".filter").forEach(button => {
    button.onclick = () => {
        const filtre = button.dataset.filtre;

        if (!filtre) return;

        document.querySelectorAll(".filter").forEach(x => {
            x.classList.remove("actif");
        });

        button.classList.add("actif");

        document.querySelectorAll(".produit").forEach(produit => {
            const categorie = produit.dataset.categorie;

            if (filtre === "tous" || categorie === filtre) {
                produit.style.display = "";
            } else {
                produit.style.display = "none";
            }
        });
    };
});

rendre();

console.log("Kaizoku ou ni naru otoko da");

// Récupération de l'API de tout les fruits
let dataFetch;
const urlApiOnePiece = "https://api.api-onepiece.com/fruits";
await getDataFetch();
async function getDataFetch() {
    const res = await fetch(urlApiOnePiece);
    dataFetch = await res.json();
}
// console log
console.log("Donnée récupéré via Fetch :", dataFetch);
console.log("Nom français récupéré API :", dataFetch[0].french_name);
console.log("Nom japonais récupéré API :", dataFetch[0].roman_name);
console.log("Type récupéré API :", dataFetch[0].type);
console.log("Description récupéré API :", dataFetch[0].description);
console.log("Image récupéré API :", dataFetch[0].filename);

// Création de l'affichage par défault
let NomSelectParDefault = document.createElement("select");
NomSelectParDefault.classList.add("nom-select-par-default");
document.querySelector(".choice-list").appendChild(NomSelectParDefault);


garnirListe();

// Evenement
NomSelectParDefault.addEventListener("change", function () {
    infosListe();
})



function garnirListe(params) {
    let nomSelectTitre = document.createElement("option");
    nomSelectTitre.innerText = "--- Choisissez votre fruits ---";
    NomSelectParDefault.appendChild(nomSelectTitre)
    dataFetch.forEach(fruits => {
        let nomOptionsFruitsSelectNom = document.createElement("option");
        nomOptionsFruitsSelectNom.innerText = fruits.french_name;
        console.log("Mes options dans ma select sont : ", fruits.french_name);
        NomSelectParDefault.appendChild(nomOptionsFruitsSelectNom);
    });
}

function infosListe(params) {
    let nomEnJaponais = document.querySelector("li:first-child");
    nomEnJaponais.textContent = dataFetch[NomSelectParDefault.selectedIndex-1].french_name;
    console.log("Code de merde :", nomEnJaponais);
}
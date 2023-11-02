console.log("Kaizoku ou ni naru otoko da");
let fruitTrouver = {};
let typeTrouver = {};

// ____________________________________________________________RÉCUPÉRATION DE L'API DE TOUT LES FRUITS________________________________________________________________________________________________
let dataFetch;
const urlApiOnePiece = "https://api.api-onepiece.com/fruits";
await getDataFetch();
async function getDataFetch() {
    const res = await fetch(urlApiOnePiece);
    dataFetch = await res.json();
}

// ____________________________________________________________CONSOLE LOG TEST________________________________________________________________________________________________________________________
console.log("Donnée récupéré via Fetch :", dataFetch);
console.log("Nom français récupéré API :", dataFetch[0].french_name);
console.log("Nom japonais récupéré API :", dataFetch[0].roman_name);
console.log("Type récupéré API :", dataFetch[0].type);
console.log("Description récupéré API :", dataFetch[0].description);
console.log("Image récupéré API :", dataFetch[0].filename);
// console.log("Donnée des IMAGES récupéré via fetch", dataFetchImage);
// console.log("test", dataFetchImage.image);


// ____________________________________________________________CRÉATION DE L'AFFICHAGE PAR DÉFAULT_____________________________________________________________________________________________________
let NomSelectParDefault = document.createElement("select");
NomSelectParDefault.classList.add("nom-select-par-default");
document.querySelector(".choice-list").appendChild(NomSelectParDefault);




// ____________________________________________________________EVENEMENT CHANGEMENT DU SELECT QUAND ON CHOISIT UN FRUIT DANS LE SELECT_________________________________________________________________
chercherFruits();

function chercherFruits(params) {
       if (document.getElementById("radio-nom") =="par-nom") {
            
       } else {
        
       }

}

 NomSelectParDefault.addEventListener("change", (selectChange) => {
        fruitTrouver = dataFetch.find((fruitChoisi) => fruitChoisi.french_name == selectChange.target.value)
        console.log("Ceci est mon find/ mon objet : ", fruitTrouver);
        infosListe(fruitTrouver);
    })


// ____________________________________________________________FONCTION POUR REMPLIR LES OPTIONS DU SELECT (METTRE TOUT LES FRUITS DANS LA LISTE)______________________________________________________
garnirListe();

function garnirListe() {
    NomSelectParDefault.innerHTML = "";
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

// ____________________________________________________________FONCTION POUR CHANGER DE RADIO (radio type)_____________________________________________________________________________________________
ChangementRadio();

function ChangementRadio() {
        document.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.addEventListener("change", (eventChange) => {
            if (eventChange.target.value === "par-nom") {
                garnirListe()
            } else if (eventChange.target.value === "par-type") {
                remplacerOptionsChangementRadio()
            }
        })
    })
}


// function ChangerdeRadioType(params) {
//     document.getElementById("radio-type").addEventListener("change", () => {
        
//     }
//     )
// }

// function RechangerRadioNom(params) {
//     document.getElementById("radio-nom").addEventListener("change", () => {
//         garnirListe();
//     })
// }
// ChangerdeRadioType();
// RechangerRadioNom();



// ____________________________________________________________FONCTION POUR REMPLIR LES OPTIONS DU SELECT POUR LES TYPES (METTRE TOUT LES TYPES DANS LA LISTE)________________________________________
function remplacerOptionsChangementRadio() {  
    NomSelectParDefault.innerHTML = "";
    let titreOptionRadioType = document.createElement("option");
    titreOptionRadioType.innerText = "--- Choisissez votre type ---";
    let optionTypeParamecia = document.createElement("option");
    let optionTypeZoan = document.createElement("option");
    let optionTypeLogia = document.createElement("option");
    optionTypeParamecia.innerText = "Paramecia";
    optionTypeZoan.innerText = "Zoan";
    optionTypeLogia.innerText = "Logia";
    NomSelectParDefault.appendChild(titreOptionRadioType);
    NomSelectParDefault.appendChild(optionTypeParamecia);
    NomSelectParDefault.appendChild(optionTypeZoan);
    NomSelectParDefault.appendChild(optionTypeLogia);
}
//_____________________________________________________________FONCTION POUR STOCKER LES INFOS DU FRUIT________________________________________________________________________________________________
async function infosListe(ObjetFruits) {
    // ---------------------------------------------------------------INTEGRATION IMAGE ---------------------------------------------------
    const urlImageFruits = await getImage(ObjetFruits);
    console.log("url Image Fruits ", urlImageFruits);
    let imageFruits = document.querySelector(".info-fruits img");  
    console.log("c'est mon url sch",urlImageFruits);
    imageFruits.src = urlImageFruits.image;
    // --------------------------------------------------------------- INTEGRATION NOM ----------------------------------------------------
    let nomEnJaponaisFruits = document.querySelector("li:first-child");
    // nomEnJaponaisFruits.textContent = "Nom Japonais : " + dataFetch[NomSelectParDefault.selectedIndex-1].roman_name;
    nomEnJaponaisFruits.textContent = "Nom Japonais : " + ObjetFruits.roman_name;
    console.log("Cible nom en jap :", nomEnJaponaisFruits.textContent);
    // --------------------------------------------------------------- INTEGRATION TYPE ---------------------------------------------------
    let typeJaponais = document.querySelector("li:nth-child(2)");
    // typeJaponais.textContent = "Type : " + dataFetch[NomSelectParDefault.selectedIndex-1].type;
    typeJaponais.textContent = "Type : " + ObjetFruits.type;
    console.log("Cible mon type :", typeJaponais.textContent);
    // --------------------------------------------------------------- INTEGRATION DESCRIPTION --------------------------------------------
    let descriptionFruits = document.querySelector("li:last-child");
    // descriptionFruits.textContent = "Description : " + dataFetch[NomSelectParDefault.selectedIndex-1].description;//
    descriptionFruits.textContent = "Description : " + ObjetFruits.description;
    console.log("Cible ma description : " + descriptionFruits.textContent);
    
}


//  ___________________________________________________________FONCTION POUR RECUPERER IMAGE ET URL____________________________________________________________________________________________________
async function getImage(fruit) {
// Récupération de l'API des images des fruits
    const urlApiOnePieceImage = `https://api.api-onepiece.com/fruits/picture/${fruit.filename}`;
    console.log(urlApiOnePieceImage);
    const urlImageFruits = await getDataFetchImage(urlApiOnePieceImage);
    return urlImageFruits

}
async function getDataFetchImage(url) {
    const res = await fetch(url)
    let dataFetchImage = await res.json();
    return dataFetchImage
}

// //  ___________________________________________________________FONCTION POUR RECUPERER TYPE ET URL_____________________________________________________________________________________________________

// // Fonction pour récuperer API Paramecia
// let dataFetchTypeParamecia = {};
// const urlApiOnePieceTypeParamecia = "https://api.api-onepiece.com/fruits/search/type/Paramecia";
// await getDataFetchTypeParamecia();
// async function getDataFetchTypeParamecia() {
//     const res = await fetch(urlApiOnePieceTypeParamecia);
//     dataFetchTypeParamecia = await res.json();
// }
// console.log("Api paramecia ", dataFetchTypeParamecia);

// // Fonction pour récuperer API Zoan
// let dataFetchTypeZoan = {};
// const urlApiOnePieceTypeZoan = "https://api.api-onepiece.com/fruits/search/type/Zoan";
// await getDataFetchTypeZoan();
// async function getDataFetchTypeZoan() {
//     const res = await fetch(urlApiOnePieceTypeZoan);
//     dataFetchTypeZoan = await res.json();
// }
// console.log("Api Zoan ", dataFetchTypeZoan);

// // Fonction pour récuperer API Logia
// let dataFetchTypeLogia = {};
// const urlApiOnePieceTypeLogia = "https://api.api-onepiece.com/fruits/search/type/Logia";
// await getDataFetchTypeLogia();
// async function getDataFetchTypeLogia() {
//     const res = await fetch(urlApiOnePieceTypeLogia);
//     dataFetchTypeLogia = await res.json();
// }
// console.log("Api Logia ", dataFetchTypeLogia);
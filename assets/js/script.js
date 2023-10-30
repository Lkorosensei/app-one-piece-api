console.log("Kaizoku ou ni naru otoko da");

let dataFetch;
const urlApiOnePiece = "https://api.api-onepiece.com/fruits";
await getDataFetch();
async function getDataFetch() {
    const res = await fetch(urlApiOnePiece);
    dataFetch = await res.json();
}

console.log("Donnée récupéré via Fetch :", dataFetch);
console.log("Nom français récupéré API :", dataFetch[0].french_name);
console.log("Nom japonais récupéré API :", dataFetch[0].roman_name);
console.log("Type récupéré API :", dataFetch[0].type);
console.log("Description récupéré API :", dataFetch[0].description);
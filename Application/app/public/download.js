document.getElementById("dTeam").addEventListener("click", async e => {
    let a = document.createElement("a");
    a.href = "./json/Team.json";
    a.download = "./json/Team.json";
    a.click();
});
document.getElementById("dMatch").addEventListener("click", async e => {
    let a = document.createElement("a");
    a.href = "./json/Match.json";
    a.download = "./json/Match.json";
    a.click();
});
document.getElementById("dVarCheck").addEventListener("click", async e => {
    let a = document.createElement("a");
    a.href = "./json/VarCheck.json";
    a.download = "./json/VarCheck.json";
    a.click();
});
document.getElementById("dMetadata").addEventListener("click", async e => {
    let a = document.createElement("a");
    a.href = "./json/Metadata.json";
    a.download = "./json/Metadata.json";
    a.click();
});
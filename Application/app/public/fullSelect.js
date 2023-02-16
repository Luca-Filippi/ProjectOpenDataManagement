async function fullSelect() {
    const data = await fetch("/api/application/data");
    const dataJson = await data.json();
    if(dataJson?.messaggio !== null && dataJson?.messaggio !== undefined) {
        alert(dataJson.messaggio);
    } else {
        const select = document.getElementById("list");
        dataJson.forEach(element => {
            let option = document.createElement("option");
            option.value = element["VarCheckId"];
            option.id = element["VarCheckId"];
            option.innerHTML = element["VarCheckId"];
            select.appendChild(option);
        });
        select.hidden=false;
        document.getElementById("deleteButton").hidden = false;
        document.getElementById("insertForm").hidden = false;
    }
}

fullSelect();
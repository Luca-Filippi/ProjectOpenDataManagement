async function getData() {
    const data = await fetch("/api/application/data");
    const dataJson = await data.json();
    if(dataJson?.messaggio !== null && dataJson?.messaggio !== undefined) {
        alert(dataJson.messaggio);
    } else {
        const table = document.getElementById("table");
        const tableBody = document.getElementById("result");
        dataJson.forEach(element => {
            let tr = document.createElement("tr");
            let tdVarCheckId = document.createElement("td");
            tdVarCheckId.innerHTML = element["VarCheckId"];
            let tdHomeTeam = document.createElement("td");
            tdHomeTeam.innerHTML = element["HomeTeam"];
            let tdAwayTeam = document.createElement("td");
            tdAwayTeam.innerHTML = element["AwayTeam"];
            let tdMatchDate = document.createElement("td");
            tdMatchDate.innerHTML = element["MatchDate"];
            let tdTime = document.createElement("td");
            tdTime.innerHTML = element["Time"];
            let tdDescription = document.createElement("td");
            tdDescription.innerHTML = element["Description"];
            let tdInvolvedTeam = document.createElement("td");
            tdInvolvedTeam.innerHTML = element["InvolvedTeam"];
            let tdCompetition = document.createElement("td");
            tdCompetition.innerHTML = element["Competition"];
            let tdSeason = document.createElement("td");
            tdSeason.innerHTML = element["Season"];
            let tdUsed = document.createElement("td");
            tdUsed.innerHTML = element["Used"];
            let tdType = document.createElement("td");
            tdType.innerHTML = element["Type"];
            tr.appendChild(tdVarCheckId);
            tr.appendChild(tdHomeTeam);
            tr.appendChild(tdAwayTeam);
            tr.appendChild(tdMatchDate);
            tr.appendChild(tdTime);
            tr.appendChild(tdDescription);
            tr.appendChild(tdInvolvedTeam);
            tr.appendChild(tdCompetition);
            tr.appendChild(tdSeason);
            tr.appendChild(tdUsed);
            tr.appendChild(tdType);
            tableBody.appendChild(tr);
        });
        table.hidden=false;
    }
}

getData();
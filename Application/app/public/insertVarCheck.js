document.getElementById("button").addEventListener('click', e => {
    e.preventDefault();
    const homeTeam = document.getElementById("homeTeam");
    const awayTeam = document.getElementById("awayTeam");
    const matchDate = document.getElementById("matchDate");
    const time = document.getElementById("time");
    const description = document.getElementById("description");
    const involvedTeam = document.getElementById("involvedTeam");
    const competition = document.getElementById("competition");
    const season = document.getElementById("season");
    const used = document.getElementById("used");
    const type = document.getElementById("type");
    const url = "/api/application/insertdata";
    const data = {
        "HomeTeam": homeTeam.value,
        "AwayTeam": awayTeam.value,
        "MatchDate": matchDate.value,
        "Time": time.value,
        "Description": description.value,
        "InvolvedTeam": involvedTeam.options[involvedTeam.selectedIndex].value,
        'Competition': competition.value,
        "Season": season.value,
        "Used": used.options[used.selectedIndex].value,
        "Type": type.options[type.selectedIndex].value
    };
    const request = {
        headers: {
            'content-type': 'application/json'
            },
            body:JSON.stringify(data),
            method:"POST"
            };
    fetch(url,request).then(data=>{return JSON.stringify(data)})
    .then(res =>{
        if(res.status == 401) {
            alert("non sei loggato");
        } else {
            alert("operazione completata");
        }
    }).catch(err =>{alert(err);});
});
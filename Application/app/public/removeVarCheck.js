document.getElementById("deleteButton").addEventListener("click", async e => {
    const select = document.getElementById("list");
    const url ="/api/application/deletedata/"+select.options[select.selectedIndex].value;
    const request = {
        headers: {
            "content-type" : "application/json"
        },
        method:"DELETE"
    };
    fetch(url,request).then(res =>{
        if(res.status === 404) {
            alert("problema");
        } else if(res.status == 401) {
            alert("operazione fallita");
        } else {
            alert("operazione completata");
        }
    }).catch(err =>{alert(err);});
});
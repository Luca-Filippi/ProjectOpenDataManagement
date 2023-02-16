document.getElementById("button").addEventListener("click", async e => {
    e.preventDefault;
    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const birthDate = document.getElementById("birthdate");
    const username = document.getElementById("un");
    const password = document.getElementById("pass");
    const data = {
        "name": name.value,
        "surname": surname.value,
        "birthDate": birthDate.value,
        "username": username.value,
        "password": password.value
    };
    const url ="/api/application/adduser";
    const request = {
        headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify(data),
        method:"POST"
    };
    await fetch(url,request);
});
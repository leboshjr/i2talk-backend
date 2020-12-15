var signInForm = document.getElementById('signin-form');
var errorMessages = document.getElementById("error-login");

signInForm.addEventListener('submit', (e) => {
    const login = document.getElementById("login").value;
    const password = document.getElementById("_password").value;
    var data = {
        login,
        password
    };
    // console.log(JSON.stringify(data));
    fetch('http://localhost:3000/api/users/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }).then((response) => {
        if (response.status === 401){
            errorMessages.style.display = "Block";
            errorMessages.innerHTML = `<b>Invalid Credentials</b>`;
        } else {
            response.json().then((data) => {
            console.log(data)
            localStorage.setItem("token", JSON.stringify(data));
              window.location.assign("/dashboard");
          }) ;
        }
      }).catch(function(error) {
        console.log('Request failed', error)
    });
    e.preventDefault();
  });

  
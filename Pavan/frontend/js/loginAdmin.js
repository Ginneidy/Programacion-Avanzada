btn = document.getElementById('submit')
function redireccionar() { window.location = "./layout6.html"; }
window.localStorage;

const validate = () => {

    email = document.getElementById('email').value
    password = document.getElementById('password').value
    if (!email || !password) {
        alert('Todos los campos son obligatorios')
        return false
    }
    else {
        queryObj = {
            userEmail: email,
            userPassword: password,
        }
        path = "http://127.0.0.1:5000/loginAdmin"
        axios.post(path, queryObj).then(function (response) {
            var token = response.data.token
            console.log(token)
            if (token == 0){
                alert("Datos invalidos")
            }else{
                localStorage.setItem("token",token)
                setTimeout("redireccionar()", 1000)
            }

        })
            .catch(function (error) {
                alert("Error")
                console.log(error);
            });
        return false
    }
}

btn.addEventListener("click", validate)

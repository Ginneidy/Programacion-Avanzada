btn = document.getElementById('submit')
function redireccionar() { window.location = "./login.html"; }

const validate = () => {
    uname = document.getElementById('uName').value
    cc = document.getElementById('identification').value
    telephone = document.getElementById('telephone').value
    email = document.getElementById('email').value
    email = email.toUpperCase()
    department = document.getElementById('department').value
    city = document.getElementById('city').value
    address = document.getElementById('address').value
    password = document.getElementById('password').value
    if (!uname || !cc || !telephone || !email || !department || !city || !address || !password) {
        alert('Todos los campos son obligatorios')
        return false
    } else if (isNaN(cc)) {
        alert('Cedula invalida')
        return false;
    } else if (isNaN(telephone)) {
        alert('Telefono invalido')
        return false;
    }
    else {
        queryObj = {
            userName: uname,
            userDocument: cc,
            userTelephone: telephone,
            userEmail: email,
            userDepartment: department,
            userCity: city,
            userAddress: address,
            userPassword: password,
        }
        path = "http://127.0.0.1:5000/layout2"
        axios.post(path, queryObj).then(function (response) {
            alert("Registro completado, seras redireccionado a la pagina de inicio de sesión")
            setTimeout("redireccionar()", 1000);
        })
            .catch(function (error) {
                console.log(error);
            });
        return false
    }
}

btn.addEventListener("click", validate)

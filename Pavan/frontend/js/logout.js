btn = document.getElementById('logout')
function redireccionar() { window.location = "./index.html"; }
function redireccionarLogin() { window.location = "./login.html"; }
const logout = () => {
    token = localStorage.getItem('token')
    queryObj = {
        userToken: token
    }
    path = "http://127.0.0.1:5000/logout"
    axios.post(path, queryObj).then(function (response) {
        respuesta = response.data.result
        if (respuesta == 0){
            setTimeout("redireccionarLogin()", 1000)
        }else{
            setTimeout("redireccionar()", 1000)
        }
        
    })
        .catch(function (error) {
            alert("Error")
            console.log(error);
        });
    localStorage.setItem("token", 0)
}
btn.addEventListener("click", logout)
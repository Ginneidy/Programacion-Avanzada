token = localStorage.getItem('token')
console.log(token)
const validate = () =>{
    queryObj = {
        userToken: token,
    }
    path = "http://127.0.0.1:5000/tokenValidate"
    axios.post(path, queryObj).then(function (response) {
        validateVar = response.data.result
        if(validateVar == 0){
            localStorage.setItem("token", 0)
            window.location.href = "./index.html"
        }
    })
        .catch(function (error) {
            alert("Error")
            console.log(error);
        });
} 
if (token == 0) {
    window.location.href = "./index.html"
    localStorage.setItem("token", 0)
}else{
    validate()
}


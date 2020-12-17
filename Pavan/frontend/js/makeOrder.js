
function changeImg(product) {
    console.log(product)
    document.getElementById(product + "2").src = "./assets/img/Productos/" + product + ".jpeg"
}

const add = (e) => {
    product = e.id
    units = document.getElementById(product + "1").value
    token = localStorage.getItem('token')
    queryObj = {
        userToken: token,
        userProduct: product,
        productUnits: units
    }
    path = "http://127.0.0.1:5000/makeOrder"
    axios.post(path, queryObj).then(function (response) {
        document.getElementById(product + "2").src = "./assets/img/agregado.png"
        setTimeout("changeImg(product)", 500)
    })
        .catch(function (error) {
            alert("Error")
            console.log(error);
        });

}

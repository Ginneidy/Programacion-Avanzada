const addProduct = () => {
    product = document.getElementById('codProduct').value
    units = document.getElementById('codUnits').value
    codUser = localStorage.getItem('codUser')
    console.log(codUser)
    queryObj = {
        userCod: codUser,
        userProduct: product,
        productUnits: units
    }
    path = "http://127.0.0.1:5000/add_product"
    axios.post(path, queryObj).then(function (response) {
        console.log(response)
        if (response.data.result == 0) {
            alert("El producto con este código no existe")
        } else {
            alert("Producto agregado")
            location.reload()
        }
    })
        .catch(function (error) {
            alert("Error")
            console.log(error);
        });
}

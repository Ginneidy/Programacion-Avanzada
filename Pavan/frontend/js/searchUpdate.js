btn = document.getElementById('search')
window.localStorage
const delete_order = () => {
    codUser = document.getElementById('codUser').value
    if (!codUser) {
        document.getElementById('userInfo').innerHTML = "<h2>Ingerese un código</h2>"
    } else {
        queryObj = {
            userCod: codUser,
        }
        path = "http://127.0.0.1:5000/search_order"
        axios.post(path, queryObj).then(function (response) {
            localStorage.setItem('codUser', codUser)
            result = response.data.result
            data = response.data.data
            units = 0
            if (data.length > 0 && result.length > 0) {
                document.getElementById('userInfo').innerHTML = '<label for="userId" class="update-lb">Código del producto</label>' +
                    '<input type="text" id="codProduct" class="update-input">' +
                    '<label for="userId" class="update-lb">Cantidad</label>' +
                    '<input type="number"  min="1" id="codUnits" class="update-input" value="1">' +
                    '<button class="user-order-btn" id="add" onclick="addProduct()">Agregar</button>'
            } else if (data.length > 0 && result.length == 0) {
                document.getElementById('userInfo').innerHTML = '<label for="userId" class="update-lb">Código del producto</label>' +
                    '<input type="text" id="codProduct" class="update-input">' +
                    '<label for="" class="update-lb">Cantidad</label>' +
                    '<input type="number"  min="1" id="codUnits" class="update-input" value="1">' +
                    '<button class="user-order-btn" id="add" onclick="addProduct()" >Agregar</button>'
            } else {
                document.getElementById('userInfo').innerHTML = '<h2>Este usuario no existe</h2>'
            }
        })
            .catch(function (error) {
                alert("Error")
                console.log(error);
            });
    }

}

btn.addEventListener("click", delete_order)
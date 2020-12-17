btn = document.getElementById('search')
window.localStorage

const consult = () => {
    document.getElementById('userInfo').innerHTML = ""
    codUser = localStorage.getItem('codUser')
    queryObj = {
        userCod: codUser,
    }
    path = "http://127.0.0.1:5000/admin_consult"
    axios.post(path, queryObj).then(function (response) {
        products = response.data.products
        contador = 0
        if (products == 0) {
            document.getElementById('userInfo').innerHTML = "<h2>El usuario no tiene productos agregados</h2>"
        } else {
            img = []
            description = []
            units = []
            total = []
            for (let i = 0; i < products.length; i++) {
                img.push(products[i][0])
                units.push(products[i][1])
                description.push(products[i][2])
                total.push(products[i][3])
            }
            img.forEach(element => {
                document.getElementById('userInfo').innerHTML += '<div>' +
                    '<div class="purchase-product">' +
                    '<img class="purchase-img" src="./assets/img/Productos/' + element + '.jpeg" alt="">' +
                    '</div>' +
                    '<div class="purchase-info">' +
                    '<p class="purchase-description">' + description[contador] + '</p>' +
                    '<p class="purchase-units">Unidades:' + units[contador] + '</p>' +
                    '<p class="purchase-price">' + total[contador] + '</p>' +
                    '</div>' +
                    '</div>'
                contador++
            });

        }
    })
        .catch(function (error) {
            alert("Error")
            console.log(error);
        });
}

const consult_order = () => {
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
                consult()
                return false
            } else if (data.length > 0 && result.length == 0) {
                document.getElementById('userInfo').innerHTML = '<h2>Este usuario no tiene productos agregados</h2>'
            }
            else {
                document.getElementById('userInfo').innerHTML = '<h2>Este usuario no existe</h2>'
            }
        })
            .catch(function (error) {
                alert("Error")
                console.log(error);
            });
    }

}

btn.addEventListener("click", consult_order)
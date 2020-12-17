
const consult = () => {
    token = localStorage.getItem('token')
    queryObj = {
        userToken: token,
    }
    path = "http://127.0.0.1:5000/consult"
    axios.post(path, queryObj).then(function (response) {
        products = response.data.products
        contador = 0
        if (products == 0) {
            document.getElementById('purchase').innerHTML += "<h2>No tienes productos agregados</h2>"
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
                document.getElementById('purchase').innerHTML += '<div>' +
                    '<div class="purchase-product">' +
                    '<img class="purchase-img" src="./assets/img/Productos/' + element + '.jpeg" alt="">' +
                    '</div>' +
                    '<div class="purchase-info">' +
                    '<p class="purchase-description">' + description[contador] + '</p>' +
                    '<p class="purchase-units">Unidades:'+units[contador]+'</p>'+
                    '<p class="purchase-price">' + total[contador] + '</p>' +
                    ' <button class="purchase-btn" id="'+element+'" onclick="deleteProduct(this)">Eliminar</button>' +
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
consult()

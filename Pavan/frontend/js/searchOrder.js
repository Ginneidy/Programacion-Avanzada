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
            result = response.data.result
            data = response.data.data
            units = 0
            if (data.length > 0 && result.length > 0){
                localStorage.setItem('codUser', codUser)
                result.forEach(element => {
                    units += parseInt(element)
                });
                document.getElementById('userInfo').innerHTML = '<div  class="user-data">'+
                '<div class="data">'+
                    '<p>Usuario: '+codUser+'</p>'+
                    '<p> Nombre: '+data[0][0]+'</p>'+
                    '<p>Cedula: '+data[0][1]+'</p>'+
                    '<p>Articulos en su pedido: '+units+'</p>'+
                '</div>'+
                '<div class="delete">'+
                    '<button id="delete-order-btn"  onclick="delete_user_order()" class="delete-btn">Eliminar este pedido</button>'+
                '</div>'+
            '</div>'
            } else if(data.length > 0 && result.length == 0){
                document.getElementById('userInfo').innerHTML = '<h2>Este usuario no tiene ningun pedido agregado</h2>'
            } else{
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
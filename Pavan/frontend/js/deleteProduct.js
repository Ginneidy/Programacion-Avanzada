const deleteProduct = (e) => {
    product = e.id
    token = localStorage.getItem('token')
    queryObj = {
        userToken: token,
        userProduct: product,
    }
    path = "http://127.0.0.1:5000/consult_delete"
    axios.post(path, queryObj).then(function (response) {
        location.reload()
        console.log(response)
    })
        .catch(function (error) {
            alert("Error")
            console.log(error);
        });
}
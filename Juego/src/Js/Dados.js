function lanzarDado1(){
	var num = Math.random();
	var num2 = num*6;
	var dado = Math.ceil(num2);
	if (dado === 1){
		document.getElementById("Dado1").innerHTML='<img src="assest/img/Dado1.png"/>'
	}else if (dado === 2){
		document.getElementById("Dado1").innerHTML='<img src="assest/img/Dado2.png"/>'
	}else if (dado === 3){
		document.getElementById("Dado1").innerHTML='<img src="assest/img/Dado3.png"/>'
	}else if (dado === 4){
		document.getElementById("Dado1").innerHTML='<img src="assest/img/Dado4.png"/>'
	}else if (dado === 5){
		document.getElementById("Dado1").innerHTML='<img src="assest/img/Dado5.png"/>'
	}else if (dado === 6){
		document.getElementById("Dado1").innerHTML='<img src="assest/img/Dado6.png"/>'
	}
	}
function lanzarDado2(){
	var num = Math.random();
	var num2 = num*6;
	var dado = Math.ceil(num2);
	if (dado === 1){
		document.getElementById("Dado2").innerHTML='<img src="assest/img/Dado1.png"/>'
	}else if (dado === 2){
		document.getElementById("Dado2").innerHTML='<img src="assest/img/Dado2.png"/>'
	}else if (dado === 3){
		document.getElementById("Dado2").innerHTML='<img src="assest/img/Dado3.png"/>'
	}else if (dado === 4){
		document.getElementById("Dado2").innerHTML='<img src="assest/img/Dado4.png"/>'
	}else if (dado === 5){
		document.getElementById("Dado2").innerHTML='<img src="assest/img/Dado5.png"/>'
	}else if (dado === 6){
		document.getElementById("Dado2").innerHTML='<img src="assest/img/Dado6.png"/>'
	}
	}        
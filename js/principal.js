listaEjercicios = [
	{
		"nombre" : "Press de banca",
        "dificultad" : "Dificultad media",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!",
        "imagen" : "./img/Sentadillas.jpg",
        "repeticiones": "0"
		
	},
	{
		"nombre" : "Sentadillas",
        "dificultad" : "Dificultad media",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!",
        "imagen" : "./img/Sentadillas.jpg",
        "repeticiones": "0"

	},
	{
		"nombre" : "Remo en polea",
        "dificultad" : "Dificultad media",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!",
        "imagen" : "./img/RemoPolea.jpg",
        "repeticiones": "0"

	},
	{
		"nombre" : "Remo en polea II",
        "dificultad" : "Dificultad media",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!",
        "imagen" : "./img/RemoPolea.jpg",
        "repeticiones": "0"
	}
	];

	var nombre_ejercicio_seleccionado; 

	function openForm() {
	  document.getElementById("myForm").style.display = "block";
	}

	function closeForm() {
	  document.getElementById("myForm").style.display = "none";
	}

	function agregar_repeticiones()
	{
		var ejerciciosElegidos;
		if (JSON.parse(localStorage.getItem("listaEjerciciosElegidos")) ){
			ejerciciosElegidos = JSON.parse(localStorage.getItem("listaEjerciciosElegidos"));
			}
		else {
			ejerciciosElegidos = [];
		}
		var repeticiones = document.getElementById("repeticiones").value
		document.getElementById("repeticiones").value = "";
		console.log("las repeticiones son " + repeticiones);
		closeForm(); 

		var result = $.grep(listaEjercicios, function(ejercicio){ return ejercicio.nombre == nombre_ejercicio_seleccionado; });
		var ejercicioEncontrado = result[0];
		ejercicioEncontrado["repeticiones"] = repeticiones; 
		ejerciciosElegidos.push(ejercicioEncontrado);
		localStorage.setItem('listaEjerciciosElegidos',JSON.stringify(ejerciciosElegidos));
	}

function mostrarEjercicios() {

	var ejerciciosElegidos;
	
	if (JSON.parse(localStorage.getItem("listaEjerciciosElegidos")) ){
		ejerciciosElegidos = JSON.parse(localStorage.getItem("listaEjerciciosElegidos"));
	}
	else {
		ejerciciosElegidos = [];
	}

	listaEjercicios.forEach(function(ejercicio){

		var texto ='<div class="col-lg-6 portfolio-item"><div class="card h-100"><button class="open-button ejercicio" data-nombre="'+ ejercicio.nombre+'"onclick="openForm()">Agregar Ejercicio a la Tabla de Entrenamiento</button><a><img class="ejercicio card-img" src="'+ ejercicio.imagen +'" alt=""></a><div class="card-body"> <h4 class="card-title"><a>"'+ejercicio.nombre +'"</a></h4><p class="card-text">"'+ejercicio.descripcion+'"</p></div></div> </div>';
		$('#listadoEjercicios').append(texto);
	});
	$('.ejercicio').on('click', function(){
        nombre_ejercicio_seleccionado = $(this).data("nombre");;
	})
}
function mostrarListaEjercicios(){

	var ejerciciosElegidos = JSON.parse(localStorage.getItem("listaEjerciciosElegidos"));
	mostrarejerciciospersonalizados(ejerciciosElegidos);
}

function mostrarejerciciospersonalizados(ejercicios) {
    var ejerciciosElegidos = ejercicios;
    console.log("hay un total de " + ejerciciosElegidos.length);
	ejerciciosElegidos.forEach(function(ejercicio){
		var texto = '<div class="col-md-6 ejercicioelegido">"'+'"<img class="img-fluid" src="'+ejercicio.imagen+'"></div><div class="col-md-6"><h3 class="my-3">"'+ejercicio.nombre+'"</h3><h5 class="my-3">'+ ejercicio.dificultad +' ('+ejercicio.repeticiones+' Repeticiones)</h5><p>"'+ejercicio.descripcion+'"</p><div><button type="button" class="borrar btn btn-dark" data-nombre="'+ ejercicio.nombre + '">Eliminar</button></div></div><hr>'
		$('#listadoEjerciciosPersonalizados').append(texto);

	});
	$('.borrar').on('click', function(){
		var borrarEjercicio = $(this).data("nombre");
		var result = $.grep(ejerciciosElegidos, function(ejercicio){ return ejercicio.nombre != borrarEjercicio; });
		ejerciciosElegidos = result;
		localStorage.setItem("listaEjerciciosElegidos", JSON.stringify(ejerciciosElegidos));
		$("#listadoEjerciciosPersonalizados").html("");
		mostrarejerciciospersonalizados(ejerciciosElegidos);
	});

}
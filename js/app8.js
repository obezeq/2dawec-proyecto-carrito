// Vaciando el carrito

//  *** Variables *** 
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []
const myStorage = window.localStorage;


//  *** Listeners *** 
cargarEventListeners()
function cargarEventListeners () {
    listaCursos.addEventListener('click', añadirCurso)
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []   // Vaciamos el array
        limpiarHTML()           // Limpiamos el HTML
    })
}


//  *** Funciones *** 

// Función para añadir cursos al carrito
function añadirCurso(e) {
    e.preventDefault()  
    if (e.target.classList.contains('agregar-carrito')) {  
        const curso = e.target.parentElement.parentElement 
        console.log(curso);
        leerDatosCurso(curso)
    }
 }

 // Elimina cursos del carrito
 function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId)
        carritoHTML(articulosCarrito)
    }
 }

 const saveArticulosCarrito = (articulosCarrito) => {
    let storageArticulosCarrito = localStorage.getItem("articulosCarrito")
    let myArticulosCarrito = storageArticulosCarrito ? JSON.parse(storageArticulosCarrito) : [];

    if (myArticulosCarrito) {
        /*
        Ya tenemos articulos en el carrito del localStorage entonces tenemos que 
        obtenerlos para luego hacer un push con los nuevos articulos que queremos añadir
        */

        let myArticulosCarrito = JSON.parse(storageArticulosCarrito);
        myArticulosCarrito = [...myArticulosCarrito, ...articulosCarrito]
        localStorage.setItem("articulosCarrito", JSON.stringify(myArticulosCarrito));

    } else {
        // Nunca ha añadido nada al localStorage => cargamos directamente el Array articulosCarrito

        // let myArticulosCarrito = Array.of(articulosCarrito);
        localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));
    }

 }

 // Lee la información del curso seleccionado.
 function leerDatosCurso(curso) {
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad ++
                console.log(curso)
                return curso 
            } else {
                console.log(curso)
                return curso
            }
        })
        articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    saveArticulosCarrito(articulosCarrito)
    carritoHTML(articulosCarrito)
 }

 const getArticulosCarrito = () => {
    const storageArticulosCarrito = Array.of(localStorage.getItem("articulosCarrito"));
    return storageArticulosCarrito;
 }

 // Muestra el carrito de compras en el HTML
 function carritoHTML() {
    limpiarHTML()
    let storageArticulosCarrito = getArticulosCarrito();
    storageArticulosCarrito.forEach((curso) => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td> 
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
            `
        contenedorCarrito.appendChild(row)
    })
 }

 // Función para limpiar el HTML (elimina los cursos del tbody)
 function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.firstChild.remove()
    }
 }

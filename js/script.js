// variables 
const btnCarrito = document.querySelector('.boton-carrito')
const producto = document.querySelector('.producto')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const productos = document.querySelector('#lista-cursos')
const comprarTodo = document.querySelector('#comprar-todo')
const vaciarCarrito = document.querySelector('#vaciar-carrito')

let articulosCarrito = [];



cargarAddEventListeners()

function cargarAddEventListeners() {

productos.addEventListener('click', agregarCarrito)

vaciarCarrito.addEventListener('click', vaciandoCarrito)

carrito.addEventListener('click', eliminarCurso)

comprarTodo.addEventListener('click', comprarTodoCarrito)

}





function agregarCarrito(e) {
    if (e.target.classList.contains('boton-carrito')) {
         const cursoSeleccionado = e.target.parentElement.parentElement


         leerDatosCurso(cursoSeleccionado)
    }

}



function vaciandoCarrito(){
     articulosCarrito = []
     limpiarHtml()
}



function leerDatosCurso(curso){

 const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').innerText,
    precio: curso.querySelector('p').innerText,
    id: curso.querySelector('button').getAttribute('data-id'),
    cantidad: 1
 }


const existe = articulosCarrito.some(curso=> curso.id==infoCurso.id)
if(existe){ 
    
     const cursos = articulosCarrito.map(curso => {
          if(curso.id==infoCurso.id){
               curso.cantidad++;
               return curso;
     
          }else {
               return curso;
          }
     })
    articulosCarrito = [...cursos]
} else {
     articulosCarrito = [...articulosCarrito, infoCurso]
}

 carritoHtml()

}


function eliminarCurso(e){
     if(e.target.classList.contains('borrar-curso') ){
          const cursoId = e.target.getAttribute('data-id')

          // elimina del arreglo de Articulos carrito por id
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId )
  
          carritoHtml()
     }
}


function comprarTodoCarrito(){
     const Toast = Swal.mixin({
          toast: true,
          position: 'top-end-left',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
  
          }
        })
        
        Toast.fire({
          icon: 'question',
          title: `Realizando compra Espere`
      
        })


        // notificacion de la compra
    setTimeout (() => {
     Toastify({
     text: "Compra Realizada con Exito",
     duration: 3000,
     destination: "https://github.com/apvarun/toastify-js",
     newWindow: true,
     gravity: "top", 
     position: "center", 
     stopOnFocus: true, 
     style: {
       background: "linear-gradient(to right, #00b09b, #96c93d)",
     },
     onClick: function(){

     } // Callback after click
   }).showToast();
   vaciandoCarrito()
 },2500)


}



function carritoHtml() {

    limpiarHtml()
     articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML =
         `<td><img src="${curso.imagen}"  class='imagen-carrito'</td>
         <td >${curso.titulo} </td>
         <td class='centrar'>${curso.precio} </td>
         <td class='centrar'>${curso.cantidad}</td>
         <td> 
         <button class="borrar-curso" data-id= '${curso.id}'> X </button></td>
         `
           
         contenedorCarrito.appendChild(row)
     })

}


function limpiarHtml(){
     contenedorCarrito.innerHTML = ''
}
//capturas DOM
let divProductos = document.getElementById("productos")
let btnGuardarCarta = document.getElementById("guardarCartaBtn")
let buscador = document.getElementById("buscador")
let btnVerCatalogo = document.getElementById("verCatalogo")
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let divCompra = document.getElementById("precioTotal")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

let productosEnCarrito = JSON.parse(localStorage.getItem("coleccion")) || []
console.log(productosEnCarrito)




//FUNCTIONS
function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let cartas of array){
        let nuevaCarta = document.createElement("div")
        nuevaCarta.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")
        nuevaCarta.innerHTML = `<div id="${cartas.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 400px;"src="${cartas.images.small}" alt="${cartas.name} de ${cartas.set.name}">
                                    <div class="card-body">
                                        <h4 class="card-title">${cartas.name}</h4>
                                        <p>Expansion: ${cartas.set.name}</p>
                                        <p class="${cartas.cardmarket.prices.averageSellPrice <= 2000 ? "ofertaColor" : "precioComun"}">Precio: ${cartas.cardmarket.prices.averageSellPrice}</p>
                                    <button id="agregarBtn${cartas.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
    </div>`
        divProductos.appendChild(nuevaCarta)
        let btnAgregar = document.getElementById(`agregarBtn${cartas.id}`)
        
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(cartas)
        })
    }

}

//function AGREGAR AL CARRITO
function agregarAlCarrito(cartas){
    console.log(cartas)
    //Primer paso
    productosEnCarrito.push(cartas)
    console.log(productosEnCarrito)
    localStorage.setItem("coleccion", JSON.stringify(productosEnCarrito))
    
    
    //SweetAlert para agregar al carrito
    Swal.fire({
        position: `top`,
        title: "Ha agregado producto",
        icon: `success`,
        confirmButtonText:`entendido`,
        confirmButtonColor:"green",
        timer: 3000,
        text:`La carta ${cartas.name} de la expansión ${cartas.set.name} fue agregada!`,
        imageUrl:`${cartas.images.small}`,
        imageHeight: 400,
        imageAlt: `${cartas.name} de ${cartas.set.name}`
    })
}
//function IMPRIMIR en modal
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="${productoCarrito.images.small}" alt="${productoCarrito.name}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.name}</h4>
                
                    <p class="card-text">$${productoCarrito.cardmarket.prices.averageSellPrice}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        //capturo elemento del DOM sin guardarlo en variable
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
           
           //Eliminar del DOM
           let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
           cardProducto.remove()
           //Eliminar del array de comprar
           let productoEliminar = array.find(carta => carta.id == productoCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion, 1)
           //productosEnCarrito.splice(indice, 1) 
           console.log(productosEnCarrito)
           //productosEnCarrito.splice(indice, 1) 
           console.log(productosEnCarrito)
           //Eliminar del storage
           localStorage.setItem('coleccion', JSON.stringify(productosEnCarrito))
           //vuelvo a calcular el total
           compraTotal(array)
        })
    })
    compraTotal(array)
}

//FUNCION QUE CALCULA EL TOTAL
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=>acc + productoCarrito.cardmarket.prices.averageSellPrice,0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `EL total de su carrito es ${acumulador}`
}



//Functions ordenar stock
function ordenarMayorMenor(array){
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a,b) => (b.cardmarket.prices.averageSellPrice - a.cardmarket.price.averageSellPrice))
    console.log(array)
    console.log(mayorMenor)
    mostrarCatalogo(mayorMenor)
 }
 function ordenarMenorMayor(array){
 let menorMayor = [].concat(array)
    menorMayor.sort((a,b) => (a.cardmarket.price.averageSellPrice - b.cardmarket.price.averageSellPrice))
    console.log(array)
    console.log(menorMayor)
    mostrarCatalogo(menorMayor)
 }
 function ordenarAlfabeticamente(array){
     let alfabeticamente = array.slice()
     alfabeticamente.sort((a,b) => {
     if(a.name < b.name)return -1
     if(a.name > b.name)return 1
     return 0
    })
    console.log(array)
    console.log(alfabeticamente)
    mostrarCatalogo(alfabeticamente)
 }



//FUNCION AGREGAR: 
function cargarCarta(array){
    //captura y utilización de input para crear nuevo objeto
    let inputCarta = document.getElementById("cartaInput")  
    let inputExpansion = document.getElementById("expansionInput")
    let inputPrecio = document.getElementById("precioInput")
    
    let cartaCreada = new Carta(array.length+1, inputExpansion.value, inputCarta.value, parseInt(inputPrecio.value), "media/cartaNueva.jfif")//CARGAR IMAGEN CARTANUEVA
    //Objeto creado lo pusheo al array
    array.push(cartaCreada)
    //TAMBIÉN MODIFICAMOS ARRAY DEL STORAGE:
    localStorage.setItem("coleccion", JSON.stringify(array))
    mostrarCatalogo(array)
    
    inputExpansion.value = ""
    inputCarta.value = ""
    inputPrecio.value =""

    //toastify
    Toastify({
        text:"Tu carta fue agregada a la expansion!!!",
        duration: 6000,
        //propiedades para posicionar
        gravity: "bottom", //top o botom
        position:"center", //left, right, center
        style: {
            background:"green",
            color: "black",
            gradient: "",

        } 
        .onclick
    }).showToast()
}

//function buscador que se activa con evento change del input para buscar
function buscarInfo(buscado, array){
    let busqueda = array.filter(
        (carta) => carta.expansio.toLowerCase().includes(buscado.toLowerCase()) || carta.carta.toLowerCase().includes(buscado.toLowerCase())
        // Coincidencias sin includes (libro) => libro.autor.toLowerCase() == buscado.toLowerCase() || libro.titulo.toLowerCase() == buscado.toLowerCase()
    )
    
    
    busqueda.length == 0 ? 
    (coincidencia.innerHTML = `<h3 class="text-success m-2">No se encontro lo que buscabas! Te mostramos toda la coleccion por si la encontras!!!</h3>`, mostrarColeccion(array)) 
    : (coincidencia.innerHTML = "", mostrarColeccion(busqueda))
}








btnGuardarCarta.addEventListener("click", ()=>{cargarCarta(coleccion)})
buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, coleccion)})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(coleecion)
    }else if (selectOrden.value == 2){
        ordenarMenorMayor(coleccion)
    }else if (selectOrden.value == 3){
        ordenarAlfabeticamente(coleccion)
    }else{
        mostrarColeccion(coleccion)
    }
}) 
botonFinalizarCompra.addEventListener("click",()=>{
    finalizarCompra()
})
function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: 'green',
            text: `Muchas gracias por su compra ha adquirido nuestros productos. `,
            })
            //resetear o llevar a cero el array de carrito
            //Tenemos que researtearlo tanto al array como al localStorage
            productosEnCarrito =[]
            localStorage.removeItem("carrito")
        }else{
            //Va a entrar cuando ponga
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    })
} 

setTimeout(()=>{
    loaderTexto.innerHTML = ""
    loader.remove()
    mostrarCatalogo(coleccion)

}, 3000)

mostrarCatalogo(coleccion)
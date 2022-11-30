
/*let divProductos = document.getElementById("productos")*/
fetch(`https://api.pokemontcg.io/v2/cards//?key=e2dff93f-b5da-4200-aab4-dd5c0d760cb4`)
.then((res)=>res.json())
.then((data)=>{

    //DISPONIBLE I
    console.log(data.data)
    for(let cartas of data.data){
        console.log(cartas)
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

})
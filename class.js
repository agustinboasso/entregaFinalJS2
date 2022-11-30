
class Carta {
    constructor(id, expansion, carta, precio, imagen){
        
        this.id = id,
        this.expansion = expansion,
        this.carta = carta,
        this.precio = precio,
        this.imagen = imagen

    }
   
    mostrarData(){
        console.log(`La carta ${this.carta}, de la expansión ${this.expansion} vale ${this.precio}`)
    }
}




/*const carta1 = new Carta(1,"Base Set","Charizard", 3000, "./media/ChariBaseSet.jfif")

const carta2 = new Carta(2,"Aquapolis","Charizard Crytstal Type", 4500, "./media/ChariCrystal.jfif")

const carta3 = new Carta(3,"Team Rocket", "Dark Vileplume", 600, "./media/DarkVileplume.jfif")

const carta4 = new Carta(4,"Base Set","Blastoise", 2500,"./media/BlastoiseBaseSet.jfif")

const carta5 = new Carta(5,"Base Set", "Venasaur", 1200,"./media/VenasaurBaseSet.jfif")

const carta6 = new Carta(6,"Team Rocket", "Dark Blastoise", 1500, "./media/DarkBlastoise.jfif")

const carta7 = new Carta(7,"Legendary Collection", "Zapdos Reverse Holo", 3500, "./media/ZapdosReverse.jfif")

const carta8 = new Carta(8,"Legendary Collection", "Charizard Reverse Holo", 5000, "./media/ChariReverse.jfif")

const carta9 = new Carta(9,"Base Set", "Pikachu", 200, "./media/PikaBaseSet.jfif") */





let coleccion = []

const cargarColeccion = async()=>{
    const response = await fetch(`https://api.pokemontcg.io/v2/cards//?key=e2dff93f-b5da-4200-aab4-dd5c0d760cb4`)
    const data = await response.json()
    console.log(data)
    for(let carta of data.data){
       let cartaNueva = new Carta(carta.id, carta.set, carta.name, carta.image, carta.tcgplayer)
       coleccion.push(cartaNueva)
    }
}
if(localStorage.getItem("coleccion")){
    coleccion = JSON.parse(localStorage.getItem("coleccion"))
}else{
    //Entra por primera -- setear el array el original
    console.log("Seteando el array por primera vez")
    cargarColeccion()
    console.log(coleccion)
    localStorage.setItem("coleccion", JSON.stringify(coleccion))
}
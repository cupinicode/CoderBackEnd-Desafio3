// Inicio de la clase

const fs = require("fs"); //Importo la librería par manejo de archivos
const { json } = require("stream/consumers");

class ProductManager{

    products; // Array de productos
    path;
    static id = 0; // Variable estática de la clase

    constructor(ruta) {
        this.products = []; // Al instanciar un objeto de esta clase, inicializo el array de productos
        this.path = ruta; 
    }
    
    leerArchivo() { //Metodo de la clase que lee el archivo JSON y lo almacena en el array
        this.products = [] //Inicializo el array
        try{
            this.products = JSON.parse(fs.readFileSync(this.path)) //Leo el archivo JSON y lo cargo en el array de objetos
        }
        catch (error){  //Capturo el error (por ej, el archivo aun no existe)
            ProductManager.id=0 //Preparo el ID para cuando agregue el primer elemento 
            return
        }
        if (this.products.length > 0) //Controlo que el archivo JSON contenga al menos 1 objeto
            ProductManager.id = this.products[this.products.length - 1].id + 1 // Tomo el ultimo ID que figura en el archivo...
    }                                                         // ... como base para el nuevo ID, en caso de agregar un producto
    
    grabarArchivo = () => { //Método de la clase que graba el array en el archivo
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        }
        catch{
            console.log((error) ? `Error al escribir el archivo ${this.path}` : `Archivo ${this.path} grabado correctamente`)
        }
    }
    
    addProduct(producto){ // Metodo para agregar un producto
        this.leerArchivo();
        if (this.products.find((prod) => prod.code === producto.code)) { //COntrolo que el CODE no exista en los objetos ya ingresados
            console.log(`El código ${producto.code} ya existe.  No se incluirá el producto en la lista`)
            return
        }
        producto.id = ProductManager.id; //Asigno el ID del producto, tomandolo desde la variable estatica
        this.products.push(producto); //Agrego el objeto al array de productos
        ProductManager.id++; // Invremento el ID, para prepararlo para el proximo producto a ingresar
        this.grabarArchivo() // Grabo el array en el archivo
    }
        
    getProducts() { // Método que lee el archivo, lo carga en un array y devuelve el array con todos los objetos ingresados hasta el momento
        this.leerArchivo();
        return this.products // Retorno el array completo
    }
    
    getProductById(id){ // Método que recibe por parámetro un ID, lee el archivo, lo carga en un array, busca el id y devuelve el producto
        this.leerArchivo();
        let encontrado = this.products.find((prod) => prod.id == id) // Lo busco entre los IDs de cada objeto del array
        if (!encontrado) { //Si no lo encuentro ...
            console.log("Not found"); // ... muestro el error por consola
            return "" // salgo del método, retornando CADENA VACIA (no está indicado en la consigna, pero entiendo que TODA función debe retornar un valor)
        }
        return encontrado // encontré el ID, por lo tanto retorno el objeto
    }

    updateProduct(id, nuevoDato){ //Recibo el ID del producto que debo modificar, junto con los nuevos datos
        this.leerArchivo();
        let encontrado = this.products.findIndex((x) => x.id === id)   // Lo busco entre los IDs de cada objeto del array
        if (encontrado === -1) { //Si no lo encuentro ...
            console.log("Not found"); // ... muestro el error por consola
            return "" // salgo del método, retornando CADENA VACIA (no está indicado en la consigna, pero entiendo que TODA función debe retornar un valor)
        }
        if (this.products.find((prod) => prod.code === nuevoDato.code)) { //COntrolo que el CODE no exista en los objetos ya ingresados
            console.log(`Modificación errónea. El código ${producto.code} ya existe.  Se descartará la modificación`)
            return
        }
        this.products[encontrado].title = nuevoDato.title                //Modifico el objeto corespondiente
        this.products[encontrado].description = nuevoDato.description    //con los nuevos datos
        this.products[encontrado].price = nuevoDato.price
        this.products[encontrado].thumbnail = nuevoDato.thumbnail
        this.products[encontrado].code = nuevoDato.code
        this.products[encontrado].stock = nuevoDato.stock
        this.grabarArchivo() // Grabo el archivo, para que impacten la modificacion
    }

    deleteProduct(id){ // Recibe el ID correspondiente al objeto a borrar
        this.leerArchivo();
        let encontrado = this.products.findIndex((x) => x.id === id)   // Lo busco entre los IDs de cada objeto del array
        if (encontrado === -1) { //Si no lo encuentro ...
            console.log("Not found"); // ... muestro el error por consola
            return "" // salgo del método, retornando CADENA VACIA (no está indicado en la consigna, pero entiendo que TODA función debe retornar un valor)
        }
        this.products.splice(encontrado,1) // Elimino el elemento del array usando el índice retornado por findIndex()
        this.grabarArchivo() // Actualizo el archivo
        return "El producto ha sido borrado"
    }
}

module.exports = ProductManager;

// Fin de la clase



// Código adicional utilizado para testear la clase

//let manag = new ProductManager("./productos.txt");
//console.log(manag.getProducts());
//manag.addProduct({title: "Pelapapas", description: "Pelapapas metalico de gran calidad", price: 255, thumbnail: "\ff\fdsd.jpg", code: "CD31", stock:34})
//console.log(manag.getProducts());
//manag.addProduct({title: "Cucharita", description: "Cucharita de cafe de calidad mejorable", price: 500, thumbnail: "\gg\gg.jpg", code: "CD31", stock:11})
//console.log(manag.getProducts());
//console.log(manag.getProductById(1))
//manag.updateProduct(1,{title: "Tenedor", description: "Descripcion modificada", price: 111, thumbnail: "d.jpg", code: "1", stock:1})
//console.log(manag.deleteProduct(0))
//console.log(manag.getProducts());

// Fin del código adicional

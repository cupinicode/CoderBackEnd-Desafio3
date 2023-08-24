const express = require("express"); //importo EXPRESS

const app = express() //Defino "app" como una instancia del módulo express

app.use(express.json())
app.use(express.urlencoded({extended : true})); //Para que el serivodr pueda procesar URLs con QUery Params

const ProductManager = require("./productManager.js") //Importo la clase ProductManager

const manag = new ProductManager("./productos.txt") // Creo una instancia de la clase ProductManager 


app.get('/products', (req, res) => { //endpoint
    const limit = req.query.limit
    const products = manag.getProducts()//Llamo al método de ProductManager que lee el archivo, me devuelve todos los productos y lo cargo en un array
    if (limit) { // Verifico si recibí el parámetro limit 
        return res.send(products.slice(0, parseInt(limit, 10))) // extrae los primeros "n" elementos del array
    } // (el return está para obligar a salir de la función)
    res.send(products)
})

app.get('/products/:pid', (req, res) => {  //endpoint
    const pid = parseInt(req.params.pid,10)
    res.send(manag.getProductById(pid)) //Devuelvo el primer producto con la ID pasada por parametro a la ruta
})

app.listen(8080, () => console.log("Servidor escuchando en puerto 8080"))
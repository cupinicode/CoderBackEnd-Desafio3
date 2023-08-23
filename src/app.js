const express = require("express");

const app = express() //Defino "app" como una instancia del módulo express

app.use(express.json())
app.use(express.urlencoded({extended : true})); //Para que el serivodr pueda procesar URLs con QUery Params

const ProductManager = require("./productManager.js")

const manag = new ProductManager("./productos.txt") // Creo una instancia de la clase ProductManager 

const products = manag.getProducts()//Llamo al método de ProductManager que lee el archivo, me devuelve todos los productos y lo cargo en un array

app.get('/products', (req, res) => {
    const limit = req.query.limit
    if (limit) { // Verifico si recibí el parámetro limit en un query param
        return res.send(productos.slice(0, parseInt(limit, 10))) // extrae los primeros "n" elementos del array
    } // (el return está para obligar a salir de la función)
    res.send(products)
})

app.get('/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid,10)
    const prod = products.find(({ id }) => id === pid) //Uso desestructuración de objetos para obtener sólo el ID
    res.send(prod) //Devuelvo el primer producto con la ID pasada por parametro a la ruta
})

app.listen(8080, () => console.log("Servidor escuchando en puerto 8080"))
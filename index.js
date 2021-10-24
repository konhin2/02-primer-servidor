// Importar http para crear el servidor y crear metodos (GET, POST, PUT, DELETE)
const http = require('http')
// fs para leer un archivo html
const fs = require('fs')

// Convertir datos para lectura (modulo)
const qs = require('querystring')

// dotenv para las variables de entorno
require('dotenv').config()

// Crear servidor que cuardamos en una constante y nos devuelve una función en respuesta
const server = http.createServer(onRequest)

function onRequest(req, res) {
    console.log('se ha detectado una peticion')
    if(req.url == '/'){
        fs.readFile('index.html', (error, content) => {
            if (error){
                if(error.code == 'ENOENT'){
                    res.setStatur = 404
                    console.log('No se ha encontrado el archivo')
                } else {
                    res.setStatur = 500
                    console.log('Ha ocurrido un erro en el servidor')
                }
            } else {
                res.setStatur = 200
                res.setHeader('Content-type', 'text/html')
                res.write(content)
                res.end()
            }
        })
    } else if(req.url == '/users'){
        if (req.method == 'GET'){
            res.setStatur = 200
            res.setHeader('Content-type', 'text/html')
            res.write('Accediendo a usuarios')
            res.end()
        } else if (req.method == 'POST'){
            var datos = ''
            req.on('data', (d) => {
                datos += d
            })
            req.on('end', () => {
                const post = qs.parse(datos)
                res.end('Datos Recibidos ' + post.nombre)
            })
        } else if(req.method == 'PUT'){
            var datos = ''
            req.on('data', (d) => {
                datos += d
            })
            req.on('end', () => {
                const post = qs.parse(datos)
                res.end('Datos Recibidos ' + post.nombre)
            })
        } else if (req.method == 'DELETE'){
            var datos = ''
            req.on('data', (d) => {
                datos += d
            })
            req.on('end', () => {
                const post = qs.parse(datos)
                res.end('Datos Recibidos ' + post.nombre)
            })
        }
        
    }
    
}

server.listen(process.env.PORT, () => console.log(`Listen on port ${process.env.PORT}`))
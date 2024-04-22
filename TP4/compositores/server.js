// compositores_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }

    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if((req.url == '/')|| req.url == '/compositores'){
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                        .then(resp =>{
                        var compositores = resp.data 
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write(templates.compositoresListPage(compositores,d))
                        res.end()
                    })
                    .catch(erro=>{
                        res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write('<p>No fue posible conseguir lista compositores'+req.url + '</p>')
                        res.write('<p>'+ erro+'</p>')
                        res.end()
                    })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if (/\/compositores\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores/' + id)
                        .then(resp => {
                            compositor = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositorPage(compositor, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o compositor..." + erro + "</p>")
                            res.end()
                        })
                }

                
                // GET /compositor/registo --------------------------------------------------------------------
                else if(req.url == '/compositores/registo'){
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(templates.compositorFormPage(d))
                    res.end()
                }
               
                // GET /compositor/edit/:id --------------------------------------------------------------------

               else if(/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var id = req.url.split("/")[3]

                    axios.get('http://localhost:3000/compositores/' + id)
                        .then(resp => {
                            compositor = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositorFormEditPage(compositor, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o compositor..." + erro + "</p>")
                            res.end()
                        })

                }
                // GET /compositor/delete/:id --------------------------------------------------------------------
                else if(/\/compositores\/delete\/C[0-9]+/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + id)
                        .then(resp => {
                            res.writeHead(301, {'Location': 'http://localhost:7777/compositores'})
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível apagar o compositor..." + erro + "</p>")
                            res.end()
                        })
                }

                // GET /periodos --------------------------------------------------------------------
                else if(req.url == '/periodos'){
                    axios.get("http://localhost:3000/periodos?_sort=nome")
                        .then(resp =>{
                        var periodos = resp.data 
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write(templates.periodosListPage(periodos,d))
                        res.end()
                    })
                    .catch(erro=>{
                        res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write('<p>No fue posible conseguir lista periodos'+req.url + '</p>')
                        res.write('<p>'+ erro+'</p>')
                        res.end()
                    })
                }

                // GET /periodos/:id --------------------------------------------------------------------
                else if (/\/periodos\/P[0-9]+/.test(req.url)) {
                    var id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/periodos/' + id)
                        .then(resp => {
                            periodo = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodoPage(periodo, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o periodo..." + erro + "</p>")
                            res.end()
                        })
                }

                // GET /periodos/registo --------------------------------------------------------------------
                else if(req.url == '/periodos/registo'){
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }

                // GET /periodos/edit/:id --------------------------------------------------------------------

               else if(/\/periodos\/edit\/P[0-9]+/.test(req.url)){
                var id = req.url.split("/")[3]

                axios.get('http://localhost:3000/periodos/' + id)
                    .then(resp => {
                        periodo = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodoFormEditPage(periodo, d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o periodo..." + erro + "</p>")
                        res.end()
                    })

            }

            // GET /periodos/delete/:id --------------------------------------------------------------------
            else if(/\/periodos\/delete\/P[0-9]+/i.test(req.url)){
                var id = req.url.split("/")[3]
                axios.delete('http://localhost:3000/periodos/' + id)
                    .then(resp => {
                        res.writeHead(301, {'Location': 'http://localhost:7777/periodos'})
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível apagar o periodos..." + erro + "</p>")
                        res.end()
                    })
            }
                
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write('<p>Metodo Get no soportado:'+req.url + '</p>')
                    res.write('<p><a href = "/">Return</a></p>')
                    res.end()
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result =>{
                        if(result){
                            axios.post("http://localhost:3000/compositores",result)
                                .then(resp =>{
                                    console.log(resp.data)
                                    res.writeHead(302, {'Location': 'http://localhost:7777/compositores'});
                                    res.end()
                                })
                                .catch(erro =>{
                                    res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Não foi possível adicionar o compositor..." + erro + "</p>")
                                    res.end()
                                })

                        }else{
                            res.writeHead(503, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write('<p>No fue posible</p>')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        }
                    })

                }

                // POST /periodos/registo --------------------------------------------------------------------
                else if(req.url == '/periodos/registo'){
                    collectRequestBodyData(req, result =>{
                        if(result){
                            axios.post("http://localhost:3000/periodos",result)
                                .then(resp =>{
                                    console.log(resp.data)
                                    res.writeHead(302, {'Location': 'http://localhost:7777/periodos'});
                                    res.end()
                                })
                                .catch(erro =>{
                                    res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Não foi possível adicionar o periodo..." + erro + "</p>")
                                    res.end()
                                })

                        }else{
                            res.writeHead(503, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write('<p>No fue posible</p>')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        }
                    })

                }
                
                // POST /compositores/edit/:id --------------------------------------------------------------------

                else if(/\/compositores\/edit\/C[0-9]+$/i.test(req.url))
                    {   
                        collectRequestBodyData(req, result =>{
                            if(result){
                                console.log("======> " + result.id);
                                axios.put("http://localhost:3000/compositores/"+ result.id,result)
                                    .then(resp =>{
                                        console.log(resp.data)
                                        res.writeHead(302, {'Location': 'http://localhost:7777/compositores'});
                                        res.end()
                                    })
                                    .catch(erro =>{
                                        res.writeHead(506, {'Content-Type' : 'text/html;charset=utf-8'})
                                        res.write("<p>Erro no edit</p>")
                                        res.end()
                                    })
    
                            }else{
                                res.writeHead(506, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write('<p>No fue posible</p>')
                                res.write('<p>'+erro+'</p>')
                                res.end()
                            }
                        })
                    }

                // POST /compositores/edit/:id --------------------------------------------------------------------

                else if(/\/periodos\/edit\/P[0-9]+$/i.test(req.url))
                    {   
                        collectRequestBodyData(req, result =>{
                            if(result){
                                console.log("======> " + result.id);
                                axios.put("http://localhost:3000/periodos/"+ result.id,result)
                                    .then(resp =>{
                                        console.log(resp.data)
                                        res.writeHead(302, {'Location': 'http://localhost:7777/periodos'});
                                        res.end()
                                    })
                                    .catch(erro =>{
                                        res.writeHead(506, {'Content-Type' : 'text/html;charset=utf-8'})
                                        res.write("<p>Erro no edit</p>")
                                        res.end()
                                    })
    
                            }else{
                                res.writeHead(506, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write('<p>No fue posible</p>')
                                res.write('<p>'+erro+'</p>')
                                res.end()
                            }
                        })
                    }
                // POST ? -> Lancar um erro
                else{
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write('<p>Metodo Post no soportado:'+req.method + '</p>')
                    res.write('<p><a href = "/">Return</a></p>')
                    res.end()
                }
                break;
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                res.write('<p>Metodo no soportado:'+req.method + '</p>')
                res.end()
                break;
        }
    }
})

compositoresServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})




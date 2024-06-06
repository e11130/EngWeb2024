SetUp Db:
find y replace para las listas que eran string:
pasaAJsonBien
C:\Users\dario\Desktop\ENGWEB2024-Recurso\ex1>docker cp livros.json mongoEW:/tmp
C:\Users\dario\Desktop\ENGWEB2024-Recurso\ex1>docker exec -it mongoEW bash
root@6f578de68b5c:/# mongoimport -d livros -c livros /tmp/livros.json --jsonArray
2024-06-06T13:05:09.776+0000    connected to: mongodb://localhost/
2024-06-06T13:05:11.115+0000    20000 document(s) imported successfully. 0 document(s) failed to import.
root@6f578de68b5c:/# mongosh
test> use livros
switched to db livros
livros> db.livros.find()

//mongoDB
var mongoDB = 'mongodb://127.0.0.1:62987/livros'
mongoose.connect(mongoDB)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB'))
db.once('open', () => {
  console.log("Conexão ao MongoDB realizada com sucesso")
})

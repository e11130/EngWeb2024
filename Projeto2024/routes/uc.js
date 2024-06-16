/* Operações CRUD sobre Equipa 
   2024-04-21 @jcr
   ----------------------- */
var express = require('express');
var router = express.Router();
//cambio files
var jsonfile = require('jsonfile')
var fs = require('fs')
var multer = require('multer')
var upload = multer({dest : 'uploads'})
//prueba body parser
var bodyParser = require('body-parser');
var UC = require('../controllers/uc')
var USER = require('../controllers/user')
var Auth = require('../auth/auth')
//cambios desativar
var jwt = require('jsonwebtoken')


router.use(bodyParser.urlencoded({ extended: true }));

/* Listar as UC (R) */
//cambios desativar
router.get('/',Auth.verificaAcesso("Administrador"),function(req, res) {
  var d = new Date().toISOString().substring(0,16)
    UC.list()
    .then(resp =>{
      var ucs = resp
      var myToken = req.cookies.authToken || req.query.token || req.body.token;
      if(myToken){
        jwt.verify(myToken, "ew2024", function(e, payload){
          if(e){
            res.status(401).jsonp({error: e})
          }
          else{
            var username = payload.username
            res.status(200).render("ucListPage",{"lUcs":ucs,"username": username,"date": d})
          }
        })
      }
      else{
        res.status(401).jsonp({error: "Token inexistente!"})
      }
    })
    .catch(erro=>{  
      res.status(501).render("error",{"error":erro})
    });
  });

  router.get('/addUc', Auth.verificaAcesso("Administrador"),function(req, res) {
    var d = new Date().toISOString().substring(0,16)
      res.render("añadirUcPage",{"date": d})
  });
    
  router.get('/files/:sigla', Auth.verificaAcesso("Docente"),function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    res.render("añadirFile",{"uc": req.params.sigla,"date": d})
  })

  router.get('/:sigla/docente/delete/:nome', Auth.verificaAcesso("Administrador"), function(req, res) {
    const sigla = req.params.sigla;
    const nome = req.params.nome;
  
  
    UC.removeDocente(sigla, nome)
      .then(data => {
        console.log("Docente eliminado con éxito:", data);
        res.redirect(`/uc/edit/${sigla}`);
      })
      .catch(erro => {
        console.error("Error al eliminar el docente:", erro);
        res.status(500).jsonp(erro);
      });
  });

  router.get('/:sigla/avaliacao/delete/:avaliacao', Auth.verificaAcesso("Administrador"), function(req, res) {
    const sigla = req.params.sigla;
    const avaliacao = req.params.avaliacao;
  
    UC.removeAvaliacao(sigla, avaliacao)
      .then(data => {
        console.log("Avaliacao eliminada con éxito:", data);
        res.redirect(`/uc/edit/${sigla}`);
      })
      .catch(erro => {
        console.error("Error al eliminar la avalicao:", erro);
        res.status(500).jsonp(erro);
      });
  });

    // Ruta para eliminar una aula de una UC específica
router.get('/:sigla/aula/delete/:tipo/:data', Auth.verificaAcesso("Administrador"), function(req, res) {
  const sigla = req.params.sigla;
  const tipo = req.params.tipo;
  const data = req.params.data;

  UC.removeAula(sigla, tipo, data)
    .then(data => {
      console.log("Aula eliminada con éxito:", data);
      res.redirect(`/uc/edit/${sigla}`);
    })
    .catch(erro => {
      console.error("Error al eliminar la aula:", erro);
      res.status(500).jsonp(erro);
    });
});

  router.get('/edit/:sigla', Auth.verificaAcesso("Docente"),function(req, res) {
    console.log("editar")
    var d = new Date().toISOString().substring(0, 16)
    UC.findBySigla(req.params.sigla)
    .then(uc => {
      var files = jsonfile.readFileSync(__dirname + "/../data/" + req.params.sigla + "Files.json")
      console.log(files)
      res.render("ucFormEditPage",{"uc": uc,"files": files ,"date": d})
    })
    .catch(erro => res.jsonp(erro))
    });

  router.get('/delete/:uc/:fname', (req, res) => {
    console.log("Llega a borrar")
    UC.findBySigla(req.params.uc)
    .then(resp => {
      fs.unlink(__dirname + "/../public/fileStore/" + req.params.fname, (err) => {
        if (err) {
          return console.error('Error al eliminar el archivo:', err);
        }
        console.log('Archivo eliminado exitosamente');
      });
      //mirar
      var files = jsonfile.readFileSync(__dirname + "/../data/" + req.params.uc + "Files.json")
      const nfiles = files.filter(file => file.name !== req.params.fname);
      jsonfile.writeFileSync(__dirname + "/../data/" + req.params.uc + "Files.json", nfiles)

      res.redirect("/uc/edit/" + req.params.uc)})
    .catch(erro => res.jsonp(erro))
  }); 

  /* Remover uma UC (D ) */
  router.get('/delete/:sigla',Auth.verificaAcesso("Administrador"),function(req, res) {
    USER.deleteFromSelected(req.params.sigla).then().catch()
    UC.remove(req.params.sigla)
    .then(resp => {
      fs.unlink(__dirname + "/../data/" + req.params.sigla + 'Files.json', (err) => {
        if (err) {
          return console.error('Error al eliminar el archivo:', err);
        }
        console.log('Archivo eliminado exitosamente');
      });
      res.redirect("/uc")})
    .catch(erro => res.jsonp(erro))
  });



  router.get('/fileContents/:fname', (req, res) => {
    console.log(__dirname + '/../public/fileStore' + req.params.fname);
    var contents = fs.readFileSync(__dirname + '/../public/fileStore' + req.params.fname);
    res.send(contents);
  });

  router.get('/download/:fname', (req, res) => {
    console.log(__dirname + '/../public/fileStore' + req.params.fname);
    res.download(__dirname + '/../public/fileStore/' + req.params.fname);
  });

//nuevas vistas
router.get('/:sigla/addAula',Auth.verificaAcesso("Docente") ,function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  UC.findBySigla(req.params.sigla)
    .then(uc => {
      if (!uc) {
        // UC no encontrada, maneja el error adecuadamente
        return res.status(404).render("error", {"error": "UC não encontrada"});
      }
      res.render("addAula", {"uc": uc, "date": d});
    })
    .catch(erro => {
      res.status(502).render("error", {"error": erro});
    });
});

router.get('/:sigla/addDocente', Auth.verificaAcesso("Docente"), function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  UC.findBySigla(req.params.sigla)
    .then(uc => {
      if (!uc) {
        // UC no encontrada, maneja el error adecuadamente
        return res.status(404).render("error", {"error": "UC não encontrada"});
      }
      res.render("addDocente", {"uc": uc, "date": d});
    })
    .catch(erro => {
      res.status(502).render("error", {"error": erro});
    });
});

router.get('/:sigla/addAvaliacao', Auth.verificaAcesso("Docente") ,function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  UC.findBySigla(req.params.sigla)
    .then(uc => {
      if (!uc) {
        // UC no encontrada, maneja el error adecuadamente
        return res.status(404).render("error", {"error": "UC não encontrada"});
      }
      res.render("addAvaliacao", {"uc": uc, "date": d});
    })
    .catch(erro => {
      res.status(502).render("error", {"error": erro});
    });
});


/* Consultar uma UC (R) */
router.get('/:sigla', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
    UC.findBySigla(req.params.sigla)
    .then(uc => {
      jsonfile.readFile(__dirname + "/../data/" + req.params.sigla + "Files.json", (err, fileList) => {
        if (err){
          res.render('error', {error : err});
        }
        else{
          //cambios desativar
          var myToken = req.cookies.authToken || req.query.token || req.body.token;
          if(myToken){
            jwt.verify(myToken, "ew2024", function(e, payload){
              if(e){
                res.status(401).jsonp({error: e})
              }
              else{
                var username = payload.username
                res.render("ucPage",{"uc": uc, "username": username,"files": fileList,"date": d})
              }
            })
          }
          else{
            res.status(401).jsonp({error: "Token inexistente!"})
          }
          
        }
      }
 )})//lee el archivo dbFiles.json y si no da error 
    .catch(erro => res.status(502).render("error",{"error":erro}))
})



/* Criar uma UC (C) */
router.post('/registo', Auth.verificaAcesso("Administrador") ,function(req, res) {
  console.log(req.body)

  var avaliacaoArray = Array.isArray(req.body.avaliacao) ? req.body.avaliacao : [req.body.avaliacao];
  var docentesNomeArray = Array.isArray(req.body.docentesNome) ? req.body.docentesNome : [req.body.docentesNome];
  var docentesCategoriaArray = Array.isArray(req.body.docentesCategoria) ? req.body.docentesCategoria : [req.body.docentesCategoria];
  var docentesFiliacaoArray = Array.isArray(req.body.docentesFiliacao) ? req.body.docentesFiliacao : [req.body.docentesFiliacao];
  var docentesEmailArray = Array.isArray(req.body.docentesEmail) ? req.body.docentesEmail : [req.body.docentesEmail];
  var docentesWebpageArray = Array.isArray(req.body.docentesWebpage) ? req.body.docentesWebpage : [req.body.docentesWebpage];
  var aulasTipoArray = Array.isArray(req.body.aulasTipo) ? req.body.aulasTipo : [req.body.aulasTipo];
  var aulasDataArray = Array.isArray(req.body.aulasData) ? req.body.aulasData : [req.body.aulasData];
  var aulasSumarioArray = Array.isArray(req.body.aulasSumario) ? req.body.aulasSumario : [req.body.aulasSumario];
  var teoricasSumarioArray = Array.isArray(req.body.teoricas) ? req.body.teoricas : [req.body.teoricas];
  var praticasSumarioArray = Array.isArray(req.body.praticas) ? req.body.praticas : [req.body.praticas];

  console.log(avaliacaoArray)

  var uc = {
    sigla: req.body.sigla,
    titulo: req.body.titulo,
    docentes: [],
    horario: {
        teoricas: [],
        praticas: []
    },
    avaliacao: avaliacaoArray,
    datas: {
        teste: req.body.teste,
        exame: req.body.exame,
        projeto: req.body.projeto
    },
    aulas: [],
    files: [],
  };

  uc.horario.teoricas=teoricasSumarioArray,
  uc.horario.praticas=praticasSumarioArray

  for (let i = 0; i < docentesNomeArray.length; i++) {
    uc.docentes.push({
      nome: docentesNomeArray[i],
      categoria: docentesCategoriaArray[i],
      filiacao: docentesFiliacaoArray[i],
      email: docentesEmailArray[i],
      webpage: docentesWebpageArray[i]
    });
  }

  for (let i = 0; i < aulasTipoArray.length; i++) {
    uc.aulas.push({
      tipo: aulasTipoArray[i],
      data: aulasDataArray[i],
      sumario: aulasSumarioArray[i]
    });
  }

  UC.insert(uc)
    .then(data => res.status(201).redirect('/uc'))
    .catch(erro => res.status(406).jsonp(erro));

    console.log("llego")

  fs.writeFile(__dirname + "/../data/" + uc.sigla + 'Files.json', "[]", (err) => {
      if (err) {
        return console.error('Error al crear el directorio:', err);
      }
      console.log('Directorio creado exitosamente');
    });
});

/* Alterar uma UC (U) */
router.post('/edit/:sigla', Auth.verificaAcesso("Docente"),function(req, res) {


  var avaliacaoArray = Array.isArray(req.body.avaliacao) ? req.body.avaliacao : [req.body.avaliacao];
  var docentesNomeArray = Array.isArray(req.body.docentesNome) ? req.body.docentesNome : [req.body.docentesNome];
  var docentesCategoriaArray = Array.isArray(req.body.docentesCategoria) ? req.body.docentesCategoria : [req.body.docentesCategoria];
  var docentesFiliacaoArray = Array.isArray(req.body.docentesFiliacao) ? req.body.docentesFiliacao : [req.body.docentesFiliacao];
  var docentesEmailArray = Array.isArray(req.body.docentesEmail) ? req.body.docentesEmail : [req.body.docentesEmail];
  var docentesWebpageArray = Array.isArray(req.body.docentesWebpage) ? req.body.docentesWebpage : [req.body.docentesWebpage];
  var aulasTipoArray = Array.isArray(req.body.aulasTipo) ? req.body.aulasTipo : [req.body.aulasTipo];
  var aulasDataArray = Array.isArray(req.body.aulasData) ? req.body.aulasData : [req.body.aulasData];
  var aulasSumarioArray = Array.isArray(req.body.aulasSumario) ? req.body.aulasSumario : [req.body.aulasSumario];
  var teoricasSumarioArray = Array.isArray(req.body.teoricas) ? req.body.teoricas : [req.body.teoricas];
  var praticasSumarioArray = Array.isArray(req.body.praticas) ? req.body.praticas : [req.body.praticas];
  var filesArray = Array.isArray(req.body.files) ? req.body.files : [req.body.files];
  var uc = {
    sigla: req.body.sigla,
    titulo: req.body.titulo,
    docentes: [],
    horario: {
        teoricas: [],
        praticas: []
    },
    avaliacao: avaliacaoArray,
    datas: {
        teste: req.body.teste,
        exame: req.body.exame,
        projeto: req.body.projeto
    },
    aulas: []
  };


  for (let i = 0; i < docentesNomeArray.length; i++) {
    uc.docentes.push({
      nome: docentesNomeArray[i],
      categoria: docentesCategoriaArray[i],
      filiacao: docentesFiliacaoArray[i],
      email: docentesEmailArray[i],
      webpage: docentesWebpageArray[i]
    });
  }

  for (let i = 0; i < aulasTipoArray.length; i++) {
    uc.aulas.push({
      tipo: aulasTipoArray[i],
      data: aulasDataArray[i],
      sumario: aulasSumarioArray[i]
    });
  }

  //solo uc por req.body
  UC.update(req.params.sigla, uc)
    .then(resp => {
      res.redirect("/uc/"+uc.sigla)
    })
    .catch(erro => {
      res.render("error",{"error":erro})
    })
})


router.post('/files/:sigla', Auth.verificaAcesso("Docente"),upload.single('myFile') , (req,res) => {
  console.log('cdir: ' + __dirname);
  let oldPath = __dirname + "/../" + req.file.path
  console.log("old: " + oldPath);
  let newPath = __dirname + "/../public/fileStore/" + req.file.originalname
  console.log("new: " +newPath);

  fs.rename(oldPath, newPath, error => {
    if (error) throw error
  })

  var date = new Date().toISOString().substring(0,19)
  var files = jsonfile.readFileSync(__dirname + "/../data/" + req.params.sigla + "Files.json")

  files.push({
    date: date,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  })

  jsonfile.writeFileSync(__dirname + "/../data/" + req.params.sigla + "Files.json", files)

  res.redirect("/uc/edit/"+ req.params.sigla)
})

//nuevas vistas
router.post('/:sigla/addAula', Auth.verificaAcesso("Docente"), function(req, res) {
  // Extraemos los detalles de la nueva aula desde el cuerpo de la solicitud
  const novaAula = {
    tipo: req.body.tipo,
    data: req.body.data,
    sumario: req.body.sumario
  };

  // Buscar la UC por la sigla
  UC.findBySigla(req.params.sigla)
    .then(uc => {
      // Añadir la nueva aula al array de aulas
      uc.aulas.push(novaAula);
      // Guardar los cambios en la UC
      return UC.update(req.params.sigla, { aulas: uc.aulas });
    })
    .then(resp => {
      res.redirect(`/uc/edit/${req.params.sigla}`);
    })
    .catch(erro => {
      res.render("error", {"error": erro});
    });
});

router.post('/:sigla/addDocente', Auth.verificaAcesso("Docente") ,function(req, res) {
  // Extraemos los detalles del nuevo docente desde el cuerpo de la solicitud
  const novoDocente = {
    nome: req.body.nome,
    categoria: req.body.categoria,
    filiacao: req.body.filiacao,
    email: req.body.email,
    webpage: req.body.webpage
  };

  // Buscar la UC por la sigla
  UC.findBySigla(req.params.sigla)
    .then(uc => {
      // Añadir el nuevo docente al array de docentes
      uc.docentes.push(novoDocente);
      // Guardar los cambios en la UC
      return UC.update(req.params.sigla, { docentes: uc.docentes });
    })
    .then(resp => {
      res.redirect(`/uc/edit/${req.params.sigla}`);
    })
    .catch(erro => {
      res.render("error", {"error": erro});
    });
});

router.post('/:sigla/addAvaliacao', Auth.verificaAcesso("Docente") ,function(req, res) {
  // Extraer detalles de la nueva evaluación desde el cuerpo de la solicitud
  const novaAvaliacao = req.body.novaAvaliacao;

  // Buscar la UC por la sigla
  UC.findBySigla(req.params.sigla)
    .then(uc => {
      if (!uc) {
        return res.status(404).render("error", { "error": "UC não encontrada" });
      }

      // Añadir la nueva evaluación al array de avaliações
      uc.avaliacao.push(novaAvaliacao);

      // Guardar los cambios en la UC
      return UC.update(req.params.sigla, { avaliacao: uc.avaliacao });
    })
    .then(resp => {
      res.redirect(`/uc/edit/${req.params.sigla}`);
    })
    .catch(erro => {
      res.render("error", { "error": erro });
    });
});


module.exports = router;

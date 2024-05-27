var express = require('express');
var router = express.Router();
var axios = require('axios');
var periodo = require('../controllers/periodos')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  periodo.list()
  .then(resp =>{
    var periodos = resp
    res.status(200).render("periodoListPage",{"lPeriodos":periodos, "date": d})
  })
  .catch(erro=>{  
    res.status(501).render("error",{"error":erro})
  });
});

router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  res.status(200).render("periodoFormPage", {"date":d})
});

router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  var result = req.body
  var p = {
    id : result.id,
    nome : result.nome
}
  periodo.insert(p)
    .then(resp =>{
      console.log(resp.data)
      res.status(201).redirect('/periodos')
    })
    .catch(erro =>{
      res.status(502).render("error",{"error":erro})
    })
});

router.get('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  periodo.findById(req.params.id)
  .then(resp =>{
    var periodo = resp 
    res.status(200).render("periodoFormEditPage",{"periodo": periodo, "date": d})
  })
  .catch(erro=>{  
    res.status(504).render("error",{"error":erro})
  });
});

router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  periodo.findById(req.params.id)
  .then(resp =>{
    var periodo = resp
    res.status(200).render("periodoPage",{"periodo": periodo, "date": d})
  })
  .catch(erro=>{  
    res.status(503).render("error",{"error":erro})
  });
});



router.get('/delete/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  periodo.delete(req.params.id)
  .then(resp =>{
    res.redirect('/periodos')
  })
  .catch(erro=>{  
    res.status(505).render("error",{"error":erro})
  });
});

router.post('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  var result = req.body
  var idP = req.params.id
  var p = {
    id : result.id,
    nome : result.nome
}
  periodo.update(idP,p)
  .then(resp =>{
    res.status(201).redirect('/periodos')
  })
  .catch(erro=>{  
    res.status(504).render("error",{"error":erro})
  });
});



module.exports = router;

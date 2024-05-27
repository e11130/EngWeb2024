var express = require('express');
var router = express.Router();
var axios = require('axios');
var compositor = require('../controllers/compositores')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  compositor.list()
  .then(resp =>{
    var compositores = resp 
    res.status(200).render("compositorListPage",{"lCompositores":compositores, "date": d})
  })
  .catch(erro=>{  
    res.status(501).render("error",{"error":erro})
  });
});

router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  res.status(200).render("compositorFormPage", {"date":d})
});

router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  var result = req.body

  var c = {
    id : result.id,
    bio: result.bio,
    dataNasc : result.dataNasc,
    dataObito : result.dataObito,
    nome : result.nome,
    periodo : result.periodo
  }
  console.log(c)
  compositor.insert(c)
    .then(resp =>{
      res.status(201).redirect('/')
    })
    .catch(erro =>{
      res.status(502).render("error",{"error":erro})
    })
});

router.get('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)

  compositor.findById(req.params.id)
  .then(resp =>{
    var compositor = resp
    res.status(200).render("compositorFormEditPage",{"compositor": compositor, "date": d})
  })
  .catch(erro=>{  
    res.status(504).render("error",{"error":erro})
  });
});

router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  compositor.findById(req.params.id)
  .then(resp =>{
    var compositor = resp 
    res.status(200).render("compositorPage",{"compositor": compositor, "data": d})
  })
  .catch(erro=>{  
    res.status(503).render("error",{"error":erro})
  });
});



router.get('/delete/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  compositor.delete(req.params.id)
  .then(resp =>{
    res.status(200).redirect('/')
  })
  .catch(erro=>{  
    res.status(505).render("error",{"error":erro})
  });
});

router.post('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  var result = req.body
  var idC = req.params.id
  var c = {
    id : result.id,
    bio: result.bio,
    dataNasc : result.dataNasc,
    dataObito : result.dataObito,
    nome : result.nome,
    periodo : result.periodo
  }

  console.log(idC)

  compositor.update(idC,c)
  .then(resp =>{
    res.status(201).redirect('/')
  })
  .catch(erro=>{  
    res.status(504).render("error",{"error":erro})
  });
});



module.exports = router;

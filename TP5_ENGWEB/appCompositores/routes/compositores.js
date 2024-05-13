var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/compositores?_sort=nome")
  .then(resp =>{
    var compositores = resp.data 
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
  axios.post("http://localhost:3000/compositores",result)
    .then(resp =>{
      console.log(resp.data)
      res.status(201).redirect('/')
    })
    .catch(erro =>{
      res.status(502).render("error",{"error":erro})
    })
});

router.get('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/compositores/"+ req.params.id)
  .then(resp =>{
    var compositor = resp.data 
    res.status(200).render("compositorFormEditPage",{"compositor": compositor, "date": d})
  })
  .catch(erro=>{  
    res.status(504).render("error",{"error":erro})
  });
});

router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/compositores/"+ req.params.id)
  .then(resp =>{
    var compositor = resp.data 
    res.status(200).render("compositorPage",{"compositor": compositor, "date": d})
  })
  .catch(erro=>{  
    res.status(503).render("error",{"error":erro})
  });
});



router.get('/delete/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  axios.delete("http://localhost:3000/compositores/"+ req.params.id)
  .then(resp =>{
    res.redirect('/')
  })
  .catch(erro=>{  
    res.status(505).render("error",{"error":erro})
  });
});

router.post('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  var compositor = req.body
  axios.put("http://localhost:3000/compositores/"+ req.params.id, compositor)
  .then(resp =>{
    res.status(201).redirect('/')
  })
  .catch(erro=>{  
    res.status(504).render("error",{"error":erro})
  });
});



module.exports = router;

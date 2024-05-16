var express = require('express');
var router = express.Router();
let  contrato = require("../controllers/contratos")

/* GET users listing. */
router.get('/', function(req, res, next) {
  contrato.list()
      .then(resp =>{
        var contratos = resp
        res.status(200).render("contratosList",{"lContratos":contratos, "date": d})
      }).catch(erro =>{
        res.jsonp(erro)
  })
});


router.get("/:id",function (req, res, next){
    var id = req.params.id
    contrato.findById(id).
    then(resp =>{
      var contrato = resp
      res.status(200).render("contratoPage",{"contrato":contrato, "date": d})
    }).catch(erro =>{
      res.jsonp(erro)
})
});

router.get("?entidade=EEEE",function (req, res, next){
    var entNome = req.query.entidade
    contrato.findEntidadesNome(entNome).
    then(resp =>{
        res.jsonp(resp)
    }).catch(erro =>{
      res.jsonp(erro)
})
});

router.get("?tipo=AAA",function (req, res, next){
    var tipo = req.query.tipo
    contrato.findTipoProc(tipo).
    then(resp =>{
        res.jsonp(resp)
    }).catch(erro =>{
      res.jsonp(erro)
})
});

router.get("/entidades",function (req, res, next){
    contrato.findEntidades().
    then(resp =>{
        res.jsonp(resp)
    }).catch(erro =>{
      res.jsonp(erro)
})
});

router.get("/tipos",function (req, res, next){
    contrato.findTipos().
    then(resp =>{
        res.jsonp(resp)
    }).catch(erro =>{
      res.jsonp(erro)
})
});

router.post('/', function(req, res, next) {
    result = req.body
    contrato.insert(result).then(resp =>{
        res.jsonp(resp)
    }).catch(erro =>{
      res.jsonp(erro)
})
});
        

router.put('/:id', function(req, res) {
    contrato.update(req.params.id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });

router.delete('/:id', function(req, res) {
    return contrato.delete(req.params.id)
      .then(console.log("Deleted " + req.params.id))
      .catch(erro => res.jsonp(erro))
  });

module.exports = router;
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport')
var userModel = require('../models/user')
var uc = require('../controllers/uc')


var User = require('../controllers/user');
const { unlock } = require('.');
const Auth = require('../auth/auth')

router.get('/',Auth.verificaAcesso("Administrador"), function(req, res){
  var d = new Date().toISOString().substring(0,16)
  User.list()
  .then(resp =>{
    var users = resp 
    res.status(200).render("usersListPage",{"lUsers":users, "date": d})
  })
  .catch(erro=>{  
    res.status(501).render("error",{"error":erro})
  });
})

//estos dos a ver si van
router.get('/register', function(req, res){
  var d = new Date().toISOString().substring(0,16)
  uc.list()
    .then(resp =>{
      var ucs = resp 
      res.status(200).render("register",{"lUcs":ucs, "date": d})
    })
    .catch(erro=>{  
      res.status(501).render("error",{"error":erro})
    });
  });

  router.get('/edit/:username',function(req, res){
    var d = new Date().toISOString().substring(0,16);
    
    User.getUserName(req.params.username)
      .then(resp => {
        return uc.list().then(ucs => {
          res.status(200).render("userEditPage", {
            "lUcs": ucs,
            "user": resp,
            "selectedUcs": resp.asignaturas,
            "date": d
          });
        });
      })
      .catch(erro => {
        res.status(500).render('error', { error: erro, message: "Erro na alteração do utilizador" });
      });
  });


router.get('/login', function(req, res){
  var d = new Date().toISOString().substring(0,16)
  res.status(200).render("login", {"date":d})
})

/* Remover uma UC (D ) */
router.get('/delete/:username',Auth.verificaAcesso("Administrador"),function(req, res) {
  User.remove(req.params.username)
  .then(data => res.status(201).redirect('/user'))
  .catch(erro => res.jsonp(erro))
});

//cambios raros
router.get('/:username/desativar',function(req, res) {
  User.updateUserStatus(req.params.username, false)
    .then(dados => {
      User.getUserName(req.params.username)
      .then(dados => {
        // res.cookie('authToken', token, { httpOnly: true }),
        console.log(dados.active)
      })
      .catch(e => res.status(500).jsonp({error: e}))
      res.redirect("/")
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

//cambios raros
router.get('/:username/ativar',function(req, res) {
  User.updateUserStatus(req.params.username, true)
    .then(dados => {
      res.status(200).redirect("/user/" + req.params.username)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})


//cambios raros
router.get('/:username', function(req, res){
  var d = new Date().toISOString().substring(0,16)
  var token = req.cookies.authToken
  User.getUserName(req.params.username)
    .then(dados => {
      // res.cookie('authToken', token, { httpOnly: true }),
      console.log(dados.active)
      res.status(200).render("userPage",{"user":dados, "token": token,"date": d})
    })
    .catch(e => res.status(500).jsonp({error: e}))
})


router.post('/', function(req, res){
  User.addUser(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})


router.post('/register', function(req, res) {
  var d = new Date().toISOString().substring(0,19)
  userModel.register(new userModel({ username: req.body.username, name: req.body.name, 
                                      level: req.body.level, active: true, dateCreated: d, 
                                      asignaturas: req.body.asignaturas }), 
    req.body.password, 
    function(err, user) {
      if (err) 
        res.jsonp({error: err, message: "Register error: " + err})
      else{
        passport.authenticate("local")(req,res,function(){
          //cambios ativar
          jwt.sign({ username: req.user.username, level: req.user.level, active: req.user.active, 
            sub: 'aula de EngWeb2024'}, 
            "ew2024",
            {expiresIn: 3600},
            function(e, token) {
              if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
              // else res.status(201).jsonp({token: token})
            //prueba login
              else {
                //cookies
                res.cookie('authToken', token, { httpOnly: true });
                res.status(201).redirect("/user/" + req.body.username + "/ativar")
              }
            });
        })
      }     
  })
})

//cambios level
router.post('/login', passport.authenticate('local'), function(req, res){
  // console.log("Nivel:")
  // User.getUserName(req.body.username).then(resp =>{
  //   var user = resp
  //   jwt.sign({ username: user.username, level: user.level}, 
  //     "ew2024",
  //     {expiresIn: 3600},
  //     function(e, token) {
  //       if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
  //         //pruebas login
  //       // else res.status(201).jsonp({token: token})
  //       else {
  //         //cookies
  //         res.cookie('authToken', token, { httpOnly: true });
  //         res.status(201).redirect("/user/" + req.body.username)
  //       }
  // });
  // }).catch(res.status(500).jsonp({error: "Usuario no existe"}) )
  console.log("Nivel:");
  
  // Asegúrate de que `User.getUserName` devuelve una promesa
  User.getUserName(req.body.username)
    .then(user => {
      if (!user) {
        // Manejar caso donde el usuario no existe
        return res.status(404).jsonp({ error: "Usuario no existe" });
      }
      
      // Generar el token JWT
      jwt.sign(
        { username: user.username, level: user.level, active: req.user.active}, 
        "ew2024",
        { expiresIn: 3600 },
        function(e, token) {
          if (e) {
            return res.status(500).jsonp({ error: "Erro na geração do token: " + e });
          }
          // Configurar cookie
          res.cookie('authToken', token, { httpOnly: true });
          res.status(201).redirect("/user/" + req.body.username + "/ativar")
        }
      );
    })
    .catch(err => {
      // Manejar cualquier error de la promesa
      res.status(500).jsonp({ error: "Error en la búsqueda del usuario: " + err });
    });
})


//cambios edit
router.post('/edit/:username', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  User.getUserName(req.params.username)
      .then(resp => {
        var user = {
          username: resp.username,
          password: req.body.password,
          name: req.body.name,
          level: resp.level,
          active: resp.active,
          dateCreated: resp.dateCreated,
          //cambio raro
          asignaturas: req.body.asignaturas,
        }

        console.log(user)

        return User.updateUser(req.params.username, user)
        .then(dados => {
          res.status(200).redirect("/user/" + req.body.username)
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
        });
      })
      .catch(erro => {
        res.status(500).render('error', { error: erro, message: "Erro na alteração do utilizador" });
      });
})

router.put('/:id/password',  function(req, res) {
  User.updateUserPassword(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

module.exports = router;
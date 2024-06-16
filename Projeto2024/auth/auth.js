var jwt = require('jsonwebtoken')

//cambio username
module.exports.verificaAcesso = function(requiredLevel){
  return function (req, res, next){

    // var myToken = req.cookies.authToken;
    var myToken = req.cookies.authToken || req.query.token || req.body.token;

    if(myToken){
      console.log(myToken);
      jwt.verify(myToken, "ew2024", function(e, payload){
        if(e){
          res.status(401).jsonp({error: e})
        }
        else{
          //cambios ativar
          if (payload.level == requiredLevel || payload.level == "Administrador"){
            console.log(payload)
            next()
          }else{
            res.status(403).jsonp({ error: "Permissões insuficientes" })
          }
        }
      })
    }
    else{
      res.status(401).jsonp({error: "Token inexistente!"})
    }
  }
}

// //cambio username
// module.exports.verificaAcessoUsername = function(username){
//   return function (req, res, next){

//     // var myToken = req.cookies.authToken;
//     var myToken = req.cookies.authToken || req.query.token || req.body.token;

//     if(myToken){
//       console.log(myToken);
//       jwt.verify(myToken, "ew2024", function(e, payload){
//         if(e){
//           res.status(401).jsonp({error: e})
//         }
//         else{
//           //cambios ativar
//           if ((payload.username == username) && payload.active == true){
//             console.log(payload)
//             next()
//           }else{
//             res.status(403).jsonp({ error: "Permissões insuficientes" })
//           }
//         }
//       })
//     }
//     else{
//       res.status(401).jsonp({error: "Token inexistente!"})
//     }
//   }
// }
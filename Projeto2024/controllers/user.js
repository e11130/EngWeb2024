// Controlador para o modelo User

var User = require('../models/user')

// Devolve a lista de Users
module.exports.list = () => {
    return User
            .find()
            .sort('name')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteFromSelected = uc => {
    return User.updateMany(
        { asignaturas: uc }, // Condición para encontrar usuarios con la asignatura específica
        { $pull: { asignaturas: uc } } // Operación para eliminar la asignatura del array
      ).then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
}

module.exports.getUser = n => {
    return User.findOne({name :n})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

//cambios level
module.exports.getUserName = n => {
    return User.findOne({username :n})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addUser = u => {
    return User.create(u)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.updateUser = (id, info) => {
    return User.updateOne({username:id}, info)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserStatus = (id, status) => {
    return User.updateOne({username:id}, {active: status})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserPassword = (id, pwd) => {
    return User.updateOne({_id:id}, pwd)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteUser = id => {
    return User.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.remove = username => {
    return User
        .findOneAndDelete({username : username})
}


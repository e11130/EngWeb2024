const mongoose = require('mongoose')
var UC = require("../models/uc")


module.exports.list = () => {
    return UC
        .find()
        .sort({sigla : 1})
        .exec()
}



module.exports.findBySigla = s => {
    return UC
        .findOne({sigla : s})
        .exec()
}

module.exports.insert = uc => {
    if((UC.find({sigla : uc.sigla}).exec()).length != 1){
        var newUC = new UC(uc)
        return newUC.save()
    }
}

module.exports.update = (sigla, uc) => {
    return UC
        .findOneAndUpdate({sigla: sigla}, uc, {new : true})
}

module.exports.remove = s => {
    return UC
        .findOneAndDelete({sigla : s})
}

module.exports.removeDocente = (sigla, nome) => {
    return UC.findOneAndUpdate(
        { sigla: sigla },
        { $pull: { docentes: { nome: nome } } },
        { new: true }
      ).exec();
  }

  module.exports.removeAvaliacao = (sigla, avaliacao) => {
    return UC.findOneAndUpdate(
        { sigla: sigla },
        { $pull: { avaliacao: avaliacao } },
        { new: true }
      ).exec();
  }

  module.exports.removeAula = (sigla, tipo, data) => {
    return UC.findOneAndUpdate(
        { sigla: sigla },
        { $pull: { aulas: { tipo: tipo, data: data } } },
        { new: true }
      ).exec();
  }
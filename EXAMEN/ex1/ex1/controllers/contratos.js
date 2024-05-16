var moongose = require("mongoose")
const {modelName} = require("../model/contratos")
var contrato = require("../model/contratos")

module.exports.list = () => {
    return contrato
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findEntidades = () => {
    return contrato
        .find().select(entidade_comunicante)
        .sort({nome : 1}).distinct()
        .exec()
}

module.exports.findTipos = () => {
    return contrato
        .find().select(tipoprocedimiento)
        .sort({nome : 1}).distinct()
        .exec()
}


module.exports.findById = id => {
    return contrato
        .findOne({idcontrato : id})
        .exec()
}

module.exports.findEntidadesNome = entNome => {
    return contrato
        .find({entidade_comunicante : entNome})
        .exec()
}

module.exports.findTipoProc = tipo => {
    return contrato
        .find({tipoprocedimiento : tipo})
        .exec()
}

module.exports.insert = (c) =>{
    if((contrato.find({idcontrato : c.idcontrato}).exec()).length != 1){
        var newC = new contrato(c)
        return newC.save()
    }
}

module.exports.delete = (idC) => {
    contrato
        .findOne({idcontrato: idC})
        .delete()
        .exec()
    
}

module.exports.update = (id,c) => {
    return contrato
        .findByIdAndUpdate(id, c, {new : true})
        .exec()
}
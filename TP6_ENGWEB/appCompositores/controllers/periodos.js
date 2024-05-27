var moongose = require("mongoose")
const {modelName} = require("../model/periodos")
var periodo = require("../model/periodos")

module.exports.list = () => {
    return periodo
        .find({ id: /^P/ })
        .sort({nome : 1})
        .exec()
}



module.exports.findById = cId => {
    return periodo
        .findOne({id : cId})
        .exec()
}

module.exports.insert = 
    (p) =>{
        var newPeriodo = new periodo(p)
        console.log(newPeriodo)
        return newPeriodo.save()
    }


module.exports.delete = (cId) => {
    return periodo
        .deleteOne({id : cId})
        .exec()
}

module.exports.update = (cId,c) => {
    return periodo
        .updateOne({id : cId}, c)
        .exec()
}
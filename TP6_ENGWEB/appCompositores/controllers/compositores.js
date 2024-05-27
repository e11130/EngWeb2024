var moongose = require("mongoose")
const {modelName} = require("../model/compositores")
var compositor = require("../model/compositores")

module.exports.list = () => {
    return compositor
        .find({ id: /^C/ })
        .sort({nome : 1})
        .exec()
}



module.exports.findById = cId => {
    return compositor
        .findOne({id : cId})
        .exec()
}

module.exports.insert = 
    (c) =>{
        var newComp = new compositor(c)
        console.log(newComp)
        return newComp.save()
    }


module.exports.delete = (cId) => {
    return compositor
        .deleteOne({id : cId})
        .exec()
}

module.exports.update = (cId,c) => {
    return compositor
        .updateOne({id : cId}, c)
        .exec()
}
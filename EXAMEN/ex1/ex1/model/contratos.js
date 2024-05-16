var mongoose = require("mongoose")

var contratoSchema = new mongoose.Schema({
    idcontrato : String,
    nAnuncio: String,
    tipoprocedimiento : String,
    objetoContrato : String,
    dataPublicacao : Date,
    dataCelebracaoContrato : Date,
    precoContratual : Number,
    prazoExecucao : Number,
    NIPC_entidade_comunicante : Number,
    entidade_comunicante : String,
    fundamentacao :String,
}, { versionKey: false })

module.exports = mongoose.model('contratos', contratoSchema)
var mongoose = require("mongoose")

var horarioSchema = new mongoose.Schema({
    teoricas: [String],
    praticas: [String]
}, { _id: false });

var docenteSchema = new mongoose.Schema({
    nome: String,
    foto: String,
    categoria: String,
    filiacao: String,
    email: String,
    webpage: String
}, { _id: false });

var aulaSchema = new mongoose.Schema({
    tipo: String,
    data: String,
    sumario: [String]
}, { _id: false });

var ucSchema = new mongoose.Schema({
    sigla: String,
    titulo: String,
    docentes: [docenteSchema],
    horario: horarioSchema,
    avaliacao: [String],
    datas: {
        teste: String,
        exame: String,
        projeto: String
    },
    aulas: [aulaSchema],
}, { versionKey: false })

module.exports = mongoose.model('uc', ucSchema, 'uc')
$(function(){

})

function showImage(fname, ftype){
    //borra el contenido
    $("#display").empty()

    if(ftype == "image/jpeg" || ftype == "image/png"){
        var fichero = $('<img src="/fileStore/' + fname + '"width=80%/>')
        //aqui se haría el get??
        var download = $('<div><a href="/uc/download/' + fname + '">Download</a></div>')
        //lo muestra como un dialogo
        $("#display").append(fichero, download)
        $("#display").modal()
    } 
    else{
        var fichero = $('<p>' + fname + '</p>')
        var download = $('<div><a href="/uc/download/' + fname + '">Download</a></div>')
        $("#display").append(fichero, download)
        $("#display").modal()
    }
}

function deleteImage(fname, ftype, sigla){
    //borra el contenido
    $("#display").empty()

    if(ftype == "image/jpeg" || ftype == "image/png"){
        var fichero = $('<img src="/fileStore/' + fname + '"width=80%/>')
        //aqui se haría el get??
        var del = $('<div><a href="/uc/delete/'+ sigla + "/" + fname + '">Delete</a></div>')
        //lo muestra como un dialogo
        $("#display").append(fichero, del)
        $("#display").modal()
    } 
    else{
        var fichero = $('<p>' + fname + '</p>')
        var del = $('<div><a href="/uc/delete/' + sigla + "/" + fname + '">Delete</a></div>')
        $("#display").append(fichero, del)
        $("#display").modal()
    }
}
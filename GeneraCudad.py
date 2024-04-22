#-------------------------------------------------------------------------------
# Name:        module2
# Purpose:
#
# Author:      dario
#
# Created:     02/03/2024
# Copyright:   (c) dario 2024
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import json
import unicodedata




f = open("mapa.json")
bd = json.load(f)
f.close()

#saca todas las ciudades de la base de datos
cities = bd["cidades"]
lig = bd["ligações"]



for c in cities:
    f = open("ciudades/" + str(c['id']) + '.html','w+')

    preHTML = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cidades de Portugal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="w3.css">
        <meta charset="utf-8"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h3>Cidade: {c['nome']}</h3>
            </header>
        </div>
    """


    conteudo = f"""
    <h3>População: {c['população']}</h3>
    <h3>Descrição: {c['descrição']}</h3>
    <h3>Distrito: {c['distrito']}</h3>
    """

    for l in lig:
        if l['origem'] == c['id']:
            destino_id = l['destino']
            for cid in cities:
                if cid['id'] == destino_id:
                    destino_nome = cid['nome']

            conteudo += f"""<li><a href="http://localhost:7777/{l['destino']}.html">
                    {destino_nome} | {l['distância']} km</a> </li>
                    """

    pagHTML = preHTML + conteudo
    f.write(pagHTML)
    f.close



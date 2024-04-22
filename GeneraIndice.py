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


preHTML = """
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
            <h3>Cidades de Portugal</h3>
        </header>
        <div class="w3-container">
            <ul class="w3-ul w3-card-4" style="width:100%">
"""


content = """
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
            <h3>Cidades de Portugal</h3>
        </header>
        <div class="w3-container">
            <ul class="w3-ul w3-card-4" style="width:100%">
"""

for c in cities: # r[0] -> número ; r[1] -> nome
    content += f"""
                <li>
                    <a href="http://localhost:7777/{c['id']}.html">
                    {c['nome']}</a>
                </li>
                """

pagHTML = content

f = open('indice.html', 'w+', encoding='utf-8')
f.write(pagHTML)
print("Index.html created!")
f.close
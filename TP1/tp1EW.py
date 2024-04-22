#-------------------------------------------------------------------------------
# Name:        module2
# Purpose:
#
# Author:      dario
#
# Created:     22/02/2024
# Copyright:   (c) dario 2024
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import html
import os
import xml.etree.ElementTree as ET

#pagina principal
html = '''
<!DOCTYPE html>
<html>
<head>
    <title>Ruas de Braga</title>
    <meta charset="UTF-8">
</head>
<body>
<h1>Lista de Ruas</h1>
<ul>
{lista_ruas}
</ul>
</body>
</html>
'''


#modelo de elemento de lista
rua_template = '<li><a href = "{xml_path}">{nome_rua}</a> - {número}</li>'

#se guardan aqui las listas
lista_ruas =[]
directorio = 'MapaRuas-materialBase/texto'

#para cada archivo del directorio se abre y se crea un árbol con la info
#raiz = rua
#tree = nome,numero...
for file in os.listdir(directorio):
    file_path = os.path.join(directorio,file)
    with open(file_path,'r',encoding = 'utf-8') as file:
        tree = ET.parse(file)
        root = tree.getroot()

    #búsqueda en todo el árbol a partir de la raiz
    nome_rua = root.find('.//nome').text
    número = root.find('.//número').text
    xml_path = f"{directorio}/{file}"

    #print(nome_rua)

    a = rua_template.format(xml_path = xml_path, nome_rua = nome_rua, número = número)
    print(a)

    lista_ruas.append(a)

html_content = html.format(lista_ruas= '\n'.join(lista_ruas))

with open('index.html','w',encoding = 'utf-8') as f:
    f.write(html_content)


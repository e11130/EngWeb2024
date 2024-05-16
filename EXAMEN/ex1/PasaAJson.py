#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      dario
#
# Created:     16/05/2024
# Copyright:   (c) dario 2024
# Licence:     <your licence>
#-------------------------------------------------------------------------------

with open("contratos2024.csv",'r',encoding = 'utf-8') as file:
##    file.readLines().split("\n")[0]
##    a = archivo.split("\n")[0]
##    print(a)
    nuevoArchivo = "["
    a = file.read()
    claves = a.split("\n")[0].split(";")
    datos = a.split("\n")
    print(claves)
    datosBien = datos[1::]
    for x in datosBien:
        i = x.split()






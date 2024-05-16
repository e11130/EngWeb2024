Intente hacer un programa que pasase el csv para json, al ver que no me salia decidi seguir con el resto aunque no podría
probar su funcionamiento.
Cree un json con dos contratos para probar las queries, para utilizar la Base de datos hice esto:
C:\Users\dario\Desktop\ex1>docker cp contratos.json mongoEW:/tmp
Successfully copied 2.56kB to mongoEW:/tmp
C:\Users\dario\Desktop\ex1>docker exec -it mongoEW bash
root@6f578de68b5c:/# mongoimport -d contratos -c contratoa /tmp/contratos.json --jsonArray
2024-05-16T15:22:42.333+0000    connected to: mongodb://localhost/
2024-05-16T15:22:42.379+0000    2 document(s) imported successfully. 0 document(s) failed to import.
root@6f578de68b5c:/# mongosh

EN CONTROLLERS HAY UN FALLO YA QUE PONE .sort({nome : 1}) y nome no está en el modelo

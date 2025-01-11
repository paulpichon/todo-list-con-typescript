// https://gist.github.com/paulpichon/1fad7103153f993d899f6e37897be111
// Para la creacion de la configuracion de un proyecto con TYPESCRIPT
// Express
import { request, response } from "express";
// Variable sde ZOD - archivo config.js
import { PORT } from "./config/config";

const express = require('express');
const app = express();
const port = PORT ?? 5000;

app.get('/', (req = request, res = response) => {
  res.json('Hello World!')
});

app.listen(port, () => {
  console.log(`Proyecto ejecutandose en el puerto: ${port} `)
});
// Creacion de clase con la documentacion oficial de typescript: https://www.typescriptlang.org/docs/handbook/2/classes.html
// Express
import express, { Application } from 'express';
// Variable sde ZOD - archivo config.js
// En este archivo se encuentra la variable POR, en donde tambien se verifica el tipo de dato
import { PORT } from "../config/config";
// Rutas
import { TaskRoutes } from '../routes/tasks';

// Clase Server
export class Server{
    // ! private y protected solo se aplican durante la verificación de tipos: es decir en este parte
    // * Declaracion de tipos
    // Declaración de tipo de la propiedad app
    // Application: viene de express
    private readonly app: Application;
    // Puerto
    private readonly port: number;
    // Ruta tasks
    private readonly tasksPath: string;

    // constructor
    constructor() {
        // * Inicializar propiedades
        // La propiedad app se inicializa en el constructor, lo que asegura que esté definida antes de usarse.
        this.app = express();
        // puerto
        this.port = PORT ?? 5000;
        // Path de tasks
        this.tasksPath = '/api/tasks';
    }
    // Metodos
    // Metodos de las rutas
    routes() {
        // LLamamos la clase TaskRoutes y el metodo routes
        this.app.use(this.tasksPath, TaskRoutes.routes );
    } 
    // Metodo para escuchar el puerto
    async listen() {
        this.app.listen(this.port, () => {
            console.log(`Proyecto ejecutandose en el puerto: ${this.port} `)
        });
    }
}


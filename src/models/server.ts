// Creacion de clase con la documentacion oficial de typescript: https://www.typescriptlang.org/docs/handbook/2/classes.html
// Express
import express, { Application, NextFunction, Request, Response } from 'express';
// Variable sde ZOD - archivo config.js
// En este archivo se encuentra la variable POR, en donde tambien se verifica el tipo de dato
import { NODE_ENV, PORT } from "../config/config";
// Rutas
import { TaskRoutes } from '../routes/tasks';
// Cors
import cors from 'cors';
import errorMiddleware from '../middlewares/errorMiddleware';
import AppError from '../errors/CustomErrors';

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
    async start() {
        // cors
        this.app.use(cors());
        // Middlewares
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        // *Esto solo funciona con  x-www-form-urlencoded POSTMAN
        this.app.use( express.urlencoded({ extended: true }) );

        // Se inician las rutas
        this.app.use(this.tasksPath, TaskRoutes.routes );
        // Ruta no encontrada
        this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
            next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
        });
        // errores
        this.app.use(errorMiddleware);
    }

    // Metodo para escuchar el puerto
    async listen() {
        this.app.listen(this.port, () => {
            if (NODE_ENV === 'desarrollo') {
                console.log(`Proyecto ejecutandose en el puerto: ${this.port}, en ${ NODE_ENV } `)
            } else {
                console.log(`Proyecto ejecutandose en el puerto: ${this.port}, en ${ NODE_ENV } `)
            }
        });
    }
}


// Router express
import { NextFunction, Request, Response, Router } from 'express';
// express validator
import { check } from 'express-validator';
// clase task controller
import { TasksController } from '../controllers/tasks';
// Importamos la clase AppError
import AppError from '../errors/CustomErrors';
// Validar campos
import { validarCampos } from '../middlewares/validar-campos';


export class TaskRoutes {
    // constructor
    constructor(){}
    
    // getter static
    static get routes(): Router {
        // Asignar Router a una constante
        const router = Router();    
        // Creamos una instancia de la clase TasksController
        const taskController = new TasksController();
        // Get
        router.get('/', taskController.getTask);
        //Post
        router.post('/', [
          check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
          // status
          check('status', 'El status es obligatorio: [pendiente, completada]').trim().isIn(['pendiente', 'completada']),
          // Descripcion
          check('descripcion', 'La descripcion es obligatoria').trim().notEmpty(),
          // valida campos
          validarCampos
        ], taskController.postTask);
        // Put
        router.put('/:id', taskController.putTask);
        // Delete
        router.delete('/:id', taskController.deleteTask);
        // Ruta de prueba, solo en modo desarollo
        router.get("/error", (req: Request, res: Response, next: NextFunction) => {
            try {
              throw new AppError("Este es un error personalizado", 404);
            } catch (error) {
              next(error);
            }
        });

        return router;
    }
}


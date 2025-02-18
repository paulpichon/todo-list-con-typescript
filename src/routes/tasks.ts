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
// Validar el ID del task existe
import { validarIdTask } from '../helpers/validar-id-task';


export class TaskRoutes {
    // constructor
    constructor(){}
    
    // getter static
    static get routes(): Router {
        // Asignar Router a una constante
        const router = Router();    
        // Creamos una instancia de la clase TasksController
        const taskController = new TasksController();
        // Get por ID
        router.get('/:id', [
          // Validar el ID sea un ObjectId de mongoose
          check('id', 'El ID no es un MONGOID').isMongoId(),
          // Validar que el ID existe en la BD
          check('id').custom( validarIdTask ),
          // valida campos
          validarCampos
        ], taskController.getTaskPorId);
        // Get
        router.get('/', [
          check('limite', 'El parametro LIMITE debe ser un número').optional().isInt(),
          check('desde', 'El parametro DESDE debe ser un número').optional().isInt(),
          check('prioridad', 'El parametro PRIORIDAD debe ser un número').optional().isInt(),
          check('status', 'El parametro STATUS no debe estar vacio: [pendiente, completada, en-proceso]').optional().notEmpty().isIn([ 'pendiente', 'completada', 'en-proceso']),
          // valida campos
          validarCampos
        ], taskController.getTask);
        //Post
        router.post('/', [
          check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
          // status
          check('status', 'El status es obligatorio: [pendiente, completada]').trim().isIn(['pendiente', 'completada']),
          // Descripcion
          check('descripcion', 'La descripcion es obligatoria').optional().trim().notEmpty(),
          // prioridad
          check('prioridad', 'La prioridad es obligatoria:[1, 2, 3]').trim().notEmpty().isInt({min: 1, max: 3}),
          // Tambien se podria hacer de esta forma, pero podria darnos un error al introducir string, errores en consola
          // check('prioridad', 'La prioridad es obligatoria:[1, 2, 3]').trim().notEmpty().isLength({ min: 1, max: 3}),
          // valida campos
          validarCampos
        ], taskController.postTask);
        // Put
        router.put('/:id', [
          // Validar el ID sea un ObjectId de mongoose
          check('id', 'El ID no es un MONGOID').isMongoId(),
          // Validar que el ID existe en la BD
          check('id').custom( validarIdTask ),
          // Validar el nombre del task
          check('nombre', 'El nombre es obligatorio').optional().trim().notEmpty(),
          // status
          check('status', 'El status es obligatorio: [pendiente, completada]').optional().trim().isIn(['pendiente', 'completada']),
          // Descripcion
          check('descripcion', 'La descripcion es obligatoria').optional().trim().notEmpty(),
          // prioridad
          check('prioridad', 'La prioridad es obligatoria:[1, 2, 3]').optional().trim().notEmpty().isInt({min: 1, max: 3}),
          // Tambien se podria hacer de esta forma, pero podria darnos un error al introducir string, errores en consola
          // check('prioridad', 'La prioridad es obligatoria:[1, 2, 3]').trim().notEmpty().isLength({ min: 1, max: 3}),
          // valida campos
          validarCampos
        ], taskController.putTask);
        // Delete
        router.delete('/:id', [
          // Validar el ID sea un ObjectId de mongoose
          check('id', 'El ID no es un MONGOID').isMongoId(),
          // Validar que el ID existe en la BD
          check('id').custom( validarIdTask ),
          // valida campos
          validarCampos
        ], taskController.deleteTask);
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


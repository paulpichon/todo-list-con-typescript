// Router express
import { Router } from 'express';
// clase task controller
import { TasksController } from '../controllers/tasks';

export class TaskRoutes {
        // constructor
    // constructor(){}
    
    // getter static
    static get routes(): Router {
        // Asignar Router a una constante
        const router = Router();    
        // Creamos una instancia de la clase TasksController
        const taskController = new TasksController();
        // Get
        router.get('/', taskController.getTask);
        //Post
        router.post('/', taskController.postTask);
        // Put
        router.put('/', taskController.putTask);
        // Delete
        router.delete('/', taskController.deleteTask);

        return router;
    }
}


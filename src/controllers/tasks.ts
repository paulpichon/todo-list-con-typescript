// Express
import { Request, Response } from "express"

import Task from "../models/task";

export class TasksController {
    // no hay inyeccion de dependencias
    constructor(){}
    // GET
    public getTask =  (req: Request, res: Response) => {
        res.json({
            msg: 'GET TASK'
        });
    }
    // POST
    public postTask = async (req: Request, res: Response) => {
        // obtener los datos del form
        const {nombre, status, descripcion, prioridad} = req.body;
        // crear la tarea
        const task = new Task({nombre, status, descripcion, prioridad});
        // guardar la tarea
        await task.save();
        // responder con la tarea guardada
        res.json( task );
    }
    // PUT
    public putTask = (req: Request, res: Response) => {
        res.json({
            msg: 'PUT TASK'
        });
    }
    // DELETE
    public deleteTask = (req: Request, res: Response) => {
        res.json({
            msg: 'DELETE TASK'
        });
    }
}

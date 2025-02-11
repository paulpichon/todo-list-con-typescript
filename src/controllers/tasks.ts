// Express
import { Request, Response } from "express"
// Mongoose
import mongoose from "mongoose";
// Modelo Task
import Task from "../models/task";
// Interface Itask
// Interface RequestParamsId
import { Itask, RequestParamsId } from "../interfaces/interfaces";

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
    public postTask = async (req: Request, res: Response): Promise<void> => {
        // obtener los datos del form
        const {nombre, status, descripcion, prioridad}: Itask = req.body;
        // crear la tarea
        const task = new Task({nombre, status, descripcion, prioridad});
        // guardar la tarea
        await task.save();
        // responder con la tarea guardada
        res.json( task );
    }
    // PUT
    public putTask = async (req: Request<RequestParamsId>, res: Response) => {
        // obtener el ID del task
        const { id } = req.params;
        // console.log(mongoose.isValidObjectId({ id }));
        // body
        const {_id, ...resto} = req.body as Itask;
        
        // actualizar el registro
        const task = await Task.findByIdAndUpdate( id, resto, {
            new: true
        });
        
        // Respuesta
        res.json({
            task
        });
    }
    // DELETE
    public deleteTask = async (req: Request<RequestParamsId>, res: Response) => {
        // obtener el ID
        const { id } = req.params;
        // vamos a eliminar fisicamente
        const task = await Task.findByIdAndDelete( id, {
            new: true
        });
        // Respuesta
        res.json( task );
    }
}

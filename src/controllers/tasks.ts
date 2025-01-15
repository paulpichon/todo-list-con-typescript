// Express
import { Request, Response } from "express"

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
    public postTask = (req: Request, res: Response) => {
        res.json({
            msg: 'POST TASK'
        });
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

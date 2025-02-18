// Express
import { Request, Response } from "express"
// Modelo Task
import Task from "../models/task";
// Interface Itask
// Interface RequestParamsId, IRequestParamsGet
import { IRequestParamsGet, 
        Itask, 
        RequestParamsId } from "../interfaces/interfaces";


export class TasksController {
    // no hay inyeccion de dependencias
    constructor(){}
    // GET por ID
    public getTaskPorId = async ( req: Request, res: Response ): Promise<void> => {
        // Obtener el ID del TASK
        const { id } = req.params;
        // buscar en la BD
        const task = await Task.findById( id );
        // respuesta
        res.json( task );
    }
    // GET
    public getTask =  async (req: Request<{}, {}, {}, IRequestParamsGet>, res: Response) => {
        try {
            // Extraer parámetros con valores por defecto
            const { limite = '10', desde = '0', status, prioridad } = req.query;
    
            // Convertir a números cuando sea necesario, ya que vienen con STRINGS
            const limitNumber = parseInt(limite);
            const offsetNumber = parseInt(desde);
            const priorityNumber = prioridad ? parseInt(prioridad) : undefined;
            
            // Se valida con los middlewares
            // if (isNaN(limitNumber) || isNaN(offsetNumber) || (prioridad !== undefined && isNaN(priorityNumber!))) {
            //     res.status(400).json({ message: 'Los parámetros deben ser números válidos' });
            // }
    
            // Construcción dinámica del filtro
            const filter: any = {};
            if (status) filter.status = status;
            if (priorityNumber !== undefined) filter.prioridad = priorityNumber;
    
            // Obtener tareas con filtros aplicados
            // const tasks = await Task.find(filter)
            //     .skip(offsetNumber)
            //     .limit(limitNumber);
            
            // total de registros
            // const totalRegistros = await Task.countDocuments();
            // total de registros con filtros
            // const totalRegistrosFiltros = await Task.countDocuments(filter);
            
            // Promise
            // De esta forma baja de forma importante el tiempo de respuesta +/- 133ms
            const [tasks, totalRegistros, totalRegistrosFiltros] = await Promise.all([
                Task.find(filter)
                    .sort({ _id: 1 })
                    .limit(limitNumber)
                    .skip(offsetNumber),
                Task.countDocuments(),
                Task.countDocuments(filter)
            ]);
            
            // respuesta
            res.json({
                totalRegistros,
                totalRegistrosFiltros,
                limite: limitNumber,
                desde: offsetNumber,
                filtros: { status, prioridad: priorityNumber },
                tasks
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
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

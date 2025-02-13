// Interfaces de la aplicacion
// Mongoose
import mongoose from "mongoose";

// Interface para schema Task
interface Itask {
    _id?: mongoose.Types.ObjectId | string, // Para definir un ObjectId en una interfaz, usa mongoose.Types.ObjectId:
    nombre: string; //nombre de la tarea
    status: 'pendiente' | 'en-proceso' | 'completada'; //status de la tarea
    descripcion?: string; //descripcion de la tarea
    prioridad: 1 | 2 | 3; //prioridad de la tarea 1 = Importante, 2 = Algo importante, 3 = no importante
    fecha_creacion: Date;
    fecha_completado: Date;
}
// Interface de id: este id es el que viene de las rutas PUT y DELETE
interface RequestParamsId {
    id?: mongoose.Types.ObjectId | string,
}

// interfaz
// Los valores de limite, desde y prioridad provienen de req.query, lo que significa que siempre serán cadenas de texto (string), incluso si representan números.
interface IRequestParamsGet {
    limite?: string; // Debe ser string porque req.query devuelve strings
    desde?: string; // Debe ser string porque req.query devuelve strings
    status?: 'pendiente' | 'en-proceso' | 'completada'; // Debe ser string porque req.query devuelve strings
    prioridad?: string; // Debe ser string porque req.query devuelve strings
}

// exports
export {
    Itask,
    RequestParamsId,
    IRequestParamsGet
}
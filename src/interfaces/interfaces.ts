// Interfaces de la aplicacion
// Mongoose
import mongoose from "mongoose";

// Interface para schema Task
export default interface Itask {
    _id?: mongoose.Types.ObjectId | string, // Para definir un ObjectId en una interfaz, usa mongoose.Types.ObjectId:
    nombre: string; //nombre de la tarea
    status: string; //status de la tarea
    descripcion?: string; //descripcion de la tarea
    prioridad: number; //prioridad de la tarea 1 = Importante, 2 = Algo importante, 3 = no importante
    fecha_creacion: Date;
    fecha_completado: Date;
}

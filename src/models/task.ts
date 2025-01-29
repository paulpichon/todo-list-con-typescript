// https://mongoosejs.com/docs/typescript.html ---> para crear el schema con typescript
// Mongoose
import { Schema, model } from "mongoose";
// Importamos la interfas del schema
import Itask from "../interfaces/interfaces";


// Modelo Task
const TaskSchema = new Schema<Itask>({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    status : {
        type: String,
        required: true,
        default: 'pendiente',
        enum: ['pendiente', 'completada']
    },
    descripcion: {
        type: String,
    },
    prioridad: {
        type: Number,
        required: true,
        min: 1, // crea un rango entre 1
        max: 3 //y el numero 3, esto podria hacerce con enum[1, 2, 3]
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_completado: {
        type: Date
    }
});

// export
export = model<Itask>('Task', TaskSchema);
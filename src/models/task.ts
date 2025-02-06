// https://mongoosejs.com/docs/typescript.html ---> para crear el schema con typescript
// Mongoose
import mongoose, { Schema, model } from "mongoose";
// Importamos la interfas del schema
import Itask from "../interfaces/interfaces";


// Modelo Task
const TaskSchema = new Schema<Itask>({
    // mongoose.Schema.Types.ObjectId ---> solo sirve para definicion de Schema no se puede usar en otro lado de nuestro codigo
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
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
// quitar __V
TaskSchema.methods.toJSON = function() {
    // desestructurar los atributos/propiedades que no queremos
    const {__v, ...task} = this.toObject();
    // devolver task
    return task;
}
// export
export = model<Itask>('Task', TaskSchema);
// Moderlo Task
import task from "../models/task";
// AppError
import AppError from "../errors/CustomErrors";

// Funcion para validar el ID del task exista
const validarIdTask = async ( id: string):Promise<void> => {
    // buscar el ID en la BD
    const existeIdTask = await task.findById( id ); 
    // validar si existe
    if ( !existeIdTask) {
        // En cvao de no existir
        throw new AppError(`No existe el id: ${ id }`, 404)
    }
}
// export
export {
    validarIdTask
}
// Configuracion de la conexion a la BD
// mongoose
import mongoose from 'mongoose';
// Importacion de ZOD: conexion a la BD
import { MONGODB_CONNECTION } from '../config';
// Importamos nuestra clase para mostrar errores personalizados
import AppError from '../../errors/CustomErrors';

const databaseConnection = async (): Promise<void> => {
    // URI
    const uri: string = MONGODB_CONNECTION;
    try {
        // Conectar a la BD
        await mongoose.connect(uri);
        console.log("La BD esta en linea");
        
    } catch (error) {
        // Error personalizado
        throw new AppError(
            `Error al conectar a la base de datos: ${(error as Error).message}`,
            500 
        );
    }
}
// export
export {
    databaseConnection
}
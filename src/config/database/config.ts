// Configuracion de la conexion a la BD
// mongoose
import mongoose from 'mongoose';
// Importacion de ZOD: conexion a la BD
import { MONGODB_CONNECTION } from '../config';

const databaseConnection = async (): Promise<void> => {
    // URI
    const uri: string = MONGODB_CONNECTION;
    
    try {
        // Conectar a la BD
        await mongoose.connect(uri);
        console.log("La BD esta en linea");
        
    } catch (error) {
        console.log("No se pudo conectar a la BD");
    }
}
// export
export {
    databaseConnection
}
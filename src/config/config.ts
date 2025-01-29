// Zod, para las variables de entorno
// Se uso este ejemplo https://chatgpt.com/c/6781a907-8218-8002-946a-2b3fe7119bb5, para la configuracion de este archivo
import { z } from "zod";
// importamos dotenv
import dotenv from 'dotenv';
// cargamos las variables de entorno
dotenv.config();

// creating a schema for strings
const envSchema = z.object({
    // Puerto default
    PORT: z.string().regex(/^\d+$/).transform(Number),
    // Entorno de desarrollo
    NODE_ENV: z.string().trim().toLowerCase().default("desarrollo"),
    // Connexion a la BD
    MONGODB_CONNECTION: z.string().trim().url(),
});
// Validar las variables de entorno
const { success, error, data } = envSchema.safeParse(process.env);

// validar
if(!success) {
    console.error("Error en las variables de entorno: ", error.format() ); //Mostramos el error
    process.exit(1); //Detenemos la ejecucion, las variables no son validas
}
// Si todo esta bien retornamos las variables
export const {
    PORT,
    NODE_ENV,
    MONGODB_CONNECTION
} = data;
// **** Middleware para manejar errores
// Express
import { Request, Response, NextFunction } from "express";
// Importar la clase AppError
import AppError from "../errors/CustomErrors";
// Ambiente de desarrollo 
import { NODE_ENV } from "../config/config";

const errorMiddleware = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Desestructurar err
    let { statusCode, message, isOperational } = err;
    // Identificar si es un error operacional: por default es true
    if (isOperational) {
        res.status(statusCode).json({
        success: false,
        message,
        ...( NODE_ENV === "desarrollo" && { stack: err.stack }), //esto muestra el stack del error
        });
    } else {
        // Error no operacional: mostrar solo un mensaje genérico
        // Este error se mostrara si no es un error controlado
        console.error("ERROR 💥", err);
        res.status(500).json({
        success: false,
        message: "Algo salio mal, contactar a soporte: error no operacional",
        // ...( NODE_ENV === "desarrollo" && { stack: err.stack }), //Opcional: mostrar o no el stack del error
        });
    }
};
// Exports  
export default errorMiddleware;
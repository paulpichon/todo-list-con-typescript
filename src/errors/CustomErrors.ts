// Class AppError
export default class AppError extends Error {
    // Declaracion de tipos
    // Codigo del status del error
    public readonly statusCode: number;
    // Indica si es un error previsible
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500) {
      super(message);
      this.statusCode = statusCode; // Codigo del status del error
      // Para mas informacion de this.isOperational: https://chatgpt.com/c/678871b4-dd70-8002-8c87-c8dec6be63e3
      this.isOperational = true; // Indica si es un error previsible
  
      // Asegurar herencia correcta
      // En TypeScript, al extender Error, es necesario ajustar el prototype, como se muestra en la línea Object.setPrototypeOf. Esto garantiza que la herencia funcione correctamente, especialmente al usar instanceof.
      Object.setPrototypeOf(this, new.target.prototype); //esta linea se puede quitar
      // Asigna un nombre al error
      // Asignar un valor al atributo name ayuda a identificar el tipo de error más fácilmente
      this.name = this.constructor.name; 
      // Limpia el stack trace
      // Ocultar detalles innecesarios del stack trace al crear una instancia del error
      Error.captureStackTrace(this, this.constructor); 

    }
  }
  
// module.exports = AppError;
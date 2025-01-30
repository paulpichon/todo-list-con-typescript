// Validar campos con express validator
// Express
import { Request, Response, NextFunction } from "express";
// Express validation
import { validationResult } from "express-validator";

const validarCampos = (req: Request, res: Response, next: NextFunction): void => {
    const errores = validationResult(req);
    
    // Si errores no esta vacio
    // https://chatgpt.com/c/679af45a-42f0-8002-bbd5-fd336c511ea0
    // En ese link se explica porque ponemos :
    /* 
        res.json({ errors: errores.array() });
        return;
    */
    // en lugar de return res.json({ errors: errores.array() }); 
    if (!errores.isEmpty()) {
        res.json({ errors: errores.array() });
        return;
    }
    // res.json({ errors: errores.array() });
    // siguiente funcion
    next();
}
// exports
export {
    validarCampos
}
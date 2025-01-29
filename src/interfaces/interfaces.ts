// Interfaces de la aplicacion

// Interface para schema Task
export default interface Itask {
    nombre: string; //nombre de la tarea
    status: string; //status de la tarea
    descripcion?: string; //descripcion de la tarea
    prioridad: number; //prioridad de la tarea 1 = Importante, 2 = Algo importante, 3 = no importante
    fecha_creacion: Date;
    fecha_completado: Date;
}

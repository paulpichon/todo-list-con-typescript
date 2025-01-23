// https://gist.github.com/paulpichon/1fad7103153f993d899f6e37897be111
// Para la creacion de la configuracion de un proyecto con TYPESCRIPT
// Importamos la clase server
import { Server } from "./models/server";
// Funcion autoinvocada
(async () => {
    main();
})();

function main() {
    // Creamos una instancia de la clase Server
    const server = new Server();
    // Se inicia el metodo start()
    server.start();
    // llamamos el metodo listen para escuchar el puerto
    server.listen(); 
}
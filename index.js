/**
 * fs para manejar el sistema de archivos
 * readline para leer la entrada del usuario desde la consola
 */
import { existsSync, writeFile } from "fs"
import { createInterface } from "readline"

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Función para preguntar al usuario por el nombre del archivo
 */
function askFileName() {
    // rl.question muestra la consola la pregunta y espera a que el usuario escriba y presione enter
    rl.question('Escribe el nombre del archivo: ', (fileName) => {
        // Se recibe lo que el usuario escribio y se valida si el nombre del archivo existe
        if (existsSync(`${fileName}.txt`)) {
            // Si existe el archivo le pregunta al usuario por un nuevo nombre
            console.log(`El archivo ${fileName}.txt ya existe. Por favor, escribe otro nombre de archivo.`);
            askFileName();
        } else {
            // Si no existe el archivo lo crea y pregunta por el contenido
            askFileContent(fileName);
        }
    });
}

/**
 * Función para preguntar al usuario sobre el contenido del archivo
 * @param fileName es el nombre del archivo
 */
function askFileContent(fileName) {
    rl.question('Escribe el contenido del archivo: ', (fileContent) => {
        // la función writeFile escribe en el archivo lo que el usuario escribió
        writeFile(`${fileName}.txt`, fileContent, (err) => {
            if (err) {
                console.log(`Error al crear el archivo: ${err}`);
            } else {
                console.log(`El archivo ${fileName}.txt ha sido creado exitosamente.`);
            }
            // Se cierra la ejecución de la interfaz
            rl.close();
        });
    });
}

// Se ejecuta el inicio del programa
askFileName();

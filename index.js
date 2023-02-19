const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askFileName() {
    rl.question('Escribe el nombre del archivo: ', (fileName) => {
        if (fs.existsSync(`${fileName}.txt`)) {
            console.log(`El archivo ${fileName}.txt ya existe. Por favor, escribe otro nombre de archivo.`);
            askFileName();
        } else {
            askFileContent(fileName);
        }
    });
}

function askFileContent(fileName) {
    rl.question('Escribe el contenido del archivo: ', (fileContent) => {
        fs.writeFile(`${fileName}.txt`, fileContent, (err) => {
            if (err) {
                console.log(`Error al crear el archivo: ${err}`);
            } else {
                console.log(`El archivo ${fileName}.txt ha sido creado exitosamente.`);
            }
            rl.close();
        });
    });
}

askFileName();

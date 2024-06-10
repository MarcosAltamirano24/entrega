import inquirer from "inquirer";
import fs from "fs";

//Primero declarar una variable para que lea nuestro archivo json

const tareaHogar = JSON.parse(fs.readFileSync("./tareaHogar.json", "utf-8"));

export const tareas = async () => {
    const input = await inquirer.prompt([
        {
            name: "tarea",
            message: "Bienvenido usuario ¿Que desea realizar?",
            type: "list",
            choices: ["Agregar persona", "Eliminar persona", "Actualizar tareas", "Ver todos"],
        },
    ]);
// Agregar persona

    if (input.tarea === "Agregar persona") {
        const { nombre, rol, tarea } = await inquirer.prompt([
            {
                name: "nombre",
                message: "¿Cual es tu nombre?",
            },
            {
                name: "rol",
                message: "¿Cual es tu rol?",
            },
            {
                name: "tarea",
                message: "¿Que tarea desea realizar?",
                type: "list",
                choices: ["Limpiar", "Dormir", "Almorzar", "Tomar mate"],
            },
        ]);
        const persona = {
            nombre,
            rol,
            tarea,
        };
        tareaHogar.push(persona);
        fs.writeFileSync("./tareaHogar.json", JSON.stringify(tareaHogar));
        console.log("Tarea agreagada para: ", persona.nombre);
    }
// Eliminar persona

    else if (input.tarea === "Eliminar persona") {
        const { Nombre } = await inquirer.prompt([
            {
                name: "Nombre",
                message: "¿Cual es nombre de la persona a eliminar?"
            },
        ]);

        const indice = tareaHogar.findIndex((persona) => persona.nombre === Nombre);

        if (indice !== -1) {

            tareaHogar.splice(indice, 1);
        fs.writeFileSync("./tareaHogar.json", JSON.stringify(tareaHogar));
        console.log("Persona eliminada correctamente.", Nombre); }
        else {
            console.log("No se encontró ninguna persona con ese nombre.");
        }
    }
// Actualizar tarea
else if (input.tarea === "Actualizar tareas") {
    const { nombre } = await inquirer.prompt([
        {
            name: "nombre",
            message: "¿Cuál es el nombre de la persona cuya tarea deseas actualizar?",
        },
    ]);

    const indice = tareaHogar.findIndex((persona) => persona.nombre === nombre);

    if (indice !== -1) {
        const { tarea } = await inquirer.prompt([
            {
                name: "tarea",
                message: "¿Cuál es la nueva tarea de la persona?",
                type: "list",
                choices: ["Limpiar", "Dormir", "Almorzar", "Tomar mate"],
            },
        ]);

 // Actualizar tarea para las personas
        tareaHogar[indice].tarea = tarea;

        fs.writeFileSync("./tareaHogar.json", JSON.stringify(tareaHogar));
        console.log("Tarea actualizada para:", nombre);
    } else {
        console.log("No se encontró ninguna persona con ese nombre.");
    }

    }

// Ver todas las personas
    else if (input.tarea === "Ver todos") {
        tareaHogar.forEach((element) => {
            console.log("Nombre:", element.nombre, "Rol:", element.rol, "Tarea:", element.tarea);
        });
    }
};
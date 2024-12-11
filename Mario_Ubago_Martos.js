    // Sistema de gestión académica orientado a objetos
    // Clase Dirección
    class Direccion {
        // Constructor de la clase, recibe los detalles de la dirección
        constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.calle = calle;//Nombre de la calle
        this.numero = numero;//Numero de la calle
        this.piso = piso || "";//Numero piso
        this.codigoPostal = codigoPostal;//Numero del codigo postal
        this.provincia = provincia;//Nombre de la provincia
        this.localidad = localidad;//Nombre de la localidad
        }
    }
    // Clase Asignatura
    class Asignatura {
        constructor(nombre) {
        // Validamos que el nombre de la asignatura solo contenga letras, espacios y números romanos
        if (!/^[a-zA-Z\sIVXLCDM]+$/.test(nombre)) {
            // Si el nombre no cumple con la validación, lanzamos un error
            throw new Error("El nombre de la asignatura sólo puede contener letras, números romanos y espacios.");
        }
            this.nombre = nombre; // Asignamos el nombre de la asignatura
            this.calificaciones = []; // Inicializamos un array vacío para almacenar las calificaciones
            this.fechaMatricula = null; // Inicializamos la fecha de matrícula como null
            this.fechaDesmatricula = null; // Inicializamos la fecha de desmatriculación como null
        }
        // Agregar calificación
        agregarCalificacionAsignatura(calificacion) {
            // Comprobamos si la calificación no es un número entero, es menor o igual a 0, o mayor o igual a 10
            if (calificacion <= 0 || calificacion >= 10 || !Number.isInteger(calificacion)) {
            // Si alguna de las condiciones no se cumple, lanzamos un error con un mensaje explicativo
            throw new Error("La calificación debe ser un número entero entre 0 y 10.");
            }
            // Si la calificación es válida, la agregamos al arreglo `calificaciones`
            this.calificaciones.push(calificacion);
        }
        // Calcular promedio de calificaciones
        calcularPromedio() {
            // Verificamos si la lista de calificaciones no está vacía
            return this.calificaciones.length > 0
            ? // Si tiene calificaciones, sumamos todas y dividimos por el número total de calificaciones
                // `reduce` suma todos los elementos del array (a es el acumulador, b es el valor actual)
                // La división nos da el promedio de las calificaciones
                (this.calificaciones.reduce((a, b) => a + b, 0) / this.calificaciones.length)
                .toFixed(2) // Limita el resultado a 2 decimales
            : // Si no hay calificaciones, retornamos 0 como promedio
                0;
        }
        registrarFechaMatricula() {
            // Se crea un objeto Date para obtener la fecha y hora actuales
            // toLocaleDateString('es-ES') formatea la fecha en el formato utilizado en España (dd/mm/yyyy)
            // La fecha formateada se asigna a la propiedad 'fechaMatricula' del objeto
            this.fechaMatricula = new Date().toLocaleDateString('es-ES');  // Formato español
        }
        // Registrar fecha de desmatriculación
        registrarFechaDesmatricula() {
            // Se crea un objeto Date para obtener la fecha y hora actuales
            // toLocaleDateString('es-ES') formatea la fecha en el formato utilizado en España (dd/mm/yyyy)
            // La fecha formateada se asigna a la propiedad 'fechaDesmatricula' del objeto
            this.fechaDesmatricula = new Date().toLocaleDateString('es-ES');  // Formato español
        }
    }
    // Clase Estudiante
    class Estudiante {
        // Constructor de la clase Estudiante
        constructor(id, nombre, edad, direccion) {
        // Se valida que el nombre del estudiante solo contenga letras y espacios
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            throw new Error("El nombre sólo puede contener letras y espacios.");
        }
        this.id = id; // ID único del estudiante
        this.nombre = nombre; // Nombre del estudiante
        this.edad = edad; // Edad del estudiante
        this.direccion = direccion; // Dirección del estudiante
        this.asignaturas = []; // Inicializamos un array vacío para almacenar las asignaturas del estudiante
        }
        // Método para matricular a un estudiante en una asignatura
        matricularAsignatura(nombreAsignatura) {
        // Comprobamos si el estudiante ya está matriculado en la asignatura
        if (this.asignaturas.some(a => a.nombre === nombreAsignatura)) {
            throw new Error("El estudiante ya está matriculado en esta asignatura."); // Excepción si ya está matriculado
        }
        // Si no está matriculado, creamos una nueva asignatura
        const nuevaAsignatura = new Asignatura(nombreAsignatura);
        nuevaAsignatura.fechaMatricula = new Date().toLocaleDateString('es-ES'); // Guardamos la fecha de matrícula
        // Agregamos la nueva asignatura al array de asignaturas del estudiante
        this.asignaturas.push(nuevaAsignatura);
        }
        // Método para desmatricular al estudiante de una asignatura
        desmatricularAsignatura(nombreAsignatura) {
        // Buscamos el índice de la asignatura que se quiere desmatricular
        let indice = this.asignaturas.findIndex(a => a.nombre === nombreAsignatura);
        // Si la asignatura existe, la eliminamos del array
        if (indice !== -1) {
            this.asignaturas.splice(indice, 1);
            // Registramos la fecha de desmatriculación
            this.asignaturas[indice].fechaDesmatricula = new Date().toLocaleDateString('es-ES');
        } else {
            // Si no se encuentra la asignatura, lanzamos un error
            throw new Error("Asignatura no encontrada.");
        }
        }
        // Método para agregar una calificación a una asignatura del estudiante
        agregarCalificacion(nombreAsignatura, calificacion) {
        // Buscamos la asignatura en el array
        let asignatura = this.asignaturas.find(a => a.nombre === nombreAsignatura);
        // Si la asignatura es encontrada, agregamos la calificación
        if (asignatura) {
            asignatura.agregarCalificacionAsignatura(calificacion); // Se llama al método para agregar calificación
        } else {
            // Si la asignatura no existe, lanzamos un error
            throw new Error("Asignatura no encontrada.");
        }
        }
        // Método para calcular el promedio general de todas las asignaturas
        calcularPromedioGeneral() {
        // Mapeamos las asignaturas para obtener los promedios de cada una
        let promedios = this.asignaturas.map(a => parseFloat(a.calcularPromedio()));
        // Calculamos el promedio general, si no hay asignaturas, el promedio es 0
        return promedios.length > 0 ? (promedios.reduce((a, b) => a + b, 0) / promedios.length).toFixed(2) : 0;
        }
        // Método para buscar asignaturas por un patrón de texto
        buscarAsignaturas(patron) {
            // Se crea una expresión regular para hacer la búsqueda insensible a mayúsculas y minúsculas
            const regex = new RegExp(patron, "i");
            // Filtramos las asignaturas del estudiante que coincidan con el patrón
            return this.asignaturas.filter(a => regex.test(a.nombre));
        }
        // Método para generar un reporte del estudiante con todas sus asignaturas y promedios
        generarReporte() {
            // Se inicializa el reporte con el nombre y ID del estudiante
            let reporte = `Reporte de ${this.nombre} (ID: ${this.id}):\n`;
            // Se recorre cada asignatura del estudiante y se agrega al reporte
            this.asignaturas.forEach(asignatura => {
            // Para cada asignatura, agregamos el nombre, calificaciones y promedio
            reporte += `  - ${asignatura.nombre}: Calificaciones: ${asignatura.calificaciones.join(", ")} [Promedio: ${asignatura.calcularPromedio()}]\n`;
            });
            // Al final, agregamos el promedio general del estudiante
            reporte += `Promedio General: ${this.calcularPromedioGeneral()}\n`;

            // Se retorna el reporte generado
            return reporte;
        }
        // Método para listar todas las asignaturas del estudiante
        listarAsignaturas() {
            // Usamos map() para transformar las asignaturas en un formato más sencillo
            return this.asignaturas.map(asignatura => ({
            nombre: asignatura.nombre, // Nombre de la asignatura
            calificaciones: asignatura.calificaciones, // Calificaciones de la asignatura
            promedio: asignatura.calcularPromedio(), // Promedio de la asignatura
            }));
        }
    }  
    // Clase Estudiante
    class Estudiante {
        // Constructor de la clase Estudiante
        constructor(id, nombre, edad, direccion) {
        // Se valida que el nombre del estudiante solo contenga letras y espacios
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            throw new Error("El nombre sólo puede contener letras y espacios.");
        }
        this.id = id; // ID único del estudiante
        this.nombre = nombre; // Nombre del estudiante
        this.edad = edad; // Edad del estudiante
        this.direccion = direccion; // Dirección del estudiante
        this.asignaturas = []; // Inicializamos un array vacío para almacenar las asignaturas del estudiante
        }
        // Método para matricular a un estudiante en una asignatura
        matricularAsignatura(nombreAsignatura) {
        // Comprobamos si el estudiante ya está matriculado en la asignatura
        if (this.asignaturas.some(a => a.nombre === nombreAsignatura)) {
            throw new Error("El estudiante ya está matriculado en esta asignatura."); // Excepción si ya está matriculado
        }
        // Si no está matriculado, creamos una nueva asignatura
        const nuevaAsignatura = new Asignatura(nombreAsignatura);
        nuevaAsignatura.fechaMatricula = new Date().toLocaleDateString('es-ES'); // Guardamos la fecha de matrícula
        // Agregamos la nueva asignatura al array de asignaturas del estudiante
        this.asignaturas.push(nuevaAsignatura);
        }
        // Método para desmatricular al estudiante de una asignatura
        desmatricularAsignatura(nombreAsignatura) {
        // Buscamos el índice de la asignatura que se quiere desmatricular
        let indice = this.asignaturas.findIndex(a => a.nombre === nombreAsignatura);
        // Si la asignatura existe, la eliminamos del array
        if (indice !== -1) {
            this.asignaturas.splice(indice, 1);
            // Registramos la fecha de desmatriculación
            this.asignaturas[indice].fechaDesmatricula = new Date().toLocaleDateString('es-ES');
        } else {
            // Si no se encuentra la asignatura, lanzamos un error
            throw new Error("Asignatura no encontrada.");
        }
        }
        // Método para agregar una calificación a una asignatura del estudiante
        agregarCalificacion(nombreAsignatura, calificacion) {
        // Buscamos la asignatura en el array
        let asignatura = this.asignaturas.find(a => a.nombre === nombreAsignatura);
        // Si la asignatura es encontrada, agregamos la calificación
        if (asignatura) {
            asignatura.agregarCalificacionAsignatura(calificacion); // Se llama al método para agregar calificación
        } else {
            // Si la asignatura no existe, lanzamos un error
            throw new Error("Asignatura no encontrada.");
        }
        }
        // Método para calcular el promedio general de todas las asignaturas
        calcularPromedioGeneral() {
        // Mapeamos las asignaturas para obtener los promedios de cada una
        let promedios = this.asignaturas.map(a => parseFloat(a.calcularPromedio()));
        // Calculamos el promedio general, si no hay asignaturas, el promedio es 0
        return promedios.length > 0 ? (promedios.reduce((a, b) => a + b, 0) / promedios.length).toFixed(2) : 0;
        }
        // Método para buscar asignaturas por un patrón de texto
        buscarAsignaturas(patron) {
            // Se crea una expresión regular para hacer la búsqueda insensible a mayúsculas y minúsculas
            const regex = new RegExp(patron, "i");
            // Filtramos las asignaturas del estudiante que coincidan con el patrón
            return this.asignaturas.filter(a => regex.test(a.nombre));
        }
        // Método para generar un reporte del estudiante con todas sus asignaturas y promedios
        generarReporte() {
            // Se inicializa el reporte con el nombre y ID del estudiante
            let reporte = `Reporte de ${this.nombre} (ID: ${this.id}):\n`;
            // Se recorre cada asignatura del estudiante y se agrega al reporte
            this.asignaturas.forEach(asignatura => {
            // Para cada asignatura, agregamos el nombre, calificaciones y promedio
            reporte += `  - ${asignatura.nombre}: Calificaciones: ${asignatura.calificaciones.join(", ")} [Promedio: ${asignatura.calcularPromedio()}]\n`;
            });
            // Al final, agregamos el promedio general del estudiante
            reporte += `Promedio General: ${this.calcularPromedioGeneral()}\n`;
            // Se retorna el reporte generado
            return reporte;
        }
        // Método para listar todas las asignaturas del estudiante
        listarAsignaturas() {
            // Usamos map() para transformar las asignaturas en un formato más sencillo
            return this.asignaturas.map(asignatura => ({
            nombre: asignatura.nombre, // Nombre de la asignatura
            calificaciones: asignatura.calificaciones, // Calificaciones de la asignatura
            promedio: asignatura.calcularPromedio(), // Promedio de la asignatura
            }));
        }
    }
    // Crear e instanciar el gestor de estudiantes
    const gestor = new GestorEstudiantes();
    // Crear direcciones para los estudiantes
    const direccionJuan = new Direccion("Calle Falsa", 123, "2B", "28080", "Madrid", "Madrid");
    const direccionMaria = new Direccion("Avenida Siempre Viva", 456, "1A", "28050", "Madrid", "Madrid");
    // Agregar estudiantes
    gestor.agregarEstudiante("Juan Perez", 20, direccionJuan);
    gestor.agregarEstudiante("Maria Lopez", 22, direccionMaria);
    // Mostrar los estudiantes en consola
    gestor.mostrarEstudiantes();
    // Matricular asignaturas para Juan y Maria
    const estudianteJuan = gestor.buscarEstudiante("E-12345"); // Asumimos que "E-12345" es el ID de Juan
    estudianteJuan.matricularAsignatura("Matemáticas");
    estudianteJuan.matricularAsignatura("Historia");
    const estudianteMaria = gestor.buscarEstudiante("E-67890"); // Asumimos que "E-67890" es el ID de Maria
    estudianteMaria.matricularAsignatura("Física");
    // Ver los estudiantes con sus asignaturas matriculadas
    gestor.mostrarEstudiantes();
    // Agregar calificaciones a las asignaturas
    estudianteJuan.agregarCalificacion("Matemáticas", 9);
    estudianteJuan.agregarCalificacion("Historia", 7);
    estudianteMaria.agregarCalificacion("Física", 8);
    // Ver el reporte de Juan
    console.log(estudianteJuan.generarReporte());
    // Mostrar el promedio general de Juan
    console.log(`Promedio general de Juan: ${estudianteJuan.calcularPromedioGeneral()}`);
    // Generar reporte completo del gestor de estudiantes
    console.log(gestor.generarReporteCompleto());
    // Desmatricular asignatura "Matemáticas" de Juan
    estudianteJuan.desmatricularAsignatura("Matemáticas");
    // Ver el reporte de Juan después de desmatricular la asignatura
    console.log(estudianteJuan.generarReporte());
    // Eliminar a Maria del sistema
    gestor.eliminarEstudiante(estudianteMaria.id);
    // Verificar que Maria ha sido eliminada
    gestor.mostrarEstudiantes();
    // Buscar estudiantes por nombre que contengan "Juan"
    const estudiantesEncontrados = gestor.buscarEstudiantes("Juan");
    console.log("Estudiantes encontrados:", estudiantesEncontrados);
    // Ver reporte de Juan
    console.log(estudianteJuan.generarReporte());  
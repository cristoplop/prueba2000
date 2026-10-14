/**
 * Banco de Preguntas contextualizadas para Ensayo SIMCE 4° Básico
 * Alineadas con los Estándares de Aprendizaje y Objetivos del Mineduc (OA 3 y OA 5)
 */
const SIMCE_DATA = [
    {
        id: 1,
        contexto: "Compras y Precios Escolares",
        enunciado: "En la librería del barrio, un paquete de lápices de cera cuesta $800 pesos o contiene 6 lápices de colores. Sofía compró 4 de estos paquetes para repartir con sus amigos del taller de arte. ¿Cuántos lápices de cera compró Sofía en total?",
        icono: "✏️",
        datosClave: "4 paquetes con 6 lápices cada uno",
        operacion: "4 × 6 = 24",
        alternativas: [
            { letra: "A", texto: "10 lápices (porque sumó 4 + 6)" },
            { letra: "B", texto: "20 lápices (porque calculó 4 × 5)" },
            { letra: "C", texto: "24 lápices (porque calculó 4 × 6)" },
            { letra: "D", texto: "28 lápices (porque calculó 4 × 7)" }
        ],
        correcta: 2,
        explicacion: "Para calcular el total de lápices en grupos iguales, multiplicamos la cantidad de paquetes por la cantidad de lápices que trae cada uno: 4 paquetes × 6 lápices = 24 lápices en total (o sumando 6 + 6 + 6 + 6 = 24)."
    },
    {
        id: 2,
        contexto: "Organización de Grupos en el Colegio",
        enunciado: "En el acto del Día del Libro, el profesor de 4° básico organizó a los 32 estudiantes en filas ordenadas. Si formó 4 filas con la misma cantidad de estudiantes en cada una, ¿cuántos estudiantes hay en cada fila?",
        icono: "🎒",
        datosClave: "32 estudiantes en 4 filas iguales",
        operacion: "4 × 8 = 32 (32 ÷ 4 = 8)",
        alternativas: [
            { letra: "A", texto: "6 estudiantes" },
            { letra: "B", texto: "7 estudiantes" },
            { letra: "C", texto: "8 estudiantes" },
            { letra: "D", texto: "9 estudiantes" }
        ],
        correcta: 2,
        explicacion: "Buscamos qué número multiplicado por 4 filas nos da 32 estudiantes: 4 × 8 = 32. Por lo tanto, en cada fila hay exactamente 8 estudiantes."
    },
    {
        id: 3,
        contexto: "Distribución de Frutas y Vida Sana",
        enunciado: "Para la colación saludable de la semana, Don Manuel preparó 7 bolsas con 5 mandarinas cada una. Su hija Martina dice que hay 35 mandarinas en total. ¿Es correcta la afirmación de Martina?",
        icono: "🍊",
        datosClave: "7 bolsas con 5 mandarinas cada una",
        operacion: "7 × 5 = 35",
        alternativas: [
            { letra: "A", texto: "No, porque 7 × 5 = 30 mandarinas" },
            { letra: "B", texto: "Sí, porque 7 × 5 = 35 mandarinas" },
            { letra: "C", texto: "No, porque faltó sumar 7 + 5 = 12" },
            { letra: "D", texto: "Sí, pero solo si cada bolsa tuviera 6 mandarinas" }
        ],
        correcta: 1,
        explicacion: "Martina tiene toda la razón: 7 grupos de 5 unidades corresponden a la multiplicación 7 × 5 = 35 mandarinas (contando de 5 en 5: 5, 10, 15, 20, 25, 30, 35)."
    },
    {
        id: 4,
        contexto: "Arreglos Rectangulares y Cuadrículas",
        enunciado: "En la sala de computación del colegio se instalaron escritorios ordenados en 5 columnas y 8 filas. Cada puesto cuenta con un computador. ¿Cuántos computadores hay en total en la sala?",
        icono: "💻",
        datosClave: "5 columnas y 8 filas de computadores",
        operacion: "5 × 8 = 40 (o 8 × 5 = 40)",
        alternativas: [
            { letra: "A", texto: "13 computadores" },
            { letra: "B", texto: "35 computadores" },
            { letra: "C", texto: "40 computadores" },
            { letra: "D", texto: "45 computadores" }
        ],
        correcta: 2,
        explicacion: "En un arreglo rectangular o cuadrícula, el total se calcula multiplicando filas por columnas: 5 × 8 = 40 computadores (gracias a la propiedad conmutativa, 8 × 5 también da 40)."
    },
    {
        id: 5,
        contexto: "Juegos y Puntajes en Equipos",
        enunciado: "En la kermesse de la escuela, el juego de tiro al blanco otorga 9 puntos por cada acierto en el círculo central. Matías logró acertar 7 veces en el centro. ¿Cuántos puntos consiguió en total?",
        icono: "🎯",
        datosClave: "7 aciertos de 9 puntos cada uno",
        operacion: "7 × 9 = 63",
        alternativas: [
            { letra: "A", texto: "56 puntos" },
            { letra: "B", texto: "63 puntos" },
            { letra: "C", texto: "72 puntos" },
            { letra: "D", texto: "81 puntos" }
        ],
        correcta: 1,
        explicacion: "Multiplicamos los 7 tiros por el valor de 9 puntos: 7 × 9 = 63 puntos. Podemos usar el truco: (7 × 10) - 7 = 70 - 7 = 63 puntos."
    },
    {
        id: 6,
        contexto: "Lectura y Biblioteca Escolar",
        enunciado: "Durante el desafío de lectura escolar, Benjamín leyó 8 páginas de una novela ilustrada cada día de la semana (de lunes a domingo, es decir, durante 7 días). ¿Cuántas páginas leyó en esa semana?",
        icono: "📖",
        datosClave: "8 páginas diarias por 7 días seguidos",
        operacion: "8 × 7 = 56",
        alternativas: [
            { letra: "A", texto: "48 páginas" },
            { letra: "B", texto: "54 páginas" },
            { letra: "C", texto: "56 páginas" },
            { letra: "D", texto: "64 páginas" }
        ],
        correcta: 2,
        explicacion: "Una semana completa tiene 7 días. Multiplicamos 8 páginas por 7 días: 8 × 7 = 56 páginas en total. ¡Excelente hábito de lectura!"
    },
    {
        id: 7,
        contexto: "Huerto Escolar y Cultivo de Plantas",
        enunciado: "Los estudiantes de 4° básico sembraron lechugas en el huerto escolar. Prepararon 6 canteros largos y en cada cantero plantaron 9 lechugas. ¿Cuántas lechugas plantaron en total?",
        icono: "🌱",
        datosClave: "6 canteros con 9 lechugas en cada uno",
        operacion: "6 × 9 = 54",
        alternativas: [
            { letra: "A", texto: "15 lechugas" },
            { letra: "B", texto: "45 lechugas" },
            { letra: "C", texto: "54 lechugas" },
            { letra: "D", texto: "63 lechugas" }
        ],
        correcta: 2,
        explicacion: "Calculamos 6 grupos de 9 lechugas: 6 × 9 = 54 lechugas. Recuerda que los dígitos de la tabla del 9 suman 9: 5 + 4 = 9."
    },
    {
        id: 8,
        contexto: "Deportes y Mini Torneo de Fútbol",
        enunciado: "Para un campeonato de fútbol relámpago, se inscribieron 8 equipos. Cada equipo tiene 6 jugadores titulares en la cancha. ¿Cuántos jugadores titulares participarán simultáneamente?",
        icono: "⚽",
        datosClave: "8 equipos con 6 jugadores cada uno",
        operacion: "8 × 6 = 48",
        alternativas: [
            { letra: "A", texto: "42 jugadores" },
            { letra: "B", texto: "46 jugadores" },
            { letra: "C", texto: "48 jugadores" },
            { letra: "D", texto: "54 jugadores" }
        ],
        correcta: 2,
        explicacion: "Multiplicamos la cantidad de equipos por el número de jugadores: 8 × 6 = 48 jugadores en cancha."
    },
    {
        id: 9,
        contexto: "Reciclaje y Cuidado del Medio Ambiente",
        enunciado: "En la campaña de reciclaje de botellas plásticas, Francisca reunió 10 bolsas ecológicas. En cada bolsa logró colocar 8 botellas compactadas. ¿Cuántas botellas recicló en total Francisca?",
        icono: "♻️",
        datosClave: "10 bolsas con 8 botellas cada una",
        operacion: "10 × 8 = 80",
        alternativas: [
            { letra: "A", texto: "18 botellas" },
            { letra: "B", texto: "70 botellas" },
            { letra: "C", texto: "80 botellas" },
            { letra: "D", texto: "88 botellas" }
        ],
        correcta: 2,
        explicacion: "Multiplicar por 10 es agregar un cero al número: 10 bolsas × 8 botellas = 80 botellas plásticas recicladas."
    },
    {
        id: 10,
        contexto: "Celebración y Repostería Comunitaria",
        enunciado: "Para el aniversario del colegio, el centro de padres horneará queques. En cada bandeja entran 3 filas con 7 queques cada una. ¿Cuántos queques caben en una bandeja completa?",
        icono: "🧁",
        datosClave: "3 filas de 7 queques",
        operacion: "3 × 7 = 21",
        alternativas: [
            { letra: "A", texto: "10 queques" },
            { letra: "B", texto: "21 queques" },
            { letra: "C", texto: "24 queques" },
            { letra: "D", texto: "28 queques" }
        ],
        correcta: 1,
        explicacion: "3 filas con 7 queques cada una es 3 × 7 = 21 queques (7 + 7 + 7 = 21). ¡Una bandeja llena de delicias!"
    }
];

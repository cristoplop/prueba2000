/**
 * Base de Datos Pedagógica para las Tablas del 2 al 10
 * Diseñado conforme a los Objetivos de Aprendizaje de 4° Básico (Mineduc Chile)
 */
const TABLAS_DATA = {
    2: {
        numero: 2,
        titulo: "Tabla del 2: El Bosque de los Pares",
        color: "#2EC4B6",
        icono: "🌲",
        itemObjeto: "🍒 Cerezas",
        emojiItem: "🍒",
        reglaTruco: {
            nombre: "¡El Truco de los Gemelos!",
            explicacion: "Multiplicar por 2 es exactamente lo mismo que sumar un número consigo mismo (el doble). Por ejemplo: 2 × 6 es igual a 6 + 6 = 12.",
            patron: "Todos los resultados terminan en número PAR: 0, 2, 4, 6 u 8. ¡Nunca terminarán en impar!"
        },
        curiosidad: "Casi todas las aves tienen 2 alas y 2 patas. Si ves 7 flamencos en una laguna, ¡hay 2 × 7 = 14 patas!",
        desafios: [
            { pregunta: "En una caja de zapatos hay 2 zapatillas. Si compras 5 cajas, ¿cuántas zapatillas tienes en total?", operacion: "2 × 5", opciones: [8, 10, 12, 15], correcta: 10, pista: "Suma 5 + 5" },
            { pregunta: "Lucas tiene 8 bicicletas para reparar. Cada bicicleta tiene 2 ruedas. ¿Cuántas ruedas reparará en total?", operacion: "2 × 8", opciones: [14, 16, 18, 20], correcta: 16, pista: "El doble de 8 es 8 + 8" },
            { pregunta: "¿Cuál es el resultado de 2 × 9?", operacion: "2 × 9", opciones: [16, 17, 18, 19], correcta: 18, pista: "Suma 9 + 9" },
            { pregunta: "Camila horneó 7 bandejas con 2 galletas cada una. ¿Cuántas galletas horneó?", operacion: "2 × 7", opciones: [12, 14, 16, 21], correcta: 14, pista: "7 pares de galletas: 7 + 7" },
            { pregunta: "Si multiplicamos 2 por 4, obtenemos:", operacion: "2 × 4", opciones: [6, 8, 10, 12], correcta: 8, pista: "4 + 4 = 8" }
        ]
    },
    3: {
        numero: 3,
        titulo: "Tabla del 3: La Cueva de los Tríos",
        color: "#FF9F1C",
        icono: "💎",
        itemObjeto: "💎 Gemas",
        emojiItem: "💎",
        reglaTruco: {
            nombre: "¡El Secreto de la Suma Mágica!",
            explicacion: "Multiplicar por 3 es contar de tres en tres. ¡Hay una magia secreta!: si sumas los dígitos de cualquier resultado de la tabla del 3, ¡siempre te dará 3, 6 o 9! Ejemplo: 3 × 8 = 24 (2 + 4 = 6).",
            patron: "Los resultados alternan entre números impares y pares: 3 (impar), 6 (par), 9 (impar), 12 (par)..."
        },
        curiosidad: "Un triángulo tiene 3 lados y 3 vértices. Si construyes 6 triángulos con palitos de fósforo, ¿cuántos lados sumarán? ¡3 × 6 = 18 lados!",
        desafios: [
            { pregunta: "Cada triciclo tiene 3 ruedas. En el parque infantil hay 4 triciclos. ¿Cuántas ruedas hay en total?", operacion: "3 × 4", opciones: [9, 12, 15, 16], correcta: 12, pista: "Cuenta de 3 en 3: 3, 6, 9, 12" },
            { pregunta: "Martina lee 3 páginas de su libro de cuentos cada noche. ¿Cuántas páginas leerá en 7 noches?", operacion: "3 × 7", opciones: [18, 20, 21, 24], correcta: 21, pista: "3 veces 7 es 7 + 7 + 7 = 21" },
            { pregunta: "¿Cuál es el resultado de 3 × 9?", operacion: "3 × 9", opciones: [24, 26, 27, 30], correcta: 27, pista: "3 menos que 30: 30 - 3 = 27" },
            { pregunta: "Un semáforo tiene 3 luces de colores. ¿Cuántas luces hay en 6 semáforos juntos?", operacion: "3 × 6", opciones: [15, 18, 20, 21], correcta: 18, pista: "3 grupos de 6: 6 + 6 + 6" },
            { pregunta: "Si multiplicamos 3 × 5 obtenemos:", operacion: "3 × 5", opciones: [12, 15, 18, 20], correcta: 15, pista: "5 + 5 + 5" }
        ]
    },
    4: {
        numero: 4,
        titulo: "Tabla del 4: El Valle de los Dobles",
        color: "#E71D36",
        icono: "⚡",
        itemObjeto: "🍀 Tréboles",
        emojiItem: "🍀",
        reglaTruco: {
            nombre: "¡El Doble del Doble!",
            explicacion: "Como 4 es el doble de 2, para calcular la tabla del 4 solo calcula el doble y vuelve a duplicarlo. Ejemplo para 4 × 7: El doble de 7 es 14, y el doble de 14 es 28. ¡Así de fácil!",
            patron: "Todos los resultados terminan en números pares: 4, 8, 2, 6, 0."
        },
        curiosidad: "Un automóvil familiar tiene 4 ruedas. ¡En un estacionamiento con 9 autos hay 4 × 9 = 36 ruedas apoyadas en el suelo!",
        desafios: [
            { pregunta: "Un perro tiene 4 patas. Si en el patio juegan 6 perros, ¿cuántas patas hay en total?", operacion: "4 × 6", opciones: [20, 22, 24, 26], correcta: 24, pista: "Doble de 6 es 12, doble de 12 es 24" },
            { pregunta: "En una mesa se sientan 4 personas. ¿Cuántas personas caben en 8 mesas iguales?", operacion: "4 × 8", opciones: [28, 30, 32, 36], correcta: 32, pista: "El doble de 8 es 16, y 16 + 16 = 32" },
            { pregunta: "¿Cuál es el producto de 4 × 7?", operacion: "4 × 7", opciones: [24, 26, 28, 30], correcta: 28, pista: "14 + 14 = 28" },
            { pregunta: "Don Pedro compra 5 paquetes de pilas. Cada paquete trae 4 pilas. ¿Cuántas pilas tiene?", operacion: "4 × 5", opciones: [16, 18, 20, 22], correcta: 20, pista: "Cuenta de 4 en 4: 4, 8, 12, 16, 20" },
            { pregunta: "Calcula el resultado de 4 × 9:", operacion: "4 × 9", opciones: [32, 34, 36, 40], correcta: 36, pista: "Doble de 9 es 18, y 18 + 18 = 36" }
        ]
    },
    5: {
        numero: 5,
        titulo: "Tabla del 5: La Playa de las Manos y Relojes",
        color: "#4361EE",
        icono: "🏖️",
        itemObjeto: "⭐ Estrellas",
        emojiItem: "⭐",
        reglaTruco: {
            nombre: "¡El Baile del Cero y el Cinco!",
            explicacion: "Nuestras manos tienen 5 dedos y los minutos del reloj avanzan de 5 en 5. ¡Todos los resultados de la tabla del 5 terminan SIEMPRE en 0 o en 5! Si multiplicas por par termina en 0, si multiplicas por impar termina en 5.",
            patron: "5, 10, 15, 20, 25, 30, 35, 40, 45, 50."
        },
        curiosidad: "Una estrella de mar común tiene 5 brazos. Si una científica marina observa 8 estrellas de mar en las rocas, ¡observa 5 × 8 = 40 brazos!",
        desafios: [
            { pregunta: "Una moneda vale 5 puntos en un videojuego. Si juntas 7 monedas, ¿cuántos puntos ganaste?", operacion: "5 × 7", opciones: [30, 35, 40, 45], correcta: 35, pista: "Termina en 5 porque 7 es impar: 35" },
            { pregunta: "En cada mano tenemos 5 dedos. ¿Cuántos dedos hay en 8 manos?", operacion: "5 × 8", opciones: [35, 40, 45, 50], correcta: 40, pista: "8 es par, el resultado termina en 0: 40" },
            { pregunta: "¿Cuánto es 5 × 6?", operacion: "5 × 6", opciones: [25, 30, 35, 40], correcta: 30, pista: "Es la mitad de 10 × 6 (que es 60)" },
            { pregunta: "Florencia ahorra 5 monedas diarias durante 9 días. ¿Cuántas monedas reunió?", operacion: "5 × 9", opciones: [40, 45, 50, 54], correcta: 45, pista: "5 menos que 50: 50 - 5 = 45" },
            { pregunta: "Si multiplicamos 5 × 4 obtenemos:", operacion: "5 × 4", opciones: [15, 18, 20, 25], correcta: 20, pista: "5 + 5 + 5 + 5 = 20" }
        ]
    },
    6: {
        numero: 6,
        titulo: "Tabla del 6: La Ciudad de los Panales",
        color: "#7209B7",
        icono: "🐝",
        itemObjeto: "🍯 Frascos de Miel",
        emojiItem: "🍯",
        reglaTruco: {
            nombre: "¡El Doble de la Tabla del 3!",
            explicacion: "Como 6 es 3 × 2, para calcular la tabla del 6 puedes pensar en la del 3 y duplicar el resultado. O también: ¡multiplica por 5 y súmale un grupo más! Ejemplo: 6 × 7 = (5 × 7) + 7 = 35 + 7 = 42.",
            patron: "Al multiplicar 6 por un número par, ¡el resultado termina en ese mismo número! 6 × 2 = 12, 6 × 4 = 24, 6 × 6 = 36, 6 × 8 = 48."
        },
        curiosidad: "Los hexágonos de los panales de abejas tienen exactamente 6 lados perfectos. ¡Las abejas son ingenieras matemáticas!",
        desafios: [
            { pregunta: "Una caja de lápices trae 6 colores. Si un colegio compra 7 cajas para 4° básico, ¿cuántos lápices tienen?", operacion: "6 × 7", opciones: [36, 40, 42, 48], correcta: 42, pista: "5 × 7 = 35; suma 7 más = 42" },
            { pregunta: "Un dado común tiene 6 caras con puntos. Si lanzamos 5 dados, ¿cuántas caras suman en total?", operacion: "6 × 5", opciones: [28, 30, 32, 36], correcta: 30, pista: "6 × 5 es igual a 5 × 6" },
            { pregunta: "¿Cuál es el resultado de 6 × 6?", operacion: "6 × 6", opciones: [32, 34, 36, 38], correcta: 36, pista: "6 veces 6 termina en 6: ¡36!" },
            { pregunta: "En una pastelería venden cajitas con 6 alfajores. ¿Cuántos alfajores hay en 8 cajitas?", operacion: "6 × 8", opciones: [42, 46, 48, 54], correcta: 48, pista: "6 por número par termina en ese número: 48" },
            { pregunta: "Calcula 6 × 9:", operacion: "6 × 9", opciones: [50, 52, 54, 56], correcta: 54, pista: "6 menos que 60: 60 - 6 = 54" }
        ]
    },
    7: {
        numero: 7,
        titulo: "Tabla del 7: La Montaña Arcoíris",
        color: "#3A0CA3",
        icono: "🌈",
        itemObjeto: "🎨 Paletas de Pintura",
        emojiItem: "🎨",
        reglaTruco: {
            nombre: "¡El Secreto de los Días de la Semana!",
            explicacion: "Una semana tiene exactamente 7 días. Cada vez que multiplicas por 7, ¡estás contando semanas completas! 7 × 1 = 1 sem (7 días), 7 × 2 = 2 sem (14 días), 7 × 3 = 3 sem (21 días), 7 × 4 = 4 sem (28 días).",
            patron: "Puedes descomponer el 7 como (5 + 2). Por ejemplo: 7 × 6 = (5 × 6) + (2 × 6) = 30 + 12 = 42."
        },
        curiosidad: "El arcoíris tiene 7 colores principales (rojo, naranja, amarillo, verde, azul, añil y violeta). ¡7 colores mágicos en el cielo!",
        desafios: [
            { pregunta: "Las vacaciones de invierno duran exactamente 3 semanas. ¿Cuántos días de vacaciones son en total?", operacion: "7 × 3", opciones: [18, 20, 21, 24], correcta: 21, pista: "3 semanas de 7 días: 7 + 7 + 7 = 21" },
            { pregunta: "Un grupo scout tiene 7 patrullas con 8 integrantes cada una. ¿Cuántos scouts son en total?", operacion: "7 × 8", opciones: [54, 56, 58, 62], correcta: 56, pista: "Un truco famoso: 5, 6, 7, 8 -> ¡56 = 7 × 8!" },
            { pregunta: "¿Cuál es el resultado de 7 × 7?", operacion: "7 × 7", opciones: [47, 48, 49, 51], correcta: 49, pista: "7 veces 7 es un número antes del 50: 49" },
            { pregunta: "Una caja contiene 7 sobres de láminas de fútbol. Si compras 5 cajas, ¿cuántos sobres tienes?", operacion: "7 × 5", opciones: [30, 35, 40, 42], correcta: 35, pista: "7 × 5 es igual a 5 × 7" },
            { pregunta: "Calcula 7 × 9:", operacion: "7 × 9", opciones: [58, 61, 63, 67], correcta: 63, pista: "7 menos que 70: 70 - 7 = 63" }
        ]
    },
    8: {
        numero: 8,
        titulo: "Tabla del 8: El Océano de los Pulpos",
        color: "#0077B6",
        icono: "🐙",
        itemObjeto: "🐚 Caracolas",
        emojiItem: "🐚",
        reglaTruco: {
            nombre: "¡El Triple Doble (2 × 2 × 2)!",
            explicacion: "El número 8 es el doble del doble del doble. Para multiplicar cualquier número por 8, ¡solo duplícalo 3 veces seguidas! Ejemplo para 8 × 6: Duplica 6 -> 12, duplica 12 -> 24, duplica 24 -> 48.",
            patron: "Las unidades de los resultados van restando de a 2: 8, 6, 4, 2, 0, 8, 6, 4, 2, 0."
        },
        curiosidad: "Los pulpos tienen 8 tentáculos y las arañas tienen 8 patas. ¡Si 4 arañas tejen telas juntas, tienen 8 × 4 = 32 patas!",
        desafios: [
            { pregunta: "Un pulpo tiene 8 tentáculos. En un acuario nadan 6 pulpos. ¿Cuántos tentáculos hay en total?", operacion: "8 × 6", opciones: [44, 46, 48, 52], correcta: 48, pista: "Duplica 6 tres veces: 6 -> 12 -> 24 -> 48" },
            { pregunta: "Un estante de la biblioteca escolar tiene 8 repisas. Cada repisa soporta 9 libros. ¿Cuántos libros caben?", operacion: "8 × 9", opciones: [68, 70, 72, 74], correcta: 72, pista: "8 menos que 80: 80 - 8 = 72" },
            { pregunta: "¿Cuánto es 8 × 8?", operacion: "8 × 8", opciones: [60, 62, 64, 68], correcta: 64, pista: "El tablero de ajedrez tiene 8 × 8 casillas = 64" },
            { pregunta: "En una fábrica empaquetan 8 yogures por bandeja. ¿Cuántos yogures hay en 7 bandejas?", operacion: "8 × 7", opciones: [54, 56, 58, 60], correcta: 56, pista: "Recuerda: 56 = 7 × 8" },
            { pregunta: "Si multiplicamos 8 × 4 obtenemos:", operacion: "8 × 4", opciones: [28, 30, 32, 36], correcta: 32, pista: "El doble de 8 es 16, y el doble de 16 es 32" }
        ]
    },
    9: {
        numero: 9,
        titulo: "Tabla del 9: El Espacio Exterior Mágico",
        color: "#F72585",
        icono: "🚀",
        itemObjeto: "🪐 Planetas",
        emojiItem: "🪐",
        reglaTruco: {
            nombre: "¡El Asombroso Truco de los Dedos y el 9!",
            explicacion: "Abre tus 10 dedos. Para 9 × 4, baja el dedo número 4: a la izquierda te quedan 3 dedos (decenas) y a la derecha te quedan 6 dedos (unidades) -> ¡36! Además, ¡la suma de los dos dígitos SIEMPRE suma 9! (0+9=9, 1+8=9, 2+7=9, 3+6=9...).",
            patron: "Las decenas suben (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) mientras las unidades bajan (9, 8, 7, 6, 5, 4, 3, 2, 1, 0)."
        },
        curiosidad: "El 9 es un número con propiedades fascinantes. Multiplicar por 9 es igual a multiplicar por 10 y restar el número una vez: 9 × 7 = 70 - 7 = 63.",
        desafios: [
            { pregunta: "Una nave espacial recorre 9 kilómetros por segundo. ¿Cuántos kilómetros recorrerá en 6 segundos?", operacion: "9 × 6", opciones: [52, 54, 56, 58], correcta: 54, pista: "Los dígitos deben sumar 9: 5 + 4 = 9 -> 54" },
            { pregunta: "En una competencia deportiva participan 9 equipos de 8 estudiantes cada uno. ¿Cuántos estudiantes compiten?", operacion: "9 × 8", opciones: [68, 70, 72, 76], correcta: 72, pista: "7 + 2 = 9; 80 - 8 = 72" },
            { pregunta: "¿Cuál es el resultado de 9 × 9?", operacion: "9 × 9", opciones: [79, 81, 83, 89], correcta: 81, pista: "8 + 1 = 9; 9 menos que 90 = 81" },
            { pregunta: "Un juego de mesa trae 9 fichas de colores por jugador. Si juegan 5 amigos, ¿cuántas fichas se usan?", operacion: "9 × 5", opciones: [40, 45, 50, 54], correcta: 45, pista: "La mitad de 90 es 45" },
            { pregunta: "Calcula el resultado de 9 × 7:", operacion: "9 × 7", opciones: [61, 63, 65, 67], correcta: 63, pista: "6 + 3 = 9; 70 - 7 = 63" }
        ]
    },
    10: {
        numero: 10,
        titulo: "Tabla del 10: La Fortaleza Dorada",
        color: "#FB8500",
        icono: "🏰",
        itemObjeto: "💰 Monedas Doradas",
        emojiItem: "💰",
        reglaTruco: {
            nombre: "¡El Poder de Agregar el Cero!",
            explicacion: "Multiplicar por 10 es la operación más divertida del universo decimal: ¡solo debes tomar el número original y colocarle un CERO a su derecha! Ejemplo: 10 × 7 = 70, 10 × 4 = 40.",
            patron: "Todos los resultados terminan en CERO: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100."
        },
        curiosidad: "Tenemos un sistema de numeración decimal porque los seres humanos tenemos 10 dedos en las manos para contar.",
        desafios: [
            { pregunta: "En la librería venden cajas con 10 plumones. Si la profesora compra 6 cajas, ¿cuántos plumones tiene?", operacion: "10 × 6", opciones: [50, 60, 70, 80], correcta: 60, pista: "Agrega un 0 al 6: 60" },
            { pregunta: "Tomás ahorró 8 billetes de $10 (monedas o fichas de 10). ¿Cuánto dinero reunió en total?", operacion: "10 × 8", opciones: [70, 80, 90, 100], correcta: 80, pista: "8 decenas equivalen a 80" },
            { pregunta: "¿Cuál es el producto de 10 × 10?", operacion: "10 × 10", opciones: [90, 100, 110, 1000], correcta: 100, pista: "Una centena completa: 100" },
            { pregunta: "Un edificio tiene 10 pisos y en cada piso hay 9 oficinas. ¿Cuántas oficinas hay en total?", operacion: "10 × 9", opciones: [80, 89, 90, 99], correcta: 90, pista: "Agrega un 0 al 9: 90" },
            { pregunta: "Si multiplicamos 10 × 4 obtenemos:", operacion: "10 × 4", opciones: [30, 40, 50, 60], correcta: 40, pista: "4 decenas = 40" }
        ]
    }
};

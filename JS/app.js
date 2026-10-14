/**
 * Controlador Principal de la Plataforma Mundo Tablas 4° Básico
 * Administra el progreso del estudiante, módulos de aprendizaje, juegos y ensayo SIMCE
 */

// Estado global de la aplicación
const AppState = {
    estudiante: {
        nombre: "Estudiante",
        avatar: "avatar1"
    },
    progreso: {
        tablas: {
            2: { completada: false, estrellas: 0, puntaje: 0 },
            3: { completada: false, estrellas: 0, puntaje: 0 },
            4: { completada: false, estrellas: 0, puntaje: 0 },
            5: { completada: false, estrellas: 0, puntaje: 0 },
            6: { completada: false, estrellas: 0, puntaje: 0 },
            7: { completada: false, estrellas: 0, puntaje: 0 },
            8: { completada: false, estrellas: 0, puntaje: 0 },
            9: { completada: false, estrellas: 0, puntaje: 0 },
            10: { completada: false, estrellas: 0, puntaje: 0 }
        },
        puntosXP: 0,
        medallas: [],
        simceDesbloqueado: false,
        simceRealizado: false,
        simcePuntaje: 0,
        simceRespuestas: {}
    },
    modoProfeActivo: false,
    progresoRealBackup: null,
    // Estado de la tabla abierta actualmente
    tablaActiva: null,
    multiplicadorActual: 1,
    // Estado del juego activo
    juegoActivo: null,
    // Estado del ensayo SIMCE
    simcePreguntaActual: 0,
    simceRespuestasTemp: {}
};

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
    cargarSesion();
    crearFondoAnimadoSistema();
    renderizarPerfil();
    renderizarMapaTablas();
    renderizarProgresoGlobal();
    configurarEventosNavegacion();
    comprobarDesbloqueoSIMCE(false); // Verificar sin sonido al inicio
});

/**
 * Cargar datos de localStorage o redirigir a Login si no hay usuario
 */
function cargarSesion() {
    const nombreGuardado = localStorage.getItem('mundotablas_nombre');
    const avatarGuardado = localStorage.getItem('mundotablas_avatar');

    if (!nombreGuardado) {
        // Redirigir a login si intenta ingresar directo
        window.location.href = '../index.html';
        return;
    }

    AppState.estudiante.nombre = nombreGuardado;
    AppState.estudiante.avatar = avatarGuardado || 'avatar1';

    // Clave individualizada por estudiante: al entrar con otro nombre comienza en cero
    const keyEstudiante = 'mundotablas_progreso_' + nombreGuardado.toLowerCase().trim();
    const progresoGuardado = localStorage.getItem(keyEstudiante) || localStorage.getItem('mundotablas_progreso');

    if (progresoGuardado) {
        try {
            const parsed = JSON.parse(progresoGuardado);
            AppState.progreso = { ...AppState.progreso, ...parsed };
        } catch (e) {
            console.error("Error al leer progreso guardado", e);
        }
    } else {
        // Estudiante nuevo: garantizar progreso limpio en cero
        AppState.progreso = {
            tablas: {
                2: { completada: false, estrellas: 0, puntaje: 0 },
                3: { completada: false, estrellas: 0, puntaje: 0 },
                4: { completada: false, estrellas: 0, puntaje: 0 },
                5: { completada: false, estrellas: 0, puntaje: 0 },
                6: { completada: false, estrellas: 0, puntaje: 0 },
                7: { completada: false, estrellas: 0, puntaje: 0 },
                8: { completada: false, estrellas: 0, puntaje: 0 },
                9: { completada: false, estrellas: 0, puntaje: 0 },
                10: { completada: false, estrellas: 0, puntaje: 0 }
            },
            puntosXP: 0,
            medallas: [],
            simceDesbloqueado: false,
            simceRealizado: false,
            simcePuntaje: 0,
            simceRespuestas: {}
        };
    }
}

/**
 * Guardar estado actual en localStorage
 */
function guardarProgreso() {
    if (AppState.estudiante && AppState.estudiante.nombre) {
        const keyEstudiante = 'mundotablas_progreso_' + AppState.estudiante.nombre.toLowerCase().trim();
        localStorage.setItem(keyEstudiante, JSON.stringify(AppState.progreso));
    }
    localStorage.setItem('mundotablas_progreso', JSON.stringify(AppState.progreso));
    renderizarPerfil();
    renderizarProgresoGlobal();
}

/**
 * Renderizar la barra de perfil del estudiante
 */
function renderizarPerfil() {
    const avatarImg = document.getElementById('userAvatarImg');
    const userName = document.getElementById('userName');
    const userXP = document.getElementById('userXP');
    const userStars = document.getElementById('userStars');
    const userRango = document.getElementById('userRango');

    if (avatarImg) avatarImg.src = `IMAGEN/${AppState.estudiante.avatar}.svg`;
    if (userName) userName.textContent = AppState.estudiante.nombre;
    if (userXP) userXP.textContent = AppState.progreso.puntosXP + " XP";

    // Contar total de estrellas
    let totalEstrellas = 0;
    Object.values(AppState.progreso.tablas).forEach(t => totalEstrellas += (t.estrellas || 0));
    if (userStars) userStars.textContent = totalEstrellas + " / 27";

    // Asignar rango según XP
    let rango = "Novato Numérico 🌱";
    if (AppState.progreso.puntosXP >= 800) rango = "Gran Matemago 🧙‍♂️✨";
    else if (AppState.progreso.puntosXP >= 500) rango = "Capitán del Cálculo 🚀";
    else if (AppState.progreso.puntosXP >= 250) rango = "Explorador Experto 🧭";
    else if (AppState.progreso.puntosXP >= 100) rango = "Detective Veloz 🔍";
    
    if (userRango) userRango.textContent = rango;
}

/**
 * Renderizar tarjetas interactivas de las tablas del 2 al 10 (Diseño Gamificado Súper Llamativo)
 */
function renderizarMapaTablas() {
    const contenedor = document.getElementById('tablasGrid');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    for (let n = 2; n <= 10; n++) {
        const data = TABLAS_DATA[n];
        const prog = AppState.progreso.tablas[n] || { completada: false, estrellas: 0 };

        const card = document.createElement('div');
        card.className = `tabla-card ${prog.completada ? 'completada' : ''}`;
        card.style.setProperty('--card-color', data.color);

        // Sonido interactivo suave al pasar el cursor
        card.onmouseenter = () => {
            if (window.sound) window.sound.playClick();
        };

        // Generar estrellas visuales con brillo dinámico
        let estrellasHTML = '';
        for (let s = 1; s <= 3; s++) {
            estrellasHTML += `<span class="estrella-icono ${s <= prog.estrellas ? 'activa' : ''}">⭐</span>`;
        }

        const nombreMundo = `Mundo ${n - 1}: ${data.titulo.split(':')[1] ? data.titulo.split(':')[1].trim() : 'Aventura'}`;

        card.innerHTML = `
            <div class="card-watermark">${n}</div>
            <div class="card-header">
                <span class="card-numero">${n}</span>
                <div class="card-mascot-box" title="${data.titulo}">${data.icono}</div>
            </div>
            <span class="card-world-tag">${nombreMundo}</span>
            <h3 class="card-title">${data.titulo.split(':')[0]}</h3>
            <p class="card-sub">${data.itemObjeto} • Múltiplos y Patrones</p>
            <div class="card-estrellas">${estrellasHTML}</div>
            <div class="card-status-pill ${prog.completada ? 'dominada' : ''}">
                ${prog.completada ? '🏆 ¡100% Dominada!' : '🎯 ¡Por Aprender y Practicar!'}
            </div>
            <button class="btn-abrir-tabla" onclick="abrirModuloTabla(${n})">
                <span>Entrar a la Tabla</span>
                <span class="btn-arrow-icon">➔</span>
            </button>
        `;

        contenedor.appendChild(card);
    }
}

/**
 * Configurar cambio de pestañas principales del menú
 */
function configurarEventosNavegacion() {
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    const sections = document.querySelectorAll('.seccion-contenido');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.sound.playClick();
            const targetSection = btn.getAttribute('data-target');

            navButtons.forEach(b => b.classList.remove('activo'));
            sections.forEach(s => s.classList.remove('activa'));

            btn.classList.add('activo');
            const secElem = document.getElementById(targetSection);
            if (secElem) secElem.classList.add('activa');

            if (targetSection === 'seccion-simce') {
                prepararPantallaSIMCE();
            } else if (targetSection === 'seccion-juegos') {
                cargarMenuJuegos();
            } else if (targetSection === 'seccion-progreso') {
                renderizarProgresoDetallado();
            }
        });
    });

    // Botón de sonido global
    const btnMute = document.getElementById('btnMuteAudio');
    if (btnMute) {
        btnMute.addEventListener('click', () => {
            const muted = window.sound.toggleMute();
            btnMute.innerHTML = muted ? '🔇 <span>Silencio</span>' : '🔊 <span>Sonido ON</span>';
            btnMute.classList.toggle('muted', muted);
        });
    }

    // Botón Salir / Cambiar Estudiante
    const btnSalir = document.getElementById('btnSalir');
    if (btnSalir) {
        btnSalir.addEventListener('click', () => {
            window.sound.playClick();
            if (confirm("¿Deseas volver a la pantalla de ingreso? Tu progreso se mantendrá guardado.")) {
                window.location.href = '../index.html';
            }
        });
    }
}

// =========================================================================
// MÓDULO INTERACTIVO DE APRENDIZAJE DE UNA TABLA (TABLAS 2 AL 10)
// =========================================================================

function abrirModuloTabla(num) {
    window.sound.playSelect();
    AppState.tablaActiva = num;
    AppState.multiplicadorActual = 1;

    const modal = document.getElementById('modalTabla');
    const data = TABLAS_DATA[num];

    document.getElementById('modalTablaTitulo').innerHTML = `
        <span style="background:${data.color}; color:#fff; padding: 4px 12px; border-radius:12px; margin-right:8px;">${num}</span>
        ${data.titulo}
    `;

    // Cambiar a la primera sub-pestaña (Visualizador)
    cambiarSubTabTabla('visualizador');
    actualizarVisualizadorMultiplicacion();

    // Cargar datos pedagógicos
    document.getElementById('trucoNombre').textContent = data.reglaTruco.nombre;
    document.getElementById('trucoExplicacion').textContent = data.reglaTruco.explicacion;
    document.getElementById('trucoPatron').textContent = data.reglaTruco.patron;
    document.getElementById('trucoCuriosidad').textContent = data.curiosidad;

    modal.classList.add('abierto');
}

function cerrarModalTabla() {
    window.sound.playClick();
    document.getElementById('modalTabla').classList.remove('abierto');
    renderizarMapaTablas();
    renderizarPerfil();
    renderizarProgresoGlobal();
    comprobarDesbloqueoSIMCE(true);
}

function cambiarSubTabTabla(tabId) {
    window.sound.playClick();
    document.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('activo'));
    document.querySelectorAll('.subtab-content').forEach(c => c.classList.remove('activo'));

    const btn = document.querySelector(`.subtab-btn[data-subtab="${tabId}"]`);
    const content = document.getElementById(`subtab-${tabId}`);

    if (btn) btn.classList.add('activo');
    if (content) content.classList.add('activo');

    if (tabId === 'desafio') {
        iniciarDesafioTabla(AppState.tablaActiva);
    }
}

/**
 * Actualiza el visualizador animado con grupos de objetos y recta numérica
 */
function actualizarVisualizadorMultiplicacion() {
    const num = AppState.tablaActiva;
    const factor = AppState.multiplicadorActual;
    const data = TABLAS_DATA[num];
    const producto = num * factor;

    // Actualizar badges numéricos con animación de rebote
    const factorAElem = document.getElementById('visFactorA');
    const factorBElem = document.getElementById('visFactorB');
    const resElem = document.getElementById('visResultado');

    if (factorAElem) factorAElem.textContent = num;
    if (factorBElem) {
        factorBElem.textContent = factor;
        factorBElem.classList.remove('anim-bounce-pop');
        void factorBElem.offsetWidth;
        factorBElem.classList.add('anim-bounce-pop');
    }
    if (resElem) {
        resElem.textContent = producto;
        resElem.classList.remove('anim-bounce-pop');
        void resElem.offsetWidth;
        resElem.classList.add('anim-bounce-pop');
    }

    // Generar la suma repetida (ej: 6 + 6 + 6)
    const arraySumandos = Array(factor).fill(num);
    document.getElementById('visSumaIterada').innerHTML = `
        <strong>Suma Repetida:</strong> ${arraySumandos.join(' + ')} = <span class="badge-res">${producto}</span>
    `;

    // Renderizar grupos de objetos visuales animados
    const contenedorGrupos = document.getElementById('visGruposContenedor');
    contenedorGrupos.innerHTML = '';

    for (let g = 1; g <= factor; g++) {
        const grupoCard = document.createElement('div');
        grupoCard.className = 'grupo-caja anim-pop';
        grupoCard.style.animationDelay = `${g * 0.04}s`;

        let itemsHTML = '';
        for (let i = 1; i <= num; i++) {
            itemsHTML += `<span class="objeto-item" title="${data.itemObjeto}" onclick="lanzarMiniConfeti(this); if(window.sound) window.sound.playCoin();">${data.emojiItem}</span>`;
        }

        grupoCard.innerHTML = `
            <div class="grupo-label">Grupo ${g} (${num} elem.)</div>
            <div class="grupo-items">${itemsHTML}</div>
        `;
        contenedorGrupos.appendChild(grupoCard);
    }

    // Renderizar recta numérica con saltos animados
    renderizarRectaNumerica(num, factor);
}

function cambiarFactorVisualizador(delta) {
    let nuevo = AppState.multiplicadorActual + delta;
    if (nuevo < 1) nuevo = 1;
    if (nuevo > 10) nuevo = 10;
    
    if (nuevo !== AppState.multiplicadorActual) {
        AppState.multiplicadorActual = nuevo;
        window.sound.playJump();
        actualizarVisualizadorMultiplicacion();
    }
}

function setFactorDirecto(factor) {
    AppState.multiplicadorActual = factor;
    window.sound.playSelect();
    actualizarVisualizadorMultiplicacion();
}

/**
 * Renderiza la recta numérica interactiva con sapito/personaje que salta
 */
function renderizarRectaNumerica(paso, saltos) {
    const recta = document.getElementById('rectaNumericaSaltos');
    if (!recta) return;

    recta.innerHTML = '';
    const maxVal = Math.max(paso * 10, 20);

    for (let i = 0; i <= 10; i++) {
        const val = paso * i;
        const tick = document.createElement('div');
        tick.className = `recta-tick ${i <= saltos ? 'alcanzado' : ''} ${i === saltos ? 'activo' : ''}`;
        tick.innerHTML = `
            <div class="tick-marcador"></div>
            <span class="tick-valor">${val}</span>
            ${i === saltos ? '<span class="tick-personaje">🐸</span>' : ''}
        `;
        recta.appendChild(tick);
    }
}

// =========================================================================
// MINIDESAFÍO DE MAESTRÍA DE LA TABLA (5 Preguntas dinámicas)
// =========================================================================

let estadoDesafioTabla = {
    numTabla: 2,
    preguntaIndex: 0,
    aciertos: 0,
    preguntas: []
};

function iniciarDesafioTabla(num) {
    const data = TABLAS_DATA[num];
    estadoDesafioTabla = {
        numTabla: num,
        preguntaIndex: 0,
        aciertos: 0,
        // Mezclar preguntas aleatoriamente
        preguntas: [...data.desafios].sort(() => Math.random() - 0.5)
    };

    mostrarPreguntaDesafio();
}

function mostrarPreguntaDesafio() {
    const des = estadoDesafioTabla;
    const contenedor = document.getElementById('desafioContenedor');
    if (!contenedor) return;

    if (des.preguntaIndex >= des.preguntas.length) {
        finalizarDesafioTabla();
        return;
    }

    const item = des.preguntas[des.preguntaIndex];
    const nroPregunta = des.preguntaIndex + 1;

    contenedor.innerHTML = `
        <div class="desafio-card anim-slide-in">
            <div class="desafio-header">
                <span class="badge-progreso">Pregunta ${nroPregunta} de ${des.preguntas.length}</span>
                <span class="badge-operacion">${item.operacion} = ?</span>
            </div>
            <p class="desafio-enunciado">${item.pregunta}</p>
            <div class="desafio-opciones-grid" id="desafioOpciones"></div>
            <div class="desafio-pista-box" id="desafioPistaBox" style="display:none;">
                💡 <strong>Pista de Ayuda:</strong> ${item.pista}
            </div>
            <button class="btn-pedir-pista" onclick="togglePistaDesafio()">💡 Ver Pista</button>
        </div>
    `;

    const grid = document.getElementById('desafioOpciones');
    item.opciones.forEach(opc => {
        const btn = document.createElement('button');
        btn.className = 'btn-opcion-desafio';
        btn.textContent = opc;
        btn.onclick = () => responderDesafioTabla(opc, item.correcta, btn);
        grid.appendChild(btn);
    });
}

function togglePistaDesafio() {
    window.sound.playClick();
    const box = document.getElementById('desafioPistaBox');
    if (box) {
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
}

function responderDesafioTabla(elegida, correcta, btnElem) {
    const todosBtns = document.querySelectorAll('.btn-opcion-desafio');
    todosBtns.forEach(b => b.disabled = true);

    if (elegida === correcta) {
        window.sound.playSuccess();
        window.sound.playCoin();
        btnElem.classList.add('correcta');
        estadoDesafioTabla.aciertos++;
        lanzarMiniConfeti(btnElem);
    } else {
        window.sound.playError();
        btnElem.classList.add('incorrecta');
        todosBtns.forEach(b => {
            if (parseInt(b.textContent) === correcta) b.classList.add('correcta');
        });
    }

    setTimeout(() => {
        estadoDesafioTabla.preguntaIndex++;
        mostrarPreguntaDesafio();
    }, 1500);
}

function finalizarDesafioTabla() {
    const des = estadoDesafioTabla;
    const num = des.numTabla;
    const total = des.preguntas.length;
    const aciertos = des.aciertos;

    let estrellasGanadas = 1;
    if (aciertos >= 5) estrellasGanadas = 3;
    else if (aciertos >= 3) estrellasGanadas = 2;

    const puntosSumar = aciertos * 25;
    AppState.progreso.puntosXP += puntosSumar;

    // Actualizar estado de la tabla
    const tablaState = AppState.progreso.tablas[num];
    if (estrellasGanadas > (tablaState.estrellas || 0)) {
        tablaState.estrellas = estrellasGanadas;
    }
    tablaState.completada = true;
    tablaState.puntaje = Math.max(tablaState.puntaje || 0, aciertos * 20);

    guardarProgreso();

    window.sound.playFanfare();

    const contenedor = document.getElementById('desafioContenedor');
    contenedor.innerHTML = `
        <div class="resultado-desafio-card anim-bounce">
            <h2>🎉 ¡Desafío Completado! 🎉</h2>
            <div class="estrellas-grandes">
                ${'⭐'.repeat(estrellasGanadas)}${'☆'.repeat(3 - estrellasGanadas)}
            </div>
            <p class="resultado-texto">Obtuviste <strong>${aciertos} de ${total}</strong> respuestas correctas.</p>
            <p class="resultado-xp">¡Ganaste <strong>+${puntosSumar} XP</strong> de experiencia!</p>
            <div class="resultado-acciones">
                <button class="btn-primario" onclick="iniciarDesafioTabla(${num})">🔄 Repetir para mejorar</button>
                <button class="btn-secundario" onclick="cerrarModalTabla()">🗺️ Volver al Menú</button>
            </div>
        </div>
    `;

    comprobarDesbloqueoSIMCE(true);
}

// =========================================================================
// SISTEMA DE DESBLOQUEO DEL ENSAYO SIMCE
// =========================================================================

function verificarCondicionSIMCE() {
    // Para 4° básico: debe completar todas las tablas (del 2 al 10)
    for (let n = 2; n <= 10; n++) {
        if (!AppState.progreso.tablas[n] || !AppState.progreso.tablas[n].completada) {
            return false;
        }
    }
    return true;
}

function comprobarDesbloqueoSIMCE(conAnimacion = true) {
    const cumple = verificarCondicionSIMCE();
    const navBtnSIMCE = document.querySelector('.nav-tab-btn[data-target="seccion-simce"]');
    const badgeSIMCE = document.getElementById('simceNavBadge');

    if (cumple) {
        if (!AppState.progreso.simceDesbloqueado) {
            AppState.progreso.simceDesbloqueado = true;
            guardarProgreso();
            if (conAnimacion) {
                mostrarModalDesbloqueoSIMCE();
            }
        }
        if (badgeSIMCE) {
            badgeSIMCE.textContent = "¡LISTO!";
            badgeSIMCE.className = "nav-badge desbloqueado";
        }
    } else {
        // Mostrar cuántas tablas faltan
        let completadas = 0;
        for (let n = 2; n <= 10; n++) {
            if (AppState.progreso.tablas[n] && AppState.progreso.tablas[n].completada) completadas++;
        }
        if (badgeSIMCE) {
            badgeSIMCE.textContent = `${completadas}/9`;
            badgeSIMCE.className = "nav-badge bloqueado";
        }
    }
}

function mostrarModalDesbloqueoSIMCE() {
    window.sound.playUnlock();
    window.sound.playFanfare();

    const modal = document.getElementById('modalDesbloqueoSIMCE');
    if (modal) {
        modal.classList.add('abierto');
        lanzarSuperConfeti();
    }
}

function cerrarModalDesbloqueoSIMCE() {
    window.sound.playClick();
    document.getElementById('modalDesbloqueoSIMCE').classList.remove('abierto');
    // Ir a la pestaña SIMCE
    const btnSimce = document.querySelector('.nav-tab-btn[data-target="seccion-simce"]');
    if (btnSimce) btnSimce.click();
}

/**
 * Función especial para profesores o evaluación rápida: Alternar Modo Profesor ON / OFF
 */
function toggleModoProfe() {
    const btn = document.getElementById('btnModoProfe');
    const banner = document.getElementById('bannerModoProfe');

    if (!AppState.modoProfeActivo) {
        // ACTIVAR MODO PROFESOR
        if (window.sound) {
            window.sound.playUnlock();
            window.sound.playFanfare();
        }
        // Guardar snapshot del progreso real antes de activar
        AppState.progresoRealBackup = JSON.parse(JSON.stringify(AppState.progreso));
        AppState.modoProfeActivo = true;

        // Desbloquear todas las tablas con 3 estrellas y el SIMCE
        for (let n = 2; n <= 10; n++) {
            AppState.progreso.tablas[n].completada = true;
            AppState.progreso.tablas[n].estrellas = 3;
            AppState.progreso.tablas[n].puntaje = 100;
        }
        AppState.progreso.simceDesbloqueado = true;

        // Actualizar visual del botón y banner
        if (btn) {
            btn.innerHTML = '🔒 <span>Modo Profe: ON</span>';
            btn.classList.add('modo-profe-activo');
        }
        if (banner) {
            banner.style.display = 'flex';
        }

        renderizarMapaTablas();
        renderizarPerfil();
        renderizarProgresoGlobal();
        comprobarDesbloqueoSIMCE(true);
        prepararPantallaSIMCE();
        mostrarToast("🔓 ¡Modo Profesor ACTIVADO! Todas las tablas y el Ensayo SIMCE están desbloqueados.");
    } else {
        // DESACTIVAR MODO PROFESOR
        if (window.sound) {
            window.sound.playClick();
        }

        // Restaurar progreso real del estudiante
        if (AppState.progresoRealBackup) {
            AppState.progreso = JSON.parse(JSON.stringify(AppState.progresoRealBackup));
        }
        AppState.modoProfeActivo = false;
        AppState.progresoRealBackup = null;

        // Actualizar visual del botón y banner
        if (btn) {
            btn.innerHTML = '🔓 <span>Modo Profe</span>';
            btn.classList.remove('modo-profe-activo');
        }
        if (banner) {
            banner.style.display = 'none';
        }

        guardarProgreso();
        renderizarMapaTablas();
        renderizarPerfil();
        renderizarProgresoGlobal();
        comprobarDesbloqueoSIMCE(false);
        prepararPantallaSIMCE();
        mostrarToast("🔒 Modo Profesor DESACTIVADO: Se restauró el progreso real del estudiante.");
    }
}

function forzarDesbloqueoDocente() {
    toggleModoProfe();
}

/**
 * Toast flotante de notificación amigable
 */
function mostrarToast(mensaje) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = mensaje;
    toast.classList.add('visible');
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3200);
}

/**
 * Genera símbolos matemáticos animados y flotantes en el fondo del sistema
 */
function crearFondoAnimadoSistema() {
    const fondo = document.getElementById('sistemaFondoAnimado');
    if (!fondo) return;
    fondo.innerHTML = '';
    const simbolos = [
        '2 × 4 = 8', '3 × 7 = 21', '4 × 8 = 32', '5 × 6 = 30', '6 × 7 = 42',
        '7 × 8 = 56', '8 × 9 = 72', '9 × 9 = 81', '10 × 10 = 100', '★', '×', '÷', '+', '✨', '⚡'
    ];

    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.className = 'ambient-math-symbol';
        el.textContent = simbolos[i % simbolos.length];
        el.style.left = `${(i * 5.2 + Math.random() * 4) % 94}%`;
        el.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
        el.style.animationDelay = `${(i * 1.3) % 15}s`;
        el.style.animationDuration = `${14 + (i % 8)}s`;
        fondo.appendChild(el);
    }
}

// =========================================================================
// ETAPA 4: GRAN ENSAYO MATEMÁTICO TIPO SIMCE 4° BÁSICO
// =========================================================================

function prepararPantallaSIMCE() {
    const contenedorBloqueado = document.getElementById('simceBloqueado');
    const contenedorEnsayo = document.getElementById('simceEnsayoActivo');
    const contenedorResultados = document.getElementById('simceResultados');

    const estaDesbloqueado = AppState.progreso.simceDesbloqueado || verificarCondicionSIMCE();

    if (!estaDesbloqueado) {
        contenedorBloqueado.style.display = 'block';
        contenedorEnsayo.style.display = 'none';
        contenedorResultados.style.display = 'none';

        // Actualizar barra de progreso de desbloqueo
        let completadas = 0;
        for (let n = 2; n <= 10; n++) {
            if (AppState.progreso.tablas[n] && AppState.progreso.tablas[n].completada) completadas++;
        }
        const pct = Math.round((completadas / 9) * 100);
        document.getElementById('simceUnlockProgressText').textContent = `${completadas} de 9 tablas dominadas (${pct}%)`;
        document.getElementById('simceUnlockProgressBar').style.width = `${pct}%`;
        return;
    }

    // Si ya está desbloqueado:
    contenedorBloqueado.style.display = 'none';
    if (AppState.progreso.simceRealizado) {
        // Mostrar resultados previos pero con opción de repetir
        mostrarPantallaResultadosSIMCE();
    } else {
        iniciarNuevoEnsayoSIMCE();
    }
}

function iniciarNuevoEnsayoSIMCE() {
    AppState.simcePreguntaActual = 0;
    AppState.simceRespuestasTemp = {};

    document.getElementById('simceBloqueado').style.display = 'none';
    document.getElementById('simceEnsayoActivo').style.display = 'grid';
    document.getElementById('simceResultados').style.display = 'none';

    renderizarNavegadorSIMCE();
    mostrarPreguntaSIMCE(0);
}

function renderizarNavegadorSIMCE() {
    const nav = document.getElementById('simceNavPreguntas');
    if (!nav) return;
    nav.innerHTML = '';

    SIMCE_DATA.forEach((preg, idx) => {
        const btn = document.createElement('button');
        btn.className = `simce-nav-btn ${idx === AppState.simcePreguntaActual ? 'actual' : ''}`;
        
        // Comprobar si ya está respondida
        if (AppState.simceRespuestasTemp[idx] !== undefined) {
            btn.classList.add('respondida');
            btn.innerHTML = `${idx + 1} <span class="check-tick">✓</span>`;
        } else {
            btn.textContent = (idx + 1);
        }

        btn.onclick = () => {
            window.sound.playClick();
            mostrarPreguntaSIMCE(idx);
        };
        nav.appendChild(btn);
    });

    // Actualizar contador
    const respondidas = Object.keys(AppState.simceRespuestasTemp).length;
    document.getElementById('simceContadorRespondidas').textContent = `${respondidas} de ${SIMCE_DATA.length} respondidas`;
    
    // Habilitar o deshabilitar botón finalizar
    const btnFinalizar = document.getElementById('btnFinalizarSIMCE');
    if (btnFinalizar) {
        btnFinalizar.disabled = respondidas < SIMCE_DATA.length;
        if (!btnFinalizar.disabled) {
            btnFinalizar.classList.add('listo-para-enviar');
        } else {
            btnFinalizar.classList.remove('listo-para-enviar');
        }
    }
}

function mostrarPreguntaSIMCE(index) {
    AppState.simcePreguntaActual = index;
    const item = SIMCE_DATA[index];

    // Actualizar selector visual
    renderizarNavegadorSIMCE();

    const area = document.getElementById('simceAreaPregunta');
    if (!area) return;

    let seleccionPrevia = AppState.simceRespuestasTemp[index];

    let opcionesHTML = '';
    item.alternativas.forEach((alt, idxAlt) => {
        const estaSeleccionada = seleccionPrevia === idxAlt;
        opcionesHTML += `
            <div class="simce-opcion-card ${estaSeleccionada ? 'seleccionada' : ''}" onclick="seleccionarOpcionSIMCE(${index}, ${idxAlt})">
                <div class="simce-opcion-letra">${alt.letra}</div>
                <div class="simce-opcion-texto">${alt.texto}</div>
                <div class="simce-opcion-radio ${estaSeleccionada ? 'checked' : ''}"></div>
            </div>
        `;
    });

    area.innerHTML = `
        <div class="simce-pregunta-contenedor anim-fade-in">
            <div class="simce-pregunta-header">
                <span class="simce-tag-contexto">${item.icono} ${item.contexto}</span>
                <span class="simce-numero-badge">Pregunta ${index + 1} de ${SIMCE_DATA.length}</span>
            </div>
            <div class="simce-enunciado-caja">
                <p class="simce-enunciado-texto">${item.enunciado}</p>
                <div class="simce-datos-clave">
                    📌 <strong>Situación planteada:</strong> ${item.datosClave}
                </div>
            </div>
            <div class="simce-alternativas-lista">
                ${opcionesHTML}
            </div>
            <div class="simce-nav-acciones">
                <button class="btn-simce-nav" onclick="cambiarPreguntaSIMCE(-1)" ${index === 0 ? 'disabled' : ''}>
                    ⬅ Pregunta Anterior
                </button>
                <button class="btn-simce-nav" onclick="cambiarPreguntaSIMCE(1)" ${index === SIMCE_DATA.length - 1 ? 'disabled' : ''}>
                    Siguiente Pregunta ➡
                </button>
            </div>
        </div>
    `;
}

function seleccionarOpcionSIMCE(preguntaIdx, alternativaIdx) {
    window.sound.playSelect();
    AppState.simceRespuestasTemp[preguntaIdx] = alternativaIdx;
    mostrarPreguntaSIMCE(preguntaIdx);
}

function cambiarPreguntaSIMCE(delta) {
    window.sound.playClick();
    const nuevo = AppState.simcePreguntaActual + delta;
    if (nuevo >= 0 && nuevo < SIMCE_DATA.length) {
        mostrarPreguntaSIMCE(nuevo);
    }
}

function finalizarEnsayoSIMCE() {
    const total = SIMCE_DATA.length;
    const respondidas = Object.keys(AppState.simceRespuestasTemp).length;

    if (respondidas < total) {
        alert(`Debes responder todas las preguntas antes de finalizar el ensayo. Faltan ${total - respondidas} preguntas.`);
        return;
    }

    if (!confirm("¿Estás seguro de enviar tu Ensayo SIMCE? Revisaremos tus respuestas para entregarte tu puntaje y retroalimentación.")) {
        return;
    }

    window.sound.playFanfare();

    // Calcular puntaje
    let correctas = 0;
    SIMCE_DATA.forEach((p, idx) => {
        if (AppState.simceRespuestasTemp[idx] === p.correcta) {
            correctas++;
        }
    });

    AppState.progreso.simceRealizado = true;
    AppState.progreso.simcePuntaje = correctas;
    AppState.progreso.simceRespuestas = { ...AppState.simceRespuestasTemp };
    AppState.progreso.puntosXP += (correctas * 50);

    guardarProgreso();
    mostrarPantallaResultadosSIMCE();
}

function mostrarPantallaResultadosSIMCE() {
    document.getElementById('simceEnsayoActivo').style.display = 'none';
    document.getElementById('simceBloqueado').style.display = 'none';

    const resContenedor = document.getElementById('simceResultados');
    resContenedor.style.display = 'block';

    const puntaje = AppState.progreso.simcePuntaje || 0;
    const total = SIMCE_DATA.length;
    const porcentaje = Math.round((puntaje / total) * 100);

    let nivelSIMCE = "Nivel Inicial 🌱";
    let nivelColor = "#E63946";
    let felicitacion = "¡Buen esfuerzo! Continúa repasando las tablas y vuelve a intentarlo para alcanzar el nivel avanzado.";

    if (porcentaje >= 80) {
        nivelSIMCE = "Nivel Adecuado Sobresaliente 🏆⭐";
        nivelColor = "#2EC4B6";
        felicitacion = "¡Excelente dominio matemático! Tienes una comprensión sólida de la multiplicación y resolución de problemas tipo SIMCE.";
    } else if (porcentaje >= 50) {
        nivelSIMCE = "Nivel Elemental en Progreso 💡";
        nivelColor = "#FF9F1C";
        felicitacion = "¡Muy bien! Comprendes las bases de la multiplicación. Revisa la retroalimentación de cada pregunta para alcanzar el 100%.";
    }

    // Generar desglose de preguntas y retroalimentación
    let desgloseHTML = '';
    SIMCE_DATA.forEach((preg, idx) => {
        const respUsuario = AppState.progreso.simceRespuestas[idx];
        const esCorrecta = respUsuario === preg.correcta;
        const textoElegida = respUsuario !== undefined ? preg.alternativas[respUsuario].texto : 'Sin respuesta';
        const textoCorrecta = preg.alternativas[preg.correcta].texto;

        desgloseHTML += `
            <div class="simce-review-card ${esCorrecta ? 'acierto' : 'fallo'}">
                <div class="review-header">
                    <span class="review-status-icon">${esCorrecta ? '✅' : '❌'}</span>
                    <span class="review-nro">Pregunta ${idx + 1}: ${preg.contexto}</span>
                    <span class="review-tag">${esCorrecta ? '¡Correcta!' : 'Para revisar'}</span>
                </div>
                <p class="review-enunciado">${preg.enunciado}</p>
                <div class="review-respuestas-grid">
                    <div class="review-user-ans">
                        <strong>Tu respuesta:</strong> ${textoElegida}
                    </div>
                    <div class="review-correct-ans">
                        <strong>Respuesta correcta:</strong> ${textoCorrecta}
                    </div>
                </div>
                <div class="review-explicacion">
                    📘 <strong>Retroalimentación pedagógica:</strong> ${preg.explicacion}
                </div>
            </div>
        `;
    });

    resContenedor.innerHTML = `
        <div class="simce-score-banner anim-bounce">
            <div class="score-circle" style="border-color:${nivelColor}">
                <span class="score-number">${puntaje}/${total}</span>
                <span class="score-label">Correctas (${porcentaje}%)</span>
            </div>
            <div class="score-info">
                <h2 style="color:${nivelColor}">${nivelSIMCE}</h2>
                <p class="score-student">Estudiante: <strong>${AppState.estudiante.nombre}</strong></p>
                <p class="score-congrats">${felicitacion}</p>
                <div class="score-actions">
                    <button class="btn-primario" onclick="iniciarNuevoEnsayoSIMCE()">🔄 Repetir Ensayo</button>
                    <button class="btn-diploma" onclick="mostrarDiplomaSIMCE()">📜 Ver Diploma de Honor</button>
                    <button class="btn-secundario" onclick="irATablas()">🗺️ Volver a la Ruta de Tablas</button>
                </div>
            </div>
        </div>

        <h3 class="revision-titulo">🔍 Revisión Detallada y Retroalimentación Pedagógica</h3>
        <div class="simce-revision-lista">
            ${desgloseHTML}
        </div>
    `;

    if (porcentaje >= 80) {
        lanzarSuperConfeti();
    }
}

function irATablas() {
    window.sound.playClick();
    const btn = document.querySelector('.nav-tab-btn[data-target="seccion-tablas"]');
    if (btn) btn.click();
}

function mostrarDiplomaSIMCE() {
    window.sound.playFanfare();
    const modal = document.getElementById('modalDiploma');
    if (!modal) return;

    document.getElementById('diplomaNombre').textContent = AppState.estudiante.nombre;
    document.getElementById('diplomaAvatar').src = `IMAGEN/${AppState.estudiante.avatar}.svg`;
    document.getElementById('diplomaFecha').textContent = new Date().toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('diplomaPuntaje').textContent = `${AppState.progreso.simcePuntaje || 0} de ${SIMCE_DATA.length} Aciertos (${Math.round(((AppState.progreso.simcePuntaje || 0) / SIMCE_DATA.length) * 100)}%)`;

    modal.classList.add('abierto');
}

function cerrarModalDiploma() {
    window.sound.playClick();
    document.getElementById('modalDiploma').classList.remove('abierto');
}

// =========================================================================
// MÓDULO DE JUEGOS Y DESAFÍOS MATEMÁTICOS
// =========================================================================

function cargarMenuJuegos() {
    // Si no hay juego seleccionado, mostrar el menú
    if (!AppState.juegoActivo) {
        document.getElementById('juegosMenu').style.display = 'grid';
        document.getElementById('juegoMemoria').style.display = 'none';
        document.getElementById('juegoAtrapa').style.display = 'none';
        document.getElementById('juegoDetective').style.display = 'none';
    }
}

function volverMenuJuegos() {
    window.sound.playClick();
    AppState.juegoActivo = null;
    cargarMenuJuegos();
}

/**
 * 1. Juego: Memoria Matemática (Pares de operaciones y productos)
 */
let estadoMemoria = {
    cartas: [],
    primeraCarta: null,
    segundaCarta: null,
    bloqueado: false,
    paresEncontrados: 0,
    totalPares: 6
};

function iniciarJuegoMemoria() {
    window.sound.playClick();
    AppState.juegoActivo = 'memoria';

    document.getElementById('juegosMenu').style.display = 'none';
    document.getElementById('juegoAtrapa').style.display = 'none';
    document.getElementById('juegoDetective').style.display = 'none';
    document.getElementById('juegoMemoria').style.display = 'block';

    const paresBase = [
        { operacion: "2 × 8", resultado: "16", parId: 1 },
        { operacion: "3 × 7", resultado: "21", parId: 2 },
        { operacion: "4 × 6", resultado: "24", parId: 3 },
        { operacion: "5 × 9", resultado: "45", parId: 4 },
        { operacion: "6 × 7", resultado: "42", parId: 5 },
        { operacion: "8 × 8", resultado: "64", parId: 6 }
    ];

    let cartas = [];
    paresBase.forEach(p => {
        cartas.push({ texto: p.operacion, tipo: 'op', parId: p.parId });
        cartas.push({ texto: p.resultado, tipo: 'res', parId: p.parId });
    });

    // Barajar
    cartas.sort(() => Math.random() - 0.5);

    estadoMemoria = {
        cartas: cartas,
        primeraCarta: null,
        segundaCarta: null,
        bloqueado: false,
        paresEncontrados: 0,
        totalPares: paresBase.length
    };

    const tablero = document.getElementById('tableroMemoria');
    tablero.innerHTML = '';

    cartas.forEach((c, idx) => {
        const cardElem = document.createElement('div');
        cardElem.className = 'memoria-card';
        cardElem.dataset.idx = idx;
        cardElem.innerHTML = `
            <div class="card-inner">
                <div class="card-front">❓</div>
                <div class="card-back ${c.tipo === 'op' ? 'color-op' : 'color-res'}">${c.texto}</div>
            </div>
        `;
        cardElem.onclick = () => voltearCartaMemoria(cardElem, c);
        tablero.appendChild(cardElem);
    });

    document.getElementById('memoriaParesContador').textContent = `0 / ${paresBase.length}`;
}

function voltearCartaMemoria(elem, cartaData) {
    if (estadoMemoria.bloqueado) return;
    if (elem.classList.contains('volteada') || elem.classList.contains('emparejada')) return;

    window.sound.playCardFlip();
    elem.classList.add('volteada');

    if (!estadoMemoria.primeraCarta) {
        estadoMemoria.primeraCarta = { elem, data: cartaData };
    } else {
        estadoMemoria.segundaCarta = { elem, data: cartaData };
        verificarParMemoria();
    }
}

function verificarParMemoria() {
    estadoMemoria.bloqueado = true;
    const c1 = estadoMemoria.primeraCarta;
    const c2 = estadoMemoria.segundaCarta;

    if (c1.data.parId === c2.data.parId) {
        window.sound.playSuccess();
        window.sound.playCoin();
        c1.elem.classList.add('emparejada');
        c2.elem.classList.add('emparejada');
        estadoMemoria.paresEncontrados++;
        document.getElementById('memoriaParesContador').textContent = `${estadoMemoria.paresEncontrados} / ${estadoMemoria.totalPares}`;

        estadoMemoria.primeraCarta = null;
        estadoMemoria.segundaCarta = null;
        estadoMemoria.bloqueado = false;

        if (estadoMemoria.paresEncontrados >= estadoMemoria.totalPares) {
            setTimeout(() => {
                window.sound.playFanfare();
                AppState.progreso.puntosXP += 100;
                guardarProgreso();
                alert("🎉 ¡Felicidades! Encontraste todas las parejas matemáticas. Ganaste +100 XP.");
            }, 500);
        }
    } else {
        window.sound.playError();
        setTimeout(() => {
            c1.elem.classList.remove('volteada');
            c2.elem.classList.remove('volteada');
            estadoMemoria.primeraCarta = null;
            estadoMemoria.segundaCarta = null;
            estadoMemoria.bloqueado = false;
        }, 1000);
    }
}

/**
 * 2. Juego: Atrapa el Resultado Flotante (Con selección y botón Verificar)
 */
let estadoAtrapa = {
    operacionActual: null,
    respuestaCorrecta: null,
    valorSeleccionado: null,
    elementoSeleccionado: null,
    verificado: false,
    puntos: 0,
    ronda: 0,
    totalRondas: 8
};

function iniciarJuegoAtrapa() {
    window.sound.playClick();
    AppState.juegoActivo = 'atrapa';

    document.getElementById('juegosMenu').style.display = 'none';
    document.getElementById('juegoMemoria').style.display = 'none';
    document.getElementById('juegoDetective').style.display = 'none';
    document.getElementById('juegoAtrapa').style.display = 'block';

    estadoAtrapa.puntos = 0;
    estadoAtrapa.ronda = 0;
    nuevaRondaAtrapa();
}

function nuevaRondaAtrapa() {
    if (estadoAtrapa.ronda >= estadoAtrapa.totalRondas) {
        window.sound.playFanfare();
        AppState.progreso.puntosXP += (estadoAtrapa.puntos * 25);
        guardarProgreso();
        alert(`🏆 ¡Juego Terminado! Conseguiste ${estadoAtrapa.puntos} de ${estadoAtrapa.totalRondas} aciertos y sumaste +${estadoAtrapa.puntos * 25} XP.`);
        volverMenuJuegos();
        return;
    }

    estadoAtrapa.ronda++;
    estadoAtrapa.valorSeleccionado = null;
    estadoAtrapa.elementoSeleccionado = null;
    estadoAtrapa.verificado = false;

    // Resetear botón y mensaje de feedback
    const btnVerificar = document.getElementById('btnVerificarAtrapa');
    if (btnVerificar) {
        btnVerificar.disabled = true;
        btnVerificar.innerHTML = 'Verificar Respuesta ✅';
    }
    const feedback = document.getElementById('atrapaFeedback');
    if (feedback) feedback.innerHTML = '';

    document.getElementById('atrapaPuntos').textContent = `Aciertos: ${estadoAtrapa.puntos} | Ronda: ${estadoAtrapa.ronda}/${estadoAtrapa.totalRondas}`;

    const num1 = Math.floor(Math.random() * 9) + 2; // 2 al 10
    const num2 = Math.floor(Math.random() * 9) + 2;
    const correcta = num1 * num2;
    estadoAtrapa.respuestaCorrecta = correcta;

    document.getElementById('atrapaOperacion').textContent = `${num1} × ${num2} = ?`;

    // Generar 4 globos/burbujas únicas
    let opciones = new Set([correcta]);
    while (opciones.size < 4) {
        const fake = (Math.floor(Math.random() * 9) + 2) * (Math.floor(Math.random() * 9) + 2);
        if (fake !== correcta) opciones.add(fake);
    }

    const arrayOpciones = Array.from(opciones).sort(() => Math.random() - 0.5);
    const canvas = document.getElementById('atrapaBurbujasArea');
    canvas.innerHTML = '';

    arrayOpciones.forEach(val => {
        const burbuja = document.createElement('div');
        burbuja.className = 'burbuja-flotante anim-float';
        burbuja.textContent = val;
        burbuja.dataset.valor = val;
        burbuja.onclick = () => seleccionarBurbujaAtrapa(val, burbuja);
        canvas.appendChild(burbuja);
    });
}

function seleccionarBurbujaAtrapa(val, burbujaElem) {
    if (estadoAtrapa.verificado) return; // Si ya se verificó la ronda, ignorar

    window.sound.playSelect();

    // Desmarcar otras burbujas
    document.querySelectorAll('.burbuja-flotante').forEach(b => b.classList.remove('seleccionada'));

    // Marcar la burbuja seleccionada
    burbujaElem.classList.add('seleccionada');
    estadoAtrapa.valorSeleccionado = val;
    estadoAtrapa.elementoSeleccionado = burbujaElem;

    // Habilitar botón de verificación
    const btnVerificar = document.getElementById('btnVerificarAtrapa');
    if (btnVerificar) {
        btnVerificar.disabled = false;
    }
}

function verificarRespuestaAtrapa() {
    if (estadoAtrapa.verificado) return; // Bloqueo estricto para evitar doble o múltiple conteo
    if (estadoAtrapa.valorSeleccionado === null) return;

    estadoAtrapa.verificado = true; // Bloqueado de inmediato
    const btnVerificar = document.getElementById('btnVerificarAtrapa');
    if (btnVerificar) btnVerificar.disabled = true;

    const feedback = document.getElementById('atrapaFeedback');
    const esCorrecto = estadoAtrapa.valorSeleccionado === estadoAtrapa.respuestaCorrecta;

    if (esCorrecto) {
        window.sound.playSuccess();
        window.sound.playCoin();
        estadoAtrapa.elementoSeleccionado.classList.add('burbuja-exito');
        estadoAtrapa.puntos++;
        lanzarMiniConfeti(estadoAtrapa.elementoSeleccionado);
        if (feedback) {
            feedback.innerHTML = '<span style="color:#059669;">🎉 ¡Correcto! ¡Excelente multiplicación!</span>';
        }
    } else {
        window.sound.playError();
        estadoAtrapa.elementoSeleccionado.classList.add('burbuja-fallo');
        // Resaltar en verde la burbuja correcta para apoyar pedagógicamente
        document.querySelectorAll('.burbuja-flotante').forEach(b => {
            if (parseInt(b.dataset.valor) === estadoAtrapa.respuestaCorrecta) {
                b.classList.add('burbuja-exito');
            }
        });
        if (feedback) {
            feedback.innerHTML = `<span style="color:#DC2626;">❌ Incorrecto. La respuesta correcta era <strong>${estadoAtrapa.respuestaCorrecta}</strong></span>`;
        }
    }

    setTimeout(nuevaRondaAtrapa, 1600);
}

/**
 * 3. Juego: Detective Matemático
 */
const CASOS_DETECTIVE = [
    {
        pistas: [
            "Soy un número par mayor que 20 y menor que 30.",
            "Estoy en la tabla del 4 y en la tabla del 6 al mismo tiempo.",
            "Mis dos dígitos suman 6 (2 + 4 = 6)."
        ],
        numeroOculto: 24,
        explicacion: "24 es múltiplo común de 4 (4 × 6) y de 6 (6 × 4)."
    },
    {
        pistas: [
            "Soy el resultado de multiplicar un número por sí mismo (cuadrado perfecto).",
            "Termino en el número 6.",
            "Estoy en la tabla del 6: 6 × 6 = ?"
        ],
        numeroOculto: 36,
        explicacion: "36 = 6 × 6. ¡Un número con mucha armonía!"
    },
    {
        pistas: [
            "Pertenezco a la tabla del 7.",
            "Si me sumas 7, llego exactamente a 70.",
            "La suma de mis dígitos es 9 (6 + 3 = 9)."
        ],
        numeroOculto: 63,
        explicacion: "7 × 9 = 63. ¡Excelente deducción detective!"
    }
];

let indiceCasoDetective = 0;

function iniciarJuegoDetective() {
    window.sound.playClick();
    AppState.juegoActivo = 'detective';

    document.getElementById('juegosMenu').style.display = 'none';
    document.getElementById('juegoMemoria').style.display = 'none';
    document.getElementById('juegoAtrapa').style.display = 'none';
    document.getElementById('juegoDetective').style.display = 'block';

    indiceCasoDetective = 0;
    mostrarCasoDetective();
}

function mostrarCasoDetective() {
    const caso = CASOS_DETECTIVE[indiceCasoDetective];
    const contenedor = document.getElementById('detectivePistasBox');
    contenedor.innerHTML = '';

    caso.pistas.forEach((pista, idx) => {
        const pElem = document.createElement('div');
        pElem.className = 'pista-item anim-slide-in';
        pElem.style.animationDelay = `${idx * 0.15}s`;
        pElem.innerHTML = `<strong>🔍 Pista ${idx + 1}:</strong> ${pista}`;
        contenedor.appendChild(pElem);
    });

    document.getElementById('detectiveInput').value = '';
    document.getElementById('detectiveFeedback').innerHTML = '';
}

function comprobarRespuestaDetective() {
    const input = document.getElementById('detectiveInput');
    const valor = parseInt(input.value.trim());
    const caso = CASOS_DETECTIVE[indiceCasoDetective];
    const feedback = document.getElementById('detectiveFeedback');

    if (isNaN(valor)) {
        alert("Por favor ingresa un número.");
        return;
    }

    if (valor === caso.numeroOculto) {
        window.sound.playSuccess();
        window.sound.playCoin();
        feedback.innerHTML = `<div class="feedback-correcto">🎉 ¡Caso Resuelto! El número era ${caso.numeroOculto}. ${caso.explicacion}</div>`;
        AppState.progreso.puntosXP += 50;
        guardarProgreso();

        setTimeout(() => {
            indiceCasoDetective = (indiceCasoDetective + 1) % CASOS_DETECTIVE.length;
            mostrarCasoDetective();
        }, 2200);
    } else {
        window.sound.playError();
        feedback.innerHTML = `<div class="feedback-incorrecto">🔎 Mmm, ese número no cumple todas las pistas. ¡Vuelve a leer con atención!</div>`;
    }
}

// =========================================================================
// PANTALLA DE PROGRESO GLOBAL Y SALÓN DE TROFEOS
// =========================================================================

function renderizarProgresoGlobal() {
    let completadas = 0;
    let totalEstrellas = 0;

    for (let n = 2; n <= 10; n++) {
        const t = AppState.progreso.tablas[n];
        if (t && t.completada) completadas++;
        if (t && t.estrellas) totalEstrellas += t.estrellas;
    }

    const pct = Math.round((completadas / 9) * 100);
    const bar = document.getElementById('globalProgressBar');
    const txt = document.getElementById('globalProgressText');

    if (bar) bar.style.width = `${pct}%`;
    if (txt) txt.textContent = `${pct}% completado (${completadas} de 9 tablas)`;
}

function renderizarProgresoDetallado() {
    const contenedor = document.getElementById('progresoDetalladoGrid');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    for (let n = 2; n <= 10; n++) {
        const data = TABLAS_DATA[n];
        const prog = AppState.progreso.tablas[n] || { completada: false, estrellas: 0 };

        const row = document.createElement('div');
        row.className = 'progreso-fila-card';
        row.innerHTML = `
            <div class="fila-icono">${data.icono}</div>
            <div class="fila-info">
                <h4>${data.titulo}</h4>
                <div class="fila-sub">Estrellas: ${'⭐'.repeat(prog.estrellas)}${'☆'.repeat(3 - prog.estrellas)} | Estado: ${prog.completada ? 'Dominada ✅' : 'En proceso ⏳'}</div>
            </div>
            <div class="fila-action">
                <button class="btn-pequeno" onclick="abrirModuloTabla(${n})">Practicar</button>
            </div>
        `;
        contenedor.appendChild(row);
    }
}

function reiniciarTodoElProgreso() {
    if (confirm("¿Estás seguro de que deseas reiniciar todo tu progreso y volver a comenzar desde cero?")) {
        localStorage.removeItem('mundotablas_progreso');
        location.reload();
    }
}

// =========================================================================
// EFECTOS VISUALES: CONFETI Y CELEBRACIÓN
// =========================================================================

function lanzarMiniConfeti(targetElem) {
    const rect = targetElem.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    crearParticulas(x, y, 15);
}

function lanzarSuperConfeti() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.5);
            crearParticulas(x, y, 25);
        }, i * 200);
    }
}

function crearParticulas(x, y, count) {
    const colores = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93', '#F72585', '#4CC9F0'];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particula-confeti';
        p.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;

        const angulo = Math.random() * Math.PI * 2;
        const velocidad = 40 + Math.random() * 80;
        const vx = Math.cos(angulo) * velocidad;
        const vy = Math.sin(angulo) * velocidad;

        document.body.appendChild(p);

        p.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 900 + Math.random() * 400,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }).onfinish = () => p.remove();
    }
}

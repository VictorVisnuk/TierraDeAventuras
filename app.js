/* =========================================================
   TIERRA DE AVENTURAS · app.js
   Módulos: config, utilidades, tema, nav, scroll, reveal,
   contadores, countdown, tilt, galería, programa, quiz,
   testimonios, semanas, formulario, faq, compartir, ICS, confetti
   ========================================================= */
(() => {
  'use strict';

  /* =======================================================
     1. CONFIGURACIÓN (editar acá)
     ======================================================= */
  const CONFIG = {
    proximaTemporada: '2027-01-04T08:30:00-03:00',
    finTemporada: '2027-02-26T18:00:00-03:00',
    nombreTemporada: 'Verano 2027',

    semanas: [
      { nombre: 'Turno mañana',     horario: '9 a 13 hs',  cupos: 40, ocupados: 31, emoji: '🌅', detalle: 'Juegos, talleres y almuerzo. Ideal para una mañana llena de planes.' },
      { nombre: 'Turno tarde',       horario: '13 a 17 hs', cupos: 40, ocupados: 37, emoji: '🌇', detalle: 'Almuerzo, actividades al aire libre y la merienda de cierre.' },
      { nombre: 'Jornada completa',  horario: '9 a 17 hs',  cupos: 30, ocupados: 22, emoji: '☀️', detalle: 'El día entero de aventura, con todas las actividades de la colonia.' }
    ],

    sellos: [
      { id: 'nosotros',    nombre: 'Nosotros',    emoji: '🏡', color: '#33c3e8', seccion: 'sobre' },
      { id: 'actividades', nombre: 'Actividades', emoji: '🧗', color: '#f5922b', seccion: 'actividades' },
      { id: 'turnos',      nombre: 'Turnos',      emoji: '🕘', color: '#52b848', seccion: 'semanas' },
      { id: 'galeria',     nombre: 'Galería',     emoji: '📸', color: '#e8457f', seccion: 'galeria' },
      { id: 'dia',         nombre: 'Un día',      emoji: '☀️', color: '#f6b52e', seccion: 'dia' },
      { id: 'quiz',        nombre: 'Quiz',        emoji: '🎯', color: '#8b4cf0', seccion: 'quiz' },
      { id: 'inscripcion', nombre: 'Inscripción', emoji: '✏️', color: '#8fd3f4', seccion: null }
    ],

    fotos: [
      { t: 'Escalada en el rocódromo', cat: 'aire',  c: ['#e8891c', '#8a3e0c'], r: '4/5' },
      { t: 'Pileta de la tarde',       cat: 'agua',  c: ['#2ec4e8', '#1f6f8f'], r: '1/1' },
      { t: 'Taller de cerámica',       cat: 'arte',  c: ['#f3b630', '#7a4d24'], r: '3/4' },
      { t: 'Fogón de la noche',        cat: 'noche', c: ['#8c4df0', '#1e1b4b'], r: '4/3' },
      { t: 'Senderismo al cerro',      cat: 'aire',  c: ['#8fcb6a', '#2f6b26'], r: '3/4' },
      { t: 'Juegos de agua',           cat: 'agua',  c: ['#5fd3e8', '#155e75'], r: '1/1' },
      { t: 'Mural colectivo',          cat: 'arte',  c: ['#e0437a', '#7d1b41'], r: '4/5' },
      { t: 'Observación de estrellas', cat: 'noche', c: ['#312e81', '#0b1410'], r: '1/1' },
      { t: 'Tirolesa',                 cat: 'aire',  c: ['#fb923c', '#7c2d12'], r: '3/4' },
      { t: 'Carpas y campamento',      cat: 'noche', c: ['#6cb24e', '#1f3f1a'], r: '4/5' },
      { t: 'Muestra de proyectos',     cat: 'arte',  c: ['#fcd34d', '#92400e'], r: '4/3' },
      { t: 'Clase de natación',        cat: 'agua',  c: ['#22d3ee', '#0c4a6e'], r: '3/4' }
    ],

    quiz: [
      { pregunta: '¿Qué te gusta hacer en un recreo?', opciones: [
        { texto: 'Trepar, correr o saltar', pesos: { aire: 2 } },
        { texto: 'Jugar cerca del agua', pesos: { agua: 2 } },
        { texto: 'Dibujar o inventar cosas', pesos: { arte: 2 } },
        { texto: 'Mirar el cielo', pesos: { noche: 2 } }
      ]},
      { pregunta: '¿Con qué compañero ideal te imaginás?', opciones: [
        { texto: 'Alguien valiente que me empuje', pesos: { aire: 2 } },
        { texto: 'Alguien que se meta conmigo al agua', pesos: { agua: 2 } },
        { texto: 'Alguien creativo para hacer proyectos', pesos: { arte: 2 } },
        { texto: 'Alguien que escuche historias', pesos: { noche: 2 } }
      ]},
      { pregunta: '¿Qué te da más curiosidad?', opciones: [
        { texto: 'Cómo subir más alto', pesos: { aire: 2 } },
        { texto: 'Cómo funciona el mar y los ríos', pesos: { agua: 2 } },
        { texto: 'Cómo se hace un mural', pesos: { arte: 2 } },
        { texto: 'Qué hay más allá de las estrellas', pesos: { noche: 2 } }
      ]}
    ],

    resultados: {
      aire:  { emoji: '🧗', titulo: 'Explorador de cumbres', texto: 'Tu lugar es la tirolesa, el rocódromo y el senderismo. ¡Vas a pedir más!' },
      agua:  { emoji: '🏊', titulo: 'Capitán de la pileta', texto: 'Los juegos de agua y la natación guiada son para vos.' },
      arte:  { emoji: '🎨', titulo: 'Artista de la aventura', texto: 'Murales, cerámica y teatro: vas a dejar tu marca en la colonia.' },
      noche: { emoji: '🔭', titulo: 'Guardián de las estrellas', texto: 'El fogón, los cuentos y la observación nocturna te van a encantar.' }
    }
  };

  /* =======================================================
     2. UTILIDADES
     ======================================================= */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(clave, def) {
      try { return JSON.parse(localStorage.getItem(clave)) ?? def; } catch { return def; }
    },
    set(clave, valor) {
      try { localStorage.setItem(clave, JSON.stringify(valor)); } catch { /* sin storage */ }
    },
    del(clave) {
      try { localStorage.removeItem(clave); } catch { /* sin storage */ }
    }
  };

  function toast(mensaje, tipo = 'ok') {
    const cont = $('#toasts');
    const el = document.createElement('div');
    el.className = `toast ${tipo}`;
    el.textContent = mensaje;
    cont.appendChild(el);
    requestAnimationFrame(() => el.classList.add('visible'));
    setTimeout(() => {
      el.classList.remove('visible');
      setTimeout(() => el.remove(), 400);
    }, 3200);
  }

  /* =======================================================
     3. TEMA CLARO / OSCURO
     ======================================================= */
  function initTheme() {
    const btn = $('#themeBtn');
    const guardado = store.get('tda-tema', null);
    const inicialOscuro = guardado
      ? guardado === 'oscuro'
      : matchMedia('(prefers-color-scheme: dark)').matches;

    const aplicar = oscuro => {
      document.documentElement.dataset.theme = oscuro ? 'oscuro' : 'claro';
      btn.textContent = oscuro ? '☀️' : '🌙';
      btn.setAttribute('aria-label', oscuro ? 'Activar tema claro' : 'Activar tema oscuro');
    };

    aplicar(inicialOscuro);
    btn.addEventListener('click', () => {
      const nuevoOscuro = document.documentElement.dataset.theme !== 'oscuro';
      aplicar(nuevoOscuro);
      store.set('tda-tema', nuevoOscuro ? 'oscuro' : 'claro');
    });
  }

  /* =======================================================
     4. NAV: menú mobile + scrollspy
     ======================================================= */
  function initNav() {
    const menu = $('#menu');
    const btn = $('#menuBtn');

    btn.addEventListener('click', () => {
      const abierto = menu.classList.toggle('abierto');
      btn.setAttribute('aria-expanded', String(abierto));
    });
    $$('#menu a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('abierto');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  function initScrollspy() {
    const links = $$('#menu a');
    const porId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));

    const io = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.remove('activo'));
        porId.get(e.target.id)?.classList.add('activo');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    $$('main section[id]').forEach(s => { if (porId.has(s.id)) io.observe(s); });
  }

  /* =======================================================
     5. SCROLL: sombra del nav, parallax, progreso, back-to-top
     ======================================================= */
  function initScroll() {
    const nav = $('#nav');
    const hero = $('#heroContenido');
    const capas = $$('.hero-capas i');
    const backTop = $('#backTop');
    const timelineActiva = () => $('#dia .timeline');
    let pendiente = false;

    const actualizar = () => {
      pendiente = false;
      const y = window.scrollY;

      nav.classList.toggle('scrolled', y > 60);
      backTop.classList.toggle('visible', y > 700);

      if (!reduceMotion && y < window.innerHeight * 1.2) {
        hero.style.transform = `translateY(${y * .35}px)`;
        hero.style.opacity = Math.max(0, 1 - y / 600);
        capas.forEach((el, i) => { el.style.transform = `translateY(${y * (.1 + i * .08)}px)`; });
      }

      const tl = timelineActiva();
      if (tl) {
        const r = tl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * .75 - r.top) / r.height));
        tl.style.setProperty('--prog', p.toFixed(3));
      }
    };

    addEventListener('scroll', () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    }, { passive: true });

    backTop.addEventListener('click', () =>
      scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    actualizar();
  }

  /* =======================================================
     6. REVEAL AL SCROLLEAR
     ======================================================= */
  function initReveal() {
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: .15 });
    $$('.reveal, .paso').forEach(el => io.observe(el));
  }

  /* =======================================================
     7. CONTADORES ANIMADOS
     ======================================================= */
  function initCounters() {
    const contar = el => {
      const destino = +el.dataset.count;
      const dur = 1600;
      const inicio = performance.now();
      const paso = now => {
        const p = Math.min(1, (now - inicio) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(destino * ease) + (p === 1 ? '+' : '');
        if (p < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    };

    const io = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        $$('[data-count]', e.target).forEach(contar);
        io.disconnect();
      });
    }, { threshold: .4 });
    io.observe($('.stats'));
  }

  /* =======================================================
     8. CUENTA REGRESIVA + ICS
     ======================================================= */
  function initCountdown() {
    $('#temporadaNombre').textContent = CONFIG.nombreTemporada;
    const objetivo = new Date(CONFIG.proximaTemporada).getTime();
    const pad = n => String(n).padStart(2, '0');

    const actualizar = () => {
      let diff = Math.max(0, objetivo - Date.now());
      const d = Math.floor(diff / 86400000); diff %= 86400000;
      const h = Math.floor(diff / 3600000);  diff %= 3600000;
      const m = Math.floor(diff / 60000);    diff %= 60000;
      const s = Math.floor(diff / 1000);
      $('#cd-d').textContent = d;
      $('#cd-h').textContent = pad(h);
      $('#cd-m').textContent = pad(m);
      $('#cd-s').textContent = pad(s);
    };
    actualizar();
    setInterval(actualizar, 1000);

    $('#icsBtn').addEventListener('click', descargarICS);
    $('#icsBtn2').addEventListener('click', descargarICS);
  }

  function descargarICS() {
    const f = d => new Date(d).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const lineas = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Tierra de Aventuras//ES',
      'BEGIN:VEVENT',
      `UID:tda-${Date.now()}@tierradeaventuras`,
      `DTSTAMP:${f(new Date())}`,
      `DTSTART:${f(CONFIG.proximaTemporada)}`,
      `DTEND:${f(CONFIG.finTemporada)}`,
      `SUMMARY:Colonia Tierra de Aventuras`,
      'LOCATION:Centro Recreativo Nueva Era',
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    const blob = new Blob([lineas.join('\r\n')], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tierra-de-aventuras.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* =======================================================
     9. TILT 3D EN TARJETAS + INCLINACIÓN DEL LOGO
     ======================================================= */
  function initTilt() {
    if (reduceMotion) return;

    $$('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((x - .5) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((.5 - y) * 10).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100) + '%');
        card.style.setProperty('--my', (y * 100) + '%');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    const visual = $('#sobreVisual');
    visual.addEventListener('pointermove', e => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      visual.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    visual.addEventListener('pointerleave', () => { visual.style.transform = ''; });
  }

  /* =======================================================
     10. SEMANAS CON CUPOS EN TIEMPO REAL
     ======================================================= */
  const cupoActual = s => {
    const datos = store.get('tda-cupos', {});
    return datos[s.nombre] ?? s.ocupados;
  };
  const guardarCupo = (nombre, valor) => {
    const datos = store.get('tda-cupos', {});
    datos[nombre] = valor;
    store.set('tda-cupos', datos);
  };

  function initSemanas() {
    const grid = $('#semanasGrid');
    const select = $('#semana');

    const render = () => {
      grid.innerHTML = '';
      CONFIG.semanas.forEach(s => {
        const ocupados = cupoActual(s);
        const libres = Math.max(0, s.cupos - ocupados);
        const pct = Math.min(100, (ocupados / s.cupos) * 100);
        const completa = libres === 0;
        const alerta = !completa && libres <= 5;

        const card = document.createElement('article');
        card.className = 'semana reveal' + (completa ? ' completa' : '');
        card.innerHTML = `
          <span class="emoji" aria-hidden="true">${s.emoji}</span>
          <h3>${s.nombre}</h3>
          <p class="fechas">🕒 ${s.horario}</p>
          <p class="detalle">${s.detalle}</p>
          <div class="barra-cupo" role="progressbar" aria-valuemin="0" aria-valuemax="${s.cupos}" aria-valuenow="${ocupados}" aria-label="Cupos ocupados en ${s.nombre}">
            <div style="width:0"></div>
          </div>
          <p class="estado ${alerta ? 'alerta' : ''}">
            ${completa ? 'Cupos agotados' : alerta ? `¡Últimos ${libres} lugares!` : `Quedan ${libres} lugares`}
          </p>
          <button class="btn btn-primario btn-sm" ${completa ? 'disabled' : ''} data-semana="${s.nombre}">
            ${completa ? 'Sin cupo' : 'Elegir este turno'}
          </button>`;
        grid.appendChild(card);

        requestAnimationFrame(() => {
          setTimeout(() => { card.querySelector('.barra-cupo div').style.width = pct + '%'; }, 150);
        });
      });

      $$('option', select).forEach(o => {
        const s = CONFIG.semanas.find(x => x.nombre === o.value);
        if (!s) return;
        const libre = cupoActual(s) < s.cupos;
        o.disabled = !libre;
        o.textContent = libre ? s.nombre : `${s.nombre} (completo)`;
      });

      $$('.semana .btn', grid).forEach(btn => btn.addEventListener('click', () => {
        select.value = btn.dataset.semana;
        select.dispatchEvent(new Event('change'));
        $('#reserva').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        setTimeout(() => $('#nombre').focus({ preventScroll: true }), 600);
      }));

      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }), { threshold: .15 });
      $$('.semana.reveal', grid).forEach(el => io.observe(el));
    };

    render();
    window.__renderSemanas = render;
  }

  /* =======================================================
     11. GALERÍA: filtros, búsqueda, favoritas, lightbox
     ======================================================= */
  function initGaleria() {
    const masonry = $('#masonry');
    const favs = new Set(store.get('tda-favs', []));
    let filtroCat = 'todas';
    let busqueda = '';

    const fotos = CONFIG.fotos.map((f, i) => {
      const el = document.createElement('figure');
      el.className = 'foto';
      el.dataset.i = i;
      el.dataset.titulo = f.t;
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'Ver ' + f.t);
      el.style.setProperty('--g', `linear-gradient(145deg, ${f.c[0]}, ${f.c[1]})`);
      const [w, h] = f.r.split('/');
      el.style.setProperty('--ratio', `${w}/${h}`);
      el.style.animationDelay = (i * 60) + 'ms';
      el.innerHTML = `<span class="lupa" aria-hidden="true">⤢</span>`;
      masonry.appendChild(el);
      return el;
    });

    const marcarFavoritas = () => {
      fotos.forEach(el => {
        const i = +el.dataset.i;
        let marca = el.querySelector('.fav-marca');
        if (favs.has(i) && !marca) {
          marca = document.createElement('span');
          marca.className = 'fav-marca';
          marca.textContent = '♥';
          marca.setAttribute('aria-label', 'Favorita');
          el.appendChild(marca);
        } else if (!favs.has(i) && marca) {
          marca.remove();
        }
      });
    };

    const aplicarFiltros = () => {
      let visibles = 0;
      fotos.forEach(el => {
        const i = +el.dataset.i;
        const f = CONFIG.fotos[i];
        const okCat = filtroCat === 'todas'
          || (filtroCat === 'favoritas' ? favs.has(i) : f.cat === filtroCat);
        const okQ = !busqueda || f.t.toLowerCase().includes(busqueda);
        const mostrar = okCat && okQ;
        el.classList.toggle('oculta', !mostrar);
        if (mostrar) visibles++;
      });
      $('#galeriaVacia').hidden = visibles > 0;
    };

    $$('.filtro').forEach(btn => btn.addEventListener('click', () => {
      $$('.filtro').forEach(b => b.classList.toggle('activo', b === btn));
      filtroCat = btn.dataset.filtro;
      aplicarFiltros();
    }));

    $('#buscarFoto').addEventListener('input', e => {
      busqueda = e.target.value.trim().toLowerCase();
      aplicarFiltros();
    });

    /* ----- Lightbox ----- */
    const lb = $('#lightbox');
    const lbImg = $('#lbImg');
    const lbTitulo = $('#lbTitulo');
    const lbContador = $('#lbContador');
    const lbFav = $('#lbFav');
    let visibles = [];
    let actual = 0;

    const pintarFav = () => {
      const activa = favs.has(visibles[actual]);
      lbFav.setAttribute('aria-pressed', String(activa));
      lbFav.textContent = activa ? '♥ Favorita' : '♡ Me gusta';
    };

    const pintar = () => {
      const i = visibles[actual];
      const f = CONFIG.fotos[i];
      const [w, h] = f.r.split('/');
      lbImg.style.background = `linear-gradient(145deg, ${f.c[0]}, ${f.c[1]})`;
      lbImg.style.setProperty('--ratio', `${w}/${h}`);
      lbTitulo.textContent = f.t;
      lbContador.textContent = `${actual + 1} / ${visibles.length}`;
      pintarFav();
    };

    const abrir = el => {
      visibles = fotos.filter(f => !f.classList.contains('oculta')).map(f => +f.dataset.i);
      actual = Math.max(0, visibles.indexOf(+el.dataset.i));
      pintar();
      lb.classList.add('abierto');
      document.body.style.overflow = 'hidden';
      $('#lbCerrar').focus();
    };
    const cerrar = () => {
      lb.classList.remove('abierto');
      document.body.style.overflow = '';
    };
    const mover = d => {
      actual = (actual + d + visibles.length) % visibles.length;
      lbImg.style.opacity = 0;
      setTimeout(() => { pintar(); lbImg.style.opacity = 1; }, 180);
    };

    fotos.forEach(el => {
      el.addEventListener('click', () => abrir(el));
      el.addEventListener('keydown', e => { if (e.key === 'Enter') abrir(el); });
    });

    $('#lbCerrar').addEventListener('click', cerrar);
    $('#lbPrev').addEventListener('click', () => mover(-1));
    $('#lbNext').addEventListener('click', () => mover(1));
    lb.addEventListener('click', e => { if (e.target === lb) cerrar(); });

    lbFav.addEventListener('click', () => {
      const i = visibles[actual];
      if (favs.has(i)) favs.delete(i); else favs.add(i);
      store.set('tda-favs', [...favs]);
      marcarFavoritas();
      pintarFav();
      if (filtroCat === 'favoritas') aplicarFiltros();
    });

    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('abierto')) return;
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowRight') mover(1);
      if (e.key === 'ArrowLeft') mover(-1);
      if (e.key === 'f' || e.key === 'F') lbFav.click();
    });

    let tx = null;
    lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
      tx = null;
    });

    marcarFavoritas();
    aplicarFiltros();
  }

  /* =======================================================
     12. PROGRAMA: pestañas
     ======================================================= */
  function initPrograma() {
    const tabs = $$('.tab');
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => {
        const activa = t === tab;
        t.classList.toggle('activo', activa);
        t.setAttribute('aria-selected', String(activa));
      });
      $$('.tab-panel').forEach(p => p.classList.toggle('activo', p.dataset.panel === tab.dataset.tab));

      const pasos = $$('.tab-panel.activo .paso');
      pasos.forEach(p => p.classList.remove('visible'));
      $('.tab-panel.activo .timeline').style.setProperty('--prog', 0);
      requestAnimationFrame(() => {
        pasos.forEach((p, i) => setTimeout(() => p.classList.add('visible'), i * 120));
      });
    }));
  }

  /* =======================================================
     13. QUIZ
     ======================================================= */
  function initQuiz() {
    const caja = $('#quizBox');
    let paso = 0;
    let puntos = { aire: 0, agua: 0, arte: 0, noche: 0 };

    const pintarPregunta = () => {
      const q = CONFIG.quiz[paso];
      const pct = (paso / CONFIG.quiz.length) * 100;
      caja.innerHTML = `
        <div class="quiz-progreso"><div style="width:${pct}%"></div></div>
        <p class="eyebrow">Pregunta ${paso + 1} de ${CONFIG.quiz.length}</p>
        <h3 class="quiz-pregunta">${q.pregunta}</h3>
        <div class="quiz-opciones">
          ${q.opciones.map((o, i) => `<button class="quiz-opcion" data-i="${i}">${o.texto}</button>`).join('')}
        </div>`;
      $$('.quiz-opcion', caja).forEach(btn => btn.addEventListener('click', () => responder(+btn.dataset.i)));
    };

    const responder = i => {
      const pesos = CONFIG.quiz[paso].opciones[i].pesos;
      Object.entries(pesos).forEach(([k, v]) => { puntos[k] += v; });
      paso++;
      if (paso < CONFIG.quiz.length) pintarPregunta();
      else mostrarResultado();
    };

    const mostrarResultado = () => {
      const ganador = Object.entries(puntos).sort((a, b) => b[1] - a[1])[0][0];
      const r = CONFIG.resultados[ganador];
      caja.innerHTML = `
        <div class="quiz-resultado">
          <div class="emoji" aria-hidden="true">${r.emoji}</div>
          <p class="eyebrow">Tu aventura</p>
          <h3>${r.titulo}</h3>
          <p>${r.texto}</p>
          <button class="btn btn-primario btn-sm" id="quizReiniciar">Volver a jugar</button>
        </div>`;
      $('#quizReiniciar').addEventListener('click', reiniciar);
      confetti();
    };

    const reiniciar = () => {
      paso = 0;
      puntos = { aire: 0, agua: 0, arte: 0, noche: 0 };
      pintarPregunta();
    };

    pintarPregunta();
  }

  /* =======================================================
     14. TESTIMONIOS: slider con botones, puntos y swipe
     ======================================================= */
  function initTestimonios() {
    const slides = $$('.slide');
    const cont = $('#puntos');
    let idx = 0;
    let auto;

    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'punto' + (i === 0 ? ' activo' : '');
      b.setAttribute('aria-label', 'Testimonio ' + (i + 1));
      b.addEventListener('click', () => ir(i));
      cont.appendChild(b);
    });

    const ir = n => {
      const prev = idx;
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.classList.toggle('activo', i === idx);
        s.classList.toggle('salida', i === prev && prev !== idx);
      });
      $$('.punto', cont).forEach((p, i) => p.classList.toggle('activo', i === idx));
      reiniciarAuto();
    };

    const reiniciarAuto = () => {
      clearInterval(auto);
      auto = setInterval(() => ir(idx + 1), 6000);
    };

    $('#prevSlide').addEventListener('click', () => ir(idx - 1));
    $('#nextSlide').addEventListener('click', () => ir(idx + 1));

    let tx = null;
    const slider = $('#slider');
    slider.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) ir(idx + (dx < 0 ? 1 : -1));
      tx = null;
    });

    reiniciarAuto();
  }

  /* =======================================================
     15. FORMULARIO: validación, borrador, cupos, confirmación
     ======================================================= */
  function initForm() {
    const form = $('#form');
    const CLAVE_BORRADOR = 'tda-borrador-v2';
    const campos = $$('input, select, textarea', form).filter(c => c.id);

    const reglas = {
      nombre:   v => v.trim().length >= 2 || 'Escribí el nombre (mínimo 2 letras).',
      edad:     v => !!v || 'Elegí una edad.',
      email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Ingresá un email válido.',
      semana:   v => !!v || 'Elegí una semana.',
      telefono: v => v === '' || /^[+\d\s()-]{8,}$/.test(v) || 'Revisá el número.',
      notas:    () => true
    };

    const validarCampo = el => {
      const res = reglas[el.id](el.value);
      const wrap = el.closest('.campo');
      const ok = res === true;
      wrap.classList.toggle('invalido', !ok);
      wrap.querySelector('.error').textContent = ok ? '' : res;
      return ok;
    };

    const actualizarProgreso = () => {
      const requeridos = ['nombre', 'edad', 'email', 'semana'];
      const ok = requeridos.filter(id => reglas[id]($('#' + id).value) === true).length;
      $('#barra').style.width = (ok / requeridos.length * 100) + '%';
    };

    // Restaurar borrador
    const guardado = store.get(CLAVE_BORRADOR, {});
    campos.forEach(c => { if (guardado[c.id] !== undefined) c.value = guardado[c.id]; });

    campos.forEach(c => {
      c.addEventListener('input', () => {
        actualizarProgreso();
        if (c.closest('.invalido')) validarCampo(c);
        store.set(CLAVE_BORRADOR, Object.fromEntries(campos.map(x => [x.id, x.value])));
      });
      c.addEventListener('blur', () => { if (c.value) validarCampo(c); });
    });
    actualizarProgreso();

    form.addEventListener('submit', e => {
      e.preventDefault();

      const ids = ['nombre', 'edad', 'email', 'semana', 'telefono'];
      const todoOk = ids.map(id => validarCampo($('#' + id))).every(Boolean);
      if (!todoOk) {
        $('.campo.invalido input, .campo.invalido select')?.focus();
        return;
      }

      // Descontar un cupo en la semana elegida
      const semana = CONFIG.semanas.find(s => s.nombre === $('#semana').value);
      if (semana) {
        if (cupoActual(semana) >= semana.cupos) {
          toast('Esa semana ya no tiene cupos. Elegí otra.', 'error');
          return;
        }
        guardarCupo(semana.nombre, cupoActual(semana) + 1);
        window.__renderSemanas?.();
      }

      $('#emailConfirm').textContent = $('#email').value.trim();
      $('#formContenido').style.display = 'none';
      $('#confirmacion').classList.add('visible');
      store.del(CLAVE_BORRADOR);
      confetti();
      window.__sumarSello?.('inscripcion');
      toast('¡Inscripción enviada!');
      // Acá conectar con el backend o servicio de formularios
    });
  }

  /* =======================================================
     16. FAQ: solo un item abierto a la vez
     ======================================================= */
  function initFaq() {
    const items = $$('.faq details');
    items.forEach(d => d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
    }));
  }

  /* =======================================================
     17. COMPARTIR
     ======================================================= */
  function initCompartir() {
    $('#shareBtn').addEventListener('click', async () => {
      const datos = {
        title: document.title,
        text: 'Colonia de vacaciones Tierra de Aventuras',
        url: location.href
      };
      try {
        if (navigator.share) { await navigator.share(datos); return; }
        await navigator.clipboard.writeText(location.href);
        toast('Link copiado al portapapeles');
      } catch (err) {
        if (err.name !== 'AbortError') toast('No se pudo compartir', 'error');
      }
    });
  }

  /* =======================================================
     18. CONFETTI (canvas liviano)
     ======================================================= */
  function confetti() {
    if (reduceMotion) return;
    const c = document.createElement('canvas');
    c.className = 'confetti';
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    c.width = innerWidth;
    c.height = innerHeight;

    const colores = ['#2ec4e8', '#e0437a', '#4cb848', '#f39b2c', '#e8473f', '#8c4df0', '#f3b630'];
    const ps = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2,
      y: innerHeight / 2,
      vx: (Math.random() - .5) * 14,
      vy: -Math.random() * 14 - 4,
      r: Math.random() * 6 + 4,
      c: colores[Math.floor(Math.random() * colores.length)],
      rot: Math.random() * 6,
      vr: (Math.random() - .5) * .3
    }));

    const t0 = performance.now();
    const frame = now => {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach(p => {
        p.vy += .32;
        p.vx *= .99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        ctx.restore();
      });
      if (now - t0 < 2800) requestAnimationFrame(frame);
      else c.remove();
    };
    requestAnimationFrame(frame);
  }

  /* =======================================================
     20. PASAPORTE DE AVENTURAS
     Sellos por explorar la página. Se guardan en el navegador
     y al completarlos se puede descargar un PNG con el nombre.
     ======================================================= */
  function initPasaporte() {
    const CLAVE = 'tda-pasaporte-v1';
    const sellos = CONFIG.sellos;
    const lista = $('#sellos');
    const inputNombre = $('#explorador');
    let estado = store.get(CLAVE, { obtenidos: [], nombre: '' });
    inputNombre.value = estado.nombre || '';

    const render = recien => {
      lista.innerHTML = '';
      sellos.forEach(s => {
        const obtenido = estado.obtenidos.includes(s.id);
        const li = document.createElement('li');
        li.className = 'sello' + (obtenido ? ' obtenido' : '') + (recien === s.id ? ' recien' : '');
        li.style.setProperty('--c', s.color);
        li.setAttribute('aria-label', `${s.nombre}: ${obtenido ? 'sello obtenido' : 'pendiente'}`);
        li.innerHTML = `
          <span class="sello-marca" aria-hidden="true">${obtenido ? s.emoji : '?'}</span>
          <span class="sello-nombre">${s.nombre}</span>`;
        lista.appendChild(li);
      });

      const n = estado.obtenidos.length;
      $('#pasaporteN').textContent = n;
      $('#pasaporteBarra').style.width = (n / sellos.length * 100) + '%';
      $('#pasaporteFinal').hidden = n < sellos.length;
    };

    const sumar = id => {
      if (estado.obtenidos.includes(id)) return;
      const s = sellos.find(x => x.id === id);
      if (!s) return;
      estado.obtenidos.push(id);
      store.set(CLAVE, estado);
      render(id);
      toast(`${s.emoji} ¡Sello conseguido: ${s.nombre}!`);
      if (estado.obtenidos.length === sellos.length) {
        setTimeout(() => { confetti(); toast('🎉 ¡Completaste el pasaporte!'); }, 900);
      }
    };
    window.__sumarSello = sumar;

    // El sello se gana si la sección se queda visible 5 segundos
    const timers = new Map();
    const visitas = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        const s = sellos.find(x => x.seccion === e.target.id);
        if (!s) return;
        clearTimeout(timers.get(s.id));
        if (e.isIntersecting) {
          timers.set(s.id, setTimeout(() => sumar(s.id), 5000));
        }
      });
    }, { threshold: 0.25 }); // Bajamos un poco el umbral para que detecte mejor secciones extensas como la galería

    sellos.forEach(s => {
      const el = s.seccion && document.getElementById(s.seccion);
      if (el) visitas.observe(el);
    });

    $('#pasaporteReiniciar').addEventListener('click', () => {
      estado = { obtenidos: [], nombre: '' };
      inputNombre.value = '';
      store.set(CLAVE, estado);
      render();
      toast('Pasaporte reiniciado');
    });

    $('#pasaporteDescargar').addEventListener('click', async () => {
      const nombre = (inputNombre.value.trim() || 'Explorador/a').slice(0, 24);
      estado.nombre = nombre;
      store.set(CLAVE, estado);

      try { await document.fonts.ready; } catch (_) {}

      const c = document.createElement('canvas');
      c.width = 1200;
      c.height = 760;
      const x = c.getContext('2d');

      const fondo = x.createLinearGradient(0, 0, 0, 760);
      fondo.addColorStop(0, '#fdf0d8');
      fondo.addColorStop(.6, '#f7d39c');
      fondo.addColorStop(1, '#eca15e');
      x.fillStyle = fondo;
      x.fillRect(0, 0, 1200, 760);

      x.strokeStyle = '#2a2019';
      x.lineWidth = 14;
      x.strokeRect(28, 28, 1144, 704);

      x.textAlign = 'center';
      x.fillStyle = '#2a2019';
      x.font = '600 64px Fredoka, sans-serif';
      x.fillText('Pasaporte de Aventuras', 600, 130);
      x.font = '700 26px Nunito, sans-serif';
      x.fillText('Tierra de Aventuras · Centro Recreativo Nueva Era', 600, 178);
      x.font = '600 48px Fredoka, sans-serif';
      x.fillStyle = '#8a3e0c';
      x.fillText(nombre, 600, 262);

      sellos.forEach((s, i) => {
        const cx = 150 + i * 150;
        const cy = 410;
        const obtenido = estado.obtenidos.includes(s.id);

        x.save();
        x.translate(cx, cy);
        x.rotate(obtenido ? -.12 : 0);
        x.beginPath();
        x.arc(0, 0, 62, 0, Math.PI * 2);
        x.fillStyle = obtenido ? s.color : 'rgba(42, 32, 25, .08)';
        x.fill();
        x.lineWidth = 6;
        x.strokeStyle = '#2a2019';
        x.setLineDash(obtenido ? [] : [10, 8]);
        x.stroke();
        x.setLineDash([]);
        x.font = '50px sans-serif';
        x.textBaseline = 'middle';
        x.fillStyle = '#2a2019';
        x.fillText(obtenido ? s.emoji : '?', 0, 4);
        x.restore();

        x.textBaseline = 'alphabetic';
        x.font = '700 22px Nunito, sans-serif';
        x.fillStyle = '#2a2019';
        x.fillText(s.nombre, cx, 528);
      });

      x.font = '700 24px Nunito, sans-serif';
      x.fillText(`Explorador/a oficial · ${new Date().toLocaleDateString('es-AR')}`, 600, 640);
      x.font = '600 28px Fredoka, sans-serif';
      x.fillStyle = '#8a3e0c';
      x.fillText('¡Te esperamos en la colonia!', 600, 690);

      c.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'pasaporte-tierra-de-aventuras.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      });
    });

    render();
  }

  /* =======================================================
     19. INICIALIZACIÓN
     ======================================================= */
  document.addEventListener('DOMContentLoaded', () => {
    $('#anio').textContent = new Date().getFullYear();

    initTheme();
    initNav();
    initScrollspy();
    initScroll();
    initReveal();
    initCounters();
    initCountdown();
    initTilt();
    initSemanas();
    initGaleria();
    initPrograma();
    initQuiz();
    initTestimonios();
    initFaq();
    initForm();
    initCompartir();
    initPasaporte(); // ¡Activado correctamente!
  });
})();
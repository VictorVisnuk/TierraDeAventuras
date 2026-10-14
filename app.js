/* =========================================================
   TIERRA DE AVENTURAS · app.js (Edición Bosque Andino)
   Módulos: config, utilidades, tema (Día/Noche), nav, scroll + parallax SVG,
   reveal, contadores, countdown, tilt, turnos, galería, quiz,
   testimonios, formulario, faq, compartir, ICS, confetti, pasaporte
   ========================================================= */
(() => {
  'use strict';

  /* =======================================================
     1. CONFIGURACIÓN (editar acá)
     ======================================================= */
  const CONFIG = {
    proximaTemporada: '2027-01-04T09:00:00-03:00',
    finTemporada: '2027-02-26T17:00:00-03:00',
    nombreTemporada: 'Verano 2027',

    semanas: [
      { nombre: 'Turno mañana',    horario: '9 a 13 hs',  cupos: 40, ocupados: 31, emoji: '🌅', detalle: 'Caminatas por el bosque, talleres creativos y almuerzo compartido.' },
      { nombre: 'Turno tarde',     horario: '13 a 17 hs', cupos: 40, ocupados: 35, emoji: '🏞️', detalle: 'Almuerzo, grandes juegos de exploración al aire libre y merienda.' },
      { nombre: 'Jornada completa', horario: '9 a 17 hs',  cupos: 30, ocupados: 22, emoji: '☀️', detalle: 'El día entero de aventura en la naturaleza con todas las actividades.' }
    ],

    sellos: [
      { id: 'nosotros',    nombre: 'Nosotros',    emoji: '🏡', color: '#2eb8dc', seccion: 'sobre' },
      { id: 'actividades', nombre: 'Actividades', emoji: '🥾', color: '#f5922b', seccion: 'actividades' },
      { id: 'turnos',      nombre: 'Turnos',      emoji: '🕘', color: '#48b040', seccion: 'semanas' },
      { id: 'galeria',     nombre: 'Galería',     emoji: '📸', color: '#e8457f', seccion: 'galeria' },
      { id: 'dia',         nombre: 'Un día',      emoji: '🌲', color: '#f6b52e', seccion: 'dia' },
      { id: 'quiz',        nombre: 'Quiz',        emoji: '🧭', color: '#8b4cf0', seccion: 'quiz' },
      { id: 'inscripcion', nombre: 'Inscripción', emoji: '✏️', color: '#6ad4f0', seccion: null }
    ],

    fotos: [
      { t: 'Senderismo entre lengas y coihues', cat: 'aire',  c: ['#34684c', '#183324'], r: '4/5' },
      { t: 'Exploración en la orilla del río',  cat: 'agua',  c: ['#2eb8dc', '#175676'], r: '1/1' },
      { t: 'Taller de cocina y pan casero',     cat: 'arte',  c: ['#f3b630', '#7a4d24'], r: '3/4' },
      { t: 'Fogón e historias de campamento',   cat: 'noche', c: ['#e86f2c', '#1e1b4b'], r: '4/3' },
      { t: 'Caminata al mirador del valle',     cat: 'aire',  c: ['#529460', '#1f4226'], r: '3/4' },
      { t: 'Juegos cooperativos junto al arroyo', cat: 'agua', c: ['#4cc9e8', '#154e63'], r: '1/1' },
      { t: 'Mural colectivo de fauna fueguina', cat: 'arte',  c: ['#e0437a', '#6b1839'], r: '4/5' },
      { t: 'Noche de estrellas y Cruz del Sur', cat: 'noche', c: ['#1e3a8a', '#091124'], r: '1/1' },
      { t: 'Búsqueda del tesoro en el bosque',  cat: 'aire',  c: ['#d97724', '#5c280b'], r: '3/4' },
      { t: 'Armado de carpas y refugios',       cat: 'noche', c: ['#489e44', '#163315'], r: '4/5' },
      { t: 'Manualidades con elementos naturales', cat: 'arte', c: ['#eab308', '#713f12'], r: '4/3' },
      { t: 'Posta de aventura y puentes',       cat: 'agua',  c: ['#22b8cf', '#0c4a6e'], r: '3/4' }
    ],

    quiz: [
      { pregunta: '¿Qué es lo primero que hacés cuando llegás al bosque?', opciones: [
        { texto: 'Subir por el sendero para ver desde arriba', pesos: { aire: 2 } },
        { texto: 'Acercarme al río a escuchar el agua y buscar piedras', pesos: { agua: 2 } },
        { texto: 'Juntar hojas, ramas y piñas para crear algo', pesos: { arte: 2 } },
        { texto: 'Buscar el mejor lugar para armar la carpa y el fogón', pesos: { noche: 2 } }
      ]},
      { pregunta: '¿Con qué equipo ideal te imaginás en la colonia?', opciones: [
        { texto: 'Uno que camine lejos y descubra caminos nuevos', pesos: { aire: 2 } },
        { texto: 'Uno que juegue en equipo sin parar toda la tarde', pesos: { agua: 2 } },
        { texto: 'Uno que cocine cosas ricas y pinte murales', pesos: { arte: 2 } },
        { texto: 'Uno que cuente historias y mire las estrellas', pesos: { noche: 2 } }
      ]},
      { pregunta: '¿Qué te da más curiosidad aprender este verano?', opciones: [
        { texto: 'Orientarme con brújula y conocer los árboles fueguinos', pesos: { aire: 2 } },
        { texto: 'Cómo nacen los ríos de deshielo en la montaña', pesos: { agua: 2 } },
        { texto: 'Amasar pan casero y construir con materiales naturales', pesos: { arte: 2 } },
        { texto: 'Hacer nudos de campamento y reconocer constelaciones', pesos: { noche: 2 } }
      ]}
    ],

    resultados: {
      aire:  { emoji: '🥾', titulo: 'Explorador/a de Cumbres', texto: 'Las caminatas por el bosque andino, los miradores y la búsqueda del tesoro son tu lugar ideal.' },
      agua:  { emoji: '🏞️', titulo: 'Guardián/a del Río', texto: 'Los juegos al aire libre, las postas deportivas y las expediciones junto al arroyo te van a encantar.' },
      arte:  { emoji: '🎨', titulo: 'Creador/a del Bosque', texto: 'Entre talleres de cocina, pan casero, manualidades y murales vas a dejar tu huella en la colonia.' },
      noche: { emoji: '⛺', titulo: 'Maestro/a de Campamento', texto: 'El armado de carpas, los fogones, las canciones y las historias bajo el cielo fueguino son para vos.' }
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
    if (!cont) return;
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
     3. TEMA DÍA / NOCHE EN EL BOSQUE
     ======================================================= */
  function initTheme() {
    const btn = $('#themeBtn');
    const icono = $('#themeIcono');
    const texto = $('#themeTexto');
    const metaTheme = $('meta[name="theme-color"]');

    const guardado = store.get('tda-tema', null);
    const inicialOscuro = guardado
      ? guardado === 'oscuro'
      : matchMedia('(prefers-color-scheme: dark)').matches;

    const aplicar = oscuro => {
      document.documentElement.dataset.theme = oscuro ? 'oscuro' : 'claro';
      if (icono) icono.textContent = oscuro ? '🌙' : '☀️';
      if (texto) texto.textContent = oscuro ? 'Noche' : 'Día';
      if ( !icono && !texto && btn) btn.textContent = oscuro ? '☀️' : '🌙';
      if (btn) {
        btn.setAttribute('aria-label', oscuro ? 'Cambiar a modo Día en el bosque' : 'Cambiar a modo Noche en el bosque');
      }
      if (metaTheme) {
        metaTheme.setAttribute('content', oscuro ? '#0d1713' : '#1b4d3e');
      }
    };

    aplicar(inicialOscuro);
    btn?.addEventListener('click', () => {
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
    if (!menu || !btn) return;

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
     5. SCROLL: sombra nav, parallax multicapa SVG, timeline, back-to-top
     ======================================================= */
  function initScroll() {
    const nav = $('#nav');
    const hero = $('#heroContenido');
    const capasSvg = $$('[data-parallax]');
    const backTop = $('#backTop');
    const timeline = $('#dia .timeline');
    let pendiente = false;

    const actualizar = () => {
      pendiente = false;
      const y = window.scrollY;

      nav?.classList.toggle('scrolled', y > 60);
      backTop?.classList.toggle('visible', y > 700);

      if (!reduceMotion && y < window.innerHeight * 1.3) {
        if (hero) {
          hero.style.transform = `translateY(${(y * 0.22).toFixed(1)}px)`;
        }
        capasSvg.forEach(capa => {
          const factor = parseFloat(capa.dataset.parallax) || 0.2;
          const dy = (1 - factor) * y * 0.42;
          capa.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0)`;
        });
      }

      if (timeline) {
        const r = timeline.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / r.height));
        timeline.style.setProperty('--prog', p.toFixed(3));
      }
    };

    addEventListener('scroll', () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    }, { passive: true });

    backTop?.addEventListener('click', () =>
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
    }, { threshold: 0.14 });
    $$('.reveal, .paso').forEach(el => io.observe(el));
  }

  /* =======================================================
     7. CONTADORES ANIMADOS
     ======================================================= */
  function initCounters() {
    const statsEl = $('.stats');
    if (!statsEl) return;

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
    }, { threshold: 0.4 });
    io.observe(statsEl);
  }

  /* =======================================================
     8. CUENTA REGRESIVA + ICS
     ======================================================= */
  function initCountdown() {
    const tempEl = $('#temporadaNombre');
    if (tempEl) tempEl.textContent = CONFIG.nombreTemporada;

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

    $('#icsBtn')?.addEventListener('click', descargarICS);
    $('#icsBtn2')?.addEventListener('click', descargarICS);
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
      'SUMMARY:Colonia Tierra de Aventuras',
      'DESCRIPTION:Colonia de vacaciones en el bosque fueguino - Centro Recreativo Nueva Era',
      'LOCATION:Centro Recreativo Nueva Era, Cno. del Valle 3500, Ushuaia',
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    const blob = new Blob([lineas.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tierra-de-aventuras.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* =======================================================
     9. TILT 3D EN TARJETAS DE ACTIVIDADES + VISUAL LEMA
     ======================================================= */
  function initTilt() {
    if (reduceMotion) return;

    $$('[data-tilt], .card-actividad').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((x - 0.5) * 10).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    const visual = $('#sobreVisual');
    if (visual) {
      visual.addEventListener('pointermove', e => {
        const r = visual.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        visual.style.transform = `perspective(800px) rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg)`;
      });
      visual.addEventListener('pointerleave', () => { visual.style.transform = ''; });
    }
  }

  /* =======================================================
     10. TURNOS / SEMANAS CON CUPOS Y CHIP DINÁMICO
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
    const chipCupos = $('#chipCupos');
    if (!grid || !select) return;

    const render = () => {
      grid.innerHTML = '';
      let totalLibres = 0;

      CONFIG.semanas.forEach(s => {
        const ocupados = cupoActual(s);
        const libres = Math.max(0, s.cupos - ocupados);
        totalLibres += libres;
        const pct = Math.min(100, (ocupados / s.cupos) * 100);
        const completa = libres === 0;
        const alerta = !completa && libres <= 6;

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
          <button type="button" class="btn btn-primario btn-sm" ${completa ? 'disabled' : ''} data-semana="${s.nombre}">
            ${completa ? 'Sin cupo' : 'Elegir este turno'}
          </button>`;
        grid.appendChild(card);

        requestAnimationFrame(() => {
          setTimeout(() => { card.querySelector('.barra-cupo div').style.width = pct + '%'; }, 150);
        });
      });

      // Actualizar el chip del Hero con el total de lugares disponibles
      if (chipCupos) {
        chipCupos.textContent = totalLibres > 0
          ? `🎟️ ${totalLibres} lugares disponibles`
          : '🎟️ Cupos completos';
      }

      // Sincronizar opciones del select en el formulario
      $$('option', select).forEach(o => {
        const s = CONFIG.semanas.find(x => x.nombre === o.value);
        if (!s) return;
        const libre = cupoActual(s) < s.cupos;
        o.disabled = !libre;
        o.textContent = libre ? `${s.nombre} (${s.horario})` : `${s.nombre} (completo)`;
      });

      // Al elegir turno, actualizar select, disparar 'input' para progreso/borrador y bajar al form
      $$('.semana .btn', grid).forEach(btn => btn.addEventListener('click', () => {
        select.value = btn.dataset.semana;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
        $('#reserva')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        setTimeout(() => $('#nombre')?.focus({ preventScroll: true }), 650); }));        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.15 }); $$('.semana.reveal', grid).forEach(el => io.observe(el));
    };

    render();
    window.__renderSemanas = render;
  }

  /* =======================================================
     11. GALERÍA: filtros, búsqueda, favoritas, lightbox
     ======================================================= */
  function initGaleria() {
    const masonry = $('#masonry');
    if (!masonry) return;

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
      el.style.animationDelay = (i * 55) + 'ms';
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
      let cantVisibles = 0;
      fotos.forEach(el => {
        const i = +el.dataset.i;
        const f = CONFIG.fotos[i];
        const okCat = filtroCat === 'todas'
          || (filtroCat === 'favoritas' ? favs.has(i) : f.cat === filtroCat);
        const okQ = !busqueda || f.t.toLowerCase().includes(busqueda);
        const mostrar = okCat && okQ;
        el.classList.toggle('oculta', !mostrar);
        if (mostrar) cantVisibles++;
      });
      const vacia = $('#galeriaVacia');
      if (vacia) vacia.hidden = cantVisibles > 0;
    };

    $$('.filtro').forEach(btn => btn.addEventListener('click', () => {$$
('.filtro').forEach(b => b.classList.toggle('activo', b === btn));
      filtroCat = btn.dataset.filtro;
      aplicarFiltros();
    }));

    $('#buscarFoto')?.addEventListener('input', e => {
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
      if (!f) return;
      const [w, h] = f.r.split('/');
      lbImg.style.background = `linear-gradient(145deg, ${f.c[0]}, ${f.c[1]})`;
      lbImg.style.setProperty('--ratio', `${w}/${h}`);
      lbTitulo.textContent = f.t;
      lbContador.textContent = `${actual + 1} / ${visibles.length}`;
      pintarFav();
    };

    const abrir = el => {
      visibles = fotos.filter(f => !f.classList.contains('oculta')).map(f => +f.dataset.i);
      if (!visibles.length) return;
      actual = Math.max(0, visibles.indexOf(+el.dataset.i));
      pintar();
      lb.classList.add('abierto');
      document.body.style.overflow = 'hidden';
      $('#lbCerrar')?.focus();
    };

    const cerrar = () => {
      lb.classList.remove('abierto');
      document.body.style.overflow = '';
    };

    const mover = d => {
      if (!visibles.length) return;
      actual = (actual + d + visibles.length) % visibles.length;
      lbImg.style.opacity = 0;
      setTimeout(() => { pintar(); lbImg.style.opacity = 1; }, 180);
    };

    fotos.forEach(el => {
      el.addEventListener('click', () => abrir(el));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abrir(el);
        }
      });
    });

    $('#lbCerrar')?.addEventListener('click', cerrar);
    $('#lbPrev')?.addEventListener('click', () => mover(-1));
    $('#lbNext')?.addEventListener('click', () => mover(1));
    lb?.addEventListener('click', e => { if (e.target === lb) cerrar(); });

    lbFav?.addEventListener('click', () => {
      const i = visibles[actual];
      if (favs.has(i)) favs.delete(i); else favs.add(i);
      store.set('tda-favs', [...favs]);
      marcarFavoritas();
      pintarFav();
      if (filtroCat === 'favoritas') aplicarFiltros();
    });

    document.addEventListener('keydown', e => {
      if (!lb?.classList.contains('abierto')) return;
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowRight') mover(1);
      if (e.key === 'ArrowLeft') mover(-1);
      if (e.key === 'f' || e.key === 'F') lbFav?.click();
    });

    let tx = null;
    lb?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lb?.addEventListener('touchend', e => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
      tx = null;
    });

    marcarFavoritas();
    aplicarFiltros();
  }

 /* =======================================================
     12. QUIZ DEL BOSQUE
     ======================================================= */
  function initQuiz() {
    const caja = document.getElementById('quizBox');
    if (!caja) return;
    let paso = 0;
    let puntos = { aire: 0, agua: 0, arte: 0, noche: 0 };

    const reiniciar = () => {
      paso = 0;
      puntos = { aire: 0, agua: 0, arte: 0, noche: 0 };
      pintarPregunta();
    };

    const mostrarResultado = () => {
      const ganador = Object.entries(puntos).sort((a, b) => b[1] - a[1])[0][0];
      const r = CONFIG.resultados[ganador];
      caja.innerHTML = [
        '<div class="quiz-resultado">',
          '<div class="emoji" aria-hidden="true">' + r.emoji + '</div>',
          '<p class="eyebrow">Tu perfil en la colonia</p>',
          '<h3>' + r.titulo + '</h3>',
          '<p>' + r.texto + '</p>',
          '<button type="button" class="btn btn-primario btn-sm" id="quizReiniciar">Volver a jugar</button>',
        '</div>'
      ].join('');
      const btnReiniciar = document.getElementById('quizReiniciar');
      if (btnReiniciar) btnReiniciar.addEventListener('click', reiniciar);
      confetti();
    };

    const responder = i => {
      const pesos = CONFIG.quiz[paso].opciones[i].pesos;
      Object.entries(pesos).forEach(([k, v]) => { puntos[k] += v; });
      paso++;
      if (paso < CONFIG.quiz.length) pintarPregunta();
      else mostrarResultado();
    };

    const pintarPregunta = () => {
      const q = CONFIG.quiz[paso];
      const pct = Math.round((paso / CONFIG.quiz.length) * 100);
      const botones = q.opciones
        .map((o, i) => '<button type="button" class="quiz-opcion" data-i="' + i + '">' + o.texto + '</button>')
        .join('');

      caja.innerHTML = [
        '<div class="quiz-progreso"><div style="width:' + pct + '%"></div></div>',
        '<p class="eyebrow">Pregunta ' + (paso + 1) + ' de ' + CONFIG.quiz.length + '</p>',
        '<h3 class="quiz-pregunta">' + q.pregunta + '</h3>',
        '<div class="quiz-opciones">' + botones + '</div>'
      ].join('');

      caja.querySelectorAll('.quiz-opcion').forEach(btn => {
        btn.addEventListener('click', () => responder(Number(btn.dataset.i)));
      });
    };

    pintarPregunta();
  }

  /* =======================================================
     13. TESTIMONIOS: slider con botones, puntos y swipe
     ======================================================= */
  function initTestimonios() {
    const slides = [...document.querySelectorAll('.slide')];
    const cont = document.getElementById('puntos');
    if (slides.length === 0) return;
    if (!cont) return;

    let idx = 0;
    let auto;

    const reiniciarAuto = () => {
      clearInterval(auto);
      auto = setInterval(() => ir(idx + 1), 6500);
    };

    const ir = n => {
      const prev = idx;
      const total = slides.length;
      idx = ((n % total) + total) % total;

      slides.forEach((s, i) => {
        s.classList.toggle('activo', i === idx);
        s.classList.toggle('salida', i === prev && prev !== idx);
      });

      cont.querySelectorAll('.punto').forEach((p, i) => {
        p.classList.toggle('activo', i === idx);
      });

      reiniciarAuto();
    };

    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'punto' + (i === 0 ? ' activo' : '');
      b.setAttribute('aria-label', 'Testimonio ' + (i + 1));
      b.addEventListener('click', () => ir(i));
      cont.appendChild(b);
    });

    const btnPrev = document.getElementById('prevSlide');
    const btnNext = document.getElementById('nextSlide');
    if (btnPrev) btnPrev.addEventListener('click', () => ir(idx - 1));
    if (btnNext) btnNext.addEventListener('click', () => ir(idx + 1));

    let tx = null;
    const slider = document.getElementById('slider');
    if (slider) {
      slider.addEventListener('touchstart', e => {
        tx = e.touches[0].clientX;
      }, { passive: true });

      slider.addEventListener('touchend', e => {
        if (tx === null) return;
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 50) {
          ir(idx + (dx < 0 ? 1 : -1));
        }
        tx = null;
      });
    }

    reiniciarAuto();
  }

  /* =======================================================
     14. FORMULARIO: validación, borrador, cupos, confirmación
     ======================================================= */
  function initForm() {
    const form = $('#form'); if (!form) return; const CLAVE_BORRADOR = 'tda-borrador-v2'; const campos = $$('input, select, textarea', form).filter(c => c.id);
    const barra = $('#barra');

    const reglas = {
      nombre:   v => v.trim().length >= 2 || 'Escribí el nombre (mínimo 2 letras).',
      edad:     v => !!v || 'Elegí una edad.',
      email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Ingresá un email válido.',
      semana:   v => !!v || 'Elegí un turno.',
      telefono: v => v.trim() === '' || /^[+\d\s()-]{8,}$/.test(v.trim()) || 'Revisá el número.',
      notas:    () => true
    };

    const validarCampo = el => {
      const regla = reglas[el.id];
      if (!regla) return true;
      const res = regla(el.value);
      const wrap = el.closest('.campo');
      const ok = res === true;
      wrap?.classList.toggle('invalido', !ok);
      const errEl = wrap?.querySelector('.error');
      if (errEl) errEl.textContent = ok ? '' : res;
      return ok;
    };

    const actualizarProgreso = () => {
      const requeridos = ['nombre', 'edad', 'email', 'semana'];
      const ok = requeridos.filter(id => {
        const el = $('#' + id);
        return el && reglas[id](el.value) === true;
      }).length;
      const pct = Math.round((ok / requeridos.length) * 100);
      if (barra) {
        barra.style.width = pct + '%';
        barra.setAttribute('aria-valuenow', String(pct));
      }
    };

    // Restaurar borrador guardado
    const guardado = store.get(CLAVE_BORRADOR, {});
    campos.forEach(c => { if (guardado[c.id] !== undefined) c.value = guardado[c.id]; });

    const alCambiar = c => {
      actualizarProgreso();
      if (c.closest('.invalido')) validarCampo(c);
      store.set(CLAVE_BORRADOR, Object.fromEntries(campos.map(x => [x.id, x.value])));
    };

    campos.forEach(c => {
      c.addEventListener('input', () => alCambiar(c));
      c.addEventListener('change', () => alCambiar(c));
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

      // Descontar un cupo en el turno elegido
      const semana = CONFIG.semanas.find(s => s.nombre === $('#semana').value);
      if (semana) {
        if (cupoActual(semana) >= semana.cupos) {
          toast('Ese turno ya no tiene cupos disponibles. Elegí otro.', 'error');
          return;
        }
        guardarCupo(semana.nombre, cupoActual(semana) + 1);
        window.__renderSemanas?.();
      }

      $('#emailConfirm').textContent = $('#email').value.trim();
      $('#formContenido').style.display = 'none';
      $('#confirmacion').classList.add('visible'); store.del(CLAVE_BORRADOR); confetti(); window.__sumarSello?.('inscripcion'); toast('¡Inscripción enviada con éxito!'); }); }    /* ======================================================= 15. FAQ: acordeón exclusivo ======================================================= */ function initFaq() { const items = $$('.faq details');
    items.forEach(d => d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
    }));
  }

  /* =======================================================
     16. COMPARTIR
     ======================================================= */
  function initCompartir() {
    $('#shareBtn')?.addEventListener('click', async () => {
      const datos = {
        title: document.title,
        text: 'Colonia de vacaciones Tierra de Aventuras · Centro Recreativo Nueva Era',
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
     17. CONFETTI (canvas liviano)
     ======================================================= */
  function confetti() {
    if (reduceMotion) return;
    const c = document.createElement('canvas');
    c.className = 'confetti';
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    c.width = innerWidth;
    c.height = innerHeight;

    const colores = ['#2eb8dc', '#e8457f', '#48b040', '#f5922b', '#e8473f', '#8b4cf0', '#f6b52e'];
    const ps = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2,
      y: innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 4,
      r: Math.random() * 6 + 4,
      c: colores[Math.floor(Math.random() * colores.length)],
      rot: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.3
    }));

    const t0 = performance.now();
    const frame = now => {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach(p => {
        p.vy += 0.32;
        p.vx *= 0.99;
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
     18. PASAPORTE DE AVENTURAS
     ======================================================= */
  function initPasaporte() {
    const CLAVE = 'tda-pasaporte-v1';
    const sellos = CONFIG.sellos;
    const lista = $('#sellos');
    const inputNombre = $('#explorador');
    if (!lista || !inputNombre) return;

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

    // El sello se gana si la sección permanece visible durante 4.5 segundos
    const timers = new Map();
    const visitas = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        const s = sellos.find(x => x.seccion === e.target.id);
        if (!s) return;
        clearTimeout(timers.get(s.id));
        if (e.isIntersecting) {
          timers.set(s.id, setTimeout(() => sumar(s.id), 4500));
        }
      });
    }, { threshold: 0.22 });

    sellos.forEach(s => {
      const el = s.seccion && document.getElementById(s.seccion);
      if (el) visitas.observe(el);
    });

    $('#pasaporteReiniciar')?.addEventListener('click', () => {
      estado = { obtenidos: [], nombre: '' };
      inputNombre.value = '';
      store.set(CLAVE, estado);
      render();
      toast('Pasaporte reiniciado');
    });

    $('#pasaporteDescargar')?.addEventListener('click', async () => {
      const nombre = (inputNombre.value.trim() || 'Explorador/a').slice(0, 24);
      estado.nombre = nombre;
      store.set(CLAVE, estado);

      try { await document.fonts.ready; } catch (_) {}

      const c = document.createElement('canvas');
      c.width = 1200;
      c.height = 760;
      const x = c.getContext('2d');

      // Fondo pergamino / bosque patagónico
      const fondo = x.createLinearGradient(0, 0, 0, 760);
      fondo.addColorStop(0, '#eef7f2');
      fondo.addColorStop(0.55, '#d5e8dd');
      fondo.addColorStop(1, '#b8d8c6');
      x.fillStyle = fondo;
      x.fillRect(0, 0, 1200, 760);

      // Marco doble estilo guardaparque
      x.strokeStyle = '#18281f';
      x.lineWidth = 14;
      x.strokeRect(28, 28, 1144, 704);
      x.strokeStyle = '#48b040';
      x.lineWidth = 4;
      x.strokeRect(44, 44, 1112, 672);

      x.textAlign = 'center';
      x.fillStyle = '#18281f';
      x.font = '600 62px Fredoka, sans-serif';
      x.fillText('Pasaporte de Aventuras', 600, 130);
      x.font = '700 25px Nunito, sans-serif';
      x.fillStyle = '#243b2f';
      x.fillText('Tierra de Aventuras · Bosque Andino Patagónico · Ushuaia', 600, 178);
      x.font = '600 48px Fredoka, sans-serif';
      x.fillStyle = '#d97214';
      x.fillText(nombre, 600, 260);

      sellos.forEach((s, i) => {
        const cx = 150 + i * 150;
        const cy = 410;
        const obtenido = estado.obtenidos.includes(s.id);

        x.save();
        x.translate(cx, cy);
        x.rotate(obtenido ? -0.12 : 0);
        x.beginPath();
        x.arc(0, 0, 62, 0, Math.PI * 2);
        x.fillStyle = obtenido ? s.color : 'rgba(24, 40, 31, 0.08)';
        x.fill();
        x.lineWidth = 6;
        x.strokeStyle = '#18281f';
        x.setLineDash(obtenido ? [] : [10, 8]);
        x.stroke();
        x.setLineDash([]);
        x.font = '50px sans-serif';
        x.textBaseline = 'middle';
        x.fillStyle = '#18281f';
        x.fillText(obtenido ? s.emoji : '?', 0, 4);
        x.restore();

        x.textBaseline = 'alphabetic';
        x.font = '700 22px Nunito, sans-serif';
        x.fillStyle = '#18281f';
        x.fillText(s.nombre, cx, 528);
      });

      x.font = '700 24px Nunito, sans-serif';
      x.fillStyle = '#243b2f';
      x.fillText(`Explorador/a oficial · Centro Recreativo Nueva Era · ${new Date().toLocaleDateString('es-AR')}`, 600, 638);
      x.font = '600 28px Fredoka, sans-serif';
      x.fillStyle = '#18281f';
      x.fillText('¡Nos vemos en el bosque!', 600, 688);

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
    const anioEl = $('#anio');
    if (anioEl) anioEl.textContent = new Date().getFullYear();

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
    initQuiz();
    initTestimonios();
    initFaq();
    initForm();
    initCompartir();
    initPasaporte();
  });
})();
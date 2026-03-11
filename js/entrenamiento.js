const contenedor = document.getElementById("contenedorEntrenamiento");
const terminarBtn = document.getElementById("terminarBtn");
const cronometro = document.getElementById("cronometro");

const activo = JSON.parse(localStorage.getItem("entrenamientoActivo"));

if (!activo) {
  alert("No hay entrenamiento activo");

  window.location.href = "miRutina.html";
}

const rutina = JSON.parse(localStorage.getItem("rutinaUsuario"));

const historial = JSON.parse(
  localStorage.getItem("historialEjercicios") || "{}",
);

const ejercicios = rutina[activo.dia];

function detectarMusculo(ejercicio) {
  ejercicio = ejercicio.toLowerCase();

  if (
    ejercicio.includes("press") ||
    ejercicio.includes("flexiones") ||
    ejercicio.includes("cruces") ||
    ejercicio.includes("aperturas")
  )
    return "Pecho";

  if (
    ejercicio.includes("remo") ||
    ejercicio.includes("dominadas") ||
    ejercicio.includes("jalon") ||
    ejercicio.includes("dorsalera") ||
    ejercicio.includes("superman") ||
    ejercicio.includes("pull") ||
    ejercicio.includes("Hiperextensiones")
  )
    return "Espalda";

  if (
    ejercicio.includes("sentadilla") ||
    ejercicio.includes("prensa") ||
    ejercicio.includes("zancadas") ||
    ejercicio.includes("cuadriceps") ||
    ejercicio.includes("femoral") ||
    ejercicio.includes("hip thrust") ||
    ejercicio.includes("gemelos") ||
    ejercicio.includes("glùteo") ||
    ejercicio.includes("squat") ||
    ejercicio.includes("peso muerto") ||
    ejercicio.includes("buenos dias") ||
    ejercicio.includes("Nordic") ||
    ejercicio.includes("Glute ham raise") ||
    ejercicio.includes("Abduccion") ||
    ejercicio.includes("Elevaciones")
  )
    return "Piernas";

  if (ejercicio.includes("curl")) return "Biceps";

  if (
    ejercicio.includes("triceps") ||
    ejercicio.includes("fondos") ||
    ejercicio.includes("frances") ||
    ejercicio.includes("extensión") ||
    ejercicio.includes("extensiones") ||
    ejercicio.includes("patada") ||
    ejercicio.includes("polea") ||
    ejercicio.includes("cuerda") ||
    ejercicio.includes("rompecraneos")
  )
    return "Triceps";

  if (
    ejercicio.includes("hombro") ||
    ejercicio.includes("hombros") ||
    ejercicio.includes("arnold") ||
    ejercicio.includes("militar") ||
    ejercicio.includes("laterales") ||
    ejercicio.includes("pajaro") ||
    ejercicio.includes("facepull") ||
    ejercicio.includes("elevaciones frontales") ||
    ejercicio.includes("elevaciones posteriores") ||
    ejercicio.includes("elevaciones laterales") ||
    ejercicio.includes("removermanos") ||
    ejercicio.includes("removermanos")
  )
    return "Hombros";

  if (
    ejercicio.includes("antebrazo") ||
    ejercicio.includes("antebrazos") ||
    ejercicio.includes("wrist") ||
    ejercicio.includes("muñeca") ||
    ejercicio.includes("farmer") ||
    ejercicio.includes("grip") ||
    ejercicio.includes("agarre") ||
    ejercicio.includes("curl")
  )
    return "Antebrazos";
  if (
    ejercicio.includes("abdominal") ||
    ejercicio.includes("abdominales") ||
    ejercicio.includes("crunch") ||
    ejercicio.includes("plancha") ||
    ejercicio.includes("elevacion de piernas") ||
    ejercicio.includes("elevaciones de piernas") ||
    ejercicio.includes("leg raises") ||
    ejercicio.includes("ab wheel") ||
    ejercicio.includes("rueda abdominal") ||
    ejercicio.includes("mountain climbers") ||
    ejercicio.includes("bicicleta") ||
    ejercicio.includes("toques de talon") ||
    ejercicio.includes("v-ups") ||
    ejercicio.includes("ab twist") ||
    ejercicio.includes("giros rusos") ||
    ejercicio.includes("russian twists")
  )
    return "Abdominales";
  return null;
}

function sumarRacha() {
  let racha = parseInt(localStorage.getItem("racha")) || 0;

  racha++;

  localStorage.setItem("racha", racha);
}

function sumarProgreso(musculo) {
  if (!musculo) return;

  let datos = JSON.parse(localStorage.getItem("rangosMusculo"));

  if (!datos) return;

  datos[musculo].exp += 10;

  if (datos[musculo].exp >= 100) {
    datos[musculo].exp = 0;

    datos[musculo].rango++;
  }

  localStorage.setItem("rangosMusculo", JSON.stringify(datos));
}

/* =====================
CRONOMETRO
===================== */

function actualizarCronometro() {
  let seg = Math.floor((Date.now() - activo.inicio) / 1000);

  let min = Math.floor(seg / 60);

  seg = seg % 60;

  cronometro.textContent =
    String(min).padStart(2, "0") + ":" + String(seg).padStart(2, "0");
}

setInterval(actualizarCronometro, 1000);

/* =====================
CREAR EJERCICIOS
===================== */

ejercicios.forEach((ej, index) => {
  let card = document.createElement("div");

  card.className = "ejercicioCard";

  card.innerHTML = `<h3>${ej.nombre}</h3>`;

  contenedor.appendChild(card);

  let seriesContainer = document.createElement("div");

  seriesContainer.className = "seriesContainer";

  card.appendChild(seriesContainer);

  let historialEjercicio = historial[ej.nombre] || [];

  /* CREAR SERIES */

  for (let i = 0; i < ej.series; i++) {
    let anterior = historialEjercicio[i];

    crearSerie(seriesContainer, anterior);
  }

  let btn = document.createElement("button");

  btn.textContent = "+ Serie";

  btn.onclick = () => {
    crearSerie(seriesContainer, null);
  };

  card.appendChild(btn);
});

/* =====================
CREAR SERIE
===================== */

function crearSerie(container, anterior) {
  let fila = document.createElement("div");

  fila.className = "filaSerie";

  let anteriorTexto = "";

  let recomendado = "";

  if (anterior) {
    anteriorTexto = `${anterior.peso}kg x ${anterior.reps}`;

    if (anterior.reps >= 12) {
      recomendado = ` (+5kg recomendado)`;
    }
  }

  fila.innerHTML = `

<div class="serieAnterior">
${anteriorTexto}
</div>

<input type="number" placeholder="reps">

<input type="number" placeholder="peso">

<button class="deleteSerie">x</button>

`;

  container.appendChild(fila);

  /* eliminar serie */

  fila.querySelector(".deleteSerie").onclick = () => {
    fila.remove();
  };

  /* peso recomendado */

  if (anterior && anterior.reps >= 12) {
    let pesoInput = fila.querySelectorAll("input")[1];

    pesoInput.placeholder = anterior.peso + 5;
  }
}

/* =====================
TERMINAR ENTRENAMIENTO
===================== */

terminarBtn.onclick = () => {
  let guardar = confirm(
    "Aceptar = guardar entrenamiento\nCancelar = descartar",
  );

  if (!guardar) {
    localStorage.removeItem("entrenamientoActivo");

    window.location.href = "miRutina.html";

    return;
  }

  let nuevoHistorial = { ...historial };

  document.querySelectorAll(".ejercicioCard").forEach((card) => {
    let nombre = card.querySelector("h3").textContent;

    let series = [];

    card.querySelectorAll(".filaSerie").forEach((fila) => {
      let reps = parseInt(fila.children[1].value) || 0;

      let peso = parseInt(fila.children[2].value) || 0;

      series.push({ reps, peso });
    });

    nuevoHistorial[nombre] = series;
  });

  localStorage.setItem("historialEjercicios", JSON.stringify(nuevoHistorial));

  localStorage.removeItem("entrenamientoActivo");

  /* =========================
SUMAR RACHA Y RANGO
========================= */

  sumarRacha();

  document.querySelectorAll(".ejercicioCard").forEach((card) => {
    let nombre = card.querySelector("h3").textContent;

    let musculo = detectarMusculo(nombre);

    sumarProgreso(musculo);
  });

  alert("Entrenamiento guardado 💪");

  window.location.href = "miRutina.html";
};

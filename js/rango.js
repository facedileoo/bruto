// LISTA DE RANGOS
const rangos = [
  "Bronce",
  "Plata",
  "Oro",
  "Aspirante",
  "Esmeralda",
  "Diamante",
  "Platino",
  "Campeon",
  "Fuera de serie",
  "Bruto",
];

// EXP NECESARIA POR RANGO
const dificultad = [100, 150, 200, 300, 450, 650, 900, 1200, 1600, 2000];

// MUSCULOS
const musculos = [
  "Pecho",
  "Espalda",
  "Piernas",
  "Biceps",
  "Triceps",
  "Hombros",
];

// -----------------------------
// CREAR DATOS SI NO EXISTEN
// -----------------------------
function iniciarDatos() {
  let datosGuardados = localStorage.getItem("rangosMusculo");

  if (!datosGuardados) {
    let datos = {};

    musculos.forEach((m) => {
      datos[m] = {
        exp: 0,
        rango: 0,
      };
    });

    localStorage.setItem("rangosMusculo", JSON.stringify(datos));
  }
}

// -----------------------------
// CARGAR RANGOS EN PANTALLA
// -----------------------------
function cargarRangos() {
  let contenedor = document.getElementById("rangos");

  let datos = JSON.parse(localStorage.getItem("rangosMusculo"));

  contenedor.innerHTML = "";

  for (let musculo in datos) {
    let exp = datos[musculo].exp;

    let rango = datos[musculo].rango;

    let necesario = dificultad[rango];

    let porcentaje = (exp / necesario) * 100;

    if (porcentaje > 100) {
      porcentaje = 100;
    }

    let faltante = necesario - exp;

    if (faltante < 0) {
      faltante = 0;
    }

    let card = document.createElement("div");

    card.className = "musculo-card";

    card.innerHTML = `

<div class="musculo-header">

<div class="musculo-nombre">
${musculo}
</div>

<div class="rango-nombre">
${rangos[rango]}
</div>

</div>

<div class="barra-progreso">

<div class="progreso" style="width:${porcentaje}%"></div>

</div>

<div class="progreso-texto">

Faltan ${faltante} puntos para subir de rango

</div>

`;

    contenedor.appendChild(card);
  }
}

// -----------------------------
// SUMAR PROGRESO
// -----------------------------
function sumarProgreso(musculo, puntos) {
  let datos = JSON.parse(localStorage.getItem("rangosMusculo"));

  if (!datos[musculo]) {
    return;
  }

  datos[musculo].exp += puntos;

  let rangoActual = datos[musculo].rango;

  let necesario = dificultad[rangoActual];

  // SUBIR RANGO
  if (datos[musculo].exp >= necesario && rangoActual < rangos.length - 1) {
    datos[musculo].exp = 0;

    datos[musculo].rango++;

    alert("🔥 " + musculo + " subió a rango " + rangos[datos[musculo].rango]);
  }

  // GUARDAR DATOS
  localStorage.setItem("rangosMusculo", JSON.stringify(datos));

  // ACTUALIZAR UI
  cargarRangos();
}

// -----------------------------
// INICIAR SISTEMA
// -----------------------------
iniciarDatos();

cargarRangos();

// -----------------------------
// EJEMPLO PARA PROBAR
// -----------------------------

// sumarProgreso("Pecho",20);
// sumarProgreso("Piernas",15);

const diasContainer = document.getElementById("diasContainer");
const agregarDiaBtn = document.getElementById("agregarDia");

let numeroDia = 0;

/* =========================
ENTRENAMIENTO ACTIVO
========================= */

const activo = JSON.parse(localStorage.getItem("entrenamientoActivo"));

if (activo) {
  const aviso = document.createElement("div");

  aviso.className = "entrenamientoActivo";

  aviso.innerHTML = `
🔥 Entrenamiento en curso
<button id="volverEntreno">Continuar</button>
`;

  document.body.prepend(aviso);

  document.getElementById("volverEntreno").onclick = () => {
    window.location.href = "entrenamiento.html";
  };
}

/* =========================
LISTA EJERCICIOS
========================= */

const listaEjercicios = [
  /* PECHO */
  "Press de banca con barra",
  "Press de banca con mancuernas",
  "Press de banca en máquina",
  "Press de banca en máquina smith",
  "Press inclinado en maquina smith",
  "Press inclinado con barra",
  "Press inclinado con mancuernas",
  "Press inclinado en máquina",
  "Press declinado con barra",
  "Press declinado con mancuernas",
  "Aperturas con mancuernas",
  "Aperturas inclinadas con mancuernas",
  "Aperturas declinadas con mancuernas",
  "Aperturas en máquina (pec deck)",
  "Cruce de poleas",
  "Cruce de poleas desde abajo",
  "Cruce de poleas desde arriba",
  "Fondos para pecho",
  "Flexiones",
  "Flexiones inclinadas",
  "Flexiones declinadas",
  "Flexiones con palmada",
  "Flexiones arqueras",
  "Flexiones con lastre",

  /* ESPALDA */
  "Dominadas",
  "Dominadas supinas",
  "Dominadas neutras",
  "Dominadas con lastre",
  "Dominadas asistidas en máquina",
  "Jalón al pecho en polea",
  "Jalón tras nuca",
  "Jalón con agarre neutro",
  "Jalón unilateral",
  "Remo con barra",
  "Remo con barra Pendlay",
  "Remo con mancuerna",
  "Remo unilateral con mancuerna",
  "Remo en máquina",
  "Remo en polea baja",
  "Remo agarre amplio",
  "Remo agarre cerrado",
  "Remo en T",
  "Remo en máquina Hammer",
  "Peso muerto",
  "Peso muerto rumano",
  "Peso muerto sumo",
  "Rack pull",
  "Face pull",
  "Remo invertido",
  "Superman",
  "Hiperextensiones",
  "Pull over con mancuerna",
  "Pull over en máquina",
  "Pull over en polea",

  /* HOMBROS */
  "Press militar con barra",
  "Press militar con mancuernas",
  "Press Arnold",
  "Press en máquina para hombros",
  "Elevaciones laterales con mancuernas",
  "Elevaciones laterales en polea",
  "Elevaciones laterales en máquina",
  "Elevaciones frontales con mancuernas",
  "Elevaciones frontales con barra",
  "Elevaciones frontales en polea",
  "Pájaros con mancuernas",
  "Pájaros en máquina",
  "Reverse pec deck",
  "Remo al mentón con barra",
  "Remo al mentón con polea",
  "Handstand push ups",
  "Pike push ups",

  /* BICEPS */
  "Curl con barra",
  "Curl con barra EZ",
  "Curl con mancuernas alterno",
  "Curl con mancuernas simultáneo",
  "Curl concentrado",
  "Curl martillo",
  "Curl martillo cruzado",
  "Curl inclinado con mancuernas",
  "Curl predicador con barra",
  "Curl predicador con mancuernas",
  "Curl en máquina predicador",
  "Curl en polea baja",
  "Curl en polea con cuerda",
  "Curl spider",
  "Curl 21",
  "Chin ups",
  "Curl en banco Scott",
  "Curl bayesian",

  /* TRICEPS */
  "Fondos en paralelas",
  "Fondos en banco",
  "Extensión de tríceps en polea con barra",
  "Extensión de tríceps en polea con cuerda",
  "Extensión de tríceps en polea invertida",
  "Extensión por encima de la cabeza con mancuerna",
  "Extensión por encima de la cabeza con barra",
  "Extensión en polea por encima de la cabeza",
  "Press francés con barra",
  "Press francés con mancuernas",
  "Press cerrado con barra",
  "Patada de tríceps con mancuerna",
  "Patada de tríceps en polea",
  "Extensión en máquina",
  "Rompecráneos con barra",

  /* ANTEBRAZO */
  "Curl de muñeca con barra",
  "Curl de muñeca con mancuernas",
  "Curl de muñeca inverso",
  "Curl de muñeca en polea",
  "Farmer walk",
  "Dead hang",
  "Curl inverso con barra",
  "Curl inverso en polea",
  "Pinch grip",

  /* CUADRICEPS */
  "Sentadilla con barra",
  "Sentadilla frontal",
  "Sentadilla hack",
  "Sentadilla en máquina Smith",
  "Sentadilla goblet",
  "Prensa de piernas",
  "Prensa unilateral",
  "Extensión de cuádriceps",
  "Zancadas con barra",
  "Zancadas con mancuernas",
  "Zancadas caminando",
  "Bulgarian split squat",
  "Step up",
  "Pistol squat",
  "Sissy squat",

  /* ISQUIOTIBIALES */
  "Peso muerto rumano",
  "Peso muerto piernas rígidas",
  "Femoral acostado",
  "Femoral sentado",
  "Femoral de pie",
  "Buenos días con barra",
  "Nordic",
  "Glute ham raise",

  /* GLUTEOS */
  "Hip thrust con barra",
  "Hip thrust en máquina",
  "Puente de glúteo",
  "Patada de glúteo en polea",
  "Patada de glúteo en máquina",
  "Sentadilla sumo",
  "Peso muerto sumo",
  "Abducción de cadera en máquina",
  "Abducción con banda",
  "Frog pumps",

  /* PANTORRILLAS */
  "Elevaciones de talones de pie",
  "Elevaciones de talones sentado",
  "Elevaciones en prensa",
  "Elevaciones a una pierna",
  "Donkey calf raises",
  "Saltos en puntas",

  /* ABDOMINALES */
  "Crunch",
  "Crunch en máquina",
  "Crunch en polea",
  "Crunch declinado",
  "Elevaciones de piernas",
  "Elevaciones de piernas colgado",
  "Elevaciones de rodillas colgado",
  "Toes to bar",
  "Russian twist",
  "Ab wheel",
  "Plancha",
  "Plancha lateral",
  "Hollow body hold",
  "Dragon flag",
  "Mountain climbers",
  "V ups",
  "Sit ups",
];

/* =========================
CREAR DIA
========================= */

agregarDiaBtn.addEventListener("click", () => {
  numeroDia++;

  crearDia([], numeroDia - 1);

  guardarRutina();
});

/* =========================
CREAR DIA FUNCION
========================= */

function crearDia(ejerciciosGuardados = [], indexDia) {
  let dia = document.createElement("div");

  dia.classList.add("dia");

  dia.innerHTML = `

<div class="headerDia">

<h3>Día ${indexDia + 1}</h3>

<button class="eliminarDia">❌</button>

<button class="btnStartDia" data-dia="${indexDia}">
▶ Empezar entrenamiento
</button>

</div>

<div class="ejercicios"></div>

<button class="addEjercicio">+ Añadir ejercicio</button>

`;

  diasContainer.appendChild(dia);

  const contEjercicios = dia.querySelector(".ejercicios");

  /* ejercicios guardados */

  ejerciciosGuardados.forEach((ej) => {
    crearEjercicio(contEjercicios, ej);
  });

  /* añadir ejercicio */

  dia.querySelector(".addEjercicio").onclick = () => {
    crearEjercicio(contEjercicios);

    guardarRutina();
  };

  /* eliminar dia */

  dia.querySelector(".eliminarDia").onclick = () => {
    if (confirm("Eliminar día?")) {
      dia.remove();

      guardarRutina();
    }
  };
}

/* =========================
CREAR EJERCICIO
========================= */

/* eliminar ejercicio */

function crearEjercicio(container, ejercicioGuardado = null) {
  let div = document.createElement("div");

  div.classList.add("ejercicio");

  let opciones = listaEjercicios
    .map(
      (e) =>
        `<option ${ejercicioGuardado?.nombre === e ? "selected" : ""}>${e}</option>`,
    )
    .join("");

  div.innerHTML = `
<select>${opciones}</select>

<label>Series</label>
<input type="number" min="1" value="${ejercicioGuardado?.series || 3}">

<label>Reps</label>
<input type="number" min="1" value="${ejercicioGuardado?.reps || 10}">

<button class="eliminarEjercicio">❌</button>
`;

  div.querySelector(".eliminarEjercicio").onclick = () => {
    if (confirm("Eliminar ejercicio?")) {
      div.remove();
      guardarRutina();
    }
  };

  container.appendChild(div);
}
/* =========================
GUARDAR RUTINA
========================= */

function guardarRutina() {
  let rutina = [];

  document.querySelectorAll(".dia").forEach((dia) => {
    let ejercicios = [];

    dia.querySelectorAll(".ejercicio").forEach((ej) => {
      let nombre = ej.querySelector("select").value;

      let series = parseInt(ej.querySelectorAll("input")[0].value);

      let reps = parseInt(ej.querySelectorAll("input")[1].value);

      ejercicios.push({
        nombre,
        series,
        reps,
      });
    });

    rutina.push(ejercicios);
  });

  localStorage.setItem("rutinaUsuario", JSON.stringify(rutina));
}

/* =========================
INICIAR ENTRENAMIENTO
========================= */

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnStartDia")) {
    if (localStorage.getItem("entrenamientoActivo")) {
      alert("Ya tienes un entrenamiento activo");

      return;
    }

    let diaIndex = parseInt(e.target.dataset.dia);

    localStorage.setItem(
      "entrenamientoActivo",
      JSON.stringify({
        dia: diaIndex,

        inicio: Date.now(),
      }),
    );

    window.location.href = "entrenamiento.html";
  }
});

/* =========================
CARGAR RUTINA
========================= */

function cargarRutina() {
  let guardado = localStorage.getItem("rutinaUsuario");

  if (!guardado) return;

  let rutina = JSON.parse(guardado);

  rutina.forEach((diaEjercicios, index) => {
    numeroDia++;

    crearDia(diaEjercicios, index);
  });
}

/* =========================
AUTOGUARDADO
========================= */

document.addEventListener("change", guardarRutina);

/* =========================
INICIAR APP
========================= */

cargarRutina();

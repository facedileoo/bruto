document.getElementById("formRutina").addEventListener("submit", function (e) {
  e.preventDefault();

  let objetivo = document.getElementById("objetivo").value;
  let nivel = document.getElementById("nivel").value;
  let lugar = document.getElementById("lugar").value;
  let dias = parseInt(document.getElementById("dias").value);
  let tiempo = parseInt(document.getElementById("tiempo").value);

  const baseEjercicios = {
    gimnasio: {
      pecho: [
        "Press banca",
        "Press inclinado",
        "Press declinado",
        "Fondos",
        "Press máquina",
      ],
      espalda: [
        "Dominadas",
        "Remo con barra",
        "Jalón al pecho",
        "Remo en polea",
      ],
      piernas: [
        "Sentadilla",
        "Prensa",
        "Zancadas",
        "Hip thrust",
        "Peso muerto rumano",
      ],
      hombros: ["Press militar", "Elevaciones laterales", "Face pull"],
      biceps: ["Curl barra", "Curl martillo", "Curl inclinado"],
      triceps: ["Press francés", "Extensión polea", "Fondos cerrados"],
      core: ["Plancha", "Crunch polea", "Elevaciones piernas"],
    },
    casa: {
      pecho: ["Flexiones", "Flexiones declinadas", "Flexiones diamante"],
      espalda: ["Dominadas", "Remo mancuernas", "Superman"],
      piernas: ["Sentadilla", "Zancadas", "Peso muerto mancuernas"],
      hombros: ["Pike push ups", "Press mancuernas"],
      biceps: ["Curl mancuernas"],
      triceps: ["Fondos silla", "Extensión tras nuca"],
      core: ["Plancha", "Mountain climbers", "Russian twist"],
    },
  };

  const configObjetivo = {
    fuerza: { series: "4-5", reps: "4-6", descanso: "2-3 min" },
    musculo: { series: "3-4", reps: "8-12", descanso: "60-90 seg" },
    grasa: { series: "3", reps: "12-15", descanso: "30-45 seg" },
  };

  let grupos = baseEjercicios[lugar];
  if (!grupos) {
    alert("Lugar inválido");
    return;
  }

  let config = configObjetivo[objetivo];
  if (!config) {
    alert("Objetivo inválido");
    return;
  }

  // ---------------- DIVISION ----------------

  let division = [];

  if (dias === 3) division = ["full", "full", "full"];
  else if (dias === 4) division = ["upper", "lower", "upper", "lower"];
  else if (dias === 5) division = ["push", "pull", "legs", "push", "pull"];
  else if (dias === 6)
    division = ["push", "pull", "legs", "push", "pull", "legs"];
  else {
    for (let i = 0; i < dias; i++) division.push("full");
  }

  function obtenerGrupos(tipo) {
    const filtros = {
      push: ["pecho", "hombros", "triceps"],
      pull: ["espalda", "biceps"],
      legs: ["piernas", "core"],
      upper: ["pecho", "espalda", "hombros", "biceps", "triceps"],
      lower: ["piernas", "core"],
      full: Object.keys(grupos),
    };
    return filtros[tipo];
  }

  function elegirEjercicios(gruposDia, cantidad = 6) {
    let todos = [];

    gruposDia.forEach((grupo) => {
      if (grupos[grupo]) {
        todos = todos.concat(grupos[grupo]);
      }
    });

    // Mezclar array de forma segura
    todos.sort(() => Math.random() - 0.5);

    return todos.slice(0, Math.min(cantidad, todos.length));
  }

  // Ajuste según nivel
  let cantidadEjercicios = nivel === "principiante" ? 5 : 6;
  if (tiempo >= 90) cantidadEjercicios += 1;

  let rutinaHTML = "";

  division.forEach((tipoDia, index) => {
    let gruposDia = obtenerGrupos(tipoDia);
    let ejercicios = elegirEjercicios(gruposDia, cantidadEjercicios);

    rutinaHTML += `
      <div class="dia">
        <h3>Día ${index + 1} - ${tipoDia.toUpperCase()}</h3>
        <ul>
    `;

    ejercicios.forEach((ej) => {
      rutinaHTML += `
        <li>
          <strong>${ej}</strong><br>
          ${config.series} series x ${config.reps} reps<br>
          Descanso: ${config.descanso}
        </li>
      `;
    });

    if (objetivo === "grasa") {
      rutinaHTML += `
        <li>
          <strong>Cardio final:</strong> 15-20 min HIIT o caminata inclinada
        </li>
      `;
    }

    rutinaHTML += `
        </ul>
      </div>
    `;
  });

  document.querySelector(".rutina").innerHTML = rutinaHTML;
});

/* -----------------------------
DATOS USUARIO
----------------------------- */

let usuario = {
  nombre: "Nombre de usuario",
  objetivo: "Ganar masa muscular",
  racha: 5,
};

/* -----------------------------
RUTINA DE ENTRENAMIENTO
----------------------------- */

let rutina = {
  Lunes: 90,
  Martes: 90,
  Miercoles: 90,
  Jueves: 90,
  Viernes: 90,
  Sabado: 90,
  Domingo: 0,
};

/* -----------------------------
OBTENER DIA ACTUAL
----------------------------- */

function obtenerDia() {
  let dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  let hoy = new Date().getDay();

  return dias[hoy];
}

/* -----------------------------
MOSTRAR ENTRENAMIENTO
----------------------------- */

function mostrarEntreno() {
  let dia = obtenerDia();

  let duracion = rutina[dia];

  let titulo = document.querySelector(".entrenoHoy h3");
  let tiempo = document.querySelector(".entrenoHoy h4");

  if (duracion === 0) {
    titulo.innerText = "Hoy toca descansar 🛌";
    tiempo.innerText = "";
  } else {
    titulo.innerText = "Dale que hoy toca " + dia + " 💪";
    tiempo.innerText = "Duración aproximada " + duracion + " minutos";
  }
}

/* -----------------------------
MOSTRAR USUARIO
----------------------------- */

const username = document.getElementById("username");

// cargar nombre guardado
const savedName = localStorage.getItem("username");

if (savedName) {
  username.textContent = savedName;
}

// cambiar nombre al hacer click
username.onclick = () => {
  const nuevoNombre = prompt("Escribí tu nombre de usuario:");

  if (nuevoNombre) {
    username.textContent = nuevoNombre;
    localStorage.setItem("username", nuevoNombre);
  }
};

/* -----------------------------
OBJETIVO
----------------------------- */

function mostrarObjetivo() {
  let contenedor = document.querySelector(".objetivo");

  contenedor.innerHTML = `
    
    <h3>Objetivo</h3>
    <p>${usuario.objetivo}</p>
    
    `;
}

/* -----------------------------
RACHA
----------------------------- */

function mostrarRacha() {
  let racha = localStorage.getItem("racha") || 0;

  document.querySelector(".racha").textContent =
    "Racha actual: " + racha + " días 🔥";
}

/* =====================================================
FOTO DE PERFIL
===================================================== */

function fotoPerfil() {
  let img = document.querySelector(".user img");

  let fotoGuardada = localStorage.getItem("fotoPerfil");

  if (fotoGuardada) {
    img.src = fotoGuardada;
  }

  img.style.cursor = "pointer";

  img.addEventListener("click", function () {
    let input = document.createElement("input");

    input.type = "file";

    input.accept = "image/*";

    input.click();

    input.addEventListener("change", function () {
      let archivo = input.files[0];

      let reader = new FileReader();

      reader.onload = function () {
        img.src = reader.result;

        localStorage.setItem("fotoPerfil", reader.result);
      };

      reader.readAsDataURL(archivo);
    });
  });
}

/* =====================================================
SUBIR FOTO DEL FISICO
===================================================== */

function subirFotoFisico() {
  let contenedor = document.querySelector(".subirFoto");

  contenedor.innerHTML = `

        <h3>Subir foto del progreso 📸</h3>
        <input type="file" id="fotoFisico">

    `;

  let input = document.getElementById("fotoFisico");

  input.addEventListener("change", function () {
    let archivo = input.files[0];

    let reader = new FileReader();

    reader.onload = function () {
      guardarFoto(reader.result);
    };

    reader.readAsDataURL(archivo);
  });
}

/* =====================================================
GUARDAR FOTO
===================================================== */

function guardarFoto(base64) {
  let fotos = JSON.parse(localStorage.getItem("fotosFisico")) || [];

  fotos.push(base64);

  localStorage.setItem("fotosFisico", JSON.stringify(fotos));

  mostrarFotos();
}

/* =====================================================
MOSTRAR GALERIA
===================================================== */

function mostrarFotos() {
  let contenedor = document.querySelector(".fotos");

  let fotos = JSON.parse(localStorage.getItem("fotosFisico")) || [];

  contenedor.innerHTML = `<h3>Fotos guardadas</h3>`;

  if (fotos.length === 0) {
    contenedor.innerHTML += `<p>No hay fotos aún</p>`;
    return;
  }

  let galeria = document.createElement("div");

  galeria.style.display = "grid";
  galeria.style.gridTemplateColumns = "repeat(auto-fit,100px)";
  galeria.style.gap = "10px";
  galeria.style.justifyContent = "center";

  fotos.forEach(function (foto, index) {
    let img = document.createElement("img");

    img.src = foto;

    img.style.width = "100px";
    img.style.height = "100px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "10px";
    img.style.cursor = "pointer";

    /* CLICK EN FOTO */

    img.addEventListener("click", function () {
      mostrarConfirmacion(index);
    });

    galeria.appendChild(img);
  });

  contenedor.appendChild(galeria);
}

function mostrarConfirmacion(index) {
  let overlay = document.createElement("div");

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.7)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "999";

  let cartel = document.createElement("div");

  cartel.style.background = "#0a0a2a";
  cartel.style.padding = "30px";
  cartel.style.borderRadius = "15px";
  cartel.style.textAlign = "center";
  cartel.style.color = "white";
  cartel.style.width = "300px";

  cartel.innerHTML = `
    
    <p>¿Seguro quieres eliminar esta foto?</p>

    <div style="margin-top:20px; display:flex; gap:10px; justify-content:center">

        <button id="btnSi">SI</button>
        <button id="btnNo">NO</button>

    </div>
    
    `;

  overlay.appendChild(cartel);

  document.body.appendChild(overlay);

  let btnSi = cartel.querySelector("#btnSi");
  let btnNo = cartel.querySelector("#btnNo");

  /* ESTILOS BOTONES */

  btnSi.style.background = "red";
  btnSi.style.color = "white";
  btnSi.style.border = "none";
  btnSi.style.padding = "10px 20px";
  btnSi.style.borderRadius = "8px";
  btnSi.style.cursor = "pointer";

  btnNo.style.background = "white";
  btnNo.style.color = "black";
  btnNo.style.border = "none";
  btnNo.style.padding = "10px 20px";
  btnNo.style.borderRadius = "8px";
  btnNo.style.cursor = "pointer";

  /* SI = ELIMINAR */

  btnSi.addEventListener("click", function () {
    let fotos = JSON.parse(localStorage.getItem("fotosFisico")) || [];

    fotos.splice(index, 1);

    localStorage.setItem("fotosFisico", JSON.stringify(fotos));

    overlay.remove();

    mostrarFotos();
  });

  /* NO = CERRAR */

  btnNo.addEventListener("click", function () {
    overlay.remove();
  });
}

/* =====================================================
INICIAR APP
===================================================== */

function iniciar() {
  mostrarEntreno();
  mostrarObjetivo();
  mostrarRacha();

  fotoPerfil();
  subirFotoFisico();
  mostrarFotos();
}

iniciar();

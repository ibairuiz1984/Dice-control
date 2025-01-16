let numCaras = 20;
let cantidadDados = 1;
let minExito = parseInt(document.getElementById("minExito").value);

document.getElementById("minExito").addEventListener("input", function () {
  ajustarMinExito();
});

function cambiarDado() {
  numCaras = parseInt(document.getElementById("dadoSelect").value);
  ajustarMinExito();
}

function cambiarCantidadDados() {
  cantidadDados = parseInt(document.getElementById("cantidadDados").value);
  ajustarMinExito();
  generarDados();
}

function ajustarMinExito() {
  const maxExito = cantidadDados * numCaras;
  document.getElementById("minExito").max = maxExito;
  minExito = Math.min(
    parseInt(document.getElementById("minExito").value),
    maxExito
  );
  document.getElementById("minExito").value = minExito;
  document.getElementById("resultado").innerText = "";
  document.getElementById("exito").innerText = "";
}

function generarDados() {
  const container = document.getElementById("dadosContainer");
  container.innerHTML = "";

  for (let i = 0; i < cantidadDados; i++) {
    const dado = document.createElement("div");
    dado.className = "dado";
    dado.innerText = "?";
    container.appendChild(dado);
  }
}

function lanzarDado() {
  const dados = document.querySelectorAll(".dado");
  let resultados = [];
  let sumaTotal = 0;

  dados.forEach((dado, index) => {
    dado.classList.add("girando");

    setTimeout(() => {
      const resultado = Math.floor(Math.random() * numCaras) + 1;
      resultados.push(resultado);
      sumaTotal += resultado;

      dado.innerText = resultado;
      dado.classList.remove("girando");

      if (index === dados.length - 1) {
        mostrarResultados(resultados, sumaTotal);
      }
    }, 1000 + index * 200); // Retraso entre dados
  });
}

function mostrarResultados(resultados, sumaTotal) {
  document.getElementById("resultado").innerText =
    "Resultados: " + resultados.join(", ");

  let mensaje = "";
  let color = "";

  if (sumaTotal === cantidadDados) {
    mensaje = "¡Pifia!";
    color = "var(--error-color)";
  } else if (sumaTotal === cantidadDados * numCaras) {
    mensaje = "¡Crítico!";
    color = "var(--highlight-color)";
  } else if (sumaTotal >= minExito) {
    mensaje = "¡Éxito!";
    color = "var(--primary-color)";
  } else {
    mensaje = "¡Fracaso!";
    color = "gray";
  }

  document.getElementById("exito").innerText = mensaje;
  document.getElementById("exito").style.color = color;
}

// Inicializa los dados al cargar la página
generarDados();

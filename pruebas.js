"use strict";

function comprobar(pruebas) {
  const resultados = document.querySelector("#resultados");
  const resumen = document.querySelector("#resumen");
  const obligatorias = pruebas.filter(prueba => !prueba.opcional).length;
  let aciertos = 0;

  for (const prueba of pruebas) {
    const item = document.createElement("li");
    const etiqueta = prueba.opcional ? "Reto opcional" : "Prueba";
    const esperado = formatear(prueba.esperado);
    let obtenido;
    let correcta = false;

    try {
      const recibido = prueba.ejecutar();
      obtenido = formatear(recibido);
      correcta = Array.isArray(prueba.esperado)
        ? Array.isArray(recibido) && obtenido === esperado
        : recibido === prueba.esperado;
    } catch (error) {
      obtenido = `Error: ${error.message}`;
    }

    if (correcta && !prueba.opcional) aciertos++;
    item.className = correcta ? "bien" : prueba.opcional ? "opcional" : "mal";
    const estado = correcta ? "Correcta." : prueba.opcional ? "Reto pendiente." : "Revisa este caso.";
    item.textContent = `${etiqueta} · ${prueba.caso} — Se espera: ${esperado}. Se obtuvo: ${obtenido}. ${estado}`;
    resultados.append(item);
  }

  resumen.textContent = `${aciertos} de ${obligatorias} pruebas obligatorias correctas.`;
}

function formatear(valor) {
  return JSON.stringify(valor) ?? String(valor);
}

function capturarMensajes(ejecutar) {
  const mensajes = [];
  const logOriginal = console.log;

  console.log = (...valores) => {
    mensajes.push(valores.join(" "));
    logOriginal.apply(console, valores);
  };

  try {
    ejecutar();
  } finally {
    console.log = logOriginal;
  }

  return mensajes;
}

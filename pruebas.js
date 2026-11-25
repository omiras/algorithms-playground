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
  };

  try {
    ejecutar();
  } finally {
    console.log = logOriginal;
  }

  return mensajes;
}

const ejercicios = {
  1: [
    { caso: "isAdult(17)", esperado: false, ejecutar: () => isAdult(17) },
    { caso: "isAdult(18)", esperado: true, ejecutar: () => isAdult(18) },
    { caso: "isAdult(25)", esperado: true, ejecutar: () => isAdult(25) },
    { caso: "isAdult(0)", esperado: false, ejecutar: () => isAdult(0) }
  ],
  2: [
    { caso: "isAdultInCountry(17, \"España\")", esperado: false, ejecutar: () => isAdultInCountry(17, "España") },
    { caso: "isAdultInCountry(18, \"España\")", esperado: true, ejecutar: () => isAdultInCountry(18, "España") },
    { caso: "isAdultInCountry(20, \"EEUU\")", esperado: false, ejecutar: () => isAdultInCountry(20, "EEUU") },
    { caso: "isAdultInCountry(21, \"EEUU\")", esperado: true, ejecutar: () => isAdultInCountry(21, "EEUU") },
    { caso: "isAdultInCountry(21, \"España\")", esperado: true, ejecutar: () => isAdultInCountry(21, "España") }
  ],
  3: [
    { caso: "sayHi(\"Carlos\", \"spanish\")", esperado: "Hola, Carlos!", ejecutar: () => sayHi("Carlos", "spanish") },
    { caso: "sayHi(\"Anne\", \"french\")", esperado: "Bonjour, Anne!", ejecutar: () => sayHi("Anne", "french") },
    { caso: "sayHi(\"John\", \"spanish\")", esperado: "Hola, John!", ejecutar: () => sayHi("John", "spanish") },
    { caso: "sayHi(\"Carmen\", \"SpAnIsH\")", esperado: "Hola, Carmen!", ejecutar: () => sayHi("Carmen", "SpAnIsH"), opcional: true }
  ],
  4: [
    { caso: "euroToYen(0)", esperado: 0, ejecutar: () => euroToYen(0) },
    { caso: "euroToYen(1)", esperado: 163.4, ejecutar: () => euroToYen(1) },
    { caso: "euroToYen(10)", esperado: 1634, ejecutar: () => euroToYen(10) },
    { caso: "euroToYen(0.5)", esperado: 81.7, ejecutar: () => euroToYen(0.5) }
  ],
  5: [
    { caso: "canWeMakePairs([\"Alice\",\"Bob\",\"Charlie\",\"David\"])", esperado: true, ejecutar: () => canWeMakePairs(["Alice","Bob","Charlie","David"]) },
    { caso: "canWeMakePairs([\"Alice\",\"Bob\",\"Charlie\"])", esperado: false, ejecutar: () => canWeMakePairs(["Alice","Bob","Charlie"]) },
    { caso: "canWeMakePairs([\"Alice\",\"Bob\"])", esperado: true, ejecutar: () => canWeMakePairs(["Alice","Bob"]) },
    { caso: "canWeMakePairs([\"Alice\"])", esperado: false, ejecutar: () => canWeMakePairs(["Alice"]) }
  ],
  6: [
    { caso: "isAdult({\"name\":\"John\",\"age\":18})", esperado: true, ejecutar: () => isAdult({"name":"John","age":18}) },
    { caso: "isAdult({\"name\":\"Alice\",\"age\":25})", esperado: true, ejecutar: () => isAdult({"name":"Alice","age":25}) },
    { caso: "isAdult({\"name\":\"Bobby\",\"age\":17})", esperado: false, ejecutar: () => isAdult({"name":"Bobby","age":17}) }
  ],
  7: [
    { caso: "isAdultInCountryWithObject({\"name\":\"Carlos\",\"age\":17,\"country\":\"España\"})", esperado: false, ejecutar: () => isAdultInCountryWithObject({"name":"Carlos","age":17,"country":"España"}) },
    { caso: "isAdultInCountryWithObject({\"name\":\"Ana\",\"age\":18,\"country\":\"España\"})", esperado: true, ejecutar: () => isAdultInCountryWithObject({"name":"Ana","age":18,"country":"España"}) },
    { caso: "isAdultInCountryWithObject({\"name\":\"Sam\",\"age\":20,\"country\":\"EEUU\"})", esperado: false, ejecutar: () => isAdultInCountryWithObject({"name":"Sam","age":20,"country":"EEUU"}) },
    { caso: "isAdultInCountryWithObject({\"name\":\"John\",\"age\":21,\"country\":\"EEUU\"})", esperado: true, ejecutar: () => isAdultInCountryWithObject({"name":"John","age":21,"country":"EEUU"}) },
    { caso: "Mensajes de Carlos y John en la consola", esperado: ["Carlos no es adulto en España","John es adulto en EEUU"], ejecutar: () => capturarMensajes(showAdultMessages) }
  ],
  8: [
    { caso: "sumDeposits([200,300,-100,500])", esperado: 1000, ejecutar: () => sumDeposits([200,300,-100,500]) },
    { caso: "sumDeposits([-150,200,50,-50])", esperado: 250, ejecutar: () => sumDeposits([-150,200,50,-50]) },
    { caso: "sumDeposits([150,100,-200,-300])", esperado: 250, ejecutar: () => sumDeposits([150,100,-200,-300]) },
    { caso: "sumDeposits([-5,0])", esperado: 0, ejecutar: () => sumDeposits([-5,0]) },
    { caso: "sumDeposits([])", esperado: 0, ejecutar: () => sumDeposits([]) }
  ],
  9: [
    { caso: "accountBalance([{\"date\":\"2023-04-01\",\"value\":100},{\"date\":\"2023-04-02\",\"value\":-50},{\"date\":\"2023-04-03\",\"value\":150}])", esperado: 200, ejecutar: () => accountBalance([{"date":"2023-04-01","value":100},{"date":"2023-04-02","value":-50},{"date":"2023-04-03","value":150}]) },
    { caso: "accountBalance([{\"date\":\"2023-04-04\",\"value\":500}])", esperado: 500, ejecutar: () => accountBalance([{"date":"2023-04-04","value":500}]) },
    { caso: "accountBalance([{\"date\":\"2023-04-05\",\"value\":300},{\"date\":\"2023-04-06\",\"value\":-100},{\"date\":\"2023-04-07\",\"value\":-200},{\"date\":\"2023-04-08\",\"value\":50}])", esperado: 50, ejecutar: () => accountBalance([{"date":"2023-04-05","value":300},{"date":"2023-04-06","value":-100},{"date":"2023-04-07","value":-200},{"date":"2023-04-08","value":50}]) },
    { caso: "accountBalance([{\"date\":\"2023-04-09\",\"value\":-25}])", esperado: -25, ejecutar: () => accountBalance([{"date":"2023-04-09","value":-25}]) },
    { caso: "accountBalance([])", esperado: 0, ejecutar: () => accountBalance([]) }
  ],
  10: [
    { caso: "getWords5Letters([\"mesa\",\"silla\",\"cuchara\",\"tenedor\",\"cama\"])", esperado: ["silla"], ejecutar: () => getWords5Letters(["mesa","silla","cuchara","tenedor","cama"]) },
    { caso: "getWords5Letters([\"perro\",\"gato\",\"loro\",\"pez\",\"ciervo\"])", esperado: ["perro"], ejecutar: () => getWords5Letters(["perro","gato","loro","pez","ciervo"]) },
    { caso: "getWords5Letters([\"sol\",\"luz\",\"mar\",\"cielo\",\"sol\"])", esperado: ["cielo"], ejecutar: () => getWords5Letters(["sol","luz","mar","cielo","sol"]) },
    { caso: "getWords5Letters([\"sol\",\"luz\",\"mar\",\"sol\"])", esperado: [], ejecutar: () => getWords5Letters(["sol","luz","mar","sol"]) },
    { caso: "getWords5Letters([\"cielo\",\"silla\",\"cielo\"])", esperado: ["cielo","silla","cielo"], ejecutar: () => getWords5Letters(["cielo","silla","cielo"]) }
  ],
  11: [
    { caso: "checkDNAForAlzheimer([\"GGTACCATCGGCTACATC\",\"ATCGGCTAGGTACC\",\"TCGAGGCTA\",\"AGCTAGCTAG\",\"GGCTATCG\"])", esperado: true, ejecutar: () => checkDNAForAlzheimer(["GGTACCATCGGCTACATC","ATCGGCTAGGTACC","TCGAGGCTA","AGCTAGCTAG","GGCTATCG"]) },
    { caso: "checkDNAForAlzheimer([\"ATCGGCTAAGGTC\",\"GGTAGCTA\",\"CTAGCTAGC\",\"TACGGGCTAT\",\"GCTACTGAC\"])", esperado: true, ejecutar: () => checkDNAForAlzheimer(["ATCGGCTAAGGTC","GGTAGCTA","CTAGCTAGC","TACGGGCTAT","GCTACTGAC"]) },
    { caso: "checkDNAForAlzheimer([\"GCTATCGG\",\"AGCTAGCTA\",\"TACGACTA\",\"AGGTACCATCG\",\"GGCTATACG\"])", esperado: false, ejecutar: () => checkDNAForAlzheimer(["GCTATCGG","AGCTAGCTA","TACGACTA","AGGTACCATCG","GGCTATACG"]) },
    { caso: "checkDNAForAlzheimer([\"GGTACC\",\"GGATCGGCTA\"])", esperado: true, ejecutar: () => checkDNAForAlzheimer(["GGTACC","GGATCGGCTA"]) },
    { caso: "checkDNAForAlzheimer([])", esperado: false, ejecutar: () => checkDNAForAlzheimer([]) }
  ]
};

comprobar(ejercicios[document.body.dataset.ejercicio]);

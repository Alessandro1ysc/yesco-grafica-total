const fs = require("fs");
const axios = require("axios");

const URL = "https://renderz.app/api/fc/players?page=1&limit=9999";

async function main() {
  try {
    const response = await axios.get(URL);
    const data = response.data.players;

    // Filtrar solo GRL entre 104 y 109
    const cartasFiltradas = data.filter(j => {
      const grl = parseInt(j.ovr);
      return grl >= 104 && grl <= 109;
    });

    // Sumar precios
    const total = cartasFiltradas.reduce((suma, carta) => suma + carta.price, 0);

    // Guardar en archivo JSON
    fs.writeFileSync("total.json", JSON.stringify({ total }, null, 2));
    console.log("Total actualizado correctamente:", total);
  } catch (error) {
    console.error("Error al obtener o procesar datos:", error.message);
  }
}

main();

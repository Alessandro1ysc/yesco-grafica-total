const fs = require("fs");
const axios = require("axios");

const URL = "https://renderz.app/api/fc/players?page=1&limit=9999";

async function main() {
  try {
    const response = await axios.get(URL, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = response.data.players;

    if (!Array.isArray(data)) {
      throw new Error("Respuesta inválida de Renderz");
    }

    // Filtrar solo GRL entre 104 y 109
    const cartasFiltradas = data.filter(j => {
      const grl = parseInt(j.ovr);
      return grl >= 104 && grl <= 109;
    });

    const total = cartasFiltradas.reduce((suma, carta) => suma + carta.price, 0);

    fs.writeFileSync("total.json", JSON.stringify({ total }, null, 2));
    console.log("✅ Total actualizado correctamente:", total);
  } catch (error) {
    console.error("❌ Error al obtener datos:", error.message);
  }
}

main();

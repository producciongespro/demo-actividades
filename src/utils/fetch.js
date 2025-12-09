// src/utils/fetch.js

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getData() {
  try {
    // Simulación de API lenta
    await delay(3500); // ⏳ espera 2s ANTES del fetch

    const res = await fetch("/data/drag-drop.json");

    if (!res.ok) {
      throw new Error("Error al cargar las actividades");
    }

    const json = await res.json();
    console.log("json", json);

    return json;
  } catch (error) {
    console.error("getData error:", error);
    throw error;
  }
}



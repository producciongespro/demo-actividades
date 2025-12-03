// src/utils/fetch.js
export async function getData() {
  try {
    const res = await fetch("/data/drag-drop.json"); // ajusta la ruta como la tengas

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

import { useState, useEffect } from "react";
import { getData } from "./utils/fetch";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./componentes/Splash";
import DragDropActividad from "./componentes/DragDropActividad"; // mejor renombrar el archivo a esto

export default function App() {
  const [dragAndDropData, setDragAndDropData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("dragAndDropData >>>", dragAndDropData);
  }, [dragAndDropData]);

  useEffect(() => {
    const setup = async () => {
      try {
        const data = await getData();
        setDragAndDropData(data);
      } catch (err) {
        setError(err.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    setup();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/drag-and-drop"
          element={
            loading ? (
              <Splash />
            ) : error ? (
              <div className="container py-5">
                <h2 className="text-danger">Ocurrió un error</h2>
                <p>{error}</p>
              </div>
            ) : (
              <DragDropActividad data={dragAndDropData} />
            )
          }
        />

        {/* Ruta raíz opcional: redirigir o mostrar algo */}
        <Route
          path="/"
          element={
            loading ? <Splash /> : <DragDropActividad data={dragAndDropData} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

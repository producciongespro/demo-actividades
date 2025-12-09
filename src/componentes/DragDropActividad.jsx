import { useState } from "react";
import "./DragDropActividad.css"

export default function DragDropActividad({data}) {
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [opcionArrastrada, setOpcionArrastrada] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [zonaActiva, setZonaActiva] = useState(false);

    const actividades = data || [];
  const actividadActual = actividades[indiceActual];


    if (!actividadActual) {
    return (      
      <div className="container pt-4 pb-2 mt-5 alert alert-warning">
        <p>No hay actividades disponibles.</p>
      </div>
    );
  }

  const handleDragStart = (opcion) => {
    if (respuestaSeleccionada) return; // ya respondida
    setOpcionArrastrada(opcion);
    setMensaje("");
  };

  const handleDragEnd = () => {
    setZonaActiva(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // necesario para permitir drop
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (!respuestaSeleccionada) {
      setZonaActiva(true);
    }
  };

  const handleDragLeave = () => {
    setZonaActiva(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setZonaActiva(false);

    if (!opcionArrastrada || respuestaSeleccionada) return;

    const esCorrecta = opcionArrastrada.id === actividadActual.idCorrecta;

    if (esCorrecta) {
      setRespuestaSeleccionada(opcionArrastrada.id);
      setPuntaje((prev) => prev + 1);
      setMensaje("✅ ¡Correcto!");
    } else {
      setPuntaje((prev) => prev - 1);
      setMensaje("❌ Incorrecto, intenta de nuevo.");
      // La opción “vuelve” sola porque visualmente nunca salió de la lista
    }

    setOpcionArrastrada(null);
  };

  const handleSiguiente = () => {
    if (indiceActual < data.length - 1) {
      setIndiceActual((prev) => prev + 1);
      setRespuestaSeleccionada(null);
      setMensaje("");
      setOpcionArrastrada(null);
      setZonaActiva(false);
    }
  };

  const handleReiniciar = () => {
    setIndiceActual(0);
    setPuntaje(0);
    setRespuestaSeleccionada(null);
    setMensaje("");
    setOpcionArrastrada(null);
    setZonaActiva(false);
  };



  return (
   <div className="dragdrop-page row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="dragdrop-card card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0 dragdrop-title">
                Actividad drag &amp; drop{" "}
                <small className="text-muted">
                  ({indiceActual + 1}/{data.length})
                </small>
              </h5>
              <small className="text-muted">
                {actividadActual.descripcion}
              </small>
            </div>
            <div className="dragdrop-score badge fs-6">
              Puntaje: {puntaje}
            </div>
          </div>

          <div className="card-body">
            {/* Pregunta */}
            <p className="dragdrop-question fw-semibold mb-3">
              {actividadActual.pregunta}
            </p>

            {/* Zona de drop */}
            <div
              className={`drop-zone border rounded p-3 mb-4 text-center ${
                zonaActiva ? "drop-zone--active" : ""
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              {respuestaSeleccionada ? (
                <span className="drop-answer badge fs-6">
                  {
                    actividadActual.opciones.find(
                      (opt) => opt.id === respuestaSeleccionada
                    )?.texto
                  }
                </span>
              ) : (
                <span className="text-muted txt-aviso">
                  Arrastra aquí la opción que consideres correcta.
                </span>
              )}
            </div>

            {/* Opciones */}
            <div className="dragdrop-options d-flex flex-wrap gap-2 justify-content-center">
              {actividadActual.opciones.map((opcion) => {
                const esSeleccionada = respuestaSeleccionada === opcion.id;

                return (
                  <div
                    key={opcion.id}
                    className={`option-pill badge text-wrap p-2 px-3 fs-6 ${
                      esSeleccionada ? "option-pill--correct" : ""
                    }`}
                    style={{
                      cursor: respuestaSeleccionada ? "default" : "grab",
                    }}
                    draggable={!respuestaSeleccionada}
                    onDragStart={() => handleDragStart(opcion)}
                    onDragEnd={handleDragEnd}
                  >
                    {opcion.texto}
                  </div>
                );
              })}
            </div>

            {/* Mensaje de feedback */}
            {mensaje && (
              <div className="feedback-message alert mt-4 mb-0 py-2">
                {mensaje}
              </div>
            )}
          </div>

          <div className="card-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handleReiniciar}
            >
              Reiniciar todo
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSiguiente}
              disabled={indiceActual === data.length - 1}
            >
              Siguiente actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

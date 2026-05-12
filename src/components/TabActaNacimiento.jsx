import React from 'react';
import { useApp } from '../context/AppContext';

const TabActaNacimiento = () => {
  const { state, updateActa, updateActaLineaBase, toggleDolor, toggleTipificacion, setActiveTab } = useApp();
  const { acta } = state;

  // Calcular suma de horas del esfuerzo operativo (solo antes de la implementación)
  const totalHorasEsfuerzo = state.esfuerzoOperativo
    .filter(e => e.momento === 'Antes de la implementación')
    .reduce((sum, e) => sum + e.horas, 0);

  const tipificaciones = [
    'Automatización de Trámites / Flujos de Trabajo',
    'Gestión de Datos e Inteligencia de Negocios',
    'Robotización de Tareas Repetitivas (RPA)',
    'Interacción directa con el Usuario Final',
  ];

  const dolores = [
    'Demora excesiva en la respuesta al usuario',
    'Alta probabilidad de errores manuales / digitación',
    'Pérdida de información o falta de trazabilidad',
    'Sobrecarga operativa y estrés en el equipo administrativo',
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-pucp-blue text-white text-center py-4 mb-6">
        <h1 className="text-xl font-bold">ACTA DE NACIMIENTO DEL PROYECTO</h1>
        <p className="text-sm mt-1">Metodología de Medición de Impacto - OTD PUCP</p>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 text-sm text-yellow-800">
        <strong>Instrucciones para el Líder Digital:</strong> Este documento es el "Punto Cero" de tu proyecto.
        Llenar esta información hoy te permitirá demostrar mañana con datos duros cuánto valor, tiempo y dinero
        le has ahorrado a tu unidad y a la Universidad. ¡Haz visible tu esfuerzo!
      </div>

      {/* Section 1: Datos Generales */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-pucp-blue pb-2">
          1. DATOS GENERALES
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto:</label>
            <input
              type="text"
              value={acta.nombreProyecto}
              onChange={(e) => updateActa('nombreProyecto', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Líder Digital:</label>
            <input
              type="text"
              value={acta.liderDigital}
              onChange={(e) => updateActa('liderDigital', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico:</label>
            <input
              type="email"
              value={acta.correo}
              onChange={(e) => updateActa('correo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unidad / Facultad:</label>
            <input
              type="text"
              value={acta.unidad}
              onChange={(e) => updateActa('unidad', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio (Ideación):</label>
            <input
              type="date"
              value={acta.fechaInicio}
              onChange={(e) => updateActa('fechaInicio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin aproximada:</label>
            <input
              type="date"
              value={acta.fechaFin}
              onChange={(e) => updateActa('fechaFin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Tipificación */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-pucp-blue pb-2">
          2. TIPIFICACIÓN DEL PROYECTO
        </h2>
        <p className="text-sm text-gray-600 mb-3">Marca con una "X" la categoría principal de tu solución:</p>
        <div className="space-y-2 ml-4">
          {tipificaciones.map((tipo) => (
            <label key={tipo} className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={acta.tipificacion.includes(tipo)}
                onChange={() => toggleTipificacion(tipo)}
                className="w-4 h-4 text-pucp-blue border-gray-300"
              />
              <span>{tipo}</span>
            </label>
          ))}
          <div className="flex items-center gap-3 mt-3">
            <input
              type="checkbox"
              checked={acta.tipificacion.includes('Otro')}
              onChange={() => toggleTipificacion('Otro')}
              className="w-4 h-4 text-pucp-blue border-gray-300"
            />
            <span className="text-sm">Otro:</span>
            <input
              type="text"
              value={acta.otroTipificacion}
              onChange={(e) => updateActa('otroTipificacion', e.target.value)}
              className="flex-1 px-3 py-1 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
              placeholder="Especificar..."
            />
          </div>
        </div>
      </div>

      {/* Section 3: El Dolor */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-pucp-blue pb-2">
          3. EL DOLOR: ¿QUÉ PROBLEMA VAMOS A RESOLVER?
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          Describe brevemente cómo se hace el proceso hoy y por qué es un problema (el "As-Is"):
        </p>
        <textarea
          value={acta.dolor}
          onChange={(e) => updateActa('dolor', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
          placeholder="Describe el problema actual..."
        />

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Principales "Dolores" identificados (Marca los que apliquen):</p>
          <div className="grid grid-cols-2 gap-3 ml-4">
            {dolores.map((dolor) => (
              <label key={dolor} className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={acta.doloresIdentificados.includes(dolor)}
                  onChange={() => toggleDolor(dolor)}
                  className="w-4 h-4 text-pucp-blue border-gray-300"
                />
                <span>{dolor}</span>
              </label>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                checked={acta.doloresIdentificados.includes('Otro')}
                onChange={() => toggleDolor('Otro')}
                className="w-4 h-4 text-pucp-blue border-gray-300"
              />
              <input
                type="text"
                value={acta.otroDolor}
                onChange={(e) => updateActa('otroDolor', e.target.value)}
                className="flex-1 px-3 py-1 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
                placeholder="Especificar otro dolor..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Línea Inicial */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-pucp-blue pb-2">
          4. LÍNEA BASE (Tus números actuales)
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Estima los siguientes datos con la mayor precisión posible sobre el proceso actual (manual):
        </p>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-pucp-blue text-white">
              <th className="py-2 px-3 text-left w-1/6">Métrica</th>
              <th className="py-2 px-3 text-left w-1/6">Valor</th>
              <th className="py-2 px-3 text-left w-1/6">Unidad de Medida</th>
              <th className="py-2 px-3 text-left w-2/6">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila A: Volumen de Operaciones */}
            <tr className="bg-blue-50 border-b border-gray-200">
              <td className="py-3 px-3 font-medium text-gray-800">
                <p className="text-sm font-bold text-pucp-blue">A. Volumen de Operaciones/Transacciones</p>
              </td>
              <td className="py-3 px-3">
                <input
                  type="number"
                  value={acta.lineaBaseCuantitativa.transacciones}
                  onChange={(e) => updateActaLineaBase('transacciones', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 border border-gray-300 text-sm text-center"
                  min="0"
                  placeholder="0"
                />
              </td>
              <td className="py-3 px-3">
                <select
                  value={acta.lineaBaseCuantitativa.unidadTransacciones}
                  onChange={(e) => updateActaLineaBase('unidadTransacciones', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  <option>Semanal</option>
                  <option>Mensual</option>
                  <option>Semestral</option>
                  <option>Anual</option>
                </select>
              </td>
              <td className="py-3 px-3">
                <p className="text-sm text-gray-600">
                  Cada operación/transacción es resultado del proceso que se va a intervenir.
                </p>
              </td>
            </tr>

            {/* Fila B: Tiempo de Ciclo */}
            <tr className="bg-green-50 border-b border-gray-200">
              <td className="py-3 px-3 font-medium text-gray-800">
                <p className="text-sm font-bold text-pucp-blue">B. Tiempo de Ciclo (Lead Time)</p>
              </td>
              <td className="py-3 px-3">
                <input
                  type="number"
                  value={acta.lineaBaseCuantitativa.tiempoCiclo}
                  onChange={(e) => updateActaLineaBase('tiempoCiclo', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 border border-gray-300 text-sm text-center"
                  min="0"
                  placeholder="0"
                />
              </td>
              <td className="py-3 px-3">
                <select
                  value={acta.lineaBaseCuantitativa.unidadTiempo}
                  onChange={(e) => updateActaLineaBase('unidadTiempo', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  <option>Días</option>
                  <option>Semanas</option>
                </select>
              </td>
              <td className="py-3 px-3">
                <p className="text-sm text-gray-600">
                  Es el tiempo total desde que se inicia el proceso hasta que se concluye.
                </p>
              </td>
            </tr>

            {/* Fila C: Personas Involucradas */}
            <tr className="bg-yellow-50 border-b border-gray-200">
              <td className="py-3 px-3 font-medium text-gray-800">
                <p className="text-sm font-bold text-pucp-blue">C. Personas Involucradas</p>
              </td>
              <td className="py-3 px-3">
                <input
                  type="number"
                  value={acta.lineaBaseCuantitativa.personasInvolucradas}
                  onChange={(e) => updateActaLineaBase('personasInvolucradas', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 border border-gray-300 text-sm text-center"
                  min="0"
                  placeholder="0"
                />
              </td>
              <td className="py-3 px-3">
                <select
                  value={acta.lineaBaseCuantitativa.unidadPersonas}
                  onChange={(e) => updateActaLineaBase('unidadPersonas', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  <option>Persona(s)</option>
                </select>
              </td>
              <td className="py-3 px-3">
                <p className="text-sm text-gray-600">
                  Indicar la cantidad de personas que participan en la ejecución del proceso.
                </p>
              </td>
            </tr>

            {/* Fila D: Esfuerzo Operativo */}
            <tr className="bg-purple-50">
              <td className="py-3 px-3 font-medium text-gray-800">
                <p className="text-sm font-bold text-pucp-blue">D. Esfuerzo Operativo (HH dedicadas)</p>
              </td>
              <td className="py-3 px-3">
                <div className="text-center">
                  <span className="text-lg font-bold text-pucp-blue">{totalHorasEsfuerzo.toFixed(1)}</span>
                </div>
              </td>
              <td className="py-3 px-3">
                <p className="text-sm text-gray-600 text-center">Horas (HH)</p>
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-600 flex-1">
                    Horas totales de trabajo dedicado de las personas involucradas en cada operación/transacción.
                  </p>
                  <button
                    onClick={() => setActiveTab('cuantitativo')}
                    className="px-3 py-1.5 bg-pucp-blue text-white text-xs font-medium hover:bg-blue-800 transition-colors whitespace-nowrap"
                  >
                    Ir a registrar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 5: Variables Cualitativas */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-pucp-blue pb-2">
          5. VARIABLES CUALITATIVAS (El termómetro de impacto)
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Define hasta 3 variables cualitativas que este proyecto busca mejorar y califica cómo se perciben HOY (del 1 al 5, donde 1 es Pésimo y 5 es Excelente).
        </p>

        {/* Table - Solo antes */}
        {state.variablesCualitativas.filter(v => v.momento === 'Antes de la implementación').length > 0 ? (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-pucp-blue text-white">
                <th className="py-2 px-3">Variable cualitativa a impactar</th>
                <th className="py-2 px-3">¿A quién impacta?</th>
                <th className="py-2 px-3">Antes (Calificación actual)</th>
              </tr>
            </thead>
            <tbody>
              {state.variablesCualitativas
                .filter(v => v.momento === 'Antes de la implementación')
                .map((v) => (
                  <tr key={v.id} className="border-b bg-blue-50">
                    <td className="py-2 px-3">{v.variable}</td>
                    <td className="py-2 px-3">{v.impacto}</td>
                    <td className="py-2 px-3 text-center font-bold text-lg text-pucp-blue">{v.calificacion}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-500 bg-gray-50 border border-gray-300 rounded">
            <p>No hay variables cualitativas registradas.</p>
            <button
              onClick={() => setActiveTab('cuantitativo')}
              className="mt-2 px-4 py-1.5 bg-pucp-blue text-white text-xs font-medium hover:bg-blue-800 transition-colors"
            >
              Ir a registrar
            </button>
          </div>
        )}
      </div>

      {/* Section 6: Variables Cuantitativas */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-pucp-blue pb-2">
          6. VARIABLES CUANTITATIVAS (El termómetro de impacto)
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Si aplica al proyecto, define hasta tres variables cuantitativas que la solución busca mejorar y especifica su valor actual.
        </p>

        {/* Table - Solo antes */}
        {state.variablesCuantitativas.filter(v => v.momento === 'Antes de la implementación').length > 0 ? (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-pucp-blue text-white">
                <th className="py-2 px-3">Variable cuantitativa a impactar</th>
                <th className="py-2 px-3">Valor actual</th>
                <th className="py-2 px-3">Unidad de Medida</th>
                <th className="py-2 px-3">¿A quién impacta?</th>
              </tr>
            </thead>
            <tbody>
              {state.variablesCuantitativas
                .filter(v => v.momento === 'Antes de la implementación')
                .map((v) => (
                  <tr key={v.id} className="border-b bg-blue-50">
                    <td className="py-2 px-3">{v.variable}</td>
                    <td className="py-2 px-3 text-center font-bold text-lg text-pucp-blue">{v.valor}</td>
                    <td className="py-2 px-3">{v.unidad}</td>
                    <td className="py-2 px-3">{v.impacto}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-500 bg-gray-50 border border-gray-300 rounded">
            <p>No hay variables cuantitativas registradas.</p>
            <button
              onClick={() => setActiveTab('cuantitativo')}
              className="mt-2 px-4 py-1.5 bg-pucp-blue text-white text-xs font-medium hover:bg-blue-800 transition-colors"
            >
              Ir a registrar
            </button>
          </div>
        )}
      </div>

      {/* Section 7: La Solución */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-pucp-blue pb-2">
          7. LA SOLUCIÓN PROPUESTA (El "To-Be")
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          ¿Qué vas a construir y qué herramientas usarás? Definir la solución con la asesoría y acompañamiento de la OTD.
        </p>
        <textarea
          value={acta.solucion}
          onChange={(e) => updateActa('solucion', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
          placeholder="Ej: Un formulario en Kissflow conectado a un PowerBI..."
        />
      </div>

      {/* Section 8: Validación */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-pucp-blue pb-2">
          8. VALIDACIÓN
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Líder Digital:</label>
            <input
              type="text"
              value={acta.nombreValidacion}
              onChange={(e) => updateActa('nombreValidacion', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Validación / Visto Bueno de Jefatura <span className="text-gray-400">(Opcional)</span>:
            </label>
            <input
              type="text"
              value={acta.validacionJefatura}
              onChange={(e) => updateActa('validacionJefatura', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-pucp-blue"
              placeholder="Nombre de la jefatura (opcional)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabActaNacimiento;

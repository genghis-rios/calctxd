import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TabRegistroCuantitativo = () => {
  const { state, addEsfuerzoOperativo, removeEsfuerzoOperativo, addVariableCualitativa, removeVariableCualitativa, addVariableCuantitativa, removeVariableCuantitativa } = useApp();

  // Esfuerzo Operativo Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    momento: 'Antes de la implementación',
    puesto: '',
    horas: 0,
    tarifa: 0,
  });

  // Cualitativas Modal
  const [modalCualiOpen, setModalCualiOpen] = useState(false);
  const [formCuali, setFormCuali] = useState({
    momento: 'Antes de la implementación',
    variable: '',
    calificacion: 1,
    impacto: 'Equipo',
  });

  // Cuantitativas Modal
  const [modalCuantOpen, setModalCuantOpen] = useState(false);
  const [formCuant, setFormCuant] = useState({
    momento: 'Antes de la implementación',
    variable: '',
    valor: 0,
    unidad: 'personas',
    impacto: 'Equipo',
  });

  const openModal = (prefill = null) => {
    if (prefill) {
      setForm({
        momento: 'Después de la implementación',
        puesto: prefill.puesto,
        horas: prefill.horas,
        tarifa: prefill.tarifa,
      });
    } else {
      setForm({ momento: 'Antes de la implementación', puesto: '', horas: 0, tarifa: 0 });
    }
    setModalOpen(true);
  };

  const handleSubmit = () => {
    addEsfuerzoOperativo({
      momento: form.momento,
      puesto: form.puesto,
      horas: parseFloat(form.horas),
      tarifa: parseFloat(form.tarifa),
      costo: parseFloat(form.horas) * parseFloat(form.tarifa),
    });
    setModalOpen(false);
    setForm({ momento: 'Antes de la implementación', puesto: '', horas: 0, tarifa: 0 });
  };

  const openModalCuali = (prefill = null) => {
    if (prefill) {
      setFormCuali({
        momento: 'Después de la implementación',
        variable: prefill.variable,
        calificacion: prefill.calificacion,
        impacto: prefill.impacto,
      });
    } else {
      setFormCuali({ momento: 'Antes de la implementación', variable: '', calificacion: 1, impacto: 'Equipo' });
    }
    setModalCualiOpen(true);
  };

  const handleAddCuali = () => {
    if (!formCuali.variable.trim()) return;

    addVariableCualitativa({
      momento: formCuali.momento,
      variable: formCuali.variable,
      calificacion: parseInt(formCuali.calificacion),
      impacto: formCuali.impacto,
    });

    setModalCualiOpen(false);
    setFormCuali({ momento: 'Antes de la implementación', variable: '', calificacion: 1, impacto: 'Equipo' });
  };

  const openModalCuant = (prefill = null) => {
    if (prefill) {
      setFormCuant({
        momento: 'Después de la implementación',
        variable: prefill.variable,
        valor: prefill.valor,
        unidad: prefill.unidad,
        impacto: prefill.impacto,
      });
    } else {
      setFormCuant({ momento: 'Antes de la implementación', variable: '', valor: 0, unidad: '', impacto: 'Equipo' });
    }
    setModalCuantOpen(true);
  };

  const handleAddCuant = () => {
    addVariableCuantitativa({
      momento: formCuant.momento,
      variable: formCuant.variable,
      valor: parseFloat(formCuant.valor),
      unidad: formCuant.unidad,
      impacto: formCuant.impacto,
    });
    setModalCuantOpen(false);
    setFormCuant({ momento: 'Antes de la implementación', variable: '', valor: 0, unidad: '', impacto: 'Equipo' });
  };

  const costoAntes = state.esfuerzoOperativo
    .filter(e => e.momento === 'Antes de la implementación')
    .reduce((sum, e) => sum + e.costo, 0);

  const costoDespues = state.esfuerzoOperativo
    .filter(e => e.momento === 'Después de la implementación')
    .reduce((sum, e) => sum + e.costo, 0);

  const granTotal = costoAntes + costoDespues;

  return (
    <div className="p-6">
      {/* Esfuerzo Operativo */}
      <div className="mb-10">
        <h3 className="text-base font-bold text-gray-800 mb-2 border-b border-gray-300 pb-2">
          Registro Esfuerzo Operativo
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Registrar la cantidad de horas dedicadas por cada colaborador que participa en la ejecución de una operación/transacción.
        </p>

        <div className="flex justify-start mb-4">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-800"
          >
            <Plus size={16} />
            Añadir Esfuerzo Operativo
          </button>
        </div>

        {state.esfuerzoOperativo.length > 0 ? (
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr className="bg-pucp-blue text-white">
                <th className="py-2 px-3">Momento</th>
                <th className="py-2 px-3">N°</th>
                <th className="py-2 px-3">Horas (HH)</th>
                <th className="py-2 px-3">Tarifa (S/.)</th>
                <th className="py-2 px-3">Costo</th>
                <th className="py-2 px-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {state.esfuerzoOperativo.map((e) => (
                <React.Fragment key={e.id}>
                  <tr className={`border-b ${
                    e.momento === 'Antes de la implementación' ? 'bg-blue-50' : 'bg-green-50'
                  }`}>
                    <td className="py-2 px-3">{e.momento}</td>
                    <td className="py-2 px-3">{e.puesto}</td>
                    <td className="py-2 px-3 text-right">{e.horas}</td>
                    <td className="py-2 px-3 text-right">{e.tarifa.toFixed(2)}</td>
                    <td className="py-2 px-3 text-right font-medium">{e.costo.toFixed(2)}</td>
                    <td className="py-2 px-3 text-center">
                      <button onClick={() => removeEsfuerzoOperativo(e.id)} className="text-red-600 hover:text-red-800">
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                  {e.momento === 'Antes de la implementación' && (
                    <tr className="border-b border-gray-200">
                      <td colSpan={6} className="py-1 px-3 text-center bg-blue-50">
                        <button
                          onClick={() => openModal(e)}
                          className="text-xs text-pucp-blue hover:text-blue-800 font-medium flex items-center justify-center gap-1 py-1 px-3 border border-dashed border-pucp-blue hover:bg-blue-100 transition-colors"
                          title="Agregar 'Después de la implementación' con datos prellenados"
                        >
                          <Plus size={12} />
                          Agregar data después de la implementación
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td colSpan={4} className="py-2 px-3 text-right">Grand Total</td>
                <td className="py-2 px-3 text-right">{granTotal.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500 mb-4">
            <p>No hay esfuerzos operativos registrados</p>
          </div>
        )}
      </div>

      {/* Variables Cualitativas */}
      <div className="mb-10">
        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-gray-300 pb-2">
          Registro Variables Cualitativas
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Define hasta 3 variables cualitativas que este proyecto busca mejorar y califica cómo se perciben HOY (del 1 al 5, donde 1 es Pésimo y 5 es Excelente).
        </p>

        <div className="flex justify-start mb-4">
          <button
            onClick={() => openModalCuali()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-800"
          >
            <Plus size={16} />
            Añadir Variable Cualitativa
          </button>
        </div>

        {state.variablesCualitativas.length > 0 ? (
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr className="bg-pucp-blue text-white">
                <th className="py-2 px-3">Momento</th>
                <th className="py-2 px-3">Variable cualitativa</th>
                <th className="py-2 px-3">Calificación (1 al 5)</th>
                <th className="py-2 px-3">¿A quién impacta?</th>
                <th className="py-2 px-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {state.variablesCualitativas.map((v) => (
                <React.Fragment key={v.id}>
                  <tr className={`border-b ${
                    v.momento === 'Antes de la implementación' ? 'bg-blue-50' : 'bg-green-50'
                  }`}>
                    <td className="py-2 px-3">{v.momento}</td>
                    <td className="py-2 px-3">{v.variable}</td>
                    <td className="py-2 px-3 text-center font-medium">{v.calificacion}</td>
                    <td className="py-2 px-3">{v.impacto}</td>
                    <td className="py-2 px-3 text-center">
                      <button onClick={() => removeVariableCualitativa(v.id)} className="text-red-600 hover:text-red-800">
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                  {v.momento === 'Antes de la implementación' && (
                    <tr className="border-b border-gray-200">
                      <td colSpan={5} className="py-1 px-3 text-center bg-blue-50">
                        <button
                          onClick={() => openModalCuali(v)}
                          className="text-xs text-pucp-blue hover:text-blue-800 font-medium flex items-center justify-center gap-1 py-1 px-3 border border-dashed border-pucp-blue hover:bg-blue-100 transition-colors"
                          title="Agregar 'Después de la implementación' con datos prellenados"
                        >
                          <Plus size={12} />
                          Agregar resultados de variables cualitativas después de la implementación
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500 mb-4">
            <p>No hay variables cualitativas registradas</p>
          </div>
        )}
      </div>

      {/* Variables Cuantitativas */}
      <div className="mb-10">
        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-gray-300 pb-2">
          Registro Variables Cuantitativas
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Si aplica al proyecto, define hasta tres variables cuantitativas que la solución busca mejorar y especifica su valor actual.
        </p>

        <div className="flex justify-start mb-4">
          <button
            onClick={() => openModalCuant()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-800"
          >
            <Plus size={16} />
            Añadir Variable Cuantitativa
          </button>
        </div>

        {state.variablesCuantitativas.length > 0 ? (
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr className="bg-pucp-blue text-white">
                <th className="py-2 px-3">Momento</th>
                <th className="py-2 px-3">Variable Cuantitativa a Impactar</th>
                <th className="py-2 px-3">Valor Actual</th>
                <th className="py-2 px-3">Unidad de Medida</th>
                <th className="py-2 px-3">¿A quién impacta?</th>
                <th className="py-2 px-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {state.variablesCuantitativas.map((v) => (
                <React.Fragment key={v.id}>
                  <tr className={`border-b ${
                    v.momento === 'Antes de la implementación' ? 'bg-blue-50' : 'bg-orange-50'
                  }`}>
                    <td className="py-2 px-3">{v.momento}</td>
                    <td className="py-2 px-3">{v.variable}</td>
                    <td className="py-2 px-3 text-right font-medium">{v.valor}</td>
                    <td className="py-2 px-3">{v.unidad}</td>
                    <td className="py-2 px-3">{v.impacto}</td>
                    <td className="py-2 px-3 text-center">
                      <button onClick={() => removeVariableCuantitativa(v.id)} className="text-red-600 hover:text-red-800">
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                  {v.momento === 'Antes de la implementación' && (
                    <tr className="border-b border-gray-200">
                      <td colSpan={6} className="py-1 px-3 text-center bg-blue-50">
                        <button
                          onClick={() => openModalCuant(v)}
                          className="text-xs text-pucp-blue hover:text-blue-800 font-medium flex items-center justify-center gap-1 py-1 px-3 border border-dashed border-pucp-blue hover:bg-blue-100 transition-colors"
                          title="Agregar 'Después de la implementación' con datos prellenados"
                        >
                          <Plus size={12} />
                          Agregar resultados de variables cuantitativas después de la implementación
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500 mb-4">
            <p>No hay variables cuantitativas registradas</p>
          </div>
        )}
      </div>

      {/* Modal Esfuerzo Operativo */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Registro Operativo</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <fieldset className="border border-gray-300 p-3">
              <legend className="text-sm font-medium text-gray-700 px-1">Esfuerzo operativo</legend>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Momento</label>
                <select
                  value={form.momento}
                  onChange={(e) => setForm({ ...form, momento: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  <option>Antes de la implementación</option>
                  <option>Después de la implementación</option>
                </select>
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre del puesto del colaborador</label>
                <input
                  type="text"
                  value={form.puesto}
                  onChange={(e) => setForm({ ...form, puesto: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Horas (HH)</label>
                <input
                  type="number"
                  value={form.horas}
                  onChange={(e) => setForm({ ...form, horas: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  min="0"
                  step="0.5"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Costo por HH (S/ x HH)</label>
                <input
                  type="number"
                  value={form.tarifa}
                  onChange={(e) => setForm({ ...form, tarifa: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  min="0"
                  step="1"
                />
              </div>
            </fieldset>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 border border-gray-400"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cualitativo */}
      {modalCualiOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Registro Cualitativo</h3>
              <button onClick={() => setModalCualiOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <fieldset className="border border-gray-300 p-3">
              <legend className="text-sm font-medium text-gray-700 px-1">Variable cualitativa</legend>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Momento</label>
                <select
                  value={formCuali.momento}
                  onChange={(e) => setFormCuali({ ...formCuali, momento: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  <option>Antes de la implementación</option>
                  <option>Después de la implementación</option>
                </select>
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Variable cualitativa a impactar</label>
                <input
                  type="text"
                  value={formCuali.variable}
                  onChange={(e) => setFormCuali({ ...formCuali, variable: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  placeholder="Ej: Satisfacción"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Calificación (1 al 5)</label>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={formCuali.calificacion}
                    onChange={(e) => setFormCuali({ ...formCuali, calificacion: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-pucp-blue"
                  />
                  <span className="text-lg font-bold text-pucp-blue w-8 text-center">
                    {formCuali.calificacion}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 - Pésimo</span>
                  <span>5 - Excelente</span>
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">¿A quién impacta?</label>
                <select
                  value={formCuali.impacto}
                  onChange={(e) => setFormCuali({ ...formCuali, impacto: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  <option>Equipo</option>
                  <option>Usuario</option>
                  <option>Organización</option>
                </select>
              </div>
            </fieldset>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddCuali}
                className="px-6 py-2 bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 border border-gray-400"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cuantitativo */}
      {modalCuantOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Registro Cuantitativo</h3>
              <button onClick={() => setModalCuantOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <fieldset className="border border-gray-300 p-3">
              <legend className="text-sm font-medium text-gray-700 px-1">Variable cuantitativa</legend>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Momento</label>
                <select
                  value={formCuant.momento}
                  onChange={(e) => setFormCuant({ ...formCuant, momento: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  <option>Antes de la implementación</option>
                  <option>Después de la implementación</option>
                </select>
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Variable cuantitativa a impactar</label>
                <input
                  type="text"
                  value={formCuant.variable}
                  onChange={(e) => setFormCuant({ ...formCuant, variable: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  placeholder="Ej: Número de inscritos"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Valor actual</label>
                <input
                  type="number"
                  value={formCuant.valor}
                  onChange={(e) => setFormCuant({ ...formCuant, valor: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  min="0"
                  placeholder="0"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Unidad de Medida</label>
                <input
                  type="text"
                  value={formCuant.unidad}
                  onChange={(e) => setFormCuant({ ...formCuant, unidad: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  placeholder="Ej: personas, procesos, días"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">¿A quién impacta?</label>
                <select
                  value={formCuant.impacto}
                  onChange={(e) => setFormCuant({ ...formCuant, impacto: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  <option>Equipo</option>
                  <option>Usuario</option>
                  <option>Organización</option>
                </select>
              </div>
            </fieldset>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddCuant}
                className="px-6 py-2 bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 border border-gray-400"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabRegistroCuantitativo;

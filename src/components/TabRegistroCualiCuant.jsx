import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TabRegistroCualiCuant = () => {
  const { state, addVariableCualitativa, removeVariableCualitativa, addVariableCuantitativa, removeVariableCuantitativa } = useApp();

  // Cualitativas
  const [modalCualiOpen, setModalCualiOpen] = useState(false);
  const [formCuali, setFormCuali] = useState({
    momento: 'Antes de la implementación',
    variable: '',
    calificacion: 1,
    impacto: 'Equipo',
  });

  // Cuantitativas
  const [modalCuantOpen, setModalCuantOpen] = useState(false);
  const [formCuant, setFormCuant] = useState({
    momento: 'Antes de la implementación',
    variable: '',
    valor: 0,
    unidad: 'personas',
    impacto: 'Equipo',
  });

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
      setFormCuant({ momento: 'Antes de la implementación', variable: '', valor: 0, unidad: 'personas', impacto: 'Equipo' });
    }
    setModalCuantOpen(true);
  };

  const handleAddCuali = () => {
    addVariableCualitativa({
      momento: formCuali.momento,
      variable: formCuali.variable,
      calificacion: parseInt(formCuali.calificacion),
      impacto: formCuali.impacto,
    });
    setModalCualiOpen(false);
    setFormCuali({ momento: 'Antes de la implementación', variable: '', calificacion: 1, impacto: 'Equipo' });
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
    setFormCuant({ momento: 'Antes de la implementación', variable: '', valor: 0, unidad: 'personas', impacto: 'Equipo' });
  };

  return (
    <div className="p-6">
      {/* Variables Cualitativas */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-800">VARIABLES CUALITATIVAS</h2>
          <button
            onClick={() => openModalCuali()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-800"
          >
            <Plus size={16} />
            Añadir variable(s) cualitativa(s)
          </button>
        </div>

        {state.variablesCualitativas.length > 0 ? (
          <table className="w-full text-sm border-collapse">
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
          <div className="text-center py-8 text-gray-500">
            <p>No hay variables cualitativas registradas</p>
          </div>
        )}
      </div>

      {/* Variables Cuantitativas */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-800">VARIABLES CUANTITATIVAS</h2>
          <button
            onClick={() => openModalCuant()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-800"
          >
            <Plus size={16} />
            Añadir variable(s) cuantitativa(s)
          </button>
        </div>

        {state.variablesCuantitativas.length > 0 ? (
          <table className="w-full text-sm border-collapse">
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
          <div className="text-center py-8 text-gray-500">
            <p>No hay variables cuantitativas registradas</p>
          </div>
        )}
      </div>

      {/* Modal Cualitativo */}
      {modalCualiOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Registro_cualitativo</h3>
              <button onClick={() => setModalCualiOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <fieldset className="border border-gray-300 p-3">
              <legend className="text-sm font-medium text-gray-700 px-1">Línea base cualitativa</legend>
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
                <select
                  value={formCuali.calificacion}
                  onChange={(e) => setFormCuali({ ...formCuali, calificacion: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                >
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
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
              <h3 className="font-bold text-gray-800">Registro_cuantitativo</h3>
              <button onClick={() => setModalCuantOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <fieldset className="border border-gray-300 p-3">
              <legend className="text-sm font-medium text-gray-700 px-1">Línea base cuantitativa</legend>
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
                  placeholder="Ej: Inscritos"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Valor</label>
                <input
                  type="number"
                  value={formCuant.valor}
                  onChange={(e) => setFormCuant({ ...formCuant, valor: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  min="0"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Unidad de Medida</label>
                <input
                  type="text"
                  value={formCuant.unidad}
                  onChange={(e) => setFormCuant({ ...formCuant, unidad: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 text-sm"
                  placeholder="personas"
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

export default TabRegistroCualiCuant;

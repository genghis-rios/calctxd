import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TabLaInversion = () => {
  const { state, addHora, removeHora, addLicencia, removeLicencia } = useApp();
  const [modalHorasOpen, setModalHorasOpen] = useState(false);
  const [modalLicenciasOpen, setModalLicenciasOpen] = useState(false);
  const [formHoras, setFormHoras] = useState({
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'Diseño',
    horas: 0,
    tarifa: 0,
    responsable: '',
  });
  const [formLicencias, setFormLicencias] = useState({
    fecha: new Date().toISOString().split('T')[0],
    nombre: '',
    costo: 0,
    responsable: '',
  });

  const tiposHoras = ['Diseño', 'Desarrollo', 'Testing', 'Implementación', 'Documentación'];

  const handleSubmitHoras = () => {
    addHora({
      fecha: formHoras.fecha,
      tipo: formHoras.tipo,
      horas: parseFloat(formHoras.horas),
      tarifa: parseFloat(formHoras.tarifa),
      costo: parseFloat(formHoras.horas) * parseFloat(formHoras.tarifa),
      responsable: formHoras.responsable,
    });
    setModalHorasOpen(false);
    setFormHoras({ fecha: new Date().toISOString().split('T')[0], tipo: 'Diseño', horas: 0, tarifa: 0, responsable: '' });
  };

  const handleSubmitLicencias = () => {
    addLicencia({
      fecha: formLicencias.fecha,
      nombre: formLicencias.nombre,
      costo: parseFloat(formLicencias.costo),
      responsable: formLicencias.responsable,
    });
    setModalLicenciasOpen(false);
    setFormLicencias({ fecha: new Date().toISOString().split('T')[0], nombre: '', costo: 0, responsable: '' });
  };

  const totalCostoHoras = state.horas.reduce((sum, h) => sum + h.costo, 0);
  const totalCostoLicencias = state.licencias.reduce((sum, l) => sum + l.costo, 0);
  const granTotal = totalCostoHoras + totalCostoLicencias;

  return (
    <div className="p-6">
      {/* Section: Horas */}
      <div className="mb-8">
        <h3 className="text-base font-bold text-gray-800 mb-2 border-b border-gray-300 pb-2">
          Registro de Horas
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Registrar el tiempo dedicado en crear la solución. Se sugiere hacer un registro diario para mayor precisión del tiempo dedicado.
        </p>
        <button
          onClick={() => setModalHorasOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 mb-4"
        >
          <Plus size={16} />
          Añadir Horas
        </button>
        {state.horas.length > 0 ? (
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr className="bg-pucp-blue text-white">
                <th className="py-2 px-3 text-left">Fecha</th>
                <th className="py-2 px-3 text-left">Tipo de horas</th>
                <th className="py-2 px-3 text-right">Horas (HH)</th>
                <th className="py-2 px-3 text-right">Tarifa (S/.)</th>
                <th className="py-2 px-3 text-right">Costo Total</th>
                <th className="py-2 px-3 text-left">Responsable del registro</th>
                <th className="py-2 px-3 text-center w-10"></th>
              </tr>
            </thead>
            <tbody>
              {state.horas.map((h) => (
                <tr key={h.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-3">{h.fecha}</td>
                  <td className="py-2 px-3">{h.tipo}</td>
                  <td className="py-2 px-3 text-right">{h.horas}</td>
                  <td className="py-2 px-3 text-right">{h.tarifa.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right font-medium">{h.costo.toFixed(2)}</td>
                  <td className="py-2 px-3">{h.responsable}</td>
                  <td className="py-2 px-3 text-center">
                    <button onClick={() => removeHora(h.id)} className="text-red-600 hover:text-red-800">
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No hay registros de horas</p>
          </div>
        )}
        {state.horas.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 p-3">
            <p className="text-sm text-gray-700">
              <strong>Total Horas:</strong> <span className="font-bold text-pucp-blue">S/. {totalCostoHoras.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>

      {/* Section: Licencias */}
      <div className="mb-8">
        <h3 className="text-base font-bold text-gray-800 mb-2 border-b border-gray-300 pb-2">
          Registro de Licencias
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Registra las licencias que se necesitaron para crear la solución. Considera la tarifa anual correspondiente asignada al proyecto.
        </p>
        <button
          onClick={() => setModalLicenciasOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 mb-4"
        >
          <Plus size={16} />
          Añadir Licencias
        </button>
        {state.licencias.length > 0 ? (
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr className="bg-pucp-blue text-white">
                <th className="py-2 px-3 text-left">Fecha</th>
                <th className="py-2 px-3 text-left">Nombre de Licencia</th>
                <th className="py-2 px-3 text-right">Tarifa (S/.)</th>
                <th className="py-2 px-3 text-left">Responsable del registro</th>
                <th className="py-2 px-3 text-center w-10"></th>
              </tr>
            </thead>
            <tbody>
              {state.licencias.map((l) => (
                <tr key={l.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-3">{l.fecha}</td>
                  <td className="py-2 px-3">{l.nombre}</td>
                  <td className="py-2 px-3 text-right font-medium">{l.costo.toFixed(2)}</td>
                  <td className="py-2 px-3">{l.responsable}</td>
                  <td className="py-2 px-3 text-center">
                    <button onClick={() => removeLicencia(l.id)} className="text-red-600 hover:text-red-800">
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No hay licencias registradas</p>
          </div>
        )}
        {state.licencias.length > 0 && (
          <div className="bg-green-50 border border-green-200 p-3">
            <p className="text-sm text-gray-700">
              <strong>Total Licencias:</strong> <span className="font-bold text-pucp-blue">S/. {totalCostoLicencias.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>

      {/* Grand Total */}
      {(state.horas.length > 0 || state.licencias.length > 0) && (
        <div className="bg-orange-50 border-2 border-orange-300 p-4">
          <p className="text-sm text-gray-700">
            <strong>TOTAL INVERTIDO:</strong> <span className="text-xl font-bold text-pucp-blue">S/. {granTotal.toFixed(2)}</span>
          </p>
        </div>
      )}

      {/* Modal Horas */}
      {modalHorasOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Registro de Horas</h3>
              <button onClick={() => setModalHorasOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <fieldset className="border border-gray-300 p-3">
                <legend className="text-sm font-medium text-gray-700 px-1">Horas de Trabajo</legend>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={formHoras.fecha}
                    onChange={(e) => setFormHoras({ ...formHoras, fecha: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
                  <select
                    value={formHoras.tipo}
                    onChange={(e) => setFormHoras({ ...formHoras, tipo: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  >
                    {tiposHoras.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Horas (HH)</label>
                  <input
                    type="number"
                    value={formHoras.horas}
                    onChange={(e) => setFormHoras({ ...formHoras, horas: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Costo por HH (S/ x HH)</label>
                  <input
                    type="number"
                    value={formHoras.tarifa}
                    onChange={(e) => setFormHoras({ ...formHoras, tarifa: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                    min="0"
                    step="1"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Responsable del registro</label>
                  <input
                    type="text"
                    value={formHoras.responsable}
                    onChange={(e) => setFormHoras({ ...formHoras, responsable: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  />
                </div>
              </fieldset>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmitHoras}
                className="px-6 py-2 bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 border border-gray-400"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Licencias */}
      {modalLicenciasOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Registro de Licencias</h3>
              <button onClick={() => setModalLicenciasOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <fieldset className="border border-gray-300 p-3">
                <legend className="text-sm font-medium text-gray-700 px-1">Licencias</legend>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={formLicencias.fecha}
                    onChange={(e) => setFormLicencias({ ...formLicencias, fecha: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nombre de licencia</label>
                  <input
                    type="text"
                    value={formLicencias.nombre}
                    onChange={(e) => setFormLicencias({ ...formLicencias, nombre: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Costo anual (S/.)</label>
                  <input
                    type="number"
                    value={formLicencias.costo}
                    onChange={(e) => setFormLicencias({ ...formLicencias, costo: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                    min="0"
                    step="1"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Responsable del registro</label>
                  <input
                    type="text"
                    value={formLicencias.responsable}
                    onChange={(e) => setFormLicencias({ ...formLicencias, responsable: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  />
                </div>
              </fieldset>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmitLicencias}
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

export default TabLaInversion;

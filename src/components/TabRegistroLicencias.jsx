import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TabRegistroLicencias = () => {
  const { state, addLicencia, removeLicencia } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    fecha: new Date().toISOString().split('T')[0],
    nombre: '',
    costo: 0,
    responsable: '',
  });

  const handleSubmit = () => {
    addLicencia({
      fecha: form.fecha,
      nombre: form.nombre,
      costo: parseFloat(form.costo),
      responsable: form.responsable,
    });
    setModalOpen(false);
    setForm({ fecha: new Date().toISOString().split('T')[0], nombre: '', costo: 0, responsable: '' });
  };

  const totalCosto = state.licencias.reduce((sum, l) => sum + l.costo, 0);

  return (
    <div className="p-6">
      <p className="text-sm text-gray-600 mb-4">
        Registra las licencias que se necesitaron para crear la solución. Considera la tarifa anual correspondiente asignada al proyecto.
      </p>

      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 mb-6"
      >
        <Plus size={16} />
        Añadir
      </button>

      {state.licencias.length > 0 ? (
        <table className="w-full text-sm border-collapse">
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
        <div className="text-center py-12 text-gray-500">
          <p>No hay licencias registradas</p>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Registro_licencias</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
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
                    value={form.fecha}
                    onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nombre de licencia</label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Costo anual (S/.)</label>
                  <input
                    type="number"
                    value={form.costo}
                    onChange={(e) => setForm({ ...form, costo: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                    min="0"
                    step="1"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Responsable del registro</label>
                  <input
                    type="text"
                    value={form.responsable}
                    onChange={(e) => setForm({ ...form, responsable: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                  />
                </div>
              </fieldset>
            </div>
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

      {/* Summary */}
      {state.licencias.length > 0 && (
        <div className="mt-6 bg-orange-50 border border-orange-200 p-4">
          <p className="text-sm text-gray-700">
            <strong>Suma de Tarifa (S/.):</strong> <span className="text-lg font-bold text-pucp-blue">{totalCosto.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TabRegistroLicencias;

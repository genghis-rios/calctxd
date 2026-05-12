import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useCalculations } from '../hooks/useCalculations';
import { useApp } from '../context/AppContext';

const TabGraficos = () => {
  const { state } = useApp();
  const calcs = useCalculations();

  const { lineaBase } = state;

  // Esfuerzo operativo data
  const esfuerzoData = [
    { name: 'Antes', costo: calcs.esfuerzoAntes },
    { name: 'Después', costo: calcs.esfuerzoDespues },
  ];

  // Horas data
  const horasData = [
    { name: 'Antes', horas: calcs.horasAntes },
    { name: 'Después', horas: calcs.horasDespues },
  ];

  // Costo del proyecto breakdown
  const costoProyectoData = [
    { name: 'Horas x Tarifa', value: calcs.totalCostoHoras },
    { name: 'Licencias', value: calcs.totalCostoLicencias },
  ];

  const COLORS = ['#4472c4', '#ed7d31'];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Gráficos y Análisis Detallado</h2>

      {/* Costo Total del Proyecto */}
      <div className="mb-10">
        <h3 className="text-base font-bold text-gray-800 mb-4">Costo Total del Proyecto (S/.)</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Suma de horas x tarifa</p>
            <p className="text-lg font-bold text-pucp-blue bg-orange-100 px-3 py-2 inline-block">
              {calcs.totalCostoHoras.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Suma de costo licencia</p>
            <p className="text-lg font-bold text-pucp-blue bg-orange-100 px-3 py-2 inline-block">
              {calcs.totalCostoLicencias.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border border-gray-300 p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Total de desarrollo/implementación del proyecto</p>
            <p className="text-xl font-bold text-pucp-blue">S/ {calcs.inversionTotal.toFixed(2)}</p>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={costoProyectoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costoProyectoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Línea Base Cuantitativa */}
      <div className="mb-10">
        <h3 className="text-base font-bold text-gray-800 mb-4">LÍNEA BASE CUANTITATIVA</h3>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Costo antes/después */}
          <div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-3 text-left font-medium">Row Labels</th>
                  <th className="py-2 px-3 text-right font-medium">Suma de Costo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b">
                  <td className="py-2 px-3">Después de la implementación</td>
                  <td className="py-2 px-3 text-right">{calcs.esfuerzoDespues.toFixed(2)}</td>
                </tr>
                <tr className="bg-blue-50 border-b">
                  <td className="py-2 px-3">Antes de la implementación</td>
                  <td className="py-2 px-3 text-right">{calcs.esfuerzoAntes.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="py-2 px-3">Grand Total</td>
                  <td className="py-2 px-3 text-right">{(calcs.esfuerzoAntes + calcs.esfuerzoDespues).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Diferencia */}
          <div className="text-center">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-pucp-blue text-white">
                  <th className="py-2 px-3">Dif antes / después</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-800 text-white font-bold">
                  <td className="py-2 px-3">{calcs.difAntesDespues.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ahorro Anual */}
          <div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-pucp-blue text-white">
                  <th className="py-2 px-3">Ahorro Financiero Anual (S/.)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-800 text-white font-bold">
                  <td className="py-2 px-3">S/ {calcs.ahorroFinancieroAnual.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Horas chart */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={esfuerzoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="costo" fill="#4472c4" name="Costo (S/.)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-3 text-left font-medium">Row Labels</th>
                  <th className="py-2 px-3 text-right font-medium">Suma de Horas (HH)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50 border-b">
                  <td className="py-2 px-3">Antes de la implementación</td>
                  <td className="py-2 px-3 text-right">{calcs.horasAntes}</td>
                </tr>
                <tr className="bg-green-50 border-b">
                  <td className="py-2 px-3">Después de la implementación</td>
                  <td className="py-2 px-3 text-right">{calcs.horasDespues}</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="py-2 px-3">Grand Total</td>
                  <td className="py-2 px-3 text-right">{calcs.horasAntes + calcs.horasDespues}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI */}
        <div className="mt-6 inline-block mr-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-pucp-blue text-white">
                <th className="py-2 px-6">ROI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-800 text-white font-bold">
                <td className="py-2 px-6 text-center text-xl">{calcs.roi.toFixed(0)}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cantidad de transacciones */}
        {lineaBase.transacciones > 0 && (
          <div className="mt-6 inline-block">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-pucp-blue text-white">
                  <th className="py-2 px-6">Cantidad de transacciones</th>
                  <th className="py-2 px-6">Unidad de medida</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50">
                  <td className="py-2 px-6 text-center">{lineaBase.transacciones}</td>
                  <td className="py-2 px-6 text-center">{lineaBase.unidadTransacciones}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Línea Cualitativa */}
      {calcs.cualitativasPromedio.length > 0 && (
        <div className="mb-10">
          <h3 className="text-base font-bold text-gray-800 mb-4">LÍNEA CUALITATIVA</h3>
          
          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-3 text-left font-medium">Row Labels</th>
                <th className="py-2 px-3 text-right font-medium">Después de la implementación</th>
                <th className="py-2 px-3 text-right font-medium">Antes de la implementación</th>
                <th className="py-2 px-3 text-right font-medium">Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {calcs.cualitativasPromedio.map((c, idx) => (
                <tr key={idx} className="bg-blue-50 border-b">
                  <td className="py-2 px-3">{c.variable}</td>
                  <td className="py-2 px-3 text-right">{c.despues.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right">{c.antes.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right font-bold">{((c.despues + c.antes) / 2).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="py-2 px-3">Grand Total</td>
                <td className="py-2 px-3 text-right">
                  {(calcs.cualitativasPromedio.reduce((s, c) => s + c.despues, 0) / calcs.cualitativasPromedio.length).toFixed(2)}
                </td>
                <td className="py-2 px-3 text-right">
                  {(calcs.cualitativasPromedio.reduce((s, c) => s + c.antes, 0) / calcs.cualitativasPromedio.length).toFixed(2)}
                </td>
                <td className="py-2 px-3 text-right">
                  {(calcs.cualitativasPromedio.reduce((s, c) => s + (c.despues + c.antes) / 2, 0) / calcs.cualitativasPromedio.length).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Cuantitativas pivot table */}
      {calcs.cuantitativasData.length > 0 && (
        <div className="mb-10">
          <table className="w-full text-sm border-collapse mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-3 text-left font-medium">Row Labels</th>
                <th className="py-2 px-3 text-right font-medium">Antes de la implementación</th>
                <th className="py-2 px-3 text-right font-medium">Después de la implementación</th>
                <th className="py-2 px-3 text-right font-medium">Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {calcs.cuantitativasData.map((c, idx) => (
                <tr key={idx} className="bg-blue-50 border-b">
                  <td className="py-2 px-3">{c.variable}</td>
                  <td className="py-2 px-3 text-right">{c.antes}</td>
                  <td className="py-2 px-3 text-right">{c.despues}</td>
                  <td className="py-2 px-3 text-right font-bold">{c.antes + c.despues}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="py-2 px-3">Grand Total</td>
                <td className="py-2 px-3 text-right">{calcs.cuantitativasData.reduce((s, c) => s + c.antes, 0)}</td>
                <td className="py-2 px-3 text-right">{calcs.cuantitativasData.reduce((s, c) => s + c.despues, 0)}</td>
                <td className="py-2 px-3 text-right">
                  {calcs.cuantitativasData.reduce((s, c) => s + c.antes + c.despues, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TabGraficos;

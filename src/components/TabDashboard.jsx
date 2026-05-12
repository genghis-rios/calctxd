import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Clock, TrendingUp, DollarSign, Percent, FileDown, FileSpreadsheet, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useCalculations } from '../hooks/useCalculations';
import { useApp } from '../context/AppContext';

const TabDashboard = () => {
  const { state } = useApp();
  const calcs = useCalculations();

  // Export to CSV
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(h => JSON.stringify(row[h])).join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  // Export to Excel
  const exportToExcel = (data, filename) => {
    if (!data) return;
    const wb = XLSX.utils.book_new();
    Object.keys(data).forEach(key => {
      if (data[key] && data[key].length > 0) {
        const ws = XLSX.utils.json_to_sheet(data[key]);
        XLSX.utils.book_append_sheet(wb, ws, key);
      } else {
        const ws = XLSX.utils.json_to_sheet([{ Mensaje: `Sin datos en ${key}` }]);
        XLSX.utils.book_append_sheet(wb, ws, key);
      }
    });
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  // Export to PDF
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      const projectName = state.acta?.nombreProyecto || 'Proyecto';
      
      // Title
      doc.setFontSize(16);
      doc.setTextColor(30, 58, 95);
      doc.text('CALCULADORA DE IMPACTO: LIDERES DIGITALES', 14, 20);
      
      // Project Info
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Proyecto: ${projectName}`, 14, 35);
      doc.text(`Unidad/Facultad: ${state.acta?.unidad || 'N/A'}`, 14, 42);
      
      // KPIs Table
      const kpiData = [
        ['Inversión Total', `S/ ${calcs.inversionTotal?.toLocaleString('es-PE', { minimumFractionDigits: 2 }) || '0.00'}`],
        ['Ahorro Financiero Anual', `S/ ${calcs.ahorroFinancieroAnual?.toLocaleString('es-PE', { minimumFractionDigits: 2 }) || '0.00'}`],
        ['ROI', `${calcs.roi?.toFixed(0) || '0'}%`],
        ['Horas Liberadas al Año', `${calcs.horasLiberadasAlAno?.toFixed(1) || '0.0'}`]
      ];
      
      doc.setFontSize(12);
      doc.text('INDICADORES CLAVE', 14, 55);
      autoTable(doc, {
        startY: 60,
        head: [['Indicador', 'Valor']],
        body: kpiData,
        theme: 'striped',
        headStyles: { fillColor: [30, 58, 95] },
        margin: { left: 14, right: 14 }
      });
      
      let finalY = (doc.lastAutoTable?.finalY || 60) + 15;
      
      // Cualitativas Table
      if (calcs.cualitativasPromedio?.length > 0) {
        doc.setFontSize(12);
        doc.text('IMPACTO CUALITATIVO', 14, finalY);
        const cualitativaData = calcs.cualitativasPromedio.map(c => [
          c.variable || '',
          c.antes?.toFixed(2) || '0.00',
          c.despues?.toFixed(2) || '0.00',
          ((c.despues || 0) - (c.antes || 0)).toFixed(2)
        ]);
        autoTable(doc, {
          startY: finalY + 5,
          head: [['Variable', 'Antes', 'Después', 'Cambio']],
          body: cualitativaData,
          theme: 'striped',
          headStyles: { fillColor: [30, 58, 95] },
          margin: { left: 14, right: 14 }
        });
        finalY = (doc.lastAutoTable?.finalY || finalY) + 15;
      }
      
      // Cuantitativas Table
      if (calcs.cuantitativasData?.length > 0) {
        doc.setFontSize(12);
        doc.text('IMPACTO CUANTITATIVO', 14, finalY);
        const cuantitativaData = calcs.cuantitativasData.map(c => [
          c.variable || '',
          `${c.antes?.toFixed(2) || '0.00'} ${c.unidad || ''}`,
          `${c.despues?.toFixed(2) || '0.00'} ${c.unidad || ''}`,
          `${((c.despues || 0) - (c.antes || 0)).toFixed(2)} ${c.unidad || ''}`
        ]);
        autoTable(doc, {
          startY: finalY + 5,
          head: [['Variable', 'Antes', 'Después', 'Cambio']],
          body: cuantitativaData,
          theme: 'striped',
          headStyles: { fillColor: [30, 58, 95] },
          margin: { left: 14, right: 14 }
        });
        finalY = (doc.lastAutoTable?.finalY || finalY) + 15;
      }
      
      // Horas Table
      if (state.horas?.length > 0) {
        doc.setFontSize(12);
        doc.text('REGISTRO DE HORAS', 14, finalY);
        const horasData = state.horas.map(h => [
          h.fecha || '',
          h.tipo || '',
          h.horas || 0,
          h.costo ? h.costo.toFixed(2) : '0.00',
          h.responsable || ''
        ]);
        autoTable(doc, {
          startY: finalY + 5,
          head: [['Fecha', 'Tipo', 'Horas', 'Total (S/)', 'Responsable']],
          body: horasData,
          theme: 'striped',
          headStyles: { fillColor: [30, 58, 95] },
          margin: { left: 14, right: 14 }
        });
        finalY = (doc.lastAutoTable?.finalY || finalY) + 15;
      }
      
      // Licencias Table
      if (state.licencias?.length > 0) {
        doc.setFontSize(12);
        doc.text('REGISTRO DE LICENCIAS', 14, finalY);
        const licenciasData = state.licencias.map(l => [
          l.fecha || '',
          l.nombre || '',
          l.costo ? l.costo.toFixed(2) : '0.00',
          l.responsable || ''
        ]);
        autoTable(doc, {
          startY: finalY + 5,
          head: [['Fecha', 'Licencia', 'Costo (S/)', 'Responsable']],
          body: licenciasData,
          theme: 'striped',
          headStyles: { fillColor: [30, 58, 95] },
          margin: { left: 14, right: 14 }
        });
      }
      
      doc.save(`${projectName.replace(/\s+/g, '_')}_informe.pdf`);
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert("Hubo un problema al generar el PDF. Asegúrese de haber llenado los datos iniciales.");
    }
  };

  // Get export data
  const getDashboardData = () => {
    const projectName = state.acta.nombreProyecto || 'Proyecto';
    return {
      kpi: [
        { indicador: 'Inversión Total', valor: calcs.inversionTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 }) },
        { indicador: 'Ahorro Financiero Anual', valor: calcs.ahorroFinancieroAnual.toLocaleString('es-PE', { minimumFractionDigits: 2 }) },
        { indicador: 'ROI', valor: `${calcs.roi.toFixed(0)}%` },
        { indicador: 'Horas Liberadas al Año', valor: calcs.horasLiberadasAlAno.toFixed(1) }
      ],
      cualitativas: calcs.cualitativasPromedio.map(c => ({
        variable: c.variable,
        antes: c.antes.toFixed(2),
        despues: c.despues.toFixed(2),
        cambio: (c.despues - c.antes).toFixed(2)
      })),
      cuantitativas: calcs.cuantitativasData.map(c => ({
        variable: c.variable,
        antes: c.antes.toFixed(2),
        despues: c.despues.toFixed(2),
        unidad: c.unidad || '',
        cambio: (c.despues - c.antes).toFixed(2)
      })),
      horas: state.horas.map(h => ({
        fecha: h.fecha,
        tipo: h.tipo,
        horas: h.horas,
        total: h.costo ? h.costo.toFixed(2) : '0.00',
        responsable: h.responsable
      })),
      licencias: state.licencias.map(l => ({
        fecha: l.fecha,
        nombre: l.nombre,
        costo: l.costo ? l.costo.toFixed(2) : '0.00',
        responsable: l.responsable
      }))
    };
  };

  const handleExport = (format) => {
    const data = getDashboardData();
    const projectName = state.acta.nombreProyecto || 'dashboard';
    const filename = `${projectName.replace(/\s+/g, '_')}_dashboard`;
    
    switch (format) {
      case 'csv':
        exportToCSV(data.kpi, filename);
        break;
      case 'excel':
        exportToExcel({
          KPIs: data.kpi,
          Cualitativas: data.cualitativas,
          Cuantitativas: data.cuantitativas,
          Horas: data.horas,
          Licencias: data.licencias
        }, filename);
        break;
      case 'pdf':
        exportToPDF();
        break;
      default:
        break;
    }
  };

  const cualitativasChartData = calcs.cualitativasPromedio.map(c => ({
    name: c.variable,
    despues: c.despues,
    antes: c.antes,
  }));

  const cuantitativasChartData = calcs.cuantitativasData.map(c => ({
    name: c.variable,
    despues: c.despues,
    antes: c.antes,
    unidad: c.unidad || '',
  }));

  // Calcular el valor máximo para normalizar las barras
  const maxCuantitativo = Math.max(
    ...cuantitativasChartData.map(c => Math.max(c.antes, c.despues)),
    1
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-pucp-blue">
        <h1 className="text-2xl font-bold text-gray-800 mx-auto">
          CALCULADORA DE IMPACTO: LÍDERES DIGITALES
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 px-3 py-2 bg-pucp-blue text-white rounded hover:bg-blue-800 transition-colors"
            title="Exportar a PDF"
          >
            <FileText size={18} />
            <span className="text-sm">PDF</span>
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            title="Exportar a Excel"
          >
            <FileSpreadsheet size={18} />
            <span className="text-sm">Excel</span>
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            title="Exportar a CSV"
          >
            <FileDown size={18} />
            <span className="text-sm">CSV</span>
          </button>
        </div>
      </div>

      {/* Project Info - Full width */}
      <div className="bg-gray-100 border-2 border-gray-400 p-4 mb-6 w-full">
        <p className="text-sm font-bold text-gray-800 mb-2 pb-2 border-b border-gray-400">Datos del Proyecto</p>
        <div className="text-sm">
          <p><strong>Nombre del Proyecto:</strong> {state.acta.nombreProyecto || '0'}</p>
          <p><strong>Unidad / Facultad:</strong> {state.acta.unidad || '0'}</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* Inversión Total */}
        <div className="bg-pucp-blue text-white p-4 text-center">
          <p className="text-sm font-medium">Inversión total</p>
          <p className="text-2xl font-bold mt-1 bg-black py-2">
            S/ {calcs.inversionTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Ahorro Financiero Anual */}
        <div className="bg-pucp-blue text-white p-4 text-center">
          <p className="text-sm font-medium">Ahorro Financiero Anual (S/.)</p>
          <p className="text-2xl font-bold mt-1 bg-black py-2">
            S/ {calcs.ahorroFinancieroAnual.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* ROI */}
        <div className="bg-pucp-blue text-white p-4 text-center">
          <p className="text-sm font-medium">ROI</p>
          <p className="text-2xl font-bold mt-1 bg-black py-2">
            {calcs.roi.toFixed(0)}%
          </p>
        </div>

        {/* Horas Liberadas al Año */}
        <div className="bg-gray-100 border-2 border-gray-400 p-4 text-center">
          <p className="text-sm font-bold text-gray-800 mb-2 pb-2 border-b border-gray-400">Horas Liberadas al Año</p>
          <div className="flex items-center justify-center gap-2">
            <Clock size={32} className="text-pucp-blue" />
            <p className="text-xl font-bold text-black">
              {calcs.horasLiberadasAlAno.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Impacto Cualitativo y Cuantitativo */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Impacto Cualitativo */}
        {cualitativasChartData.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Impacto Cualitativo
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cualitativasChartData} barSize={50}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#666' }}
                    interval={0}
                    height={60}
                  />
                  <YAxis hide domain={[0, 5]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar dataKey="antes" name="Antes" fill="#1e3a5f" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#000000', fontSize: 11, fontWeight: 'bold' }} />
                  <Bar dataKey="despues" name="Después" fill="#c25e00" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#000000', fontSize: 11, fontWeight: 'bold' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* IMPACTO CUANTITATIVO */}
        {cuantitativasChartData.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Impacto Cuantitativo
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cuantitativasChartData} barSize={60}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#666' }}
                    interval={0}
                    height={60}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar dataKey="antes" name="Antes" fill="#5d8a3e" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#000000', fontSize: 11, fontWeight: 'bold' }} />
                  <Bar dataKey="despues" name="Después" fill="#c9a000" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#000000', fontSize: 11, fontWeight: 'bold' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabDashboard;

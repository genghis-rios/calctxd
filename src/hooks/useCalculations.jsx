import { useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const useCalculations = () => {
  const { state } = useApp();

  return useMemo(() => {
    // Total horas x tarifa (inversión en desarrollo)
    const totalCostoHoras = state.horas.reduce((sum, h) => sum + (h.horas * h.tarifa), 0);

    // Total licencias
    const totalCostoLicencias = state.licencias.reduce((sum, l) => sum + l.costo, 0);

    // Inversión total del proyecto
    const inversionTotal = totalCostoHoras + totalCostoLicencias;

    // Esfuerzo operativo antes y después
    const costoAntes = state.esfuerzoOperativo
      .filter(e => e.momento === 'Antes de la implementación')
      .reduce((sum, e) => sum + e.costo, 0);

    const costoDespues = state.esfuerzoOperativo
      .filter(e => e.momento === 'Después de la implementación')
      .reduce((sum, e) => sum + e.costo, 0);

    // Diferencia de costos (Factor 1)
    const diferenciaCostos = costoAntes - costoDespues;

    // Volumen de operaciones (Factor 2)
    const volumenOperaciones = state.acta.lineaBaseCuantitativa.transacciones;

    // Factor de conversión según unidad de medida (Factor 3)
    const factorConversion = {
      'Semanal': 52,
      'Mensual': 12,
      'Semestral': 2,
      'Anual': 1,
    }[state.acta.lineaBaseCuantitativa.unidadTransacciones] || 1;

    // Ahorro financiero anual = diferenciaCostos * volumenOperaciones * factorConversion
    const ahorroFinancieroAnual = diferenciaCostos * volumenOperaciones * factorConversion;

    // ROI = (Ahorro Anual - Inversión) / Inversión * 100
    const roi = inversionTotal > 0 ? ((ahorroFinancieroAnual - inversionTotal) / inversionTotal) * 100 : 0;

    // Horas antes y después
    const horasAntes = state.esfuerzoOperativo
      .filter(e => e.momento === 'Antes de la implementación')
      .reduce((sum, e) => sum + e.horas, 0);

    const horasDespues = state.esfuerzoOperativo
      .filter(e => e.momento === 'Después de la implementación')
      .reduce((sum, e) => sum + e.horas, 0);

    const horasAhorradas = horasAntes - horasDespues;

    // Horas liberadas al año = diferenciaHoras * volumenOperaciones * factorConversion
    const diferenciaHoras = horasAntes - horasDespues;
    const horasLiberadasAlAno = diferenciaHoras * volumenOperaciones * factorConversion;

    // Variables cualitativas agrupadas
    const cualitativasAgrupadas = {};
    state.variablesCualitativas.forEach(v => {
      if (!cualitativasAgrupadas[v.variable]) {
        cualitativasAgrupadas[v.variable] = { antes: [], despues: [] };
      }
      if (v.momento === 'Antes de la implementación') {
        cualitativasAgrupadas[v.variable].antes.push(v.calificacion);
      } else {
        cualitativasAgrupadas[v.variable].despues.push(v.calificacion);
      }
    });

    const cualitativasPromedio = Object.entries(cualitativasAgrupadas).map(([variable, vals]) => ({
      variable,
      antes: vals.antes.length ? vals.antes.reduce((a, b) => a + b, 0) / vals.antes.length : 0,
      despues: vals.despues.length ? vals.despues.reduce((a, b) => a + b, 0) / vals.despues.length : 0,
    }));

    // Variables cuantitativas agrupadas
    const cuantitativasAgrupadas = {};
    state.variablesCuantitativas.forEach(v => {
      if (!cuantitativasAgrupadas[v.variable]) {
        cuantitativasAgrupadas[v.variable] = { antes: 0, despues: 0 };
      }
      if (v.momento === 'Antes de la implementación') {
        cuantitativasAgrupadas[v.variable].antes = v.valor;
      } else {
        cuantitativasAgrupadas[v.variable].despues = v.valor;
      }
    });

    const cuantitativasData = Object.entries(cuantitativasAgrupadas).map(([variable, vals]) => ({
      variable,
      antes: vals.antes,
      despues: vals.despues,
    }));

    return {
      totalCostoHoras,
      totalCostoLicencias,
      inversionTotal,
      costoAntes,
      costoDespues,
      diferenciaCostos,
      volumenOperaciones,
      factorConversion,
      ahorroFinancieroAnual,
      roi,
      horasAntes,
      horasDespues,
      horasAhorradas,
      horasLiberadasAlAno,
      cualitativasPromedio,
      cuantitativasData,
    };
  }, [state]);
};

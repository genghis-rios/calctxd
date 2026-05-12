import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children, activeTab, setActiveTab }) => {
  const [state, setState] = useState({
    // TAB 1: Acta de Nacimiento
    acta: {
      nombreProyecto: '',
      liderDigital: '',
      correo: '',
      unidad: '',
      fechaInicio: '',
      fechaFin: '',
      tipificacion: [],
      otroTipificacion: '',
      dolor: '',
      doloresIdentificados: [],
      otroDolor: '',
      solucion: '',
      nombreValidacion: '',
      validacionJefatura: '',
      lineaBaseCuantitativa: {
        transacciones: 0,
        unidadTransacciones: 'Mensual',
        descripcionTransacciones: '',
        tiempoCiclo: 0,
        unidadTiempo: 'Días',
        descripcionTiempo: '',
        personasInvolucradas: 0,
        unidadPersonas: 'Persona(s)',
        descripcionPersonas: '',
      },
    },
    // TAB 2: Registro Horas
    horas: [],
    // TAB 3: Registro Licencias
    licencias: [],
    // TAB 4: Registro Cuantitativo
    lineaBase: {
      transacciones: 0,
      unidadTransacciones: 'Mensual',
      tiempoCiclo: 0,
      unidadTiempo: 'Días',
      personasInvolucradas: 0,
      unidadPersonas: 'Persona(s)',
    },
    esfuerzoOperativo: [],
    // TAB 5: Variables Cualitativas y Cuantitativas
    variablesCualitativas: [],
    variablesCuantitativas: [],
  });

  // Acta actions
  const updateActa = (field, value) => {
    setState(prev => ({
      ...prev,
      acta: { ...prev.acta, [field]: value }
    }));
  };

  const updateActaLineaBase = (field, value) => {
    setState(prev => ({
      ...prev,
      acta: {
        ...prev.acta,
        lineaBaseCuantitativa: { ...prev.acta.lineaBaseCuantitativa, [field]: value }
      }
    }));
  };

  const toggleDolor = (dolor) => {
    setState(prev => {
      const exists = prev.acta.doloresIdentificados.includes(dolor);
      return {
        ...prev,
        acta: {
          ...prev.acta,
          doloresIdentificados: exists
            ? prev.acta.doloresIdentificados.filter(d => d !== dolor)
            : [...prev.acta.doloresIdentificados, dolor]
        }
      };
    });
  };

  const toggleTipificacion = (tipo) => {
    setState(prev => {
      const exists = prev.acta.tipificacion.includes(tipo);
      return {
        ...prev,
        acta: {
          ...prev.acta,
          tipificacion: exists
            ? prev.acta.tipificacion.filter(t => t !== tipo)
            : [...prev.acta.tipificacion, tipo]
        }
      };
    });
  };

  // Horas actions
  const addHora = (hora) => {
    setState(prev => ({
      ...prev,
      horas: [...prev.horas, { ...hora, id: Date.now() }]
    }));
  };

  const removeHora = (id) => {
    setState(prev => ({
      ...prev,
      horas: prev.horas.filter(h => h.id !== id)
    }));
  };

  // Licencias actions
  const addLicencia = (licencia) => {
    setState(prev => ({
      ...prev,
      licencias: [...prev.licencias, { ...licencia, id: Date.now() }]
    }));
  };

  const removeLicencia = (id) => {
    setState(prev => ({
      ...prev,
      licencias: prev.licencias.filter(l => l.id !== id)
    }));
  };

  // Línea base actions
  const updateLineaBase = (field, value) => {
    setState(prev => ({
      ...prev,
      lineaBase: { ...prev.lineaBase, [field]: value }
    }));
  };

  // Esfuerzo operativo actions
  const addEsfuerzoOperativo = (esfuerzo) => {
    setState(prev => ({
      ...prev,
      esfuerzoOperativo: [...prev.esfuerzoOperativo, { ...esfuerzo, id: Date.now() }]
    }));
  };

  const removeEsfuerzoOperativo = (id) => {
    setState(prev => ({
      ...prev,
      esfuerzoOperativo: prev.esfuerzoOperativo.filter(e => e.id !== id)
    }));
  };

  // Variables cualitativas actions
  const addVariableCualitativa = (variable) => {
    setState(prev => ({
      ...prev,
      variablesCualitativas: [...prev.variablesCualitativas, { ...variable, id: Date.now() }]
    }));
  };

  const removeVariableCualitativa = (id) => {
    setState(prev => ({
      ...prev,
      variablesCualitativas: prev.variablesCualitativas.filter(v => v.id !== id)
    }));
  };

  // Variables cuantitativas actions
  const addVariableCuantitativa = (variable) => {
    setState(prev => ({
      ...prev,
      variablesCuantitativas: [...prev.variablesCuantitativas, { ...variable, id: Date.now() }]
    }));
  };

  const removeVariableCuantitativa = (id) => {
    setState(prev => ({
      ...prev,
      variablesCuantitativas: prev.variablesCuantitativas.filter(v => v.id !== id)
    }));
  };

  return (
    <AppContext.Provider value={{
      state,
      activeTab,
      setActiveTab,
      updateActa,
      updateActaLineaBase,
      toggleDolor,
      toggleTipificacion,
      addHora,
      removeHora,
      addLicencia,
      removeLicencia,
      updateLineaBase,
      addEsfuerzoOperativo,
      removeEsfuerzoOperativo,
      addVariableCualitativa,
      removeVariableCualitativa,
      addVariableCuantitativa,
      removeVariableCuantitativa,
    }}>
      {children}
    </AppContext.Provider>
  );
};

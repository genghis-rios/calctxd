import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import TabActaNacimiento from './components/TabActaNacimiento';
import TabLaInversion from './components/TabLaInversion';
import TabRegistroCuantitativo from './components/TabRegistroCuantitativo';
import TabDashboard from './components/TabDashboard';
import PUCPLogo from '../logos/PUCP.png';

const tabs = [
  { id: 'acta', label: 'Acta de Nacimiento' },
  { id: 'inversion', label: 'Registro de Costos' },
  { id: 'cuantitativo', label: 'Registro del Proyecto' },
  { id: 'dashboard', label: 'Dashboard' },
];

const tabComponents = {
  acta: TabActaNacimiento,
  inversion: TabLaInversion,
  cuantitativo: TabRegistroCuantitativo,
  dashboard: TabDashboard,
};

function App() {
  const [activeTab, setActiveTab] = useState('acta');

  const ActiveComponent = tabComponents[activeTab];

  return (
    <AppProvider activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="h-screen bg-white flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0 bg-gray-200 border-r border-gray-400 flex flex-col">
          {/* Title */}
          <div className="p-6 border-b border-gray-400 text-center">
            <img src={PUCPLogo} alt="PUCP Logo" className="w-full max-w-[180px] mx-auto mb-4" />
            <h1 className="text-lg font-bold text-pucp-blue leading-tight">
              CALCULADORA DE IMPACTO
              <br />
              <span className="text-sm font-semibold">Líderes Digitales</span>
            </h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium text-left whitespace-nowrap border-b border-gray-300 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-pucp-blue border-l-4 border-l-pucp-blue'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Manual Button */}
          <div className="p-4 border-t border-gray-400 mt-auto">
            <a
              href="/docs/userguide.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-pucp-blue text-white text-sm font-medium rounded-lg hover:bg-pucp-blue/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Manual de Uso
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white overflow-y-auto">
          <ActiveComponent />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;

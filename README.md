# Calculadora de Impacto PUCP

Aplicación web para el cálculo y seguimiento del impacto de proyectos en la PUCP.

## 🚀 Tecnologías

- **React 19** - Framework UI
- **Vite** - Build tool y dev server
- **Tailwind CSS 4** - Estilos
- **Recharts** - Gráficos y visualización de datos
- **Lucide React** - Iconos
- **React Router DOM** - Navegación

## 📋 Requisitos

- Node.js >= 18
- npm o yarn

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/beawaremkt/PUCP.git
cd calculadora-impacto

# Instalar dependencias
npm install
```

## 📦 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Iniciar servidor de producción
npm run start
```

## 📁 Estructura del Proyecto

```
calculadora-impacto/
├── src/
│   ├── components/       # Componentes de la UI
│   │   ├── TabActaNacimiento.jsx
│   │   ├── TabDashboard.jsx
│   │   ├── TabGraficos.jsx
│   │   ├── TabLaInversion.jsx
│   │   ├── TabRegistroCualiCuant.jsx
│   │   ├── TabRegistroCuantitativo.jsx
│   │   ├── TabRegistroHoras.jsx
│   │   └── TabRegistroLicencias.jsx
│   ├── context/          # Contexto de React
│   │   └── AppContext.jsx
│   ├── hooks/            # Custom hooks
│   │   └── useCalculations.jsx
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Entry point
│   └── index.css         # Estilos globales
├── public/               # Archivos estáticos
├── logos/                # Logos del proyecto
├── dist/                 # Build de producción
└── index.html            # HTML principal
```

## 🔧 Configuración

- `vite.config.js` - Configuración de Vite
- `tailwind.config.js` - Configuración de Tailwind CSS
- `postcss.config.js` - Configuración de PostCSS

## 📝 Funcionalidades

- Dashboard de métricas e indicadores
- Registro de horas de trabajo
- Seguimiento de licencias
- Registro de datos cualitativos y cuantitativos
- Gráficos y visualización de datos
- Acta de nacimiento del proyecto

## 🌐 Despliegue

El proyecto se puede desplegar en cualquier servidor estático que soporte SPAs:

```bash
# Build para producción
npm run build

# Los archivos del build están en la carpeta dist/
```

## 📄 Licencia

ISC

# 📘 Manual de Usuario - Calculadora de Impacto

**Versión**: 1.0  
**Fecha**: Abril 2026  
**Cliente**: [Nombre de su Empresa]

---

## Tabla de Contenidos

1. [Opciones de Acceso a la Herramienta](#1-opciones-de-acceso-a-la-herramienta)
2. [Opción 1: Acceso Inmediato (Recomendado)](#2-opción-1-acceso-inmediato-recomendado)
3. [Opción 2: Despliegue en su Infraestructura](#3-opción-2-despliegue-en-su-infraestructura)
4. [Guía de Uso de la Aplicación](#4-guía-de-uso-de-la-aplicación)
5. [Fórmulas y Cálculos](#5-fórmulas-y-cálculos)
6. [Exportación de Datos](#6-exportación-de-datos)
7. [Preguntas Frecuentes](#7-preguntas-frecuentes)

---

## 1. Opciones de Acceso a la Herramienta

Le entregamos esta herramienta con **dos opciones de acceso** para adaptarnos a sus necesidades:

| Opción | Descripción | Ventaja | Consideración |
|--------|-------------|---------|---------------|
| **Opción 1** | Acceso vía link (nuestro hosting en Vercel) | ✅ Inmediato - Sin configuración | Depende de nuestra disponibilidad |
| **Opción 2** | Despliegue en su infraestructura | ✅ Control total - Disponible 24/7 | Requiere configuración técnica |

> 💡 **Recomendación**: Comience con la **Opción 1** para evaluar la herramienta. Si decide adoptarla permanentemente, despliegúela en su infraestructura usando la **Opción 2**.

---

## 2. Opción 1: Acceso Inmediato (Recomendado)

### La Forma Más Fácil de Empezar

Hemos desplegado la Calculadora de Impacto en **Vercel**, una plataforma de hosting moderno. Esta es la forma **más rápida y sencilla** de comenzar a usar la herramienta sin necesidad de configurar nada.

### 🔗 Link de Acceso

```
https://calculadora-impacto-[xxx].vercel.app
```

> ⚠️ **Nota**: Reemplace `[xxx]` con el identificador que le fue proporcionado.

### ✅ Ventajas de esta Opción

- **Sin instalación**: Solo necesita un navegador web (Chrome, Edge, Firefox)
- **Acceso inmediato**: Empiece a usar la herramienta en segundos
- **Sin costos de infraestructura**: Nosotros absorbemos el hosting
- **Actualizaciones automáticas**: Siempre tendrá la última versión
- **Compatible con cualquier dispositivo**: PC, laptop, tablet

### 📱 Cómo Usar

1. Abra su navegador web preferido
2. Ingrese el link proporcionado
3. ¡Comience a registrar su proyecto!

### ⚠️ Consideraciones Importantes

| Aspecto | Detalle |
|---------|---------|
| **Disponibilidad** | Depende de la plataforma Vercel (99.9% uptime) |
| **Datos** | Se almacenan temporalmente en su navegador (localStorage) |
| **Privacidad** | Los datos no salen de su sesión local |
| **Recomendación** | Exporte sus reportes regularmente (PDF/Excel) |

### 🆘 ¿Qué Hago Si...?

| Situación | Solución |
|-----------|----------|
| El link no carga | Verifique su conexión a internet. Si persiste, contáctenos. |
| Mis datos desaparecieron | Los datos se guardan en su navegador. Si limpió caché, deberá reingresarlos. |
| Necesito acceso offline | Esta opción requiere conexión a internet. Use la Opción 2 para acceso local. |

---

## 3. Opción 2: Despliegue en su Infraestructura

### Control Total en su Entorno

Si su organización requiere tener la herramienta bajo su propio control, puede desplegarla en su infraestructura interna o en cualquier servicio de hosting de su preferencia.

### 📦 ¿Qué Recibe?

Un archivo **ZIP** que contiene:
- Todo el código fuente de la aplicación
- Archivos de configuración
- Dependencias necesarias
- Instrucciones de despliegue

### 🛠️ Requisitos Técnicos

| Requisito | Versión Mínima | ¿Por qué? |
|-----------|----------------|-----------|
| **Node.js** | 18.x o superior | Entorno de ejecución de JavaScript |
| **npm** | 9.x o superior | Gestor de paquetes (se instala con Node.js) |
| **Servidor Web** | Cualquiera que sirva archivos estáticos | Para hospedar la aplicación |

### 📋 Pasos para el Despliegue

#### Paso 1: Preparar el Entorno

```bash
# Verificar que tiene Node.js instalado
node --version

# Debe mostrar algo como: v18.x.x o superior
```

Si no tiene Node.js, descárguelo desde: https://nodejs.org/

#### Paso 2: Extraer el ZIP

1. Cree una carpeta en su sistema (ej: `C:\calculadora-impacto` o `/home/user/calculadora-impacto`)
2. Extraiga el contenido del ZIP en esa carpeta

#### Paso 3: Instalar Dependencias

Abra una terminal/consola en la carpeta del proyecto y ejecute:

```bash
npm install
```

> ⏱️ **Tiempo estimado**: 2-5 minutos (depende de su conexión a internet)

#### Paso 4: Generar la Versión de Producción

```bash
npm run build
```

Esto creará una carpeta llamada `dist/` con todos los archivos optimizados para producción.

#### Paso 5: Desplegar en su Servidor

**Opción A: Servidor Web Tradicional (Apache, Nginx, IIS)**

1. Copie el contenido de la carpeta `dist/` a la carpeta pública de su servidor web
2. Configure su servidor para servir archivos estáticos
3. Asegúrese de que todas las rutas redirijan a `index.html` (SPA)

**Opción B: Servidor de Aplicaciones Node.js**

```bash
# Instalar serve (si no lo tiene)
npm install -g serve

# Iniciar el servidor
serve -s dist -l 3000
```

La aplicación estará disponible en `http://localhost:3000`

**Opción C: Servicios de Hosting en la Nube**

| Servicio | Instrucciones Específicas |
|----------|---------------------------|
| **Vercel** | Conecte su repositorio o use `vercel deploy` |
| **Netlify** | Arrastre la carpeta `dist/` a netlify.com/drop |
| **AWS S3 + CloudFront** | Suba `dist/` a un bucket S3 y configure CloudFront |
| **Azure Static Web Apps** | Siga la guía de Azure para SPAs |
| **Google Firebase** | Use `firebase deploy --only hosting` |

### ✅ Ventajas de esta Opción

- **Control total**: Usted gestiona la disponibilidad y seguridad
- **Sin dependencia externa**: No depende de nuestro hosting
- **Personalizable**: Puede modificar el código según sus necesidades
- **Acceso offline**: Si lo despliega en su red interna

### ⚠️ Consideraciones Importantes

| Aspecto | Detalle |
|---------|---------|
| **Responsabilidad** | Usted es responsable del mantenimiento y actualizaciones |
| **Costos** | Asuma los costos de su infraestructura/servidor |
| **Soporte** | El soporte técnico de despliegue es limitado |
| **Actualizaciones** | Deberá volver a desplegar para obtener nuevas versiones |

### 🆘 Soporte de Despliegue

Si encuentra dificultades durante el despliegue, puede contactarnos para soporte básico. Sin embargo, le recomendamos:

1. Tener personal técnico con conocimientos en Node.js
2. Contar con un administrador de servidores
3. Revisar la documentación oficial de Vite: https://vitejs.dev/

---

## 4. Guía de Uso de la Aplicación

### Estructura de la Aplicación

La Calculadora de Impacto está organizada en **4 pestañas** accesibles desde el menú lateral izquierdo:

| Pestaña | Nombre | Propósito |
|---------|--------|-----------|
| 1 | **Acta de Nacimiento** | Documentación inicial del proyecto |
| 2 | **Registro de Costos** | Inversión en horas y licencias |
| 3 | **Registro del Proyecto** | Esfuerzo operativo y variables |
| 4 | **Dashboard** | Visualización de métricas y KPIs |

---

### 📋 Pestaña 1: Acta de Nacimiento del Proyecto

#### Propósito
Documentar el "Punto Cero" del proyecto. Esta información servirá como línea base para demostrar el valor generado.

#### Secciones

**1. Datos Generales**
- **Nombre del Proyecto**: Título descriptivo del proyecto
- **Líder Digital**: Responsable del proyecto
- **Correo Electrónico**: Email de contacto
- **Unidad / Facultad**: Área donde se implementa
- **Fecha de Inicio**: Fecha de ideación del proyecto
- **Fecha de Fin**: Fecha estimada de finalización

**2. Tipificación del Proyecto**
Seleccione la categoría principal (puede marcar múltiples):
- Automatización de Trámites / Flujos de Trabajo
- Gestión de Datos e Inteligencia de Negocios
- Robotización de Tareas Repetitivas (RPA)
- Interacción directa con el Usuario Final
- Otro (especificar)

**3. El Dolor: ¿Qué Problema Vamos a Resolver?**
- **Descripción del problema**: Detalle el proceso actual ("As-Is") y por qué es problemático
- **Dolores identificados**: Seleccione los que apliquen:
  - Demora excesiva en la respuesta al usuario
  - Alta probabilidad de errores manuales / digitación
  - Pérdida de información o falta de trazabilidad
  - Sobrecarga operativa y estrés en el equipo administrativo

**4. Línea Base (Tus números actuales)**

| Métrica | Descripción | Unidad de Medida |
|---------|-------------|------------------|
| **A. Volumen de Operaciones** | Cantidad de transacciones del proceso | Semanal, Mensual, Semestral, Anual |
| **B. Tiempo de Ciclo** | Tiempo total desde inicio hasta fin del proceso | Días, Semanas |
| **C. Personas Involucradas** | Cantidad de personas en la ejecución del proceso | Persona(s) |
| **D. Esfuerzo Operativo** | Horas dedicadas por operación (se registra en Pestaña 3) | Horas (HH) |

**5. Variables Cualitativas**
Defina hasta 3 variables cualitativas que el proyecto busca mejorar. Califique del 1 al 5 (1=Pésimo, 5=Excelente) cómo se perciben actualmente.

**6. Variables Cuantitativas**
Defina hasta 3 variables cuantitativas con sus valores actuales (ej: número de errores, tiempo de espera, etc.).

**7. La Solución Propuesta (To-Be)**
Describa qué se va a construir y qué herramientas se utilizarán.

**8. Validación**
- Nombre del Líder Digital (firma)
- Validación de Jefatura (opcional)

---

### 💰 Pestaña 2: Registro de Costos

#### Propósito
Registrar toda la inversión económica del proyecto en horas de trabajo y licencias.

#### Sección A: Registro de Horas

**Campos del formulario:**
| Campo | Descripción |
|-------|-------------|
| **Fecha** | Día en que se realizó el trabajo |
| **Tipo de horas** | Diseño, Desarrollo, Testing, Implementación, Documentación |
| **Horas (HH)** | Cantidad de horas trabajadas |
| **Tarifa (S/.)** | Costo por hora en Soles Peruanos (o su moneda local) |
| **Responsable** | Persona que registra las horas |

**Total Horas**: Suma automática de todos los registros (Costo Total = Horas × Tarifa)

#### Sección B: Registro de Licencias

**Campos del formulario:**
| Campo | Descripción |
|-------|-------------|
| **Fecha** | Fecha de adquisición/registro |
| **Nombre de Licencia** | Software o herramienta (ej: PowerBI, Kissflow) |
| **Costo anual** | Tarifa anual en su moneda local |
| **Responsable** | Persona que registra la licencia |

**Gran Total**: Suma de Total Horas + Total Licencias

---

### 📊 Pestaña 3: Registro del Proyecto

#### Propósito
Registrar el esfuerzo operativo y las variables de impacto antes y después de la implementación.

#### Sección A: Registro de Esfuerzo Operativo

**Instrucciones**: Registrar las horas dedicadas por cada colaborador que participa en la ejecución de una operación/transacción.

**Campos:**
| Campo | Descripción |
|-------|-------------|
| **Momento** | "Antes de la implementación" o "Después de la implementación" |
| **Nombre del puesto** | Rol del colaborador (ej: Analista, Coordinador) |
| **Horas (HH)** | Horas dedicadas por operación |
| **Tarifa** | Costo por hora del puesto |

> 💡 **Tip**: Después de registrar un esfuerzo "Antes", haga clic en "Agregar data después de la implementación" para prellenar los datos y facilitar la comparación.

**Grand Total**: Suma de costos antes + después

#### Sección B: Variables Cualitativas

**Campos:**
| Campo | Descripción |
|-------|-------------|
| **Momento** | Antes o Después de la implementación |
| **Variable cualitativa** | Nombre de la variable (ej: Satisfacción, Eficiencia) |
| **Calificación** | Slider del 1 al 5 (1=Pésimo, 5=Excelente) |
| **¿A quién impacta?** | Equipo, Usuario, Organización |

> 💡 **Tip**: Registre primero las variables "Antes" y luego use "Agregar resultados después" para comparar.

#### Sección C: Variables Cuantitativas

**Campos:**
| Campo | Descripción |
|-------|-------------|
| **Momento** | Antes o Después de la implementación |
| **Variable cuantitativa** | Nombre de la variable (ej: Número de errores) |
| **Valor actual** | Valor numérico de la variable |
| **Unidad de Medida** | Unidad (ej: errores, personas, días) |
| **¿A quién impacta?** | Equipo, Usuario, Organización |

---

### 📈 Pestaña 4: Dashboard

#### Propósito
Visualizar los indicadores clave de desempeño (KPIs) y el impacto del proyecto.

#### KPIs Principales

| Indicador | Descripción |
|-----------|-------------|
| **Inversión Total** | Total invertido en horas y licencias |
| **Ahorro Financiero Anual** | Ahorro proyectado al año |
| **ROI** | Retorno de Inversión |
| **Horas Liberadas al Año** | Horas ahorradas anualmente |

#### Gráficos

**1. Impacto Cualitativo**
- Gráfico de barras comparativo "Antes vs Después"
- Variables en el eje X, calificación (1-5) en el eje Y
- **Azul oscuro**: Antes | **Naranja**: Después

**2. Impacto Cuantitativo**
- Gráfico de barras comparativo "Antes vs Después"
- Variables en el eje X, valor en el eje Y
- **Verde**: Antes | **Amarillo**: Después

#### Exportación de Datos

| Formato | Icono | Descripción |
|---------|-------|-------------|
| **PDF** | 📄 | Reporte formal con tablas y métricas |
| **Excel** | 📊 | Datos organizados por hojas (KPIs, Cualitativas, Cuantitativas, Horas, Licencias) |
| **CSV** | 📁 | Datos en formato plano para importar en otras herramientas |

---

## 5. Fórmulas y Cálculos

### Cálculos Automáticos

La herramienta calcula automáticamente los siguientes indicadores:

```
1. Costo de Horas = Σ(horas × tarifa por hora)

2. Costo de Licencias = Σ(costo de cada licencia)

3. Inversión Total = Costo de Horas + Costo de Licencias

4. Diferencia de Costos = Costo Antes - Costo Después

5. Ahorro Financiero Anual = Diferencia de Costos × Volumen de Operaciones × Factor de Conversión

   Factor de Conversión según unidad:
   - Semanal:   52
   - Mensual:   12
   - Semestral: 2
   - Anual:     1

6. ROI (%) = ((Ahorro Financiero Anual - Inversión Total) / Inversión Total) × 100

7. Horas Liberadas al Año = (Horas Antes - Horas Después) × Volumen × Factor de Conversión
```

### Ejemplo Práctico

**Datos de entrada:**
- Volumen de operaciones: 100 transacciones/mes
- Costo operativo antes: S/ 500 por operación
- Costo operativo después: S/ 200 por operación
- Inversión total en proyecto: S/ 10,000

**Resultados:**
```
Diferencia de costos = 500 - 200 = S/ 300 por operación
Ahorro Financiero Anual = 300 × 100 × 12 = S/ 360,000
ROI = ((360,000 - 10,000) / 10,000) × 100 = 3,500%
```

---

## 6. Exportación de Datos

### Exportar a PDF

1. Navegue a la pestaña **Dashboard**
2. Haga clic en el botón **PDF** (icono 📄)
3. El archivo se descargará automáticamente

**Contenido del PDF:**
- Información del proyecto
- Tabla de KPIs principales
- Tabla de impacto cualitativo
- Tabla de impacto cuantitativo

### Exportar a Excel

1. Navegue a la pestaña **Dashboard**
2. Haga clic en el botón **Excel** (icono 📊)
3. El archivo se descargará con múltiples hojas

**Hojas del Excel:**
- **KPIs**: Indicadores clave
- **Cualitativas**: Variables cualitativas
- **Cuantitativas**: Variables cuantitativas
- **Horas**: Registro de horas
- **Licencias**: Registro de licencias

### Exportar a CSV

1. Navegue a la pestaña **Dashboard**
2. Haga clic en el botón **CSV** (icono 📁)
3. El archivo se descargará en formato plano

> 💡 **Recomendación**: Exporte sus datos regularmente para mantener un respaldo de su información.

---

## 7. Preguntas Frecuentes

### ❓ ¿Puedo editar los datos después de guardarlos?

Sí, todos los registros se pueden editar directamente en sus respectivas pestañas. Los cambios se reflejan automáticamente en el Dashboard.

### ❓ ¿Cuántas variables cualitativas/cuantitativas puedo registrar?

Se recomienda un máximo de **3 variables** de cada tipo para mantener la claridad del análisis.

### ❓ ¿Qué pasa si no tengo datos "Después de la implementación"?

El Dashboard mostrará únicamente los datos "Antes". Complete los registros "Después" una vez implementada la solución para ver la comparación completa.

### ❓ ¿Cómo calculo la tarifa por hora de mis colaboradores?

Use la siguiente fórmula:
```
Tarifa por hora = Salario mensual / Horas laborables al mes
Ejemplo: S/ 5000 / 160h = S/ 31.25/hora
```

### ❓ ¿Los datos se guardan permanentemente?

Los datos se almacenan en el **localStorage** de su navegador mientras la sesión esté activa. Para conservación a largo plazo, use las opciones de exportación (PDF/Excel).

### ❓ ¿Puedo usar esta herramienta en múltiples proyectos?

Sí, puede registrar múltiples proyectos. Sin embargo, los datos se almacenan localmente en su navegador. Si necesita gestionar varios proyectos simultáneamente, considere:
1. Exportar los datos de cada proyecto antes de comenzar otro
2. Usar navegadores diferentes o perfiles separados para cada proyecto

### ❓ ¿La herramienta funciona sin conexión a internet?

- **Opción 1 (Link Vercel)**: Requiere conexión a internet
- **Opción 2 (Despliegue local)**: Puede funcionar en red interna sin internet externo

### ❓ ¿Puedo personalizar la herramienta para mi empresa?

Sí, con la **Opción 2** recibe el código fuente completo y puede:
- Cambiar logos y colores corporativos
- Agregar campos personalizados
- Modificar fórmulas de cálculo
- Integrar con sus sistemas internos

---

## 📞 Soporte y Contacto

### Para la Opción 1 (Link Vercel)

| Tipo de Soporte | Canal |
|-----------------|-------|
| Problemas de acceso | [Email de soporte] |
| Reporte de errores | [Email de soporte] |
| Consultas generales | [Email de soporte] |

### Para la Opción 2 (Despliegue Local)

| Tipo de Soporte | Canal |
|-----------------|-------|
| Problemas de despliegue | [Email de soporte] (limitado) |
| Personalización | Su equipo técnico interno |
| Actualizaciones | [Email de soporte] |

---

## 📝 Notas Importantes

1. **Respaldo de datos**: Exporte regularmente sus reportes para mantener un historial.

2. **Privacidad**: Los datos se almacenan localmente en su navegador y no se comparten con terceros.

3. **Actualizaciones**: Si usa la Opción 1, recibirá actualizaciones automáticas. Si usa la Opción 2, deberá volver a desplegar para obtener nuevas versiones.

4. **Capacitación**: Este manual sirve como guía de referencia. Para sesiones de capacitación, contáctenos.

---

**© 2026 - Calculadora de Impacto**  
*Desarrollado para Líderes Digitales*

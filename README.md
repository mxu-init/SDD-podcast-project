# 🎙️ Mi Podcast - Web Platform

> Una aplicación web moderna y accesible para la difusión, gestión y reproducción interactiva de episodios de podcast. Desarrollada con **React**, **TypeScript** y concebida bajo la metodología **Spec-Driven Development (SDD)** utilizando **Spec Kit** a través de **Opencode**.

---

## 📖 Descripción del Proyecto

**Mi Podcast** es una plataforma web centrada en ofrecer una experiencia de usuario fluida, atractiva e intuitiva para los amantes del audio y contenido digital. El sitio permite a los oyentes explorar las temporadas, reproducir episodios, acceder a notas del programa (*show notes*), conocer a los creadores y enlazar directamente con sus plataformas de streaming favoritas (Spotify, Apple Podcasts, YouTube, etc.).

### ✨ Características Principales
- 🎧 **Reproductor de Audio Integrado:** Control de reproducción continuo, barra de progreso y control de volumen.
- 📻 **Catálogo y Filtrado de Episodios:** Listado organizado por temporadas, temas o fechas, con buscador interactivo.
- 🌟 **Episodio Destacado:** Sección *Hero* con el lanzamiento más reciente o recomendado.
- 📝 **Show Notes & Transcripciones:** Visualización enriquecida de enlaces, recursos y transcripciones de cada episodio.
- 👤 **Perfil del Podcaster / Equipo:** Información del creador, bio y canales de redes sociales.
- 📱 **Diseño Totalmente Responsive:** Adaptabilidad óptima para móviles, tablets y ordenadores de escritorio.

---

## 🎯 Metodología de Desarrollo: SDD (Spec-Driven Development) & Spec Kit

Este proyecto destaca por haber sido planificado y construido siguiendo una estricta filosofía **Spec-Driven Development (SDD)** (*Desarrollo Guiado por Especificaciones*), aprovechando **Spec Kit** mediante el ecosistema **Opencode**.

```
specs/001-podcast-website/
├── spec.md                # Especificación funcional y de negocio
├── plan.md                # Arquitectura técnica y dependencias
├── contracts/
│   └── ui.md              # Contratos de componentes, interfaces visuales y estados
└── tasks.md               # Desglose granular de tareas y checklist de ejecución
```

### ¿Por qué SDD con Spec Kit y Opencode?
1. **Especificación Primero (*Contract-First*):** Antes de generar una sola línea de código, se definieron contratos formales de UI (`contracts/ui.md`) que modelan cada componente, sus propiedades (*props*), variantes y estados (loading, error, empty).
2. **Desglose de Tareas Determinista (`tasks.md`):** Cada funcionalidad se desglosó en hitos atómicos ejecutables secuencialmente, eliminando la ambigüedad durante el desarrollo.
3. **Calidad y Consistencia:** Al utilizar Opencode junto a Spec Kit, el flujo de desarrollo asistido por IA se mantiene alineado al 100% con la visión arquitectónica, reduciendo la deuda técnica y evitando refactorizaciones innecesarias.
4. **Trazabilidad:** Cada requerimiento funcional en `spec.md` tiene su correspondencia directa en los contratos y tareas implementadas en el código fuente.

---

## 🛠️ Stack Tecnológico y Librerías

El stack ha sido seleccionado para asegurar rendimiento, tipado estricto y una experiencia de desarrollo ágil:

| Categoría | Tecnologías y Herramientas |
| :--- | :--- |
| **Frontend & Core** | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) |
| **Metodología & Specs** | ![Spec-Driven](https://img.shields.io/badge/SDD-Spec--Driven_Dev-0A85EA?style=for-the-badge&logo=blueprint&logoColor=white) ![Spec Kit](https://img.shields.io/badge/Spec_Kit-Opencode-7928CA?style=for-the-badge) ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white) |
| **Routing & Networking** | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) |
| **Build & Tooling** | ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) |
| **Control de Versiones** | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) |

<br />

| Tecnología / Herramienta | Rol en el Proyecto |
| :--- | :--- |
| **[React](https://react.dev/)** | Base del cliente web basada en arquitectura de componentes y estado reactivo. |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipado estático para contratos de datos de episodios, estado del reproductor y props seguras. |
| **[Vite](https://vitejs.dev/)** | Servidor de desarrollo con compilación instantánea y generación de bundles optimizados. |
| **[React Router](https://reactrouter.com/)** | Navegación declarativa entre catálogo, detalle de episodios, bio y contacto sin recarga. |
| **[Axios](https://axios-http.com/) / Fetch API** | Cliente HTTP para la obtención dinámica de datos de episodios y feeds RSS/REST. |
| **Spec Kit + Opencode** | Definición formal de especificaciones de producto, contratos de interfaz y hoja de ruta de tareas. |

---

## 🧩 Arquitectura del Software y Componentes

### 1. 🏗️ Componentes Modulares
El proyecto implementa una jerarquía limpia inspirada en los contratos de `contracts/ui.md`:
- **Layout:** `Header` con navegación y branding; `Footer` con enlaces a redes sociales y plataformas de podcast.
- **Player:** `AudioPlayer` global con controles (play/pause, timeline, volumen, tracking del episodio actual).
- **Cards & Displays:** `EpisodeCard` para listados en cuadrícula/lista, badges de duración y categorías temáticas.
- **Vistas Principales:**
  - `Home` ➔ Episodio más reciente destacado, lista rápida de episodios y suscripciones.
  - `Episodes` ➔ Catálogo completo con buscador y filtros por temporada.
  - `EpisodeDetail` ➔ Reproductor principal, notas extendidas y recursos recomendados.
  - `About` ➔ Presentación del creador y filosofía del podcast.

### 2. 🚦 Enrutamiento SPA con React Router
Navegación fluida del lado del cliente mediante rutas declarativas:
- `/` ➔ Inicio y episodios destacados.
- `/episodios` ➔ Catálogo general.
- `/episodio/:id` ➔ Detalle específico del episodio con carga dinámica de datos.
- `/acerca-de` ➔ Información del creador y proyecto.
- `/contacto` ➔ Formulario o vías de comunicación.

### 3. 🎣 Gestión del Estado & Hooks
- `useState` y `useRef` para el control fino del elemento nativo `<audio>`, duración actual, porcentaje de buffer y volumen.
- `useEffect` para la sincronización con APIs externas, persistencia del progreso de escucha en `localStorage` y actualización del título del documento.

---

## 📂 Estructura del Proyecto

```text
mi-podcast/
├── specs/                           # Especificaciones SDD (Spec Kit)
│   └── 001-podcast-website/
│       ├── spec.md                  # Especificación general
│       ├── plan.md                  # Plan de ejecución técnica
│       ├── contracts/
│       │   └── ui.md                # Contratos formales de la UI
│       └── tasks.md                 # Tareas desglosadas
├── public/                          # Recursos estáticos (audio samples, logos, favicon)
├── src/
│   ├── assets/                      # Imágenes, iconos y recursos multimedia
│   ├── components/                  # Componentes reutilizables de UI
│   │   ├── player/                  # Reproductor persistente de audio
│   │   ├── layout/                  # Header, Footer, Container
│   │   └── episodes/                # EpisodeCard, EpisodeList, FilterBar
│   ├── data/                        # Datos estáticos y configuración del sitio
│   │   ├── site.ts                  # Metadatos del podcast, enlaces y configuración
│   │   └── episodes.ts              # Dataset de episodios tipado
│   ├── pages/                       # Vistas principales de la aplicación
│   ├── types/                       # Definiciones e interfaces TypeScript
│   ├── App.tsx                      # Configuración de rutas y layout raíz
│   └── main.tsx                     # Punto de entrada de la aplicación
├── index.html                       # HTML base
├── package.json                     # Scripts y dependencias
├── tsconfig.json                    # Configuración de TypeScript
└── vite.config.ts                   # Configuración de Vite
```

---

## ⚙️ Instalación y Configuración Local

Sigue estos sencillos pasos para clonar y ejecutar el proyecto en tu entorno local:

### 1. Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Git](https://git-scm.com/)
- Gestor de paquetes `npm`, `pnpm` o `yarn`

### 2. Clonar el Repositorio
```bash
git clone https://github.com/mxu-init/mi-podcast.git
```

### 3. Acceder al Directorio del Proyecto
```bash
cd mi-podcast
```

### 4. Instalar las Dependencias
```bash
npm install
```

### 5. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173/` para visualizar la aplicación.

---

## 🚀 Despliegue y Construcción para Producción

### Generar Build Optimizado
```bash
npm run build
```
Este comando compilará el código TypeScript y generará los archivos estáticos listos para producción en la carpeta `dist/`.

### Probar el Build en Local
```bash
npm run preview
```

### Plataformas Recomendadas para el Despliegue
Al tratarse de una Single Page Application optimizada con Vite, puede desplegarse en segundos en:
- **[Vercel](https://vercel.com/):** Integración nativa con GitHub y detección automática de Vite.
- **[Netlify](https://www.netlify.com/):** Comando `npm run build`, directorio de publicación `dist` (incluyendo regla de rewrite `/* /index.html 200` para SPA routing).
- **[Cloudflare Pages](https://pages.cloudflare.com/):** Despliegue estático ultra veloz a nivel global.

---

## 👤 Autor

Este proyecto ha sido diseñado, planificado y desarrollado en su totalidad por:

| Desarrollador | Perfil de GitHub |
| :--- | :--- |
| **Mauricio Rodríguez** | [@mxu-init](https://github.com/mxu-init) |

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
# SDD-podcast-project

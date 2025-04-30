# Arquitectura del Proyecto Portafolio

## 🏗️ 1. Estructura de Carpetas

public
├── img/
|  ├── cards
|  ├── logo
src/
├── components/
│ ├── core/ # Componentes base y estructurales
│ │ ├── layout/ # Layout global  # Layout global (Header/Footer)
│ │ ├── js/ index.js
| |     └── utils/validation.js
│ │ └── icons/ # Assets de iconos
│ │
│ ├── ui/ # Componentes UI reutilizables
│ │ ├── dark-mode/ # Tema oscuro
│ │ │ └── DarkMode.astro # (Estilos en app.scss)
│ │ └── menu-mobile/ # Menú móvil
│ │ └── MenuMobile.astro # (Estilos en app.scss)
│ │
│ └── showcase/ # Componentes específicos
│ ├── contact/ # Con estilos dedicados
│ │ ├── Contact.astro
│ │ └── contact.scss
│ └── projects/ # Con estilos dedicados
│ ├── CardProject.astro
│ └── card-project.scss
│
├── styles/
│ ├── app.scss # Estilos principales (incluye UI básica)
│ ├── _globals.scss # Estilos base
│ ├── _variables.scss # Variables de diseño
│ ├── _mixins.scss # Funciones SCSS
│ └── _reset.scss 
│
└── pages/ # Rutas principales
├── index.astro
└── 404.astro


## 🎨 2. Sistema de Estilos

### 📌 Reglas Clave:

1. **Componentes UI Básicos**:
   - Los componentes en `/ui/` usan estilos globales en `app.scss`
   - Razón: Son elementos genéricos con estilos mínimos
   - Ejemplo:
     ```scss
     /* En app.scss */
     .dark-mode { /* estilos */ }
     .menu-mobile { /* estilos */ }
     ```

2. **Componentes Específicos**:
   - Los componentes en `/showcase/` tienen sus propios archivos SCSS
   - Razón: Requieren estilos más complejos y específicos
   - Estructura:
     ```
     showcase/projects/
     ├── CardProject.astro
     └── card-project.scss  # Estilos dedicados
     ```

3. **Jerarquía de Importación**:
   ```scss
   /* app.scss */
   @import 'reset';
   @import 'variables';
   @import 'globals';
   @import 'mixins';
   
   /* Estilos de componentes UI básicos */
   @import '@components/ui/dark-mode/dark-mode';
   @import '@components/ui/menu-mobile/menu-mobile';

🔍 4. ### Sistema de Estilos
| Categoría          | UI Components              | Showcase Components        |
|--------------------|----------------------------|----------------------------|
| **Ubicación**      | `/components/ui/`          | `/components/showcase/`    |
| **Estilos**        | En `app.scss`              | Co-ubicados con componente |
| **Complejidad**    | Baja (estilos genéricos)   | Alta (estilos específicos) |


4. **Decisiones Arquitectónicas**
1. Organización de estilos
- UI básico en app.scss para evitar fragmentación
- Showcase con estilos dedicados para mayor mantenibilidad

2. Estructura de componentes:
- Co-locación estricta para componentes complejos

- Agrupación por dominio en showcase/



🚀 5. **Recomendaciones de Evolución**
1. Cuando mover estilos de app.scss a co-ubicados:

- Si un componente UI crece (>30 líneas de CSS)

- Si requiere mantenimiento independiente

2. Ejemplo de migración
De:
ui/DarkMode.astro (estilos en app.scss)

A:
ui/dark-mode/
├── DarkMode.astro
└── dark-mode.scss

## Estrctura Ideal Final
components/
├── ui/
│   └── [nombre-componente]/
│       ├── [NombreComponente].astro
│       └── [nombre-componente].scss  # Solo si necesario
│
└── showcase/
    └── [feature]/
        ├── [Componente].astro
        └── [componente].scss        # Obligatorio

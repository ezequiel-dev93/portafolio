# Arquitectura del Proyecto Portafolio

## 🏗️ 1. Estructura de Carpetas

public
├── img/
|  ├── logo
src/
├── core/ # Componentes base y estructurales 
│ │ ├── config/ 
│ │ ├── js/ # index.js
| | ├── lib/ # gsap
| | ├── utils/ # validación
| | ├──types/
│ │
│ └── features/ # Componentes específicos
│ ├── contact/ # Con estilos dedicados
│ │ ├── Contact.astro
│ │ └── contact.scss
│ ├── projects/ # Con estilos dedicados + data
│ |  └── components/ CardProject.astro
| |  └── data/
│ └── card-project.scss
│
| ├── shared/
| |  ├── assets/ # img cards  
| |  ├── componentens / # componentes reutilizables
| |  ├── icons/
| |  ├── styles/
│ |  |   └── adstracts/
| |  |       └── _mixins.scss # Funciones SCSS
│ |  |       ├── _variables.scss # Variables de diseño 
| |  |   └── base/ 
| |  |       └── _global.scss
│ |  |       ├── _reset.scss
│ |  |   ├── app.scss # Estilos principales (incluye UI básica)
|
└── layouts/ #
|
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
   - Los componentes en `//` tienen sus propios archivos SCSS más data
   - Razón: Requieren estilos más complejos y específicos
   - Estructura:
     ```
     features/projects/
     ├── components/  CardProject.astro
     └── data/ 
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
| Categoría          | Shared Components              | Featueres Components        |
|--------------------|----------------------------|----------------------------|
| **Ubicación**      | `shared/components/`          | `features/`    |
| **Estilos**        | En `app.scss`              | Co-ubicados con componente |
| **Complejidad**    | Baja (estilos genéricos)   | Alta (estilos específicos) |


4. **Decisiones Arquitectónicas**
1. Organización de estilos
- UI básico en app.scss para evitar fragmentación
- Features con estilos dedicados para mayor mantenibilidad

2. Estructura de componentes:
- Co-locación estricta para componentes complejos

- Agrupación por dominio en features/



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

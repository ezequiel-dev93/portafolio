## 🏗️ 1. Estructura de Carpetas

public/
├── img/
│   ├── logo/

src/
├── config/ # Configuración y tipos globales (ej. `env.d.ts`)
├── core/ # Componentes y scripts base
│   └── js/ # `header.js`, `hero.js`, `index.js` y scripts estructurales
├── features/ # Funcionalidades del portafolio agrupadas por dominio
│   ├── about/
│   ├── contact/
│   ├── experience/
│   ├── profile/
│   ├── projects/
│   └── skills/
├── lib/ # Código compartido de librerías internas (por ejemplo `gsap`, helpers de animación)
├── utils/ # Helpers reutilizables (por ejemplo `validation.js`)
├── styles/ # Estilos globales, reset, variables y abstracciones SCSS
├── shared/ # Componentes UI reutilizables, iconos y recursos compartidos
│   ├── assets/
│   ├── components/
│   └── icons/
├── layouts/ # Plantillas y estructuras de página
└── pages/ # Rutas principales
   ├── index.astro
   └── 404.astro


## 🎨 2. Sistema de Estilos

### 📌 Reglas Clave:

1. **Estilos globales y recursos comunes**:
   - `src/styles/app.scss` es el punto de entrada principal para los estilos globales.
   - `src/styles/abstracts/_variables.scss` y `src/styles/abstracts/_mixins.scss` contienen variables y mixins compartidos.
   - Estos recursos pueden ser referenciados desde `astro.config.mjs` o importados con rutas relativas/alias según configuración.

2. **Estilos de componentes específicos**:
    - Cada feature dentro de `src/features/` mantiene su propio archivo SCSS junto al componente.
    - Ejemplo real del repositorio:
       ```text
       src/features/projects/
       ├── components/
       │   └── CardProject.astro
       ├── data/
       └── card-project.scss
       ```

3. **Imports SCSS limpios**:
   - Los archivos SCSS usan rutas como:
     \`\`\`scss
     @use "styles/abstracts/_variables" as v;
     @use "styles/abstracts/_mixins" as mx;
     \`\`\`
   - Esto evita alias inconsistentes y mantiene la importación de estilos clara.

## 🔧 3. Razón del cambio

- **Screaming Architecture**: la estructura del repositorio ahora muestra de inmediato qué partes son código fuente.
- **Claridad**: `src/` contiene la lógica, estilos y utilidades del proyecto, mientras que `public/` queda para assets estáticos.
- **Mantenibilidad**: facilita encontrar librerías internas (`src/lib/`), utilidades (`src/utils/`) y estilos globales (`src/styles/`).

## 🧩 4. Convenciones actuales

- `src/config/`: tipos y configuración del proyecto (p. ej. `env.d.ts`).
- `src/core/`: scripts y componentes estructurales (carpeta `js/`).
- `src/lib/`: librerías y helpers compartidos de dominio amplio (p. ej. `gsap.ts`, `hero-animation.js`).
- `src/utils/`: funciones de utilidad y validación reutilizables (`validation.js`).
- `src/styles/`: estilos globales, resets, variables y mixins.
- `src/features/`: dominios funcionales con componentes, datos y estilos asociados.
- `src/shared/`: UI común, componentes reutilizables e iconos.

## 🚀 5. Recomendaciones de Evolución

1. Mantener `src/` como la raíz del código fuente.
2. Reservar `public/` para recursos estáticos que no requieren procesamiento.
3. Co-localizar estilos y datos dentro de la misma feature para facilitar el mantenimiento.
4. Usar `src/lib/` sólo para lógica compartida, no para UI específica.
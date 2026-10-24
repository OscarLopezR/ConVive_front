# ConVive - Angular Frontend Design & UI Guidelines

## 1. Core Philosophy & Vibe
- **Estilo:** Minimalismo moderno, limpio, enfocado en la usabilidad y el alto contraste.
- **Vibe:** Proptech, joven, dinámico (matchmaking inmobiliario).
- **Regla de Oro Visual:** Menos es más. No satures la interfaz con bordes innecesarios, fondos redundantes o cajas dentro de cajas. Deja que el contenido respire usando `padding` y `margin` generosos.

## 2. Angular Architecture & Styling Rules
- **Framework:** Angular (priorizar Standalone Components si se está usando Angular 14+).
- **Tailwind First:** Todos los estilos deben aplicarse mediante clases de utilidad de Tailwind CSS directamente en el template (`.html`).
- **Encapsulamiento y SCSS:** Mantén los archivos `.component.scss` lo más limpios posible. 
- **Prohibiciones de Angular:** 
  - 🚫 **NO** uses `::ng-deep` bajo ninguna circunstancia para forzar estilos. 
  - 🚫 **NO** uses estilos en línea (`[style.color]`) a menos que sea estrictamente dinámico por variables de TypeScript. Usa `[ngClass]` o control flow dinámico.
- **Componentización:** Divide la UI en componentes granulares y reutilizables. Por ejemplo, en lugar de un HTML monolítico, crea `<app-primary-button>`, `<app-property-card>`, o `<app-match-badge>`.

## 3. Color Palette & Theming
Mantén el modo oscuro por defecto como identidad principal, pero con un contraste refinado.

- **Background Principal:** `#0B0F19` (o `bg-slate-950`). Nunca usar negro puro (`#000000`).
- **Superficies / Cards (Modo Oscuro):** `#111827` (`bg-gray-900`) o `#1E293B` (`bg-slate-800`). Usa el selector `:host` de Angular si el componente completo es una tarjeta, y aplícale estas clases de Tailwind.
- **Acento / Primary (Verde Lima):** `#CCFF00` (o `lime-400` / `lime-300`). 
  - *Uso:* Exclusivo para Call to Actions (CTAs) principales y los indicadores de compatibilidad de perfiles.
- **Texto:** 
  - Títulos: Blanco (`text-white` o `text-slate-50`).
  - Párrafos/Subtítulos: Gris claro (`text-slate-400` o `text-slate-300`).
- **Cards Internas (Modo Claro/Mixto):** Si la tarjeta de la habitación usa fondo claro (`bg-white` o `bg-slate-50`), el texto interno debe ser `text-slate-900` para títulos y `text-slate-500` para descripciones.

## 4. Typography & Jerarquía
- **Familia tipográfica:** Sans-Serif moderna (Inter, Roboto, o la fuente principal del proyecto).
- **Títulos (H1, H2):** Pesos gruesos (`font-bold` o `font-extrabold`) con tracking ajustado (`tracking-tight`).
- **Micro-copy (etiquetas, tags de limpieza/horarios):** Texto pequeño (`text-xs`), en mayúsculas (`uppercase`), tracking amplio (`tracking-wider`) y peso medio (`font-medium`). 

## 5. UI Components & Geometría

### Botones (`<app-button>`)
- **Primario:** Fondo Verde Lima, texto oscuro (`text-slate-900`), `font-semibold`. Transiciones suaves (`transition-all duration-300 hover:scale-105`).
- **Secundario:** Fondo transparente o `bg-white/5` (glassmorphism muy sutil), borde sutil (`border border-slate-700`), texto blanco.
- **Geometría:** Esquinas redondeadas amplias (`rounded-full` o `rounded-2xl`).

### Cards de Match / Propiedades (`<app-room-card>`)
- **Estructura:** Elimina los bordes gruesos del diseño antiguo. Usa sombras suaves (`shadow-2xl shadow-black/50`) y bordes muy redondeados (`rounded-3xl`).
- **Imágenes:** Las etiquetas `<img>` o los divs de imágenes deben ir de borde a borde en la parte superior (sin padding). Mientras no haya backend, usa un bloque `bg-slate-800` como placeholder.
- **Badge de Match:** El 92.5% de compatibilidad debe destacar usando el color verde lima o esmeralda (`text-emerald-400`).

### Layout del Hero Section
- No uses un contenedor oscuro visible detrás del texto principal. El color `bg-slate-950` debe ser el fondo global de la página (`<app-root>`).
- Usa CSS Grid (`grid grid-cols-1 lg:grid-cols-2`) con un gap amplio (`gap-12`) para separar el bloque de texto izquierdo de la tarjeta interactiva de la derecha.
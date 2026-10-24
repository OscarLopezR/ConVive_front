# ConVive - Angular Frontend Design & UI Guidelines

## 1. Core Philosophy & Vibe
- **Estilo:** Minimalismo moderno, limpio, alto contraste. Referencia visual: **linear.app** (modo oscuro, sin cajas redundantes, acentos neón).
- **Vibe:** Proptech, joven, dinámico (matchmaking inmobiliario).
- **Regla de oro:** Menos es más. Nada de bordes innecesarios, fondos redundantes o cajas dentro de cajas. El contenido respira con `padding` y `margin` generosos. Las secciones se separan con líneas finas (`border-white/5`), no con tarjetas.

## 2. Angular Architecture & Styling Rules
- **Framework:** Angular 22, solo Standalone Components, SSR con prerender.
- **Tailwind First (v4):** todos los estilos con clases de utilidad en el `.html`. Los componentes no tienen `.css` propio; el CSS global vive en `src/styles.css`.
- **Estructura estilo spartan.ng:** las primitivas de UI están en `src/app/ui/` como directivas "helm" (comportamiento y estilo separados del contenido):
  - `hlmBtn` (variantes `default`, `secondary`, `ghost`, `link`; tamaños `sm`, `default`, `lg`)
  - `hlmInput` (input y select), `hlmLabel`, `hlmBadge` (variantes `default`, `outline`, `match`)
  - `appReveal` (animación al hacer scroll)
- **Componentes compartidos** (`src/app/components/`): `app-navbar`, `app-brand` (logo), `app-room-card`, `app-site-footer`, `app-legal-page`.
- **Datos:** modelos en `src/app/models/` y datos simulados en `src/app/data/` hasta conectar FastAPI.
- **Prohibiciones:**
  - ❌ NO usar `::ng-deep`.
  - ❌ NO usar estilos en línea salvo valores dinámicos de TypeScript (p. ej. `[style.--d]`). Para clases condicionales usar `[class]` o control flow.
  - ❌ NO armar nombres de clase de Tailwind dinámicamente (no se detectan).
- **Escala global:** `html { font-size: 90% }` en `styles.css`. Todo en `rem` se ve como con el navegador al 90 % de zoom.

## 3. Color Palette & Theming
Modo oscuro único como identidad.

- **Fondo principal:** `#0B0F19` (token `bg-background`). Nunca negro puro.
- **Superficies / cards:** `#111827` (`bg-slate-900`); placeholders de imagen `bg-slate-800`.
- **Acento (verde lima neón):** `#CCFF00` (token `accent`, `lime-300` en hover).
  - Uso: CTAs principales, indicadores de compatibilidad, detalles clave (palabra destacada del título, pasos activos, puntos de resumen).
  - Efectos neón: `shadow-[0_0_...rgba(204,255,0,...)]`, resplandores con `radial-gradient` de baja opacidad.
- **Texto:**
  - Títulos y navegación: `text-white`.
  - Párrafos: `text-slate-300` sobre imágenes, `text-slate-400` en general.
  - Secundario / micro-copy: `text-slate-500`.
- **Estados:** error `text-rose-400`, éxito `text-emerald-400`.
- **Bordes:** siempre sutiles, `border-white/5` a `border-white/10`; foco `focus:border-accent/60` con `ring-accent/10`.
- **Selección de texto y foco:** acento lima.

## 4. Typography & Jerarquía
- **Fuente:** Inter (Google Fonts), definida en `@theme` como `font-sans`.
- **Títulos (H1, H2):** `font-extrabold` / `font-bold` con `tracking-tight`. Hero: `text-5xl sm:text-6xl`, interiores: `text-4xl`.
- **Micro-copy** (etiquetas, eyebrow, tags): `text-xs uppercase tracking-wider font-medium`. Eyebrows en color acento.
- **Palabra destacada:** una palabra o frase final del título en `text-accent`.

## 5. Animaciones (estilo Linear)
Definidas en `src/styles.css`; curva `cubic-bezier(0.16, 1, 0.3, 1)`.
- **`.enter`**: entrada al cargar (fade + `translateY` + blur). Retraso escalonado con `[--d:200]` (ms).
- **`.enter-bg`**: zoom lento (`scale 1.06 → 1`) para imágenes de fondo.
- **`.float`**: flotación suave para la card del hero.
- **`appReveal`** (`[revealDelay]="120"`): entrada al hacer scroll con `IntersectionObserver`; se activa una sola vez.
- Todas respetan `prefers-reduced-motion`.

## 6. UI Components & Geometría

### Botones (`hlmBtn`)
- **Primario:** fondo lima, `text-slate-900`, `font-semibold`, brillo neón en hover.
- **Secundario:** `bg-white/5`, `border-white/10`, texto blanco.
- **Ghost:** texto blanco, hover lima + `bg-white/5` (usado en "Iniciar sesión").
- **Geometría:** `rounded-full`. Flecha animada en "Siguiente paso".

### Inputs (`hlmInput`)
- `h-11`, `rounded-xl`, `bg-white/[0.03]`, borde `white/10`, foco lima con halo. Opciones de `select` con `bg-slate-900`.
- Label con `hlmLabel` (micro-copy). Campo de contraseña con botón "Mostrar/Ocultar" interno.

### Navbar
- Sticky, `bg-background/70` + `backdrop-blur-xl`, borde inferior `white/5`.
- Logo (`app-brand`, `logo-nav.png`, `h-9`), "Explorar" en blanco (hover lima), "Iniciar sesión" (ghost) y "Registrarse" (primario).

### Cards de espacios (`app-room-card`)
- `rounded-3xl`, `bg-slate-900`, `shadow-2xl shadow-black/50`, `ring-1 ring-white/5`. Imagen de borde a borde arriba (`principal-depto.jpg`), con zoom suave en hover.
- Badge de compatibilidad (`hlmBadge variant="match"`) sobre la imagen en lima.
- Variante **`compact`** (resultados de búsqueda): `rounded-2xl`, imagen `h-40`, padding y tipografía reducidos, elevación y borde lima en hover.
- Recibe un `Room` (`src/app/models/room.ts`); sin datos muestra la card destacada de ESCOM.

### Paneles de bienvenida (register y recuperar)
- `rounded-3xl`, degradado `from-accent/[0.14]` a transparente, `ring-accent/20`, resplandor difuminado en la esquina. Título grande con la última línea en lima.

## 7. Páginas

### Home (`/`)
- **Hero:** sin contenedor visible; imagen `principal.png` como fondo a la derecha, oscurecida y desaturada, con máscara y fundidos hacia `#0B0F19`. Grid `grid-cols-1 lg:grid-cols-2`, contenido alineado arriba (menos padding superior). Texto: título con "coincidir." en lima, descripción, CTAs "Encontrar habitación" / "Soy arrendador" y tags de micro-copy. Card destacada flotante a la derecha.
- **Búsqueda:** franja con líneas `border-y`, campos ubicación y presupuesto + "Explorar espacios".
- **Resultados (simulados):** al buscar aparece la sección con **máximo 6** cards `compact`, ordenadas por compatibilidad, con entrada escalonada y scroll automático. Si no hay coincidencias: estado vacío con ícono, mensaje "No encontramos espacios con tus preferencias" y botón "Ampliar búsqueda".
- **Pasos:** tres columnas sin cajas, cada una con ícono SVG en recuadro lima (usuario, grupo, casa), "Paso 0X", título y texto; animación con `appReveal` escalonada.

### Registro (`/register`) — 2 pasos en el mismo componente
- **Paso 1 (cuenta):** panel "Tu espacio. Tu ritmo. Tu gente." a la izquierda y formulario a la derecha: selector de rol tipo píldora, nombre, apellidos, correo, teléfono, contraseña, términos. Botón **"Siguiente paso"**.
- **Paso 2 (perfil):** fondo `img_register.png` (solo en este paso) difuminado y fundido. Dos columnas: formulario y resumen lateral sticky (badge "Nombre · Rol", titular, lista con puntos lima). Botones "Atrás" y de guardado.
  - **Inquilino:** *Mi estilo de vida* (ocupación, horario, limpieza, visitas, mascotas) y *Mis preferencias* (convivencia con mascotas, edad, género). Botón "Guardar y ver mis matches".
  - **Arrendador:** *Sobre mí y mi hogar* y *¿A quién busco en mi espacio?* (ocupación, horario, limpieza esperada, visitas permitidas, mascotas, fumadores, edad, género). Título "Define quién compartirá tu espacio", resumen con el perfil ideal y botón "Guardar y ver candidatos".

### Login (`/login`)
- Formulario centrado (`max-w-md`): correo, contraseña con mostrar/ocultar, enlace "¿Olvidaste tu contraseña?" y enlace a registro.

### Recuperar contraseña (`/recuperar`, `/recuperar/nueva`)
- Encabezado que cambia por paso: "Volvamos a encontrarnos." → "Revisa tu correo." → "Comienza de nuevo."
- Formulario a la izquierda (solicitar enlace / enlace enviado / nueva contraseña con confirmación) y panel "Tu próximo hogar sigue esperándote." a la derecha. Todos con botón secundario "Volver a iniciar sesión".

### Legales (`/terminos`, `/privacidad`)
- Componente `app-legal-page`: columna de lectura `max-w-2xl`, eyebrow, título, fecha de actualización y secciones con subtítulos en blanco y texto `slate-400`.

## 8. Layout general
- Contenedor: `max-w-6xl` con `px-6`.
- Cada página usa `min-h-screen flex flex-col`; el footer queda al fondo (`mt-auto`).
- Resplandor lima sutil arriba (`radial-gradient` ~7 % de opacidad) en las vistas interiores.
- Footer: línea superior `white/5`, texto `slate-500`, enlaces Ayuda / Privacidad / Términos.

# ConVive · Frontend
Construido con **Angular 22** (standalone components, SSR/prerender) y **Tailwind CSS v4**.

## Requisitos

- [Node.js](https://nodejs.org/) 22 LTS o superior
- npm 11 (incluido con Node)

Verifica tus versiones:

```bash
node -v
npm -v
```

## Instalación

```bash
git clone <url-del-repositorio>
cd ConVive_front
npm install
```

Tailwind ya está configurado con `.postcssrc.json` y `src/styles.css`; no requiere pasos extra.

## Servidor de desarrollo

```bash
npm start
```

(equivale a `ng serve`). Abre `http://localhost:4200/`;

## Compilar para producción

```bash
npm run build
```

Genera el build (navegador + servidor, con prerender de las rutas) en `dist/convive_angular_temp/`.

Para servir el build con SSR:

```bash
npm run serve:ssr:convive_angular_temp
```

## Pruebas unitarias

```bash
npm test
```

Usa [Vitest](https://vitest.dev/) mediante `ng test`.

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio: hero, búsqueda con resultados simulados y pasos |
| `/register` | Registro en 2 pasos (cuenta y perfil; el paso 2 cambia según el rol) |
| `/login` | Inicio de sesión |
| `/recuperar` | Recuperación de contraseña: solicitar enlace y confirmación |
| `/recuperar/nueva` | Nueva contraseña (destino del enlace del correo) |
| `/terminos` | Términos y condiciones |
| `/privacidad` | Aviso de privacidad |

## Estructura del proyecto

```text
src/
├── styles.css              # Tailwind, tema, escala global y animaciones
└── app/
    ├── components/         # navbar, brand (logo), room-card, site-footer, legal-page
    ├── pages/              # home, register, login, recover, terms, privacy
    ├── ui/                 # Primitivas estilo spartan.ng: button, input, label, badge, reveal
    ├── models/             # Interfaces (Room)
    └── data/               # Datos simulados (mock-rooms.ts)
public/                     # Imágenes y logo (principal.png, principal-depto.jpg, img_register.png, logo-nav.png)
```

## Pendientes (backend)

- Registro, inicio de sesión y recuperación de contraseña (envío de enlace por correo con Gmail).
- Búsqueda real de espacios: hoy se filtran datos de `src/app/data/mock-rooms.ts`.
- Las llamadas pendientes están marcadas con comentarios `Pendiente` en los componentes.

## Diseño

Las guías visuales y de arquitectura están en [DESING.md](./DESING.md).

## Solución de problemas

- **`ng` o `npx` no se reconocen:** instala Node.js y reabre la terminal.
- **Errores de estilos / Tailwind:** confirma que `.postcssrc.json` existe, está en UTF-8 **sin BOM** y que corriste `npm install`.
- **Imágenes que no cargan:** deben estar en `public/` con el nombre exacto.

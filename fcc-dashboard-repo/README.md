# FCC Pivote 2 — Dashboard de Cultura y Liderazgo Digital

Dashboard interactivo del caso *How the US Federal Communications Commission Managed the Process of IT Modernization* (Bray et al., 2013–2016) aplicado al **Pivote 2** del marco de evolución digital de Barahona/INCAE.

**Vector-AI MED** · Vladimir González Araya, MD · Especialización AI/Digital Business INCAE 2025.

---

## Características

- Análisis cuantitativo de la transformación cultural FCC (605 obs, 55 empleados × 11 trimestres).
- Separación visual de dominios material y simbólico según recomendaciones del panel de expertos.
- Análisis de cohortes por exposición a rotación de CIO.
- **Motor de simulación what-if** con regresión lineal cross-sectional (R²=0.69) embebida en el cliente; los sliders responden en tiempo real sin servidor.
- Panel metodológico "Lo que este OKR no captura" con 11 limitaciones documentadas.
- Diseño corporativo, tipografía Inter, paleta viridis para series temporales.

## Stack

- **Next.js 15** con App Router
- **React 19**
- **TypeScript** strict mode
- **Tailwind CSS** 3.4 (clases core)
- **Recharts** para visualizaciones

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Deploy a Vercel — instrucciones paso a paso

### Paso 1 — Crear un repo nuevo en GitHub

```bash
# Desde tu terminal local, dentro de la carpeta de este proyecto
git init
git add .
git commit -m "Initial commit: FCC dashboard pivote 2"

# Crea el repo en GitHub (web o CLI). Sugerencia de nombre:
#   incae-fcc-pivot-2-dashboard
# Conecta y pushea:
git branch -M main
git remote add origin https://github.com/Vladimir6435/incae-fcc-pivot-2-dashboard.git
git push -u origin main
```

### Paso 2 — Conectar a Vercel

1. Ir a [vercel.com](https://vercel.com) y entrar con tu cuenta de GitHub.
2. **Add New → Project**.
3. **Import** del repo recién creado (`incae-fcc-pivot-2-dashboard`).
4. **Framework Preset**: Vercel detecta automáticamente *Next.js*. No cambies nada.
5. **Root Directory**: `./`.
6. Click **Deploy**.

### Paso 3 — Esperar ~2 minutos

Vercel ejecuta `npm install` + `npm run build`. Cuando termine, te da una URL pública del tipo:

```
https://incae-fcc-pivot-2-dashboard.vercel.app
```

Esta URL es la que compartes con el profesor Barahona. **No requiere login**, **no tiene cold start**, **se actualiza automáticamente** con cada `git push` a `main`.

### Paso 4 (opcional) — Dominio custom

Si quieres una URL más profesional, puedes configurar un subdominio de `vector-ai-cr.com`. En Vercel:

1. **Settings → Domains** del proyecto.
2. Add domain: `fcc.vector-ai-cr.com` (o el subdominio que prefieras).
3. Vercel te da los registros DNS. Los configuras en Hostinger.

## Validación del modelo embebido

Al cargar el dashboard, el componente ejecuta un sanity check en `useEffect` que valida que la inferencia JS produce el mismo resultado que sklearn (avg_employee = 5.5582). Abre la consola del navegador (F12) para ver el mensaje de validación:

```
✓ Modelo embebido validado: avg_employee = 5.5582
```

Si ves un warning en lugar del check, contacta para investigar.

## Estructura del proyecto

```
fcc-dashboard/
├── app/
│   ├── layout.tsx        # Root layout con metadata
│   ├── page.tsx          # Dashboard completo (~880 líneas)
│   └── globals.css       # Tailwind + Inter font
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
└── README.md
```

## Marco metodológico

- **Caso publicado**: *How the US Federal Communications Commission Managed the Process of IT Modernization*, Bray et al.
- **Marco**: Pivote 2 de los 6 pivotes de evolución digital, Barahona/INCAE.
- **Sintaxis de prompts y visualización**: Diego Murillo, *Cracking the Code (No Coding Required)*, INCAE 2025 (20 reglas de visualización, p. 21–40; pipeline analítico p. 52–69; Self-Consistency p. 18; trust-but-verify p. 79–83).
- **Self-Consistency con panel de expertos** (Murillo p. 18): David Ogilvy, Mary Kay Ash, Mary Wells Lawrence, Kai-Fu Lee, Sam Altman.

## Modelo predictivo

Regresión lineal cross-sectional sobre las 605 observaciones del dataset.

| Métrica | Valor |
|---|---|
| R² CV con shuffle (5-fold) | 0.69 ± 0.02 |
| R² CV por empleado (GroupKFold) | 0.70 ± 0.04 |
| R² holdout 80/20 (referencia) | 0.66 |
| RMSE test | 1.40 |
| Features post-encoding | 51 |
| Seed | 1234 |

**Uso recomendado**: simulación what-if (escenarios cross-sectional).
**Uso NO recomendado**: forecasting temporal (R²=0.18 en split temporal estricto, evidencia empírica de la non-stationarity reflexiva del dominio simbólico).

## Licencia

Material académico. Caso publicado © respectivos autores. Análisis y código © Vladimir González Araya 2025.

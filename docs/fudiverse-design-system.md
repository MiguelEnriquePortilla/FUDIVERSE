# 🔥 FudiVerse Design System

## Manual de Identidad Visual
*La guía definitiva para mantener la coherencia visual en todo el ecosistema FudiVerse*

---

## 🎨 PALETA DE COLORES

### Colores Primarios
```css
/* Backgrounds */
--black-primary: #0A0A0A;      /* Fondo principal */
--black-secondary: #0F0F0F;    /* Fondo alternativo */
--glass-dark: rgba(255,255,255,0.05);  /* Glassmorphism oscuro */

/* Cyan Signature (El alma de FudiVerse) */
--cyan-400: #22D3EE;           /* Cyan principal */
--cyan-500: #06B6D4;           /* Cyan medio */
--cyan-600: #0891B2;           /* Cyan oscuro */

/* Blues de apoyo */
--blue-400: #60A5FA;
--blue-500: #3B82F6;
--blue-600: #2563EB;

/* Grises para texto */
--gray-100: #F3F4F6;           /* Texto principal */
--gray-300: #D1D5DB;           /* Texto destacado */
--gray-400: #9CA3AF;           /* Texto secundario */
--gray-500: #6B7280;           /* Texto terciario */

/* Acentos */
--purple-400: #A78BFA;
--purple-500: #8B5CF6;
--pink-500: #EC4899;
```

### Gradientes Signature
```css
/* Gradiente Hero (JOIN THE FUDIVERSE) */
.gradient-hero {
  background: linear-gradient(to right, #22D3EE, #3B82F6);
}

/* Gradiente Botón CTA */
.gradient-cta {
  background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%);
}

/* Gradientes para features */
.gradient-cyan { background: linear-gradient(135deg, #06B6D4, #3B82F6); }
.gradient-purple { background: linear-gradient(135deg, #8B5CF6, #EC4899); }
.gradient-blue { background: linear-gradient(135deg, #3B82F6, #6366F1); }
```

---

## 🔤 TIPOGRAFÍA

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Escala Tipográfica
```css
/* Títulos Hero */
.text-hero {
  font-size: 4.5rem;    /* 72px */
  font-weight: 700;     /* Bold para "JOIN THE FUDIVERSE" */
  line-height: 1;
  letter-spacing: -0.025em;
}

/* Títulos de sección */
.text-display {
  font-size: 3.125rem;  /* 50px */
  font-weight: 300;     /* Light */
  line-height: 1.2;
}

/* Subtítulos */
.text-title {
  font-size: 1.5rem;    /* 24px */
  font-weight: 400;     /* Regular */
  line-height: 1.3;
}

/* Body text */
.text-body {
  font-size: 1.125rem;  /* 18px */
  font-weight: 300;     /* Light */
  line-height: 1.7;
  color: var(--gray-400);
}

/* Small text */
.text-small {
  font-size: 0.875rem;  /* 14px */
  font-weight: 400;
  color: var(--gray-500);
}
```

---

## 💫 EFECTOS SIGNATURE

### 1. Cyan Glow Effect (Hero Text)
```jsx
<h1 className="relative">
  <span className="absolute inset-0 blur-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
    JOIN THE FUDIVERSE
  </span>
  <span className="relative bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
    JOIN THE FUDIVERSE
  </span>
</h1>
```

### 2. Glassmorphism Cards
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### 3. Floating Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

### 4. Gradient Blobs (Background)
```jsx
<div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
```

---

## 🧩 COMPONENTES BASE

### Botón Primario (CTA)
```jsx
<button className="group relative px-8 py-4 overflow-hidden rounded-full">
  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
  <span className="relative text-white font-medium">
    Texto del botón
  </span>
</button>
```

### Botón Secundario
```jsx
<button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all duration-300 font-medium">
  Texto del botón
</button>
```

### Input Search Style
```jsx
<input className="w-full px-8 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all duration-300" />
```

### Feature Card
```jsx
<div className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
  {/* Contenido */}
</div>
```

---

## 📏 SISTEMA DE ESPACIADO

### Spacing Scale
```css
/* Usa múltiplos de 4 para consistencia */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-32: 8rem;     /* 128px */
```

### Contenedores
```css
.container-sm { max-width: 48rem; }    /* 768px */
.container-md { max-width: 64rem; }    /* 1024px */
.container-lg { max-width: 80rem; }    /* 1280px */
.container-xl { max-width: 96rem; }    /* 1536px */
```

---

## 🎯 REGLAS DE USO

### ✅ DO's
1. **Siempre usar glassmorphism** en cards y elementos flotantes
2. **Aplicar glow cyan** en elementos importantes (CTAs, títulos hero)
3. **Mantener espaciado generoso** - el diseño debe respirar
4. **Usar gradientes sutiles** - nunca colores sólidos planos
5. **Hover effects suaves** - transiciones de 300ms

### ❌ DON'Ts
1. **NO usar negro puro (#000000)** - siempre #0A0A0A mínimo
2. **NO usar blanco puro** en texto - máximo #F3F4F6
3. **NO usar sombras negras** - siempre con tinte de color
4. **NO usar bordes sólidos** - siempre con transparencia
5. **NO saturar con animaciones** - mantener la elegancia

---

## 🚀 EJEMPLO DE IMPLEMENTACIÓN

```jsx
// Página típica de FudiVerse
export default function PageTemplate() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Gradient overlays */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Content */}
      <section className="relative z-10 py-32 px-6">
        <h1 className="text-5xl font-light text-center mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Título con gradiente
          </span>
        </h1>
      </section>
    </div>
  );
}
```

---

## 📱 RESPONSIVE GUIDELINES

### Breakpoints
```css
/* Mobile First */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Adaptaciones Móviles
- Reducir font-size del hero a 3rem en móvil
- Cambiar grid de 3 columnas a 1 en móvil
- Mantener padding lateral mínimo de 1.5rem
- Simplificar animaciones en dispositivos móviles

---

**¡Con este Design System, cualquier página nueva de FudiVerse mantendrá la misma elegancia y coherencia visual!** 🔥✨
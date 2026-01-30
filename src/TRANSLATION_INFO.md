# Arquitectura de Traducción (Bilingual Support)

Aquí te explico cómo funciona el sistema de traducción que implementé:

## 1. El "Cerebro" (LanguageContext)
Ubicación: `src/context/LanguageContext.jsx`

Creamos un **Contexto de React**. Imagina esto como una "variable global" a la que toda la aplicación tiene acceso.
- Tiene un estado `language` que puede ser `'en'` (inglés) o `'es'` (español).
- Tiene una función `toggleLanguage` que cambia entre uno y otro.

## 2. La Conexión (main.jsx)
Para que toda la app sepa qué idioma está seleccionado, envolvímos todo el componente `<App />` con el `<LanguageProvider>`. Así, cualquier componente hijo puede preguntar "¿en qué idioma estamos?".

## 3. El Diccionario (translations.js)
Ubicación: `src/data/translations.js`

Es un archivo simple que guarda los textos fijos de la interfaz (menús, botones, títulos estáticos).
```javascript
export const translations = {
  en: { 
    navbar: { home: "Home" }, 
    // ... 
  },
  es: { 
    navbar: { home: "Inicio" }, 
    // ... 
  }
};
```

## 4. Uso en Componentes (Navbar, Hero, etc.)
En los componentes, usamos un "Hook" personalizado: `useLanguage()`.
```javascript
const { language, toggleLanguage } = useLanguage(); 
const t = translations[language].navbar; // Selecciona el diccionario correcto
```
Si `language` es 'en', `t` tendrá los textos en inglés. Si cambia a 'es', React actualiza automáticamente todos los textos.

## 5. Datos de Proyectos (projects.js)
Para los proyectos, que son datos dinámicos, cambiamos la estructura para tener ambos idiomas:
```javascript
{
  title: "...", // Título base
  description_en: "English text...",
  description_es: "Texto en español...",
  // ...
}
```
Y en los componentes (`Projects.jsx`), elegimos dinámicamente cuál mostrar:
```javascript
// Intenta buscar description_en o description_es. Si no encuentra, usa description por defecto.
{project[`description_${language}`] || project.description}
```

---
**Resumen:**
1. Cambias el idioma en el Navbar -> Se actualiza el `Context`.
2. React detecta el cambio y avisa a todos los componentes.
3. Los componentes buscan el texto nuevo en `translations.js` o el campo correcto en `projects.js` y se re-renderizan automáticamente.

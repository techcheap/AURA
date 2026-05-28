# AURA — Démo site produit 3D + audio spatial

Landing page produit immersive : objet 3D central (React Three Fiber),
animations d'interface (Motion), et son ambient/spatial entièrement
synthétisé (Tone.js — aucun fichier audio à télécharger).

## Stack
- **React + Vite**
- **@react-three/fiber** + **@react-three/drei** — la 3D
- **motion** — animations UI (hero, sections au scroll)
- **tone** — moteur audio (drone ambient + whoosh + blips)

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichée (par défaut http://localhost:5173).

> ⚠️ **Le son** : les navigateurs bloquent l'audio tant que l'utilisateur
> n'a pas cliqué. C'est pour ça qu'il y a l'écran d'entrée
> « Entrer dans l'expérience » — le clic démarre Tone.js. C'est voulu,
> pas un bug.

## Build de production

```bash
npm run build
npm run preview
```

## Où modifier quoi

| Tu veux changer…              | Fichier |
|-------------------------------|---------|
| L'objet 3D (formes, couleurs) | `src/three/HeroObject.jsx` |
| Lumières, étoiles, caméra     | `src/three/Scene.jsx` |
| Les sons (drone, whoosh…)     | `src/audio/AudioEngine.js` |
| Textes du hero                | `src/components/Hero.jsx` |
| Les sections features         | `src/App.jsx` (tableau `FEATURES`) |
| Couleurs / typo globales      | `src/styles.css` (`:root`) |

## Remplacer l'objet par un vrai modèle 3D

Pour un vrai produit (un casque, une sneaker…), récupère un fichier `.glb`,
mets-le dans `public/`, et dans `HeroObject.jsx` remplace la géométrie
procédurale par :

```jsx
import { useGLTF } from "@react-three/drei";
const { scene } = useGLTF("/mon-modele.glb");
return <primitive object={scene} />;
```

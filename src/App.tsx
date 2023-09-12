import { useState } from 'react'
import './App.css'
import { HslColorPicker } from "react-colorful";
import { generateColorVariants, transformHSLToDark, transformHSLToLight } from './lib/utils';
import ColorPalette from './components/ColorPalette';
type  HslColor = {
  h: number;
  s: number;
  l: number;
}
export default function App() {
  const [color, setColor] = useState<HslColor>({ h: 24, s: 20, l: 45 });
const [primary, setPrimary] = useState<ColorMap | null>(null);
const [dark, setDark] = useState<ColorMap | null>(null);
const [light, setLight] = useState<ColorMap | null>(null);

  return (
    <div>
      <HslColorPicker color={color} onChange={setColor} />
      <button
        onClick={() => {
          const hslString = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
          const primaryPalette = generateColorVariants(hslString);
          setPrimary(primaryPalette);
          setLight(transformHSLToLight(primaryPalette));
          setDark(transformHSLToDark(primaryPalette));
        }}
      >
        Generate
      </button>

      <div>
        <h3>Dark Palette</h3>
        <ColorPalette palette={dark} />

        <h3>Light Palette</h3>
        <ColorPalette palette={light} />

        <h3>Primary Palette</h3>
        <ColorPalette palette={primary} />
      </div>
    </div>
  );
}


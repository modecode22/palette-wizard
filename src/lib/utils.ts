

export const transformHSLToLight = (colors: ColorMap): ColorMap => {
  const newColors: ColorMap = {};
  let initialL = 100;
  let initialS = 16;

  for (const key in colors) {
    const value = colors[key];
    const match = value.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);

    if (match) {
      const h = parseInt(match[1]);
      const newH = h - 5;
      initialL -= 5;
      initialS -= 1;

      newColors[key] = `hsl(${newH}, ${initialS}%, ${initialL}%)`;
    }
  }

  return newColors;
};

export const transformHSLToDark = (colors: ColorMap): ColorMap => {
  const newColors: ColorMap = {};
  let initialL = 40;

  const keyToDecrement: { [key: number]: number } = {
    600: 3,
    700: 3,
    800: 2,
    900: 2,
    950: 2,
  };

  for (const key in colors) {
    const intKey = parseInt(key, 10);
    const value = colors[key];
    const match = value.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);

    if (match) {
      const h = parseInt(match[1], 10);
      const decrement =
        keyToDecrement[intKey as keyof typeof keyToDecrement] || 5;

      if (intKey === 600) initialL = 12;

      newColors[key] = `hsl(${h - 10}, 5%, ${initialL}%)`;
      initialL -= decrement;
    }
  }

  return newColors;
};


export function generateColorVariants(hslString: string): ColorMap {
  // Extract HSL values from the string
  const [, hue] = hslString.match(/hsl\((\d+), (\d+)%?, (\d+)%?\)/) || [];

  if (!hue) {
    throw new Error("Invalid HSL string format");
  }

  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const satDeltas = [10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10];
  const lightDeltas = [50, 40, 30, 20, 10, 0, -10, -20, -30, -35, -40];

  const output: ColorMap = {};

  steps.forEach((step, index) => {
    const newSaturation = 20 + satDeltas[index];
    const newLightness = 45 + lightDeltas[index];
    output[step] = `hsl(${hue}, ${newSaturation}%, ${newLightness}%)`;
  });

  return output;
}


export const copyToClipboard = (palette: { [key: string]: string }) => {
  navigator.clipboard.writeText(JSON.stringify(palette, null, 2));
};

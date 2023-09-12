
const ColorPalette = ({ palette }: { palette: ColorMap|null }) => {
  return (
    <div className="color-palette">
      {palette &&
        Object.keys(palette).map((key: string) => (
          <div
            key={key}
            className="color-box"
            style={{ backgroundColor: palette[key]  }}
          >
            {key}
          </div>
        ))}
    </div>
  );
};

export default ColorPalette
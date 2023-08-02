import { createContext, useState } from "react";

const ThemContext = createContext();

export function ThemProvider({ children }) {
  const [selectedColor, setSelectedColor] = useState("color1");
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  return (
    <ThemContext.Provider
      value={{ selectedColor, handleColorClick, setSelectedColor }}
    >
      {children}
    </ThemContext.Provider>
  );
}

export default ThemContext;

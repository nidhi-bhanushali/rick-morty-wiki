import { useEffect, useState } from "react";

const useWindowDimensions = () => {
  const { innerHeight, innerWidth } = window;
  const [height, setHeight] = useState(innerHeight);
  const [width, setWidth] = useState(innerWidth);

  const onResize = () => {
    const { innerHeight: updatedHeight, innerWidth: updatedWidth } = window;
    setHeight(updatedHeight);
    setWidth(updatedWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { height, width };
};

export default useWindowDimensions;

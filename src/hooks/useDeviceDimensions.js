import startCase from "lodash/startCase";
import { useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";

const SCREENS = {
  DESKTOP: "desktop",
  TABLET: "tablet",
  MOBILE: "mobile",
};

const SCREEN_DIMENSIONS = {
  [SCREENS.DESKTOP]: { min: 768, max: 4000 },
  [SCREENS.TABLET]: { min: 430, max: 768 },
  [SCREENS.MOBILE]: { min: 240, max: 430 },
};

const defaultScreenVals = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
};

const useDeviceDimensions = () => {
  const { width } = useWindowDimensions();
  const [currentScreen, setCurrenScreen] = useState(SCREENS.DESKTOP);

  useEffect(() => {
    if (width > SCREEN_DIMENSIONS.desktop.min) {
      setCurrenScreen(SCREENS.DESKTOP);
      return;
    }

    if (
      width > SCREEN_DIMENSIONS.tablet.min &&
      width <= SCREEN_DIMENSIONS.tablet.max
    ) {
      setCurrenScreen(SCREENS.TABLET);
      return;
    }

    if (width < SCREEN_DIMENSIONS.mobile.max) {
      setCurrenScreen(SCREENS.MOBILE);
    }
  }, [width]);

  const screenVals = {
    ...defaultScreenVals,
    [`is${startCase(currentScreen)}`]: true,
  };

  return { currentScreen, ...screenVals };
};

export default useDeviceDimensions;

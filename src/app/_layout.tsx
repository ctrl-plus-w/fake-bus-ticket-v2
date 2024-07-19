import { Slot } from "expo-router";
import React from "react";
import { loadAsync } from "expo-font";

import OverpassBlack from "@/asset/fonts/Overpass-Black.ttf";
import OverpassExtrabold from "@/asset/fonts/Overpass-ExtraBold.ttf";
import OverpassBold from "@/asset/fonts/Overpass-Bold.ttf";
import OverpassRegular from "@/asset/fonts/Overpass-Regular.ttf";

/**
 * Fetch the needed fonts
 */
/* eslint-disable global-require */
const fetchFonts = () => {
  const fonts = {
    "overpass-black": OverpassBlack,
    "overpass-extrabold": OverpassExtrabold,
    "overpass-bold": OverpassBold,
    "overpass-regular": OverpassRegular,
  };

  return loadAsync(fonts);
};
/* eslint-enable global-require */
const RootLayout = () => {
  const [dataLoaded, setDataLoaded] = React.useState(false);

  React.useEffect(() => {
    fetchFonts()
      .then(() => setDataLoaded(true))
      .catch(null);
  }, []);

  return dataLoaded ? <Slot /> : <></>;
};

export default RootLayout;

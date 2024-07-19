import { View, Text, SafeAreaView } from "react-native";
import { loadAsync } from "expo-font";

import React from "react";

import TicketPage from "@/module/TicketPage";

import OverpassExtrabold from "@/asset/fonts/Overpass-ExtraBold.ttf";
import OverpassRegular from "@/asset/fonts/Overpass-Regular.ttf";
import OverpassBlack from "@/asset/fonts/Overpass-Black.ttf";
import OverpassBold from "@/asset/fonts/Overpass-Bold.ttf";

import ResizeableProvider from "@/context/ResizeableContext";

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

const Index = () => {
  const [dataLoaded, setDataLoaded] = React.useState(false);

  React.useEffect(() => {
    fetchFonts()
      .then(() => setDataLoaded(true))
      .catch(null);
  }, []);

  return dataLoaded ? (
    <ResizeableProvider>
      <TicketPage />
    </ResizeableProvider>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Loading...</Text>
    </View>
  );
};

export default Index;

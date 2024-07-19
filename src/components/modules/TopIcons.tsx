import {
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import type { FC } from "react";

import React from "react";

import ArrowIcon from "@/asset/arrow.png";
import QRCode from "@/asset/qrcode.png";
import { useResizeable } from "@/context/ResizeableContext";

const style = StyleSheet.create({
  container: {
    zIndex: 30,
    position: "absolute",
    flex: 1,

    justifyContent: "space-between",

    alignItems: "center",
    flexDirection: "row",

    top: 67,
    left: 14,
    right: 14,
  },
});

const TopIcons: FC = () => {
  const { isResizeMode, setIsResizeMode } = useResizeable();

  const IS_IOS = Platform.OS === "ios";

  const toggleResizeModal = () => {
    setIsResizeMode((prev) => !prev);
  };

  return (
    <View style={style.container}>
      <Image
        style={{ width: IS_IOS ? 32 : 26, height: IS_IOS ? 32 : 26 }}
        source={ArrowIcon}
      />

      <TouchableWithoutFeedback onPress={toggleResizeModal}>
        <Image
          style={{
            borderWidth: isResizeMode ? 1 : 0,
            borderColor: "red",
            borderRadius: 100,
            width: IS_IOS ? 32 : 26,
            height: IS_IOS ? 32 : 26,
          }}
          source={QRCode}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TopIcons;

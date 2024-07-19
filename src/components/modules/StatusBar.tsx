import { View, StyleSheet, Platform } from "react-native";

import type { FC } from "react";

import React from "react";
import ResizeableContainer from "@/element/ResizeableContainer";

interface IProps {
  percentage: number;
}

const style = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "absolute",

    borderRadius: 100,
    borderWidth: 0,

    backgroundColor: "black",

    overflow: "hidden",
  },
});

const StatusBar: FC<IProps> = ({ percentage = 10 }) => (
  <ResizeableContainer id="status-bar-container" style={style.container}>
    <View
      style={{
        width: `${percentage}%`,
        height: "100%",

        backgroundColor: "#14cd45",
      }}
    />
  </ResizeableContainer>
);

export default StatusBar;

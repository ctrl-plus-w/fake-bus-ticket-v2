import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Touchable,
  TouchableWithoutFeedback,
} from "react-native";

import type { FC } from "react";

import React from "react";

import {
  addHours,
  formatHour,
  getAfterHour,
  getFormatedDate,
} from "@/helper/date.helper";

import UserImage from "@/asset/user.png";
import ResizeableText from "@/element/ResizeableText";
import ResizeableContainer from "@/element/ResizeableContainer";

interface IProps {
  date: Date;
}

const style = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "absolute",
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderRadius: 16,
  },
});

const ControlInfos: FC<IProps> = ({ date }) => {
  return (
    <ResizeableContainer
      id="control-informations-container"
      style={style.container}
    >
      <ResizeableText
        id="control-informations-header-text"
        style={{ fontFamily: "overpass-bold" }}
      >
        Informations de contrôle
      </ResizeableText>

      <ResizeableText
        id="control-informations-date-text"
        style={{ fontFamily: "overpass-black", margin: 0 }}
      >
        {getFormatedDate(date)}
      </ResizeableText>

      <ResizeableText
        id="control-informations-end-time-text"
        style={{ fontFamily: "overpass-regular", marginTop: -5 }}
      >
        {formatHour(addHours(date, 2))}
      </ResizeableText>

      <ResizeableText
        id="control-informations-id-text"
        style={{ fontFamily: "overpass-black", marginTop: 2 }}
      >
        131-60E5867820987
      </ResizeableText>

      <Image
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          height: 57,
          width: 57,
        }}
        source={UserImage}
      />
    </ResizeableContainer>
  );
};

export default ControlInfos;

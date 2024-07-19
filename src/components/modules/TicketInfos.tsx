import { View, Text, Platform, StyleSheet } from "react-native";

import type { FC } from "react";

import React from "react";

import {
  getAfterHour,
  getBeforeHour,
  getFormatedDate,
} from "@/helper/date.helper";
import ResizeableContainer from "@/element/ResizeableContainer";
import ResizeableText from "@/element/ResizeableText";

const style = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "absolute",
    backgroundColor: "#fff",

    borderRadius: 16,
  },
});

interface IProps {
  date: Date;
}

const TicketInfos: FC<IProps> = ({ date }) => {
  return (
    <ResizeableContainer id="ticket-infos-container" style={style.container}>
      <ResizeableText
        id="ticket-infos-header-text"
        style={{ fontFamily: "overpass-bold" }}
      >
        Ticket unitaire
      </ResizeableText>

      <ResizeableText
        id="ticket-infos-subheader-text"
        style={{
          fontFamily: "overpass-regular",
          width: "100%",
          textAlign: "center",
        }}
      >
        Période de validité
      </ResizeableText>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <ResizeableText
            id="ticket-infos-start-date-text"
            style={{ fontFamily: "overpass-black" }}
          >
            {getFormatedDate(date)}
          </ResizeableText>
          <ResizeableText
            id="ticket-infos-start-time-text"
            style={{ fontFamily: "overpass-regular" }}
          >
            {getBeforeHour(date).toString()}
          </ResizeableText>
        </View>
        <View style={{ alignItems: "center" }}>
          <ResizeableText
            id="ticket-infos-end-date-text"
            style={{ fontFamily: "overpass-black" }}
          >
            {getFormatedDate(date)}
          </ResizeableText>
          <ResizeableText
            id="ticket-infos-end-time-text"
            style={{ fontFamily: "overpass-regular" }}
          >
            {getAfterHour(date).toString()}
          </ResizeableText>
        </View>
      </View>
    </ResizeableContainer>
  );
};

export default TicketInfos;

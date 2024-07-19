import { Animated, ImageBackground, View } from "react-native";
import React, { useMemo } from "react";
import ControlInfos from "@/module/ControlInfos";

import Time from "@/class/Time";

import BackgroundImage from "@/asset/background.png";
import BackgroundTestImage from "@/asset/background_test.png";

import {
  useResizeable,
  useTicketPageAnimation,
} from "@/context/ResizeableContext";
import SpinnerContainer from "@/module/SpinnerContainer";
import TopIcons from "@/module/TopIcons";
import TicketInfos from "@/module/TicketInfos";
import StatusBar from "@/module/StatusBar";

interface IProps {
  date: Date;
}

const TicketPage = ({ date }: IProps) => {
  const { isResizeMode } = useResizeable();

  const animationStyle = useTicketPageAnimation();

  const nowSecondsDiff = useMemo(
    () =>
      Time.fromDate(new Date()).asSeconds() - Time.fromDate(date).asSeconds(),
    [date],
  );

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          transformOrigin: "top center",
          overflow: "hidden",
        },
        animationStyle,
      ]}
    >
      <ImageBackground
        source={isResizeMode ? BackgroundTestImage : BackgroundImage}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View
          style={{
            opacity: isResizeMode ? 0.9 : 1,
            width: "100%",
            flex: 1,
            alignItems: "center",
          }}
        >
          <TopIcons />
          <SpinnerContainer />
          <TicketInfos date={date} />
          <ControlInfos date={date} />
          <StatusBar percentage={(nowSecondsDiff / (2 * 60 * 60)) * 100 + 1} />
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default TicketPage;

import { Animated, ImageBackground } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ControlInfos from "@/module/ControlInfos";

import Time from "@/class/Time";

import { getAfterHour, getBeforeHour } from "@/helper/date.helper";

import BackgroundImage from "@/asset/background.png";

import { useTicketPageAnimation } from "@/context/ResizeableContext";
import SpinnerContainer from "@/module/SpinnerContainer";
import TopIcons from "@/module/TopIcons";
import TicketInfos from "@/module/TicketInfos";
import StatusBar from "@/module/StatusBar";

const TicketPage = () => {
  const animationStyle = useTicketPageAnimation();

  const [date, setDate] = useState(new Date());

  const beforeHour = useMemo(() => getBeforeHour(date), [date]);
  const afterHour = useMemo(() => getAfterHour(date), [date]);

  const intervalSecondsDiff = afterHour.asSeconds() - beforeHour.asSeconds();

  const nowSecondsDiff = useMemo(
    () => Time.fromDate(date).asSeconds() - beforeHour.asSeconds(),
    [date, beforeHour],
  );

  useEffect(() => {
    const handler = setTimeout(() => setDate(new Date()), 60 * 1000);

    return () => clearTimeout(handler);
  }, [date]);

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
        source={BackgroundImage}
        resizeMode="cover"
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <SpinnerContainer />
        <TopIcons />
        <TicketInfos date={date} />
        <ControlInfos date={date} />
        <StatusBar percentage={(nowSecondsDiff / intervalSecondsDiff) * 100} />
      </ImageBackground>
    </Animated.View>
  );
};

export default TicketPage;

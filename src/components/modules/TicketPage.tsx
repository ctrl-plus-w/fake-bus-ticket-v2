import { ImageBackground, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';

import type { FC } from 'react';

import React from 'react';

import SpinnerContainer from '@/module/SpinnerContainer';
import ControlInfos from '@/module/ControlInfos';
import TicketInfos from '@/module/TicketInfos';
import StatusBar from '@/module/StatusBar';
import TopIcons from '@/module/TopIcons';

import Time from '@/class/Time';

import { getAfterHour, getBeforeHour } from '@/helper/date.helper';

import BackgroundImage from '@/asset/background.png';

const TicketPage: FC = () => {
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
    <View style={{ flex: 1, borderStyle: 'solid', borderWidth: 1, borderColor: 'red' }}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <SpinnerContainer />
        <TopIcons />
        <TicketInfos date={date} />
        <ControlInfos date={date} />
        <StatusBar percentage={(nowSecondsDiff / intervalSecondsDiff) * 100} />
      </ImageBackground>
    </View>
  );
};

export default TicketPage;

import { View, Text, Platform, StyleSheet } from 'react-native';

import type { FC } from 'react';

import React from 'react';

import {
  getAfterHour,
  getBeforeHour,
  getFormatedDate,
} from '@/helper/date.helper';

interface IProps {
  date: Date;
}

const TicketInfos: FC<IProps> = ({ date }) => {
  const IS_IOS = Platform.OS === 'ios';

  const style = StyleSheet.create({
    container: {
      zIndex: 1,
      position: 'absolute',
      backgroundColor: '#fff',

      borderRadius: 16,

      paddingHorizontal: 15,

      ...Platform.select({
        ios: {
          top: 567,

          width: 384,
          height: 128,

          paddingVertical: 10,
        },
        android: {
          top: 542,

          width: 368,
          height: 123,

          paddingVertical: 8,
        },
      }),
    },
  });

  return (
    <View style={style.container} pointerEvents='none'>
      <Text style={{ fontFamily: 'overpass-bold', fontSize: IS_IOS ? 21 : 20 }}>
        Ticket unitaire
      </Text>

      <View style={{ alignItems: 'center', marginTop: IS_IOS ? 8 : 6 }}>
        <Text
          style={{
            fontFamily: 'overpass-regular',
            fontSize: IS_IOS ? 14 : 13.5,
          }}
        >
          Période de validité
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: IS_IOS ? 0 : -4,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'overpass-black',
              fontSize: IS_IOS ? 24.5 : 23,
            }}
          >
            {getFormatedDate(date)}
          </Text>
          <Text
            style={{
              fontFamily: 'overpass-regular',
              fontSize: IS_IOS ? 23 : 22,
              marginTop: IS_IOS ? -5 : -10,
            }}
          >
            {getBeforeHour(date).toString()}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'overpass-black',
              fontSize: IS_IOS ? 24.5 : 23,
            }}
          >
            {getFormatedDate(date)}
          </Text>
          <Text
            style={{
              fontFamily: 'overpass-regular',
              fontSize: IS_IOS ? 23 : 22,
              marginTop: IS_IOS ? -5 : -10,
            }}
          >
            {getAfterHour(date).toString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TicketInfos;

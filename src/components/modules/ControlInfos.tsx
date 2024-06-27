import { View, Text, StyleSheet, Platform, Image } from 'react-native';

import type { FC } from 'react';

import React from 'react';

import { getAfterHour, getFormatedDate } from '@/helper/date.helper';

import UserImage from '@/asset/user.png';

interface IProps {
  date: Date;
}

const style = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',

    backgroundColor: '#ffffff',

    alignItems: 'center',

    borderRadius: 16,

    paddingHorizontal: 15,

    ...Platform.select({
      ios: {
        top: 702,

        width: 384,
        height: 115,

        paddingVertical: 6,
      },
      android: {
        top: 671,

        width: 368,
        height: 110,

        paddingVertical: 5,
      },
    }),
  },
});

const ControlInfos: FC<IProps> = ({ date }) => {
  const IS_IOS = Platform.OS === 'ios';

  return (
    <View style={style.container} pointerEvents='none'>
      <Text
        style={{ fontFamily: 'overpass-bold', fontSize: IS_IOS ? 13.5 : 13 }}
      >
        Informations de contrôle
      </Text>

      <Text
        style={{
          fontFamily: 'overpass-black',
          fontSize: IS_IOS ? 24 : 24,
          margin: IS_IOS ? 0 : -4,
        }}
      >
        {getFormatedDate(date)}
      </Text>

      <Text
        style={{
          fontFamily: 'overpass-regular',
          fontSize: 21,
          marginTop: IS_IOS ? -5 : -6,
        }}
      >
        {getAfterHour(date).toString()}
      </Text>

      <Text
        style={{
          fontFamily: 'overpass-black',
          fontSize: 22,
          marginTop: IS_IOS ? 2 : -4,
        }}
      >
        131-60E5867820987
      </Text>

      <Image
        style={{
          position: 'absolute',
          top: 20,
          left: 10,
          height: 57,
          width: 57,
        }}
        source={UserImage}
      />
    </View>
  );
};

export default ControlInfos;

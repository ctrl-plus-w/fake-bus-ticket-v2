import { View, StyleSheet, Platform } from 'react-native';

import type { FC } from 'react';

import React from 'react';

interface IProps {
  percentage: number;
}

const style = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',

    borderRadius: 100,

    backgroundColor: 'black',

    overflow: 'hidden',

    ...Platform.select({
      ios: {
        left: 15,
        bottom: 54,

        width: 384,
        height: 10,
      },
      android: {
        left: 13,
        bottom: 51.5,

        width: 368,
        height: 10,
      },
    }),
  },
});

const StatusBar: FC<IProps> = ({ percentage = 10 }) => (
  <View style={style.container} pointerEvents='none'>
    <View
      style={{
        width: `${percentage}%`,
        height: '100%',

        backgroundColor: '#14cd45',
      }}
    />
  </View>
);

export default StatusBar;

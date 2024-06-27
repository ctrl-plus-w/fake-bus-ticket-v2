import { View, Image, StyleSheet, Platform } from 'react-native';

import type { FC } from 'react';

import React from 'react';

import ArrowIcon from '@/asset/arrow.png';
import QRCode from '@/asset/qrcode.png';

const style = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    flex: 1,

    justifyContent: 'space-between',

    alignItems: 'center',
    flexDirection: 'row',

    top: 67,
    left: 14,
    right: 14,
  },
});

const TopIcons: FC = () => {
  const IS_IOS = Platform.OS === 'ios';

  return (
    <View style={style.container} pointerEvents='none'>
      <Image
        style={{ width: IS_IOS ? 32 : 26, height: IS_IOS ? 32 : 26 }}
        source={ArrowIcon}
      />
      <Image
        style={{ width: IS_IOS ? 32 : 26, height: IS_IOS ? 32 : 26 }}
        source={QRCode}
      />
    </View>
  );
};

export default TopIcons;

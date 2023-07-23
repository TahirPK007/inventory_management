import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple',
      }}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 40,
          fontWeight: '800',
        }}>
        {'Inventory \n Management \n App'}
      </Text>
    </View>
  );
};

export default Splash;

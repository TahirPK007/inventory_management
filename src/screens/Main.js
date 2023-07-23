import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Items from '../tabs/Items';
import AddItem from '../tabs/AddItem';
import {useNavigation} from '@react-navigation/native';

const Main = () => {
  const [selectedTab, setselectedTab] = useState(0);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      {selectedTab == 0 ? <Items /> : <AddItem />}
      <View
        style={{
          width: '100%',
          height: 80,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          elevation: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setselectedTab(0);
          }}>
          <Image
            source={require('../images/items.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('AddItem', {type: 'new'});
          }}>
          <Image
            source={require('../images/add.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

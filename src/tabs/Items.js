import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Items = () => {
  const [items, setitems] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(snapshot => {
        if (snapshot.docs != []) {
          setitems(snapshot.docs);
        } else {
          console.log('No Items In the DB');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteItem = item => {
    firestore()
      .collection('items')
      .doc(item._data.itemId)
      .delete()
      .then(() => {
        console.log('item deleted successfull');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItems();
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 30,
          fontWeight: '700',
          color: 'purple',
          marginTop: 10,
        }}>
        Items
      </Text>
      <FlatList
        data={items}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                backgroundColor: 'white',
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
                height: 100,
              }}>
              <View style={{}}>
                <Text style={{color: 'black', fontSize: 15}}>
                  {'Item Name: ' + item._data.itemName}
                </Text>
                <Text style={{color: 'black', fontSize: 15}}>
                  {'Item Price: ' + item._data.itemPrice}
                </Text>
                <Text style={{color: 'black', fontSize: 15}}>
                  {'Item Quantity: ' + item._data.itemQuantity}
                </Text>
              </View>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddItem', {
                      itemId: item._data.itemId,
                      itemName: item._data.itemName,
                      itemQuantity: item._data.itemQuantity,
                      itemPrice: item._data.itemPrice,
                      type: 'edit',
                    });
                  }}>
                  <Image
                    source={require('../images/edit.png')}
                    style={{height: 30, width: 30, marginBottom: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteItem(item);
                    getItems();
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Items;

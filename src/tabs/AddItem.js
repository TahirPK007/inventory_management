import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
const AddItem = () => {
  const route = useRoute();
  const [itemName, setitemName] = useState(
    route.params.type == 'edit' ? route.params.itemName : '',
  );
  const [itemQuantity, setitemQuantity] = useState(
    route.params.type == 'edit' ? route.params.itemQuantity : '',
  );
  const [itemPrice, setitemPrice] = useState(
    route.params.type == 'edit' ? route.params.itemPrice : '',
  );

  const navigation = useNavigation();
  const addItem = () => {
    const itemId = uuid.v4();
    if (route.params.type == 'edit') {
      firestore()
        .collection('items')
        .doc(route.params.itemId)
        .update({
          itemId: route.params.itemId,
          itemName: itemName,
          itemQuantity: itemQuantity,
          itemPrice: itemPrice,
        })
        .then(res => {
          console.log('item Updated');
          navigation.goBack();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      firestore()
        .collection('items')
        .where('itemName', '==', itemName)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length > 0) {
            console.log('This Item Already Exists');
          } else {
            firestore()
              .collection('items')
              .doc(itemId)
              .set({
                itemId: itemId,
                itemName: itemName,
                itemQuantity: itemQuantity,
                itemPrice: itemPrice,
              })
              .then(res => {
                alert('New Item Added');
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: '700',
          color: 'purple',
          marginTop: 10,
        }}>
        Add New Item
      </Text>
      <TextInput
        style={{
          width: '90%',
          borderWidth: 1,
          borderRadius: 20,
          paddingLeft: 20,
          alignSelf: 'center',
          marginTop: 50,
        }}
        placeholderTextColor={'black'}
        placeholder="Enter Item Name"
        value={itemName}
        onChangeText={txt => setitemName(txt)}
      />
      <TextInput
        style={{
          width: '90%',
          borderWidth: 1,
          borderRadius: 20,
          paddingLeft: 20,
          alignSelf: 'center',
          marginTop: 20,
        }}
        placeholderTextColor={'black'}
        placeholder="Enter Item Quantity"
        value={itemQuantity}
        onChangeText={txt => setitemQuantity(txt)}
      />
      <TextInput
        style={{
          width: '90%',
          borderWidth: 1,
          borderRadius: 20,
          paddingLeft: 20,
          alignSelf: 'center',
          marginTop: 20,
        }}
        placeholderTextColor={'black'}
        placeholder="Enter Item Price"
        value={itemPrice}
        onChangeText={txt => setitemPrice(txt)}
      />
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          borderWidth: 1,
          borderColor: 'purple',
          alignSelf: 'center',
          marginTop: 20,
          height: 50,
          borderRadius: 20,
        }}
        onPress={() => {
          addItem();
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
          Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddItem;

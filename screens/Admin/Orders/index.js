import React, { useEffect, useState } from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, View, Text,Image,ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseUrl from '../../../baseUrl';

const Orders = ({navigation}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
      axios.get(baseUrl+'/get_all_orders').then((res) => {
        setOrders(res.data.orders);
      })

  },[])

 const OrderDetails = (order_id) => {
    navigation.navigate('OrderDetails',{'order_id':order_id})
  }

  return(
    <SafeAreaView style={styles.container}>
              <ScrollView style={{padding:'4%'}}>

              {orders.map((recipe, index) => (
                recipe.status == "notDelivered" ?
                <View key={index} style={styles.RecipeCard}>
                    <Image style={{width:'23%', height:'70%', alignSelf:'center', marginLeft:'4%', marginRight:'3.5%',borderRadius:5,}} source={{uri:baseUrl+'/static/uploads/'+recipe.ordered_recipe_picture}}/>
                    <View style={{display:'flex', flexDirection:'column', marginTop:10, width:'100%'}}>
                      <Text style={{fontSize:20,}}>{recipe.ordered_recipe_name}</Text>
                      <Text style={{color:'black', fontSize:15}}>{recipe.date}</Text>
                  <View>

                        <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={() => OrderDetails(recipe.order_id)} style={{width:80, height:30, backgroundColor:'#ffb600', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'white'}}>Details</Text>
                        </TouchableOpacity>
                        </View>

                      </View>
                    </View>
                </View>:
                null
              ))}
              </ScrollView>
              
            </SafeAreaView>
  )
}

export default Orders;
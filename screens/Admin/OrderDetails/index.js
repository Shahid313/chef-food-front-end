import React, {useEffect, useState} from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, View, Text,Image,ScrollView,StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseUrl from '../../../baseUrl';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const OrderDetails = (props) => {
  const [order, setOrder] = useState([]);


  useEffect(() => {
    getOrderData();
  }, [])

  
  const getOrderData =() => {
    props.navigation.addListener("focus", () => {
      axios.get(baseUrl+`/get_order_by_id?order_id=${props.route.params.order_id}`).then((res) => {
        setOrder(res.data.order);
      })
    })
  }

  const markAsDelivered = () => {
    const data = new FormData()
    data.append('order_id', order.order_id)
    axios.post(baseUrl+'/mark_order_as_delivered', data).then((response) => {
      if(response.data.msg == 'Marked as delivered'){
          alert('Marked as delivered');
          props.navigation.navigate('Orders')
      }
  
  })}


  return(
    <SafeAreaView style={styles.container}>
                    
          <Image source={{uri:baseUrl+'/static/uploads/'+order.ordered_recipe_picture}} style={{ width:'100%',height:'37%',position:'absolute'}}/>
          <View style={styles.dish_intro_container}>
              <Text style={{color:"black",fontWeight:"bold",fontSize:18,textAlign:'center'}}>{order.ordered_recipe_name}</Text>

              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,width:'75%',alignSelf:'center'}}>

             <View style={{alignItems:'center'}}>
             <MIcon name='local-fire-department' color="#181819" size={30} />
              <Text style={{color:'#181819'}}>{order.time}</Text>
             </View>

           <View style={{alignItems:'center'}}>
           <MIcon name='delivery-dining' color="#181819" size={30} />
           <Text style={{color:'#181819'}}>{order.delivery_price}$</Text>
          </View>  

          <View style={{alignItems:'center',}}>
          <FIcon name='dollar-sign' style={{marginBottom:5}} color="#181819" size={22} />
          <Text style={{color:'#181819'}}>Price: {order.total_price}$</Text>
          </View>

        </View>
        
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{width:'80%', marginTop:20}}>
        
          <Text style={{fontFamily:'Roboto-Bold', fontSize:20, color:'#181819'}}>Chef name : {order.chef_name}</Text>

          <Text style={{fontWeight:"bold",marginTop:10, fontSize:20, color:'#181819'}}>Ingredients: </Text>
          <Text>{order.recipe_ingredients}</Text>

          <Text style={{fontWeight:"bold",marginTop:10, fontSize:20, color:'#181819'}}>Customer name: </Text>
          <Text>{order.customer_name}</Text>

          <Text style={{fontWeight:"bold",marginTop:10, fontSize:20, color:'#181819'}}>Delivery Address: </Text>
          <Text>{order.address}</Text>

          <Text style={{fontWeight:"bold",marginTop:10, fontSize:20, color:'#181819'}}>Quantity Orered: </Text>
          <Text>{order.order_quantity}</Text>

          {order.status == "notDelivered" ?
                <TouchableOpacity onPress={() => markAsDelivered()} style={styles.undeliveredBtn}>
                    <Text style={styles.deliveryText}>Delivered</Text>
                </TouchableOpacity>:


                <View style={styles.deliveredBtn}>
                    <Text style={styles.deliveryText}>Delivered</Text>
                </View>}

                

          </ScrollView>
          
      </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems:"center",
      height:'100%'
  },
  dish_intro_container:{
      backgroundColor:"orange",
      width:"85%",
      alignSelf:"center",
      justifyContent:"center",
      padding:30,
      borderWidth:1,
      borderRadius:10,
      borderColor:"orange",
      marginTop:'40%'
  },

  deliveredBtn:{
    width:120,
    height:35,
    marginTop:25,
    backgroundColor:'gray',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    marginBottom:10
},

undeliveredBtn:{
    width:120,
    height:35,
    marginTop:25,
    backgroundColor:'#ffb600',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    marginBottom:10
},

deliveryText:{
    color:'white',
    fontSize:16
}
})

export default OrderDetails;
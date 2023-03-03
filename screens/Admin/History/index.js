import React,{useState, useEffect} from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, View, Text,Image,ScrollView,TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseUrl from '../../../baseUrl';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const History = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [searched_recipe, setSearchedRecipe] = useState('');
  const [searched_results, setSearchedResult] = useState(null);

  useEffect(() => {
    
      axios.get(baseUrl+'/get_all_orders').then((res) => {
        setOrders(res.data.orders);
      })

  },[]);

  const OrderDetails = (order_id) => {
    navigation.navigate('OrderDetails',{'order_id':order_id})
  }

  const handleChangeSearch = (e) => {
    const search_result = []
    orders.map((recipe) => {
      let result2 = new RegExp(e, 'i').test(recipe.ordered_recipe_name)
      if(result2 == true){
        search_result.push(recipe)
      }
    })

    setSearchedResult(search_result);
  }

  return(
    <SafeAreaView style={styles.container}>
              <ScrollView style={{padding:'4%'}}>

                {/* search starts */}

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={styles.PasswordInput}>
                <View style={styles.EyeButton}>
                <Image source={require('../../../assets/search.png')} style={styles.imageStyle}/>
                </View>
                <TextInput onChangeText={(e) => handleChangeSearch(e)}  placeholderTextColor="#929292" placeholder="Search" style={styles.InputField}/>
               </View>
               <View style={{height:48}}>
               <AIcon name='filter' color="gray" size={35} />
               </View>
               </View>

                {/* search ends */}

              {searched_results == null ?
              orders.map((recipe, index) => (
                recipe.status == "delivered" ?
                <View key={index} style={styles.RecipeCard}>
                    <Image style={{width:'23%', height:'70%', alignSelf:'center', marginLeft:'4%', marginRight:'3.5%',borderRadius:5,}} source={{uri:baseUrl+'/static/uploads/'+recipe.ordered_recipe_picture}}/>
                    <View style={{display:'flex', flexDirection:'column', marginTop:10, width:'100%'}}>
                      <Text style={{fontSize:20,fontFamily:'Roboto-Regular'}}>{recipe.ordered_recipe_name}</Text>
                      <Text style={{color:'black', fontSize:15,fontFamily:'Roboto-Light'}}>{recipe.date}</Text>
                <View>

                        <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={() => OrderDetails(recipe.order_id)} style={{width:80, height:30, backgroundColor:'#ffb600', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'white',fontFamily:'Roboto-Regular'}}>Details</Text>
                        </TouchableOpacity>
                        </View>

                      </View>
                    </View>
                </View>:
                null
              )):
              searched_results.map((recipe, index) => (
                recipe.status == "delivered" ?
                <View key={index} style={styles.RecipeCard}>
                    <Image style={{width:'23%', height:'70%', alignSelf:'center', marginLeft:'4%', marginRight:'3.5%',borderRadius:5,}} source={{uri:baseUrl+'/static/uploads/'+recipe.ordered_recipe_picture}}/>
                    <View style={{display:'flex', flexDirection:'column', marginTop:10, width:'100%'}}>
                      <Text style={{fontSize:20,fontFamily:'Roboto-Regular'}}>{recipe.ordered_recipe_name}</Text>
                      <Text style={{color:'black', fontSize:15,fontFamily:'Roboto-Light'}}>{recipe.date}</Text>
                <View>

                        <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={() => OrderDetails(recipe.order_id)} style={{width:80, height:30, backgroundColor:'#ffb600', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'white',fontFamily:'Roboto-Regular'}}>Details</Text>
                        </TouchableOpacity>
                        </View>

                      </View>
                    </View>
                </View>:
                null
              ))
              }
              </ScrollView>
              
            </SafeAreaView>
  )
}

export default History;
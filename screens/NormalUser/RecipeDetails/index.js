import React from "react";
import {Text, Image,  SafeAreaView, TouchableOpacity, View,Dimensions, Keyboard,ScrollView,StyleSheet, TouchableWithoutFeedback, TextInput} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import FIcon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseUrl from '../../../baseUrl';

export default class RecipeDetails extends React.Component {

    state = {
        recipe:''
    }

    getOrderData(){
        this.props.navigation.addListener("focus", () => {
          axios.get(baseUrl+`/get_recipe_by_id?recipe_id=${this.props.route.params.recipe_id}`).then((res) => {
            this.setState({recipe:res.data.recipe});
          })
        })
      }
  
      componentDidMount(){
          this.getOrderData();
        }

        
    render(){
        return(
          

                  <View style={styles.container}>
                    
                    
                    <Image source={{uri:baseUrl+'/static/uploads/'+this.state.recipe.recipe_picture}} style={{ width:'100%',height:'37%',position:'absolute'}}/>
                    <View style={styles.dish_intro_container}>
                        <Text style={{color:"black",fontWeight:"bold",fontSize:18,textAlign:'center'}}>{this.state.recipe.recipe_name}</Text>

                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,width:'75%',alignSelf:'center'}}>

                       <View style={{alignItems:'center'}}>
                       <MIcon name='local-fire-department' color="#181819" size={30} />
                        <Text style={{color:'#181819'}}>{this.state.recipe.time}</Text>
                       </View>

                     <View style={{alignItems:'center'}}>
                     <MIcon name='delivery-dining' color="#181819" size={30} />
                     <Text style={{color:'#181819'}}>{this.state.recipe.delivery_price}$</Text>
                    </View>  

                    <View style={{alignItems:'center',}}>
                    <FIcon name='dollar-sign' style={{marginBottom:5}} color="#181819" size={22} />
                    <Text style={{color:'#181819'}}>Price: {this.state.recipe.recipe_price}$</Text>
                    </View>

                        </View>
                  
                    </View>


                    <ScrollView style={{width:'80%', marginTop:20}}>
                    <Text style={{fontFamily:'Roboto-Bold', fontSize:20, color:'#181819'}}>Chef name : {this.state.recipe.chef_name}</Text>

                    <Text style={{fontWeight:"bold",marginTop:10, fontSize:20, color:'#181819'}}>Ingredients: </Text>
                    <Text>{this.state.recipe.recipe_ingredients}</Text>

                    <Text style={{fontWeight:"bold",marginTop:10, fontSize:20, color:'#181819'}}>Description: </Text>
                    <Text>{this.state.recipe.recipe_description}</Text>
                    </ScrollView>
                 
                </View>
              
          

          
          
        )
    }
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
})
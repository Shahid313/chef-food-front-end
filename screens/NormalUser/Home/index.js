import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text,Image,ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styles from './styles'
import axios from 'axios'
import baseUrl from '../../../baseUrl';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';

const Home = ({navigation}) => {
  const [recipes, SetRecipes] = useState([])
  const [searched_recipe, setSearchedRecipe] = useState('')
  const [searched_results, setSearchedResults] = useState([])

  useEffect(() => {
      getRecipes();
  }, [])

  const getRecipes = () => {
    axios.get(baseUrl+'/get_all_recipes').then((res) => {
      SetRecipes(res.data.recipes);
    })
  }

  const orderRequirements = (recipe_id, recipe_price) => {
    navigation.navigate('OrderRequirements', {"recipe_id":recipe_id, recipe_price});
  }

  const handleChangeSearch = (e) => {
    const search_result = []
    recipes.map((recipe) => {
      let result2 = new RegExp(e, 'i').test(recipe.recipe_name)
      if(result2 == true){
        search_result.push(recipe)
      }
    })

    setSearchedResults(search_result)
  }

  const seeDetails = (recipe_id) => {
    navigation.navigate('RecipeDetails', {recipe_id:recipe_id})
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
                <TextInput onChangeText={(e) => handleChangeSearch(e)} placeholderTextColor="#929292" placeholder="Search" style={styles.InputField}/>
               </View>
               <View style={{height:48}}>
               <AIcon name='filter' color="gray" size={35} />
               </View>
               </View>

                {/* search ends */}

                <View style={{paddingBottom:20}}>
                  <Text style={{fontSize:18, fontFamily:'Roboto-Bold',color:'#181819' }}>All menu</Text>
                </View>

              {searched_results == "" ?
              recipes.map((recipe, index) => (
                <View key={index} style={styles.RecipeCard}>
                    <Image style={{width:'35%', height:'100%', alignSelf:'center', marginRight:'3.5%',borderTopLeftRadius:10, borderBottomLeftRadius:10}} source={{uri:baseUrl+'/static/uploads/'+recipe.recipe_picture}}/>
                    <View style={{flexDirection:'row', alignItems:"flex-start"}}>
                    <View style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                      <TouchableOpacity style={{width:130, marginTop:20}} onPress={() => seeDetails(recipe.recipe_id)}>
                      <Text style={{fontSize:18, fontFamily:'Roboto-Regular', color:'black'}}>{recipe.recipe_name}</Text>
                      </TouchableOpacity>
                      <Text style={{color:'black', fontSize:15}}>Price: {recipe.recipe_price}$</Text>
                      <TouchableOpacity onPress={() => orderRequirements(recipe.recipe_id, recipe.recipe_price)} style={{width:120, height:32, backgroundColor:'#ffb600', justifyContent:'center', alignItems:'center', marginTop:10, borderRadius:18}}>
                          <Text style={{color:'black', fontSize:15, fontFamily:'Roboto-Bold'}}>Order</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', marginTop:10, marginLeft:5}}>
                      <View style={{alignItems:'center'}}>
                      <MIcon name='local-fire-department' color="gray" size={30} />
                      <Text>{recipe.time}</Text>
                      </View>

                      <View style={{alignItems:'center', marginLeft:8}}>
                      <MIcon name='delivery-dining' color="gray" size={30} />
                      <Text>{recipe.delivery_price}$</Text>
                      </View>
                    </View>

                    </View>
                </View>
              )):

              searched_results.map((recipe, index) => (
                <View key={index} style={styles.RecipeCard}>
                    <Image style={{width:'35%', height:'100%', alignSelf:'center', marginRight:'3.5%',borderTopLeftRadius:10, borderBottomLeftRadius:10}} source={{uri:baseUrl+'/static/uploads/'+recipe.recipe_picture}}/>
                    <View style={{flexDirection:'row', alignItems:"flex-start"}}>
                    <View style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                      <TouchableOpacity style={{width:130}} onPress={() => seeDetails(recipe.recipe_id)}>
                      <Text style={{fontSize:18, fontFamily:'Roboto-Regular', color:'black'}}>{recipe.recipe_name}</Text>
                      </TouchableOpacity>

                      <Text style={{color:'black', fontSize:15}}>{recipe.recipe_price}$</Text>
                      <TouchableOpacity onPress={() => orderRequirements(recipe.recipe_id, recipe.recipe_price)} style={{width:120, height:32, backgroundColor:'#ffb600', justifyContent:'center', alignItems:'center', marginTop:15, borderRadius:18}}>
                          <Text style={{color:'black', fontSize:15, fontFamily:'Roboto-Bold'}}>Order</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', marginTop:10, marginLeft:5}}>
                      <View style={{alignItems:'center'}}>
                      <MIcon name='local-fire-department' color="gray" size={30} />
                      <Text>{recipe.time}</Text>
                      </View>

                      <View style={{alignItems:'center', marginLeft:8}}>
                      <MIcon name='delivery-dining' color="gray" size={30} />
                      <Text>{recipe.delivery_price}$</Text>
                      </View>
                    </View>

                    </View>
                </View>
              ))

              }
              </ScrollView>
              
            </SafeAreaView>
  )
}

export default Home;


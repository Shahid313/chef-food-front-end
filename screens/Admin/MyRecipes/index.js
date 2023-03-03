import React, { useEffect, useState } from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, View, Text,Image,ScrollView, TouchableOpacity,TextInput, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import baseUrl from '../../../baseUrl';

const MyRecipes = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [searched_results, setSearchedResults] = useState([])

  useEffect(() => {
    navigation.addListener('focus', () => {
      axios.get(baseUrl+'/get_all_recipes').then((res) => {
        setRecipes(res.data.recipes);
      })
    })
    
  }, []);

  const Edit = (id) => {
    navigation.navigate('UpdateRecipe', {"id":id})
  }

  const deleteRecipe = (id, index) => {
    axios.get(baseUrl+`/delete_recipe?recipe_id=${id}`).then((res) => {
      alert(res.data.msg);
      const data = [...recipes];
      data.splice(index,1);
      setRecipes(data);
    })
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

  return (
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
              {searched_results == "" ?
              recipes.map((recipe, index) => (
                <View key={index} style={styles.RecipeCard}>
                    <Image style={{width:'23%', height:'70%', alignSelf:'center', marginLeft:'4%', marginRight:'3.5%',borderRadius:5,}} source={{uri:baseUrl+'/static/uploads/'+recipe.recipe_picture}}/>
                    <View style={{display:'flex', flexDirection:'column', marginTop:10, width:'100%'}}>
                      <Text style={{fontSize:20,}}>{recipe.recipe_name}</Text>
                      <Text style={{color:'black', fontSize:15}}>{recipe.date}</Text>
                      <View style={{flexDirection:'row',alignSelf:'flex-end', justifyContent:'center', alignItems:'center', width:'100%'}}>
                        <TouchableOpacity onPress={() => Edit(recipe.recipe_id)} style={{marginRight:10}}>
                            <FAIcon name='edit' color="#181819" size={26} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deleteRecipe(recipe.recipe_id, index)}>
                            <FAIcon name='trash-o' color="#181819" size={26} />
                        </TouchableOpacity>

                      </View>
                    </View>
                </View>
              )):
              searched_results.map((recipe, index) => (
                <View key={index} style={styles.RecipeCard}>
                    <Image style={{width:'23%', height:'70%', alignSelf:'center', marginLeft:'4%', marginRight:'3.5%',borderRadius:5,}} source={{uri:baseUrl+'/static/uploads/'+recipe.recipe_picture}}/>
                    <View style={{display:'flex', flexDirection:'column', marginTop:10, width:'100%'}}>
                      <Text style={{fontSize:20,}}>{recipe.recipe_name}</Text>
                      <Text style={{color:'black', fontSize:15}}>{recipe.date}</Text>
                      <View style={{flexDirection:'row',alignSelf:'flex-end', justifyContent:'center', alignItems:'center', width:'100%'}}>
                        <TouchableOpacity onPress={() => Edit(recipe.recipe_id)} style={{marginRight:10}}>
                            <FAIcon name='edit' color="#181819" size={26} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deleteRecipe(recipe.recipe_id, index)}>
                            <FAIcon name='trash-o' color="#181819" size={26} />
                        </TouchableOpacity>

                      </View>
                    </View>
                </View>
              ))
              }
              </ScrollView>
              
            </SafeAreaView>
  )
}

export default MyRecipes;
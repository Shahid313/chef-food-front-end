import React, {useState, useEffect} from 'react';
import {Text, Image,  SafeAreaView, TouchableOpacity, View, Keyboard,ScrollView, TouchableWithoutFeedback, TextInput} from 'react-native'
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseUrl from '../../../baseUrl';
import * as ImagePicker from "react-native-image-picker"
import MIcon from 'react-native-vector-icons/MaterialIcons';
import AIcon from 'react-native-vector-icons/AntDesign';

const UpdateRecipe = ({navigation, route}) => {
    const [recipe_name, setRecipeName] = useState('')
    const [recipe_price, setRecipePrice] = useState('')
    const [recipe_description, setRecipeDescription] = useState('')
    const [recipe_image, setRecipeImage] = useState('')
    const [recipe_ingredients, setRecipeIngredients] = useState('')
    const [delivery_price, setDeliveryPrice] = useState('')
    const [chef_name, setChefName] = useState('')
    const [recipe_time, setRecipeTime] = useState('1')
    const [recipe_id, setRecipeId] = useState('');

    useEffect(() => {
        setRecipeId(route.params.id);
    }, [])

    const IncrementRecipeTime = () => {
        const time = Number(recipe_time) +1
        const string_time = String(time)
        setRecipeTime(string_time)
    }

    const DecrementRecipeTime = () => {
        if(recipe_time != '0'){
        const time = Number(recipe_time) -1
        const string_time = String(time)
        setRecipeTime(string_time)
        }
    }

    const choosePhoto = () => {
        const options = {
          noData:true
        };
        ImagePicker.launchImageLibrary(options, response => {
            if(response.didCancel){
                console.log("Image uploading canceled")
              }else if(response.assets[0].uri){
                setRecipeImage(response.assets[0])
          }
        });
      }

      const updateRecipe = async () => {
        if(recipe_image == ""){
            const data = new FormData();
            data.append('recipe_name', recipe_name)
            data.append('recipe_price', recipe_price)
            data.append('recipe_description', recipe_description)
            data.append('delivery_price', delivery_price)
            data.append('recipe_time', recipe_time)
            data.append('recipe_ingredients', recipe_ingredients)
            data.append('chef_name', chef_name)
            data.append('recipe_id', recipe_id)
    
    
            axios.post(baseUrl+'/update_recipe', data, {
                headers: { "Content-type": "multipart/form-data" }
            }).then((response) => {
                if(response.data.msg == 'Updated Successfully'){
                    alert('Updated Successfully');
                    navigation.navigate('allrecipe');
    
                }
            
            }) 

        }else{
            var image = {
                uri:recipe_image.uri,
                type:recipe_image.type,
                name:recipe_image.fileName
            }
            const data = new FormData();
            data.append('recipe_name', recipe_name)
            data.append('recipe_picture', image)
            data.append('recipe_price', recipe_price)
            data.append('recipe_description', recipe_description)
            data.append('delivery_price', delivery_price)
            data.append('recipe_time', recipe_time)
            data.append('recipe_ingredients', recipe_ingredients)
            data.append('chef_name', chef_name)
            data.append('recipe_id', recipe_id)
    
    
            axios.post(baseUrl+'/update_recipe', data, {
                headers: { "Content-type": "multipart/form-data" }
            }).then((response) => {
                if(response.data.msg == 'Updated Successfully'){
                    alert('Updated Successfully');
                    navigation.navigate('allrecipe');
    
                }
            
            }) 
        }
        
      }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.EnteringData}>
                    <TextInput onChangeText={(e) => setRecipeName(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Recipe name"/>
                    <TextInput onChangeText={(e) => setRecipePrice(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Recipe price"/>
                    <TextInput onChangeText={(e) => setDeliveryPrice(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Delivery price"/>
                
                {/* description starts */}
                <View style={styles.DInput}>
                <TouchableOpacity onPress={() => choosePhoto()} style={styles.EyeButton}>
                <MIcon name='camera-alt' color="#181819" size={25} />
                </TouchableOpacity>
                <TextInput placeholderTextColor="#929292" onChangeText={(e) => setRecipeDescription(e)} multiline={true} placeholder="Description" style={styles.DField}/>
               </View>
               {/* description ends */}

            
                    <TextInput onChangeText={(e) => setRecipeIngredients(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Ingredient 1, Ingredient 2,"/>

                <View style={styles.PasswordInput}>
                <TouchableOpacity onPress={() => IncrementRecipeTime()} style={styles.EyeButton}>
                <MIcon name='add' color="#181819" size={25} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => DecrementRecipeTime()} style={styles.MinusButton}>
                <AIcon name='minus' color="#181819" size={25} />
                </TouchableOpacity>
                

                <TextInput value={recipe_time == "0" ? "Time in minutes":recipe_time} placeholderTextColor="#929292" placeholder="Time in minutes" style={styles.InputField}/>

               </View>

               <TextInput onChangeText={(e) => setChefName(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Chef name"/>
            
            <TouchableOpacity onPress={(() => updateRecipe())} style={styles.SignUpButton}>
                    <Text style={styles.SignUpButtonText}>Update</Text>
            </TouchableOpacity>
                </View>

            </SafeAreaView>
            </ScrollView>
            </TouchableWithoutFeedback>
    )
}

export default UpdateRecipe;
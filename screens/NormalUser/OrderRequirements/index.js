import React, { useState, useEffect } from 'react';
import {Text, Image,  SafeAreaView, TouchableOpacity, View, Keyboard,ScrollView, TouchableWithoutFeedback, TextInput, Alert} from 'react-native'
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseUrl from '../../../baseUrl';
import * as ImagePicker from "react-native-image-picker"



const OrderRequirements = (props) => {
    const [customer_name, setCustomer_name] = useState('');
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [recipe_price, setRecipePrice] = useState('');
    const [recipe_id, setRecipeId] = useState('');

    useEffect(() => {
        setRecipeId(props.route.params.recipe_id)
        setRecipePrice(props.route.params.recipe_price)

    },[]);


   const OrderRecipe = () => {
        const data = new FormData()
        data.append('customer_name',customer_name)
        data.append('address',address)
        data.append('order_quantity',quantity)
        data.append('total_price',Number(quantity)*Number(recipe_price))
        data.append('ordered_recipe_id',recipe_id)
        data.append('status',"notDelivered")

        axios.post(baseUrl+'/add_order', data).then((res) => {
            if(res.data.msg == "Ordered Successfully"){
                alert("Ordered Successfully");
                props.navigation.goBack()
            }
        })  
    }


    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
            <SafeAreaView style={styles.container}>
                    <View style={styles.AddRecipe}>
                    <Text style={styles.AddRecipeText}>Order Recipe</Text>
                    </View>
                <View style={styles.EnteringData}>
                    <TextInput onChangeText={(e) => setCustomer_name(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Customer Name"/>
                    <TextInput onChangeText={(e) => setAddress(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Address..."/>
                    <TextInput style={styles.EmailInput} onChangeText={(e) => setQuantity(e)} placeholderTextColor="#929292" placeholder="Quantity"/>
            
            <TouchableOpacity onPress={() => OrderRecipe()} style={styles.SignUpButton}>
                    <Text style={styles.SignUpButtonText}>Order</Text>
            </TouchableOpacity>
                </View>
            </SafeAreaView>
            </ScrollView>
            </TouchableWithoutFeedback>
    )
}

export default OrderRequirements;
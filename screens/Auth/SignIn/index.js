import React,{useState, useEffect} from "react";
import {Text, Image,  SafeAreaView, TouchableOpacity, View, Keyboard,ScrollView, TouchableWithoutFeedback, TextInput, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import baseUrl from "../../../baseUrl";
import styles from './styles';


const SignIn = ({navigation}) => {
    const [showPass, setShowPass] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goToSignUp = () => {
        navigation.navigate('SignUp');
    }


    const Login = () => {
        const data = new FormData()
        data.append('email', email)
        data.append('password', password)

        axios.post(baseUrl+'/login', data).then((res) => {
            console.log(res.data.msg);
            if(res.data.msg == 'logged in successfully'){
                AsyncStorage.setItem(
                    'loggedIn',
                    JSON.stringify({"id":res.data.user.user_id, "name":res.data.user.name, "email":res.data.user.email, "role":res.data.user.role}) 
                  );


                if(res.data.user.role == 'admin'){
                    navigation.reset({
                        index:0,
                        routes:[{name:'Admin'}],
                       
                    });
                }else{
                    navigation.reset({
                        index:0,
                        routes:[{name:'Home'}],
                       
                    });
                }
                  
            }else{
                Alert('The password or email is invalid')
            }
        })
    }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={{width:250, height:250}} source={require('../../../assets/logo.png')}/>
                </View>
                <View style={styles.EnteringData}>
                    <TextInput onChangeText={(e) => setEmail(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Email"/>
                    
                <View style={styles.PasswordInput}>
                {showPass == true ? 
                <TouchableOpacity onPress={() => setShowPass(!(showPass))} style={styles.EyeButton}>
                <Image source={require('../../../assets/eye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => setShowPass(!(showPass))} style={styles.EyeButton}>
                <Image source={require('../../../assets/crosseye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
                }
                

                <TextInput onChangeText={(e) => setPassword(e)} placeholderTextColor="#929292" secureTextEntry={showPass} placeholder="Password" style={styles.InputField}/>

               </View>
            
            <TouchableOpacity onPress={() => Login()} style={styles.SignUpButton}>
                    <Text style={styles.SignUpButtonText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.AlreadyHaveAccount}>
                <Text style={styles.AlreadyHaveAccountText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => goToSignUp()} style={styles.SignInLink}>
                    <Text style={styles.AlreadyHaveAccountSignInLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
                </View>
            </SafeAreaView>
            </ScrollView>
            </TouchableWithoutFeedback>
    )
}

export default SignIn;
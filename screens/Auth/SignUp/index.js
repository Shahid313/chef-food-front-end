import React,{useState, useEffect} from "react";
import {Text, Image,  SafeAreaView, TouchableOpacity, View, Keyboard,ScrollView, TouchableWithoutFeedback, TextInput} from 'react-native'
import styles from './styles'
import axios from 'axios';
import baseUrl from "../../../baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

const _retrieveData = async (navigation) => {

    const value = await AsyncStorage.getItem('loggedIn');
    const parse = JSON.parse(value)
    if (parse != null) {
        if(parse.role == 'admin'){
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
        return false
    }
  
};

const SignUp = ({navigation}) => {
    const [showPass, setShowPass] = useState(true);
    const [showConfirmPass, setShowConfirmPass] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [consfirmpassword, setConfirmPassword] = useState('');

    useEffect(() => {
        _retrieveData(navigation);
    },[]);

    const Login = () => {
        navigation.navigate('SignIn');
    }

    const Register = () => {
        if(password != consfirmpassword){
            alert('Passwords do not match');
        }else{
            const data = new FormData()
            data.append('name', name)
            data.append('email', email)
            data.append('password', password)

            axios.post(baseUrl+'/register', data).then((res) => {
                if(res.data.msg == 'Successfully registered'){
                    alert("Registered Successfully");
                    navigation.navigate('SignIn')
                }
            })
        }
        
    }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={{width:250, height:250}} source={require('../../../assets/logo.png')}/>
                </View>
                <View style={styles.EnteringData}>
                    <TextInput onChangeText={(e) => setName(e)} style={styles.NameInput} placeholderTextColor="#929292" placeholder="Name"/>
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
               <View style={styles.ConfirmPasswordInput}>
                {showConfirmPass == true ? 
                <TouchableOpacity onPress={() => setShowConfirmPass(!(showConfirmPass))} style={styles.EyeButton}>
                <Image source={require('../../../assets/eye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => setShowConfirmPass(!(showConfirmPass))} style={styles.EyeButton}>
                <Image source={require('../../../assets/crosseye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
                }
                

                <TextInput onChangeText={(e) => setConfirmPassword(e)} placeholderTextColor="#929292" secureTextEntry={showConfirmPass} placeholder="Confirm Password" style={styles.InputField}/>

               </View>
            <TouchableOpacity onPress={() => Register()} style={styles.SignUpButton}>
                    <Text style={styles.SignUpButtonText}>Sign up</Text>
            </TouchableOpacity>

            <View style={styles.AlreadyHaveAccount}>
                <Text style={styles.AlreadyHaveAccountText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => Login()} style={styles.SignInLink}>
                    <Text style={styles.AlreadyHaveAccountSignInLink}>Login</Text>
                </TouchableOpacity>
            </View>
                </View>
            </SafeAreaView>
            </ScrollView>
            </TouchableWithoutFeedback>
    )
}

export default SignUp;
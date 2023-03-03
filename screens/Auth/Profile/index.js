import React,{useEffect, useState} from "react";
import {Text, Image,  SafeAreaView, TouchableOpacity, View,Dimensions, Keyboard,ScrollView,StyleSheet, TouchableWithoutFeedback, TextInput, Alert} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import baseUrl from '../../../baseUrl';

const Profile = ({navigation}) => {
    const [showPass, setShowPass] = useState(true)
    const [showConfirmPass, setShowConfirmPass] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [password, setPasword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')

    const Logout = () => {
        AsyncStorage.removeItem('loggedIn');
        navigation.navigate("SignIn");
    }

    useEffect(() => {
        getUserData();
    },[])

    const getUserData = async () => {
        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value)

        setName(parse.name)
        setEmail(parse.email)
        setRole(parse.role)
        setUserId(parse.id)
    }

    const History = () => {
        navigation.navigate("History");
    }

    const updateAccount = () => {
        if(password != confirmPassword){
            alert("Passwords does not match")
        }else if(password == "" && confirmPassword == ""){
            const data = new FormData()
            data.append('name', name)
            data.append('email', email)
            data.append('userId', userId)

            axios.post(baseUrl+'/update_profile', data).then((res) => {
                alert(res.data.msg)
                AsyncStorage.removeItem('loggedIn');
                navigation.navigate("SignIn");
            })
        }else{
            const data = new FormData()
            data.append('name', name)
            data.append('email', email)
            data.append('password', password)
            data.append('userId', userId)

            axios.post(baseUrl+'/update_profile',data).then((res) => {
                alert(res.data.msg)
                AsyncStorage.removeItem('loggedIn');
                navigation.navigate("SignIn");
            })
        }
    }




    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
            <SafeAreaView style={styles.container}>
               
                <View style={styles.EnteringData}>
                    <Text style={{fontFamily:"Roboto-Bold",fontSize:23, marginBottom:25, color:'black'}}>Your Informations</Text>

                    <Text style={{fontFamily:'Roboto-Bold', fontSize:18, color:'black',marginBottom:12}}>First and last name</Text>
                    <TextInput value={name} onChangeText={(e) => setName(e)} style={styles.NameInput} placeholderTextColor="#929292" placeholder="Name"/>

                    <Text style={{fontFamily:'Roboto-Bold', fontSize:18, color:'black', marginTop:5}}>Email</Text>
                    <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Email"/>
                
                <Text style={{fontFamily:'Roboto-Bold', fontSize:18, color:'black', marginTop:5}}>Password</Text>
                <View style={styles.PasswordInput}>
                {showPass == true ? 
                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.EyeButton}>
                <Image source={require('../../../assets/eye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.EyeButton}>
                <Image source={require('../../../assets/crosseye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
                }
                

                <TextInput onChangeText={(e) => setPasword(e)} placeholderTextColor="#929292" secureTextEntry={showPass} placeholder="Password" style={styles.InputField}/>
               </View>

               <Text style={{fontFamily:'Roboto-Bold', fontSize:18, color:'black', marginTop:5}}>Password</Text>
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
            <TouchableOpacity onPress={() => updateAccount()}  style={styles.SignUpButton}>
                    <Text style={styles.SignUpButtonText}>Save</Text>
            </TouchableOpacity>

            {role == "admin" ?
            <TouchableOpacity onPress={() => History()} style={[styles.history_btn,{marginTop:50}]}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Image source={require('../../../assets/history.png')} style={styles.imageStyle}/>
                <Text style={{color:"black", marginLeft:30}}>History</Text>
                </View>
                <Image source={require('../../../assets/right_arrow.png')} style={styles.imageStyle}/>
            </TouchableOpacity>:null}


            <TouchableOpacity onPress={() => Logout()} style={styles.logout_btn}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Image source={require('../../../assets/logoutIcon.png')} style={styles.imageStyle}/>
                <Text style={{color:"black",marginLeft:30}}>Logout</Text>
                </View>
                
                <Image source={require('../../../assets/right_arrow.png')} style={styles.imageStyle}/>
            </TouchableOpacity>

          
                </View>
            </SafeAreaView>
            </ScrollView>
            </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container:{
        width:windowWidth,
        height:'100%',
        backgroundColor:'#FFFFFF',
    },

    EnteringData:{
        width:'100%',
        padding:'5%'
    },

    NameInput:{
        backgroundColor:'#FFFFFF',
        borderColor:'#6667ab',
        borderRadius:20,
        borderWidth:1,
        width:'100%',
        height:48,
        fontSize:17,
        color:'#929292',
        paddingLeft:10,
        marginBottom:10
    },

    EmailInput:{
        backgroundColor:'#FFFFFF',
        borderColor:'#6667ab',
        borderWidth:1,
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:20,
        color:'#929292',
        paddingLeft:10,
        marginTop:'3%',
        marginBottom:10
        
    },

    PasswordInput:{
        backgroundColor:'#FFFFFF',
        borderColor:'#6667ab',
        borderRadius:20,
        borderWidth:1,
        width:'100%',
        height:48,
        fontSize:17,
        marginTop:'3%',
        color:'#929292',
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        marginBottom:10
    },

    ConfirmPasswordInput:{
        backgroundColor:'#FFFFFF',
        borderColor:'#6667ab',
        borderWidth:1,
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:20,
        marginTop:'3%',
        color:'#929292',
        flexDirection:'row-reverse',
        justifyContent:'space-between'
    },

    imageStyle: {
        padding: 0,
        height: 24,
        width: 24,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    InputField:{
        flex:1,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
    },

    SignUpButton:{
        width:'100%',
        height:48,
        borderRadius:24,
        backgroundColor:'#ffb600',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10%',
        marginBottom:10
    },

    CancelButton:{
        width:'100%',
        height:48,
        borderRadius:24,
        backgroundColor:'#F5F5F7',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%'
    },

    CancelButtonText:{
        color:'black',
        fontSize:20
    },

    SignUpButtonText:{
        color:'#FFFFFF',
        fontSize:20
    },

    EyeButton:{
        margin:12,
        marginRight:20,
    },

    SignInLink:{
        marginLeft:5
    },

    AlreadyHaveAccount:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'8%',
        marginBottom:'10%'
    },

    AlreadyHaveAccountSignInLink:{
        color:'#46200b',
        fontSize:17
    },

    AlreadyHaveAccountText:{
        fontSize:17,
        color:'#ffb600'
    },
    history_btn:{
        width:'100%',
        height:48,
        borderRadius:15,
        
        alignSelf:'center',
        justifyContent:"space-between",
        flexDirection:'row',
        marginTop:10
    },
    logout_btn:{
        width:'100%',
        height:48,
        borderRadius:15,
        
        alignSelf:'center',
        justifyContent:"space-between",
        flexDirection:'row',
        marginTop:10,
    }
})

export default Profile;
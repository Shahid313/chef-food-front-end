import {StyleSheet, Dimensions} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
        width:windowWidth,
        height:windowHeight,
        backgroundColor:'#F5F5F7',
    },

    logoContainer:{
        width:windowWidth,
        height:windowHeight/3,
        justifyContent:'center',
        alignItems:'center'
    },

    EnteringData:{
        width:'100%',
        padding:'5%'
    },

    NameInput:{
        backgroundColor:'#FFFFFF',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        color:'#929292',
        paddingLeft:10
    },

    EmailInput:{
        backgroundColor:'#FFFFFF',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        color:'#929292',
        paddingLeft:10,
        marginTop:'3%'
        
    },

    PasswordInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        marginTop:'3%',
        color:'#929292',
        flexDirection:'row-reverse',
        justifyContent:'space-between'
    },

    ConfirmPasswordInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
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
        borderRadius:15,
        backgroundColor:'#ffb600',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'15%'
    },

    RecipePicture:{
        width:'100%',
        height:48,
        borderRadius:15,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'7%'
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

    AddRecipe:{
        width:windowWidth,
        alignItems:'center',
        paddingTop:20
    },

    AddRecipeText:{
        color:'#181819',
        fontSize:30,
        fontWeight:'700'
    }
})

export default styles;
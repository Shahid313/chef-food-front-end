import {StyleSheet, Dimensions} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        width:windowWidth,
        height:windowHeight,
        backgroundColor:'#FFFFFF',

    },

    RecipeCard:{
        width:windowWidth,
        height:windowHeight /5,
        borderRadius:10,
        marginBottom:10,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#F5F5F7'

    },

    EyeButton:{
        margin:12,
        marginRight:20,
    },

    imageStyle: {
        padding: 0,
        height: 28,
        width: 28,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    PasswordInput:{
        backgroundColor:'#F2F2F7',
        width:'80%',
        height:48,
        fontSize:17,
        borderRadius:30,
        marginTop:'3%',
        marginBottom:20,
        color:'#929292',
        flexDirection:'row-reverse',
        justifyContent:'space-between'
    },

    InputField:{
        flex:1,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
    },
})

export default styles;

import {StyleSheet, Dimensions} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        width:windowWidth,
        height:'100%',
        backgroundColor:'#FFFFFF',

    },

    RecipeCard:{
        width:windowWidth,
        height:windowHeight /7,
        marginBottom:10,
        borderRadius:5,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#F5F5F7'

    },

    AddRecipe:{
        width:windowWidth,
        alignItems:'center',
        paddingTop:20
    },

    AddRecipeText:{
        color:'#FFFFFF',
        fontSize:30,
        fontWeight:'300'
    },

    //For search input

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

    EyeButton:{
        margin:12,
        marginRight:20,
    },
})

export default styles;
import {StyleSheet, Dimensions} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        width:windowWidth,
        height:windowHeight,
        backgroundColor:'#FFFFFF',
    },

    orderImage:{
        width:windowWidth,
        height:windowHeight/3.2,
    },

    recipeImage:{
        width:'100%',
        height:'100%'
    },

    orderedRecipeName:{
        color:'black',
        fontSize:30,
        fontFamily:'Roboto-Bold'
    },

    recipeTitleBox:{
        width:'100%',
        paddingLeft:'5%',
        paddingRight:'10%'
    },

    recipeDetailsCard:{
        backgroundColor:'white',
        width:windowWidth,
        height:windowHeight,
    },

    recipeName:{
        color:'#FFFFFF',
        fontSize:23,
        marginBottom:5
    },

    recipeQty:{
        color:'#FFFFFF',
        fontSize:23,
        marginBottom:5
    },

    deliveryAddress:{
        color:'#FFFFFF',
        fontSize:23,
    },

    deliveryAddressText:{
        color:'#FFFFFF',
        fontSize:13
    },

    deliveredBtn:{
        width:120,
        height:35,
        marginTop:25,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'5%',
        borderRadius:25
    },

    undeliveredBtn:{
        width:120,
        height:35,
        marginTop:25,
        backgroundColor:'#ffb600',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'5%',
        borderRadius:25
    },

    deliveryText:{
        color:'white',
        fontSize:16
    }
})

export default styles;
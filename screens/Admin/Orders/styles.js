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
        borderRadius:5,
        marginBottom:10,
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
})

export default styles;
import {Text,Image,TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import AddRecipe from '../screens/Admin/AddRecipe';
import Profile from '../screens/Auth/Profile';
import MyRecipes from '../screens/Admin/MyRecipes';
import Orders from '../screens/Admin/Orders'

const BottomTab = createBottomTabNavigator();

function AdminBottomNavigation(){

    return(
    <BottomTab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor:'#FFFFFF',
        height: 60,
        justifyContent: 'center'
      }}}>
  
  
        
        <BottomTab.Screen options={ ({route}) => ({
            headerBackVisible:false, 
            headerTitleAlign: 'center',
            headerTitle:'All Recipes',
            headerTintColor:'#181819',
            headerLeft: () => <Image
             resizeMode="contain"
             style={{ width: 70, height:60 }}
             source={require('../assets/logo.png')} />,
             tabBarShowLabel: false, 
            tabBarIcon:({focused}) => {
              if (focused) {
                return(
                  <MIcon name='food-bank' color="#181819" size={32} />
                )
              }else{
                return(
                  <MIcon name='food-bank' color="#F5F5F7" size={32} />
                )
              }
            }
          })} name="allrecipe" component={MyRecipes} />
  
   
        <BottomTab.Screen options={ ({route}) => ({
            tabBarShowLabel: false,
            headerBackVisible:false, 
             headerTitleAlign: 'center',
             headerTitle:'Add Recipe',
             headerTintColor:'#181819',
             headerLeft: () => <Image
              resizeMode="contain"
              style={{ width: 70, height:60 }}
              source={require('../assets/logo.png')} />, 
            tabBarIcon:({focused}) => {
              if (focused) {
                return(
                  <MIcon name='add-circle' color="#181819" size={32} />
                )
              }else{
                return(
                  <MIcon name='add-circle' color="#F5F5F7" size={32} />
                )
              }
            }
          })} name="AddRecipe" component={AddRecipe} />
  
  
        <BottomTab.Screen options={ ({route}) => ({
            headerBackVisible:false, 
            headerTitleAlign: 'center',
            headerTitle:'Orders',
            headerTintColor:'#181819',
            headerLeft: () => <Image
             resizeMode="contain"
             style={{ width: 70, height:60 }}
             source={require('../assets/logo.png')} />,
            tabBarShowLabel: false, 
            tabBarIcon:({focused}) => {
              if (focused) {
                return(
                  <MIcon name='fastfood' color="#181819" size={32} />
                )
              }else{
                return(
                  <MIcon name='fastfood' color="#F5F5F7" size={32} />
                )
              }
            }
          })} name="Orders" component={Orders} />
  
        <BottomTab.Screen options={ ({route}) => ({
            headerBackVisible:false, 
            headerTitleAlign: 'center',
            headerTitle:'Profile',
            headerTintColor:'#181819',
            headerLeft: () => <Image
             resizeMode="contain"
             style={{ width: 70, height:60 }}
             source={require('../assets/logo.png')} />,
            tabBarShowLabel: false,
            tabBarIcon:({focused}) => {
              if (focused) {
                return(
                  <MIcon name='person' color="#181819" size={32} />
                )
              }else{
                return(
                  <MIcon name='person' color="#F5F5F7" size={32} />
                )
              }
            }
          })} name="Profile" component={Profile} />
  
    </BottomTab.Navigator>
    )
  }

  export default AdminBottomNavigation;
import {Text} from 'react-native'
import {Image,TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/NormalUser/Home';
import Profile from '../screens/Auth/Profile';

const Tab = createBottomTabNavigator();

function NormalUserBottomNavigation(){
    return(
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor:'#FFFFFF',
        height: 60,
        justifyContent: 'center'
      }}}>
  
  
        
        <Tab.Screen options={ ({route}) => ({
            headerBackVisible:false, 
            headerTitleAlign: 'center',
            headerTitle:() => (
              <Text style={{fontFamily:'Roboto-Bold', fontSize:20, color:'#181819'}}>All Recipes</Text>
            ),
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
          })}   name="normal_user_home" component={Home} />
  
  
        <Tab.Screen options={ ({route}) => ({
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
  
    </Tab.Navigator>
    )
  }

  export default NormalUserBottomNavigation
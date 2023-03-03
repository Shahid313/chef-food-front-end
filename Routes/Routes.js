import {Image,TouchableOpacity,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/Auth/SignUp';
import SignIn from '../screens/Auth/SignIn';
import UpdateRecipe from '../screens/Admin/UpdateRecipe';
import OrderDetails from '../screens/Admin/OrderDetails';
import OrderRequirements from '../screens/NormalUser/OrderRequirements';
import History from '../screens/Admin/History';
import RecipeDetails from '../screens/NormalUser/RecipeDetails';
import NormalUserBottomNavigation from './NormalUserBottomNavigation';
import AdminBottomNavigation from './AdminBottomNavigation';

const Stack = createNativeStackNavigator();

const Routes = () => {
  

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUp} />
          <Stack.Screen options={{headerShown:false}} name="SignIn" component={SignIn} />
  
          <Stack.Screen name="Admin" 
          options={{
            headerShown:false
          }} 
          component={AdminBottomNavigation} />
  
          <Stack.Screen name="Home" 
          options={{
            headerShown:false
          }} 
          component={NormalUserBottomNavigation} />
  
          <Stack.Screen options={{
            headerTitleAlign: 'center',
            headerTitle:'My Recipes',
            headerTintColor:'#181819'
          }} name="UpdateRecipe" component={UpdateRecipe} />
  
          <Stack.Screen options={{
            headerTitleAlign: 'center',
            headerTitle:'Order Details',
            headerTintColor:'#181819'
          }} name="OrderDetails" component={OrderDetails} />
  
          <Stack.Screen options={{
            headerTitleAlign: 'center',
            headerTitle:'Order',
            headerTintColor:'#181819'
          }} name="OrderRequirements" component={OrderRequirements} />
  
          <Stack.Screen options={{
            headerTitleAlign: 'center',
            headerTitle:'Delivered Orders',
            headerTintColor:'#181819'
          }} name="History" component={History} />
  
            <Stack.Screen options={{
            headerTitleAlign: 'center',
            headerTitle:'Recipe Details',
            headerTintColor:'#181819'
          }} name="RecipeDetails" component={RecipeDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  export default Routes;
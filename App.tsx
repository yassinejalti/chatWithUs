import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// general css
import styles from './assets/css/style';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// components
import Register from './components/Register';
import Chat from './components/Chat';
import Users from './components/Users';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Register' >
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name='Users' component={Users} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default function entryPoint(){
  return <App/>;
}
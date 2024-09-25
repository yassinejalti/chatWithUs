import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from 'react';
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

// Context provider
import { WebSocketProvider } from './contexts/webSocketContext';

// middleware logic
const withMiddleware = (WrappedComponent:any) => {
  return (props: any) => {
    const navigation = useNavigation<any>();

    // condition logic
    let isAuthenticated = false;
    


    useEffect(() => {
      if (!isAuthenticated) {
        navigation.navigate('Register');
      }
    }, [isAuthenticated, navigation]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};


const ChatWithMiddleware = withMiddleware(Chat);
const UsersWithMiddleware = withMiddleware(Users);
const RegisterWithMiddleware = "";

function App() {
  return (
    <WebSocketProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Register'>
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Chat' component={ChatWithMiddleware} />
          <Stack.Screen name='Users' component={UsersWithMiddleware} />
        </Stack.Navigator>
      </NavigationContainer>
    </WebSocketProvider>
  );
}



export default function entryPoint(){
  return <App/>;
}
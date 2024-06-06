import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import { UserContext } from '../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


type RootStackType = {
    Home: undefined,
    Login: undefined
}


const Stack = createNativeStackNavigator<RootStackType>();

const Router = () => {

    const { setUser } = useContext(UserContext);
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
                if (username) {
                    setInitialRoute('Home');
                } else {
                    setInitialRoute('Login');
                }
            } catch (e) {
                console.error("Error", e);
                setInitialRoute('Login');
            }
        };

        checkUser();
    }, [setUser]);

    if (initialRoute === null) {
        return null;
    }


    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default Router
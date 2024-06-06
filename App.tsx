import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeScreen from './src/Screens/HomeScreen';
import { StoryProvider } from './src/Context/StoryData';
import LoginScreen from './src/Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/Router/Router';
import { UserProvider } from './src/Context/UserContext';

export default function App() {
  return ( 
    <SafeAreaView style={style.AndroidSafeArea}>
      <UserProvider>
        <StoryProvider>
          <NavigationContainer>
            <Router></Router>
          </NavigationContainer>
        </StoryProvider>
      </UserProvider>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

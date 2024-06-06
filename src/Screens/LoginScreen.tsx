import { View, Text, TextInput, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { selectProfile, takeMedia } from '../Components/MediaFunctions';
import { StoryContext } from '../Context/StoryData';
import { UserContext } from '../Context/UserContext';
import LottieView from 'lottie-react-native';

const LoginScreen = ({ navigation }) => {

    const { setUser } = useContext(UserContext);


    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<string>("")


    const handleSave = () => {
        setUser({ username: name, profileImage: image });
        navigation.navigate('Home')
    };



    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 15 }}>

                <Image source={require('../../assets/mystory.png')} style={{ width: 250, height: 250, resizeMode: 'contain' }}></Image>

                <Pressable onPress={() => selectProfile(setImage)} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        image.length > 0 ? <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={{ uri: image }} ></Image> : <AntDesign name="plus" size={24} color="black" />
                    }
                </Pressable>
                <TextInput style={{ padding: 8, borderWidth: 3, borderRadius: 8, width: '50%' }} value={name} onChangeText={(text) => setName(text)} placeholder='Username'></TextInput>

                <Pressable disabled={name.length == 0 || image.length == 0} style={{ padding: 15, backgroundColor: 'blue', borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => handleSave()}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Kaydet</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen
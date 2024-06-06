import { View, Text, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { StoryContext } from '../Context/StoryData';
import StoryScreen from './StoryScreen';
import { selectMedia, takeMedia } from '../Components/MediaFunctions';
import { UserContext } from '../Context/UserContext';

const HomeScreen = () => {

    const { username, profileImage } = useContext(UserContext);
    const { addStory } = useContext(StoryContext);


    return (
        <View style={{ flex: 1 }}>


            <StoryScreen></StoryScreen>

            <View style={{ marginBottom: 15, alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', gap: 25, flex: 1 }}>
                <View>
                    <Pressable onPress={() => takeMedia(addStory)} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name="plus" size={24} color="black" />
                    </Pressable>

                    <Pressable onPress={() => selectMedia(addStory)} style={{ position: 'absolute', width: 30, height: 30, borderRadius: 50, borderWidth: .5, alignItems: 'center', justifyContent: 'center', bottom: 0, right: 0, backgroundColor: 'white' }}>
                        <AntDesign name="camera" size={24} color="black" />
                    </Pressable>
                </View>

                <View style={{ alignItems: 'center' , gap : 15 }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2 }} source={profileImage ? { uri: profileImage } : require('../../assets/empty.png')}></Image>
                    <Text style={{ textAlign: 'center' , fontWeight : '500' }}>Hoşgeldin , <Text style={{ fontWeight: 'bold' , textTransform : 'uppercase' }}>{username} </Text>bugün eklemek istediğin anılar için sabırsızlanıyorum!! </Text>
                </View>
            </View>


        </View>
    )
}

export default HomeScreen
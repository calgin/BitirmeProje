import * as ImagePicker from 'expo-image-picker';
import { useContext } from 'react';
import { StoryContext } from '../Context/StoryData';


export const selectMedia = async (addStory) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        const { uri, type } = result.assets[0];
        addStory({ uri, type: type.startsWith('image') ? 'image' : 'video' });
    }
};

export const selectProfile = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        const { uri } = result.assets[0];
        setImage(uri);
    }
};

export const takeMedia = async (addStory) => {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        const { uri, type } = result.assets[0];
        addStory({ uri, type: type.startsWith('image') ? 'image' : 'video' });
    }
};
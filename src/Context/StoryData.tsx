import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoryContext = createContext({
    storyData: [],
    addStory: () => { },
    removeStory: () => { },
});

export const StoryProvider = ({ children }: any) => {
    const [storyData, setStoryData] = useState([]);


    const storeData = async (stories: any) => {
        try {
            const jsonValue = JSON.stringify(stories);
            await AsyncStorage.setItem('storyData', jsonValue);
        } catch (e) {
            console.error('Error', e);
        }
    };

    const loadData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('storyData');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Error', e);
            return [];
        }
    };

    const addStory = (media: any) => {
        const updatedStoryData = [...storyData, media];
        setStoryData(updatedStoryData);
        storeData(updatedStoryData);
    };

    const removeStory = (uri: any) => {
        const updatedStoryData = storyData.filter(story => story.uri !== uri);
        setStoryData(updatedStoryData);
        storeData(updatedStoryData);
    };

    useEffect(() => {
        const fetchData = async () => {
            const loadedStories = await loadData();
            setStoryData(loadedStories);
        };

        fetchData();
    }, []);

    return (
        <StoryContext.Provider value={{ storyData, addStory, removeStory }}>
            {children}
        </StoryContext.Provider>
    );
};

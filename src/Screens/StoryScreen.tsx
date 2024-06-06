import React, { useContext, useState } from 'react';
import { View, Image, FlatList, Pressable, StyleSheet, Modal, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { StoryContext } from '../Context/StoryData';
import { AntDesign } from '@expo/vector-icons';

const StoryScreen = () => {
    const { storyData, removeStory } = useContext(StoryContext);
    const { width } = Dimensions.get('window');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleStoryPress = (index) => {
        setCurrentIndex(index);
        setModalVisible(true);
    };

    const handleNext = () => {
        if (currentIndex < storyData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <Pressable onPress={() => handleStoryPress(index)} style={styles.mediaContainer}>
                    {item.type === 'image' ? (
                        <Image source={{ uri: item.uri }} style={styles.image} />
                    ) : (
                        <Video
                            source={{ uri: item.uri }}
                            style={styles.video}
                            useNativeControls
                            resizeMode="contain"
                        />
                    )}
                </Pressable>
                <Pressable onPress={() => removeStory(item.uri)} style={styles.closeButton}>
                    <AntDesign name="closecircle" size={24} color="red" />
                </Pressable>
            </View>
        );
    };

    const renderModalContent = () => {
        if (storyData.length === 0 || currentIndex >= storyData.length) {
            return null;
        }

        const currentItem = storyData[currentIndex];
        return (
            <View style={styles.modalContent}>
                {currentItem.type === 'image' ? (
                    <Image source={{ uri: currentItem.uri }} style={styles.fullImage} />
                ) : (
                    <Video
                        source={{ uri: currentItem.uri }}
                        style={styles.fullVideo}
                        useNativeControls
                        resizeMode="contain"
                        shouldPlay
                    />
                )}
                <View style={styles.navigationButtons}>
                    <Pressable onPress={handlePrevious} style={styles.navButton} disabled={currentIndex === 0}>
                        <AntDesign name="caretleft" size={30} color={currentIndex === 0 ? "grey" : "white"} />
                    </Pressable>
                    <Pressable onPress={handleNext} style={styles.navButton} disabled={currentIndex === storyData.length - 1}>
                        <AntDesign name="caretright" size={30} color={currentIndex === storyData.length - 1 ? "grey" : "white"} />
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={storyData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    {renderModalContent()}
                    <Pressable onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
                        <AntDesign name="closecircle" size={30} color="white" />
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: 15
    },
    itemContainer: {
        marginBottom: 20,
        position: 'relative',
    },
    mediaContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'stretch',
        borderRadius: 50
    },
    video: {
        width: 80,
        height: 80,
        resizeMode: 'stretch',
        borderRadius: 50
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    modalContent: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    fullVideo: {
        width: '100%',
        height: '100%',

    },
    closeModalButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        position: 'absolute',
        bottom: 20,
        marginVertical : 10
    },
    navButton: {
        padding: 10,
    },
});

export default StoryScreen;

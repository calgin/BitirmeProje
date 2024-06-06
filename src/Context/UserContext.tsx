import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext({
  username: '',
  profileImage: '',
  isLoggedIn: false,
  setUser: () => { },
});

export const UserProvider = ({ children }: any) => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const storeData = async (user: any) => {
    try {
      await AsyncStorage.setItem('username', user.username);
      await AsyncStorage.setItem('profileImage', user.profileImage);
    } catch (e) {
      console.error('Error', e);
    }
  };

  const loadData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedProfileImage = await AsyncStorage.getItem('profileImage');
      if (storedUsername !== null) {
        setUsername(storedUsername);
      }
      if (storedProfileImage !== null) {
        setProfileImage(storedProfileImage);
      }
    } catch (e) {
      console.error('Error', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const setUser = (user: any) => {
    setUsername(user.username);
    setProfileImage(user.profileImage);
    storeData(user);
  };

  return (
    <UserContext.Provider value={{ username, profileImage, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

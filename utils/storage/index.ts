import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const loadItem = async (key: string) => {
  return AsyncStorage.getItem(key);
};

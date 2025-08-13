import AsyncStorage from '@react-native-async-storage/async-storage';


const DISCS_KEY = '@discs_v1';

export async function saveDiscsToStorage(discs) {
  try {
    await AsyncStorage.setItem(DISCS_KEY, JSON.stringify(discs));
  } catch (e) {
    console.error('Failed to save discs', e);
  }
}

export async function loadDiscsFromStorage() {
  try {
    const raw = await AsyncStorage.getItem(DISCS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load discs', e);
    return [];
  }
}

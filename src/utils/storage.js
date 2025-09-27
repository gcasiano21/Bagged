import AsyncStorage from "@react-native-async-storage/async-storage";

const DISCS_KEY = "@discs";

export async function saveDiscsToStorage(discs) {
    try {
        await AsyncStorage.setItem(DISCS_KEY, JSON.stringify(discs));
    } catch (e) {
        console.error("Failed to save discs", e);
    }
}

export async function loadDiscsFromStorage() {
    try {
        const rawData = await AsyncStorage.getItem(DISCS_KEY);
        if (rawData) {
            return JSON.parse(rawData);
        } else {
            return [];
        }
    } catch (e) {
        console.error("Failed to load discs", e);
        return [];
    }
}

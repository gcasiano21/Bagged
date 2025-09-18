import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import * as Location from 'expo-location';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDiscs } from '../context/DiscContext';
import Toast from 'react-native-toast-message';

export default function ThrowTrackerScreen() {
  const { discs, addThrow } = useDiscs();
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedDisc, setSelectedDisc] = useState(null);
  const [open, setOpen] = useState(false);
  const [startLocation, setStartLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const startThrow = async () => {
    if (!selectedDisc) return Alert.alert('Select a disc first!');
    if (!hasPermission) return Alert.alert('Location permission not granted!');
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    setStartLocation(location.coords);
    Toast.show({
      type: 'info',
      text1: 'Throw started!',
      text2: 'Press "End Throw" when you finish.',
      visibilityTime: 3000, 
    });
  };

  const endThrow = async () => {
    if (!selectedDisc) return Alert.alert('Select a disc first!');
    if (!startLocation) return Alert.alert('Press Start Throw first!');
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,  
    });
    const distance = getDistanceFromLatLonInMeters(
      startLocation.latitude,
      startLocation.longitude,
      location.coords.latitude,
      location.coords.longitude
    );
    addThrow(selectedDisc, distance.toFixed(1)); 
    setStartLocation(null);
    Toast.show({
      type: 'info',
      text1: 'Throw Tracked!',
      text2: `Distance: ${distance.toFixed(1)} meters.`,
      visibilityTime: 3000, 
    });
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const toRad = deg => deg * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const discItems = discs.map(d => ({ label: d.name, value: d.id }));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Select Disc:</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={selectedDisc}
        setValue={setSelectedDisc}
        items={discItems}
        placeholder="Select a disc"
        containerStyle={{ marginBottom: 16 }}
      />

      <Button title="Start Throw" onPress={startThrow} />
      <View style={{ marginTop: 10 }}>
        <Button title="End Throw" onPress={endThrow} />
      </View>

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Throw History:</Text>
      <FlatList
        data={selectedDisc ? discs.find(d => d.id === selectedDisc)?.throws || [] : []}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Text>{index + 1}. {item.distance} meters</Text>
        )}
      />
    </View>
  );
}

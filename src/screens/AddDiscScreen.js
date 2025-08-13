import React, { useState } from 'react';
import 'react-native-get-random-values';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDiscs } from '../context/DiscContext';
import { v4 as uuidv4 } from 'uuid';


export default function AddDiscScreen({ navigation }) {
  const { addDisc } = useDiscs();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('Midrange'); 
  const [stability, setStability] = useState('Stable'); 
  const [weight, setWeight] = useState('');
  const [plastic, setPlastic] = useState('');

  function onSave() {
    if (!name.trim()) {
      return Alert.alert('Name required', 'Give the disc a name.');
    }
    const disc = {
      id: uuidv4(),
      name: name.trim(),
      brand: brand.trim() || 'Unknown',
      type,
      stability,
      weight: weight ? Number(weight) : null,
      plastic: plastic.trim() || '',
    };
    addDisc(disc);
    navigation.navigate("My Bag");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Leopard3" />

      <Text style={styles.label}>Brand</Text>
      <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="Innova" />

      <Text style={styles.label}>Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="Midrange" />

      <Text style={styles.label}>Stability</Text>
      <TextInput style={styles.input} value={stability} onChangeText={setStability} placeholder="Stable" />

      <Text style={styles.label}>Weight (g)</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="170" keyboardType="numeric" />

      <Text style={styles.label}>Plastic</Text>
      <TextInput style={styles.input} value={plastic} onChangeText={setPlastic} placeholder="Star" />

      <View style={{ marginTop: 20 }}>
        <Button title="Save Disc" onPress={onSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { marginTop: 12, marginBottom: 6, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fafafa'
  }
});

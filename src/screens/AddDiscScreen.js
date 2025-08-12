import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddDiscScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Disc Screen - Form goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

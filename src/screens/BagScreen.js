import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BagScreen() {
  return (
    <View style={styles.container}>
      <Text>Bag Screen - Discs will be listed here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

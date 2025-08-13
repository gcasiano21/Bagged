import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDiscs } from '../context/DiscContext';

export default function BagScreen({ navigation }) {
  const { discs, removeDisc } = useDiscs();

  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.removeBtn}
      onPress={() => removeDisc(item.id)}
    >
      <Text style={styles.removeText}>Remove</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={discs}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Your bag is empty. Add a disc!</Text>}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item)}>
            <View style={styles.card}>
              <View>
                <Text style={styles.name}>{item.name} — {item.brand}</Text>
                <Text style={styles.sub}>{item.type} · {item.stability} · {item.weight || '—'}g</Text>
              </View>
            </View>
          </Swipeable>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add Disc')}
      >
        <Text style={styles.fabText}>+ Add Disc</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  card: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { fontWeight: '700' },
  sub: { color: '#666', marginTop: 6 },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 24,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
  },
  fabText: { color: '#fff', fontWeight: '700' },
  empty: { textAlign: 'center', marginTop: 30, color: '#666' },
  removeBtn: {
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginVertical: 4,
    borderRadius: 6,
  },
  removeText: {
    color: '#fff',
    fontWeight: '700',
  },
});

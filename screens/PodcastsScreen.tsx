import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const podcasts = [
  { id: 1, title: '🎙 Morning Energy Show – Ep 23', description: 'Your daily boost of positivity and pop culture...' },
  { id: 2, title: '🎵 Late Night NRG – DJ Xclusive', description: 'Unwind with the best late-night mixes...' },
  { id: 3, title: '📀 Music & Vibes – Artist Interview', description: 'An in-depth talk with a rising star in the Kenyan music scene...' },
];

export default function PodcastsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Featured Podcasts</Text>
        {podcasts.map(pod => (
          <View key={pod.id} style={styles.card}>
            <Text style={styles.cardText}>{pod.title}</Text>
            <Text style={styles.cardSubText}>{pod.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  scrollContainer: { padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#FF003C', marginBottom: 16 },
  card: { backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 12 },
  cardText: { fontSize: 16, color: '#fff' },
  cardSubText: { fontSize: 14, color: '#aaa', marginTop: 4 },
});
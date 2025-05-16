import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const events = [
  { id: 1, title: '🔥 NRG Live in Nairobi', date: 'May 20, 2025', location: 'KICC Grounds' },
  { id: 2, title: '🎉 NRG Campus Tour', date: 'June 5, 2025', location: 'University of Nairobi' },
  { id: 3, title: '🎤 NRG Nights', date: 'July 10, 2025', location: 'Westlands Club XYZ' },
];

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {events.map(event => (
          <View key={event.id} style={styles.card}>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <Text style={styles.cardSubText}>📅 {event.date}</Text>
            <Text style={styles.cardSubText}>📍 {event.location}</Text>
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
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  cardSubText: { fontSize: 14, color: '#aaa', marginTop: 4 },
});
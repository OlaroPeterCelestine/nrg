import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const news = [
  { id: 1, headline: '🎧 NRG DJ wins international award', description: 'DJ Xclusive from NRG has been recognized globally for his outstanding mixes and fan engagement.' },
  { id: 2, headline: '🔥 Top 10 songs this week', description: 'Check out the hottest tracks dominating the NRG Top 10 chart this week across genres.' },
  { id: 3, headline: '📻 NRG expands to more cities', description: 'NRG Radio has launched new frequencies in Kisumu and Eldoret, bringing the vibes closer to you.' },
  { id: 4, headline: '🎤 Exclusive interview with Octopizzo', description: 'Octopizzo shares insights into his new album, life, and what’s next in an exclusive sit-down with NRG.' },
  { id: 5, headline: '💃 Campus Tour 2025 kicks off', description: 'NRG is back on the road visiting top universities across Kenya. Expect music, giveaways, and unforgettable vibes.' },
  { id: 6, headline: '📲 NRG+ App update now live!', description: 'The latest version of the NRG+ app includes dark mode, live chat, and an upgraded audio experience.' },
  { id: 7, headline: '🏆 NRG nominated for Best Urban Station', description: 'We’ve been nominated at the Africa Radio Awards! Vote for us and show your support.' },
  { id: 8, headline: '🎶 Behind the Beats: The making of the NRG anthem', description: 'Go behind the scenes with our producers and artists as they create the new NRG station anthem.' },
  { id: 9, headline: '🌍 NRG goes global with online streams', description: 'Listeners from over 50 countries are now tuning in live via the NRG+ app and website.' },
  { id: 10, headline: '📸 Fan Friday highlights', description: 'Each Friday, we showcase the coolest fan photos and shout-outs from social media. You might be next!' },
];

export default function NewsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        {news.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardText}>{item.headline}</Text>
            <Text style={styles.cardSubText}>{item.description}</Text>
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
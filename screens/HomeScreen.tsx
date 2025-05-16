import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';

const STREAMS = {
  'NRG Hitz': 'https://stream.nrg.radio/nrghitz',
  'Serverse': 'https://dc4.serverse.com/proxy/nrgugstream/stream',
};

const BACKGROUND_IMAGE = 'https://nrg.radio/wp-content/uploads/2022/08/nrg-hitz-bg.png';
const LOGO_IMAGE = 'https://nrg.radio/wp-content/uploads/2021/05/cropped-nrg-logo.png';

export default function HomeScreen({ navigation }: any) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStream, setSelectedStream] = useState(STREAMS['NRG Hitz']);
  const [refreshing, setRefreshing] = useState(false);

  const togglePlay = async () => {
    if (isPlaying && sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    } else {
      setLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: selectedStream },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  const renderCard = (image: string, title: string) => (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{ backgroundColor: '#000' }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
      >
        {/* Header */}
        <ImageBackground source={{ uri: BACKGROUND_IMAGE }} style={styles.header} resizeMode="cover">
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <Image source={{ uri: LOGO_IMAGE }} style={styles.logo} />
            <Text style={styles.title}>NRG Radio</Text>
            <Text style={styles.subtitle}>Hit Music Only</Text>

            <View style={styles.streamSelector}>
              {Object.entries(STREAMS).map(([label, url]) => (
                <TouchableOpacity
                  key={label}
                  style={[
                    styles.streamButton,
                    selectedStream === url && styles.selectedStreamButton,
                  ]}
                  onPress={() => {
                    if (isPlaying) togglePlay();
                    setSelectedStream(url);
                  }}
                >
                  <Text style={styles.streamButtonText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
                <Text style={styles.playButtonText}>{isPlaying ? '■' : '▶︎'}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>

        {/* Section Component */}
        {[
          { title: 'News', route: 'News', image: 'https://nrg.radio/wp-content/uploads/2023/08/nrgnews.jpg' },
          { title: 'Shows', route: 'Shows', image: 'https://nrg.radio/wp-content/uploads/2022/08/show-banner.jpg' },
          { title: 'Events', route: 'Events', image: 'https://nrg.radio/wp-content/uploads/2022/08/nrgevents.jpg' },
        ].map(({ title, route, image }) => (
          <View key={title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <TouchableOpacity onPress={() => navigation.navigate(route)}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={[1, 2, 3]}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => renderCard(image, `${title} ${item}`)}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 500,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  headerContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
  },
  streamSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  streamButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
    margin: 6,
  },
  selectedStreamButton: {
    backgroundColor: '#FF003C',
  },
  streamButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  playButton: {
    backgroundColor: '#FF003C',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 38,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF003C',
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    width: 140,
  },
  cardImage: {
    height: 100,
    width: '100%',
  },
  cardText: {
    padding: 8,
    color: '#fff',
    fontSize: 14,
  },
});
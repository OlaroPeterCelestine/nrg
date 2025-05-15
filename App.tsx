import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';

const RADIO_STREAM_URL = 'https://stream.nrg.radio/nrghitz';
const Tab = createBottomTabNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Animated.Text style={[styles.splashText, { opacity: fadeAnim }]}>
          NRG Radio
        </Animated.Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'radio';
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'News':
                iconName = focused ? 'newspaper' : 'newspaper-outline';
                break;
              case 'Podcasts':
                iconName = focused ? 'mic' : 'mic-outline';
                break;
              case 'Events':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
            }
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                  name={iconName}
                  size={focused ? 28 : 24}
                  color={focused ? '#FF003C' : color}
                  style={
                    focused
                      ? {
                          textShadowColor: '#FF003C99',
                          textShadowOffset: { width: 0, height: 0 },
                          textShadowRadius: 6,
                        }
                      : {}
                  }
                />
              </View>
            );
          },
          tabBarActiveTintColor: '#FF003C',
          tabBarInactiveTintColor: '#888',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 4,
          },
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 6,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="News" component={NewsScreen} />
        <Tab.Screen name="Podcasts" component={PodcastsScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ---------- Screens ----------

function HomeScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePlay = async () => {
    if (isPlaying && sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    } else {
      setLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: RADIO_STREAM_URL },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>NRG Radio</Text>
        <Text style={styles.subtitle}>Hit Music Only</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FF003C" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={togglePlay}>
            <Text style={styles.buttonText}>{isPlaying ? 'Stop' : 'Play'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

function NewsScreen() {
  const news = [
    { id: 1, headline: '🎧 NRG DJ wins international award', description: 'DJ Xclusive from NRG has been recognized globally for their electrifying performances and innovation in music broadcasting.' },
    { id: 2, headline: '🔥 Top 10 songs this week', description: 'Check out the hottest tracks dominating the NRG Top 10 chart, featuring global hits and local legends.' },
    { id: 3, headline: '📻 NRG expands to more cities', description: 'NRG Radio has launched new frequencies in Kisumu and Eldoret, bringing the energy closer to you.' },
  ];

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

function PodcastsScreen() {
  const podcasts = [
    { id: 1, title: '🎙 Morning Energy Show – Ep 23', description: 'Your daily boost of positivity and pop culture. Hosts break down trending stories and play fresh hits.' },
    { id: 2, title: '🎵 Late Night NRG – DJ Xclusive', description: 'Unwind with the best late-night mixes and exclusive DJ sets from NRG\'s top talents.' },
    { id: 3, title: '📀 Music & Vibes – Artist Interview', description: 'An in-depth talk with a rising star in the Kenyan music scene, discussing inspiration and upcoming projects.' },
  ];

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

function EventsScreen() {
  const events = [
    { id: 1, name: '🎉 NRG Festival Nairobi', date: 'June 20, 2025', description: 'Join thousands of fans and top DJs for a night of music, food, and fun at Uhuru Gardens.' },
    { id: 2, name: '🏖 NRG Coast Party', date: 'July 5, 2025', description: 'Beach vibes and blazing beats await at this year\'s biggest coastal event in Diani.' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {events.map(evt => (
          <View key={evt.id} style={styles.card}>
            <Text style={styles.cardText}>{evt.name}</Text>
            <Text style={styles.cardSubText}>{evt.date}</Text>
            <Text style={styles.cardSubText}>{evt.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingRow}>
          <Text style={styles.cardText}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.cardText}>Push Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF003C',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: '#FF003C',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF003C',
    padding: 15,
    borderRadius: 50,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF003C',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
  },
  cardSubText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
});
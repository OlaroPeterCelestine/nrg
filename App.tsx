import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StatusBar,
} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

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

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

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
            return <Ionicons name={iconName} size={size} color={color} />;
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
  );
}

function NewsScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>Latest news will appear here.</Text>
    </View>
  );
}

function PodcastsScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>Podcasts coming soon.</Text>
    </View>
  );
}

function EventsScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>Upcoming events will be listed here.</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
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
  },
  centered: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
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
});
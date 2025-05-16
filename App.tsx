import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Image
} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import PodcastsScreen from './screens/PodcastsScreen';
import EventsScreen from './screens/EventsScreen';
import SettingsScreen from './screens/SettingsScreen';

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
        <Animated.Image
          source={require('./assets/nrg.png')}
          style={[styles.splashImage, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
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
            let iconName = 'radio';
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
                  size={focused ? 30 : 24}
                  color={focused ? '#FF003C' : color}
                  style={
                    focused
                      ? {
                          textShadowColor: '#FF003C88',
                          textShadowOffset: { width: 0, height: 0 },
                          textShadowRadius: 8,
                        }
                      : {}
                  }
                />
              </View>
            );
          },
          tabBarActiveTintColor: '#FF003C',
          tabBarInactiveTintColor: '#888',
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

const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  splashText: { fontSize: 36, fontWeight: 'bold', color: '#FF003C' },
  splashImage: {
    width: 200,
    height: 200,
  },
});
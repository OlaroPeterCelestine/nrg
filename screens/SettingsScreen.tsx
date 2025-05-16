import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleDarkMode = () => setDarkModeEnabled(prev => !prev);

  const openPrivacyPolicy = () => {
    Linking.openURL('https://nrgradio.co.ke/privacy');
  };

  const clearCache = () => {
    // Simulated cache clear
    Alert.alert('Cache Cleared', 'App cache has been successfully cleared.');
  };

  const openAbout = () => {
    Alert.alert('About NRG App', 'Version 1.2.3\nPowered by NRG Radio Kenya');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Settings</Text>

        {/* App Preferences */}
        <Text style={styles.sectionHeader}>App Preferences</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Text style={styles.settingSubText}>Get alerts for breaking news, new shows & events.</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            thumbColor={notificationsEnabled ? '#FF003C' : '#888'}
            trackColor={{ false: '#555', true: '#FF003C' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Text style={styles.settingSubText}>Reduce eye strain and save battery life.</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
            thumbColor={darkModeEnabled ? '#FF003C' : '#888'}
            trackColor={{ false: '#555', true: '#FF003C' }}
          />
        </View>

        {/* Account & Legal */}
        <Text style={styles.sectionHeader}>Legal & Support</Text>

        <TouchableOpacity style={styles.linkButton} onPress={openPrivacyPolicy}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={clearCache}>
          <Text style={styles.linkText}>Clear Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={openAbout}>
          <Text style={styles.linkText}>About NRG App</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF003C',
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 14,
    color: '#888',
    marginTop: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  settingLabel: {
    flex: 1,
    paddingRight: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  settingSubText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  linkButton: {
    paddingVertical: 16,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  linkText: {
    fontSize: 16,
    color: '#FF003C',
  },
});
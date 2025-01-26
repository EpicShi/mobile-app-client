import React from 'react';
import { Text, View } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

const farmerStats = {
  totalIncome: '₹45,000',
  deployedNodes: 3,
  recentCrop: 'Wheat',
  upcomingEvent: 'Kisan Mela - 10th Jan',
};

export default function HomePage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={require('@/assets/images/icons/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome, Farmer!</Text>
        <Text style={styles.greeting}>Here’s your dashboard at a glance</Text>
      </View>

      {/* Farmer Statistics */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Your Overview</Text>
        <View style={styles.statsBox}>
          <Text style={styles.statsLabel}>Total Income</Text>
          <Text style={styles.statsValue}>{farmerStats.totalIncome}</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsLabel}>Deployed Nodes</Text>
          <Text style={styles.statsValue}>{farmerStats.activeSchemes}</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsLabel}>Recent Crop</Text>
          <Text style={styles.statsValue}>{farmerStats.recentCrop}</Text>
        </View>
      </View>

      {/* Quick Access Buttons */}
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.quickAccessContainer}>
        <TouchableOpacity
          style={styles.quickAccessButton}
          onPress={() => { router.push('/(tabs)/scheme') }}
        >
          <MaterialIcons name="agriculture" size={24} color="#FFF" />
          <Text style={styles.quickAccessText}>My Schemes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAccessButton}
          onPress={() => { router.push('/(tabs)/dashboard') }}
        >
          <MaterialIcons name="assessment" size={24} color="#FFF" />
          <Text style={styles.quickAccessText}>Crop Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAccessButton}
          onPress={() => { router.push('/modal') }}
        >
          <MaterialIcons name="camera-alt" size={24} color="#FFF" />
          <Text style={styles.quickAccessText}>Detect Disease</Text>
        </TouchableOpacity>
      </View>

      {/* Latest News */}
      <Text style={styles.sectionTitle}>Latest Updates</Text>
      <View style={styles.newsContainer}>
        <Text style={styles.newsTitle}>Upcoming Event: {farmerStats.upcomingEvent}</Text>
        <Text style={styles.newsDescription}>
          Don’t miss the Kisan Mela happening on 10th January. Learn about the latest farming technologies and schemes.
        </Text>
      </View>

      {/* Tips Section */}
      <Text style={styles.sectionTitle}>Farmer’s Tips</Text>
      <View style={styles.tipsContainer}>
        <Text style={styles.tip}>• Water your crops early in the morning to prevent evaporation.</Text>
        <Text style={styles.tip}>• Use organic fertilizers to improve soil health and reduce costs.</Text>
        <Text style={styles.tip}>• Check the weather regularly to optimize your farming schedule.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FFF0',
    padding: 15,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#DEF6D8',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F7A0A',
  },
  greeting: {
    fontSize: 16,
    color: '#4A4A4A',
    marginTop: 5,
  },
  statsContainer: {
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F7A0A',
    marginBottom: 10,
  },
  statsBox: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statsLabel: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  statsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F7A0A',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F7A0A',
    marginVertical: 10,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAccessButton: {
    flex: 1,
    backgroundColor: '#2F7A0A',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  quickAccessText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
  },
  newsContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F7A0A',
  },
  newsDescription: {
    fontSize: 14,
    color: '#4A4A4A',
    marginTop: 5,
  },
  tipsContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tip: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 8,
  },
});
import React from 'react';
import user from '@/constants/UserData';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, ScrollView, TouchableOpacity, Image, useColorScheme, Platform } from 'react-native';

const farmerStats = {
  totalIncome: '₹45,000',
  deployedNodes: 20,
  recentCrop: 'Wheat',
  upcomingEvent: 'Kisan Mela - 10th Jan',
};

export default function HomePage() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#09090B' }]}>
      <View style={styles.mainContainer}>
        <View style={[styles.welcomeContainer, { backgroundColor: '#18181B95' }]}>
          <View style={[styles.logoContainer, { backgroundColor: '#27272A' }]}>
            <Image
              source={require('@/assets/images/icons/icon.png')}
              style={styles.logo}
            />
          </View>
          <View style={[styles.welcomeTextContainer, { backgroundColor: 'transparent' }]}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </View>

        {/* Farmer Statistics */}
        <View style={[styles.statsGrid, { backgroundColor: 'transparent' }]}>
          <View style={[styles.statsCard, { backgroundColor: '#18181B95' }]}>
            <MaterialIcons name="account-balance-wallet" size={24} color="#22C55E" />
            <Text style={styles.statsValue}>{farmerStats.totalIncome}</Text>
            <Text style={styles.statsLabel}>Pred. Income</Text>
          </View>
          <View style={[styles.statsCard, { backgroundColor: '#18181B95' }]}>
            <MaterialIcons name="devices" size={24} color="#22C55E" />
            <Text style={styles.statsValue}>{farmerStats.deployedNodes}</Text>
            <Text style={styles.statsLabel}>Active Nodes</Text>
          </View>
          <View style={[styles.statsCard, { backgroundColor: '#18181B95' }]}>
            <MaterialIcons name="eco" size={24} color="#22C55E" />
            <Text style={styles.statsValue}>{farmerStats.recentCrop}</Text>
            <Text style={styles.statsLabel}>Current Crop</Text>
          </View>
        </View>

        {/* Quick Access Buttons */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={[styles.quickAccessContainer, { backgroundColor: 'transparent' }]}>
          <TouchableOpacity
            style={[styles.quickAccessButton, { backgroundColor: '#18181B95' }]}
            onPress={() => { router.push('/(tabs)/scheme') }}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name="agriculture" size={24} color="#22C55E" />
            </View>
            <Text style={styles.quickAccessText}>My Schemes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAccessButton, { backgroundColor: '#18181B95' }]}
            onPress={() => { router.push('/(tabs)/dashboard') }}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name="assessment" size={24} color="#22C55E" />
            </View>
            <Text style={styles.quickAccessText}>Current Status</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAccessButton, { backgroundColor: '#18181B95' }]}
            onPress={() => { router.push('/modal') }}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name="camera-alt" size={24} color="#22C55E" />
            </View>
            <Text style={styles.quickAccessText}>Detect Disease</Text>
          </TouchableOpacity>
        </View>

        {/* Latest News */}
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        <View style={[styles.newsContainer, { backgroundColor: '#18181B95' }]}>
          <View style={[styles.newsHeader, { backgroundColor: 'transparent' }]}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="event" size={24} color="#22C55E" />
            </View>
            <Text style={styles.newsTitle}>{farmerStats.upcomingEvent}</Text>
          </View>
          <Text style={styles.newsDescription}>
            Don't miss the Kisan Mela happening on 10th January. Learn about the latest farming technologies and schemes.
          </Text>
        </View>

        {/* Tips Section */}
        <Text style={styles.sectionTitle}>Farmer's Tips</Text>
        <View style={[styles.tipsContainer, { backgroundColor: '#18181B95' }]}>
          {[
            'Water your crops early in the morning to prevent evaporation.',
            'Use organic fertilizers to improve soil health and reduce costs.',
            'Check the weather regularly to optimize your farming schedule.'
          ].map((tip, index) => (
            <View key={index} style={[styles.tipItem, { backgroundColor: 'transparent' }]}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="tips-and-updates" size={20} color="#22C55E" />
              </View>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    padding: 16,
    backgroundColor: '#09090B',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#22C55E30',
    ...Platform.select({
      ios: {
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoContainer: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#22C55E40',
    ...Platform.select({
      ios: {
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  logo: {
    width: 48,
    height: 48,
  },
  welcomeTextContainer: {
    marginLeft: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statsCard: {
    flex: 1,
    minWidth: '30%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#22C55E30',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22C55E',
    marginVertical: 8,
  },
  statsLabel: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 16,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickAccessButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C55E30',
    ...Platform.select({
      ios: {
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#22C55E20',
  },
  quickAccessText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '500',
  },
  newsContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#22C55E30',
    ...Platform.select({
      ios: {
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22C55E',
    marginLeft: 12,
  },
  newsDescription: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 22,
    fontWeight: '500',
  },
  tipsContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#22C55E30',
    ...Platform.select({
      ios: {
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
});
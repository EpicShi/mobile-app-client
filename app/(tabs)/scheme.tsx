import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { Text } from '@/components/Themed';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

const schemes = [
  {
    title: 'PM Kisan Samman Nidhi Yojana',
    description:
      'This scheme provides direct income support to farmers with landholding up to 2 hectares. Farmers receive ₹6,000 per year in three installments.',
    image: require('@/assets/images/schemes/PM Kisan Samman Nidhi Yojana.webp'),
    url: 'https://pmkisan.gov.in/'
  },
  {
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description:
      'This crop insurance scheme helps protect farmers from crop loss due to natural calamities. It provides coverage for crops and subsidies for premium costs.',
    image: require('@/assets/images/schemes/Pradhan Mantri Fasal Bima Yojana (PMFBY).jpg'),
    url: 'https://pmfby.gov.in/'
  },
  {
    title: 'National Agriculture Market (eNAM)',
    description:
      'eNAM is an online trading platform that connects farmers with buyers across the country, helping them get better prices for their produce.',
    image: require('@/assets/images/schemes/National Agriculture Market (eNAM).png'),
    url: 'https://enam.gov.in/'
  },
  {
    title: 'Soil Health Management Scheme',
    description:
      'Under this scheme, the government provides soil testing and health management services to improve agricultural productivity.',
    image: require('@/assets/images/schemes/Soil Health Management Scheme.jpg'),
    url: 'https://soilhealth.dac.gov.in/'
  },
  {
    title: 'Kisan Credit Card (KCC) Scheme',
    description:
      'The KCC scheme provides farmers with short-term and medium-term loans for purchasing agricultural inputs, including seeds, fertilizers, and equipment.',
    image: require('@/assets/images/schemes/Kisan Credit Card (KCC) Scheme.jpg'),
    url: 'https://www.kisancreditcard.in/'
  },
];

export default function TabOneScreen() {
  const handleSchemePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View 
        entering={FadeInUp.springify()}
        style={styles.header}
      >
        <Text style={styles.title}>Government Schemes</Text>
        <Text style={styles.subtitle}>Available programs for farmers</Text>
      </Animated.View>

      {schemes.map((scheme, index) => (
        <Animated.View
          key={index}
          entering={FadeInUp.delay(100 * index).springify()}
          layout={Layout.springify()}
        >
          <TouchableOpacity 
            onPress={() => handleSchemePress(scheme.url)}
            style={styles.cardPressable}
          >
            <View style={styles.schemeContainer}>
              <Image source={scheme.image} style={styles.schemeImage} />
              <View style={styles.contentContainer}>
                <Text style={styles.schemeTitle}>{scheme.title}</Text>
                <Text style={styles.schemeDescription}>{scheme.description}</Text>
                <View style={styles.linkContainer}>
                  <Text style={styles.linkText}>Learn more</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    backgroundColor: '#09090b',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#e2e2e5',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  cardPressable: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#18181b95',
    borderWidth: 1,
    borderColor: '#22C55E30',
    overflow: 'hidden',
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
  schemeContainer: {
    backgroundColor: '#18181b95',
  },
  contentContainer: {
    padding: 16,
  },
  schemeImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#27272a',
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e2e2e5',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  schemeDescription: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '500',
  },
});
import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Text } from '@/components/Themed';

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
  const handleSchemePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner Image */}
      <Image
        source={require('@/assets/images/schemes/banner.png')}
        style={styles.bannerImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>Government Schemes for Farmers</Text>
      <View style={styles.separator} />

      {schemes.map((scheme, index) => (
        <TouchableOpacity key={index} onPress={() => handleSchemePress(scheme.url)}>
          <View style={styles.schemeContainer}>
            <Image source={scheme.image} style={styles.schemeImage} />
            <Text style={styles.schemeTitle}>{scheme.title}</Text>
            <Text style={styles.schemeDescription}>{scheme.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#006400',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  schemeContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  schemeImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 8,
  },
  schemeDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
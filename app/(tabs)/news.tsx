import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Linking
} from 'react-native';
import { Text, View } from '@/components/Themed';

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/everything?q=(farmer OR agriculture OR "rural development" OR "farm laws" OR kisaan OR kisan) AND (India OR Maharashtra OR Punjab OR Karnataka OR "Uttar Pradesh")&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

export default function NewsPageScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchNews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.status === 'ok') {
        setArticles(data.articles);
        setError(null);
      } else {
        setError('Failed to fetch news');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const NewsCard = ({ article }: any) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => Linking.openURL(article.url)}
    >
      <View style={styles.card}>
        {article.urlToImage && (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {article.description}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.source}>{article.source.name}</Text>
            <Text style={styles.date}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchNews}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.headerTitle}>Latest News</Text>
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9f0',
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#006400',
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003300',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: '#006400',
  },
  date: {
    fontSize: 12,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: '#d9534f',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#006400',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
});
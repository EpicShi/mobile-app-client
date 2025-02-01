import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Platform,
  Linking
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';


const API_URL = `https://arpy8-drishti-api.hf.space/fetch-news`;

export default function NewsPageScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Drishti-Auth-Key': '2907'
        }
      });

      const data = await response.json();

      if (data.status === 'ok') {
        setArticles(data.articles);
        setError(null);
      } else {
        setError("Failed to fetch news");
      }
    } catch (err) {
      setError("Network error occurred");
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

  const NewsCard = ({ article, index }) => (
    <Animated.View
      entering={FadeInUp.delay(100 * index).springify()}
      layout={Layout.springify()}
    >
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => Linking.openURL(article.url)}
      >
        <View style={styles.card}>
          {article.urlToImage && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: article.urlToImage }}
                style={styles.image}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                locations={[0, 1]}
                style={styles.overlay}
              />
            </View>
          )}
          <View style={styles.cardContent}>
            <View style={styles.sourceContainer}>
              <Text style={styles.source}>{article.source.name}</Text>
              <Text style={styles.date}>
                {new Date(article.publishedAt).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {article.title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {article.description}
            </Text>
            <View style={styles.readMore}>
              <Text style={styles.readMoreText}>Read article</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#22C55E" style={{ marginLeft: 4 }} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#22C55E" />
        }
      >
        <Animated.View
          entering={FadeInUp.springify()}
          style={styles.header}
        >
          <Text style={styles.pageTitle}>Latest News</Text>
          <Text style={styles.subtitle}>Stay updated with the latest news and information</Text>
        </Animated.View>

        {articles.map((article, index) => (
          <NewsCard key={index} article={article} index={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  scrollContent: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#09090b',
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#18181b95',
    borderRadius: 16,
    overflow: 'hidden',
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
  header: {
    marginBottom: 24,
    backgroundColor: '#09090b',
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#e2e2e5',
    marginBottom: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#27272a',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  cardContent: {
    padding: 16,
    backgroundColor: '#18181b95',
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#18181b95',
  },
  source: {
    fontSize: 13,
    color: '#22C55E',
    fontWeight: '500',
  },
  date: {
    fontSize: 13,
    color: '#71717a',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#e2e2e5',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 16,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b95',
  },
  readMoreText: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#18181b95',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#22C55E30',
  },
  retryText: {
    color: '#e2e2e5',
    fontSize: 14,
    fontWeight: '500',
  },
});
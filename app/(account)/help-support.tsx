import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View as RNView, Platform, Linking } from 'react-native';
import { Text } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

type FAQItem = {
  question: string;
  answer: string;
  isExpanded: boolean;
};

export default function HelpSupportScreen() {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: 'How do I update my profile information?',
      answer: 'Go to Account > Personal Information to update your profile details including name, email, phone number, and address.',
      isExpanded: false,
    },
    {
      question: 'How can I change my password?',
      answer: 'Navigate to Account > Security > Password section to change your password. You\'ll need to enter your current password and then set a new one.',
      isExpanded: false,
    },
    {
      question: 'What should I do if I forget my password?',
      answer: 'Click on the "Forgot Password" link on the login screen. You\'ll receive instructions to reset your password via email.',
      isExpanded: false,
    },
    {
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Account > Security and toggle on the Two-Factor Authentication option. Follow the setup instructions to complete the process.',
      isExpanded: false,
    },
    {
      question: 'How can I manage my notification settings?',
      answer: 'Visit Account > Notifications to customize your notification preferences for different types of alerts and updates.',
      isExpanded: false,
    },
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => ({
      ...faq,
      isExpanded: i === index ? !faq.isExpanded : false,
    })));
  };

  const contactSupport = () => {
    Linking.openURL('mailto:support@drishti.com');
  };

  return (
    <RNView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View 
          entering={FadeInUp.springify()}
          style={styles.header}
        >
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#22C55E" />
          </TouchableOpacity>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>Get help and find answers to common questions</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(100).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <TouchableOpacity style={styles.supportButton} onPress={contactSupport}>
            <MaterialIcons name="email" size={20} color="#22C55E" />
            <Text style={styles.supportButtonText}>Email Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportButton}>
            <MaterialIcons name="chat" size={20} color="#22C55E" />
            <Text style={styles.supportButtonText}>Live Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportButton}>
            <MaterialIcons name="phone" size={20} color="#22C55E" />
            <Text style={styles.supportButtonText}>Call Support</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(200).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(100 * (index + 1)).springify()}
            >
              <TouchableOpacity
                style={[
                  styles.faqItem,
                  index !== faqs.length - 1 && styles.faqItemBorder
                ]}
                onPress={() => toggleFAQ(index)}
              >
                <RNView style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <MaterialIcons
                    name={faq.isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color="#22C55E"
                  />
                </RNView>
                {faq.isExpanded && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(800).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          <TouchableOpacity style={styles.resourceButton}>
            <MaterialIcons name="library-books" size={20} color="#22C55E" />
            <Text style={styles.resourceButtonText}>User Guide</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceButton}>
            <MaterialIcons name="video-library" size={20} color="#22C55E" />
            <Text style={styles.resourceButtonText}>Video Tutorials</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </RNView>
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
  header: {
    marginBottom: 24,
    backgroundColor: '#09090b',
  },
  backButton: {
    marginBottom: 16,
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
  section: {
    backgroundColor: '#18181b95',
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e2e5',
    marginBottom: 16,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#22C55E30',
  },
  supportButtonText: {
    color: '#e2e2e5',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
  },
  faqItem: {
    paddingVertical: 16,
  },
  faqItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#22C55E30',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 15,
    color: '#e2e2e5',
    fontWeight: '500',
    flex: 1,
    marginRight: 16,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
    lineHeight: 20,
  },
  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#22C55E30',
  },
  resourceButtonText: {
    color: '#e2e2e5',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
  },
}); 
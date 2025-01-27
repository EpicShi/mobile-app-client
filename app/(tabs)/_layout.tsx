import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Platform, Text, View } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -2 }} {...props} />;
}

const HeaderTitle = ({ subtitle }: { subtitle: string }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#09090b',
  }}>
    <View style={{ backgroundColor: '#09090b' }}>
      <Text style={{
        color: '#e2e2e5',
        fontSize: 22,
        fontWeight: '600',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        letterSpacing: 1,
        textShadowColor: 'rgba(74, 222, 128, 0.35)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
      }}>
        Dristhi
      </Text>
      <Text style={{
        color: '#a1a1aa',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
      }}>
        {subtitle}
      </Text>
    </View>
  </View>
);

export default function TabLayout() {
  const commonScreenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#4ade80',
    tabBarInactiveTintColor: '#71717a',
    tabBarStyle: {
      backgroundColor: '#09090b',
      borderTopWidth: 1,
      borderTopColor: '#27272a',
      height: Platform.OS === 'ios' ? 88 : 64,
      paddingBottom: Platform.OS === 'ios' ? 28 : 8,
      paddingTop: 8,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '500' as const,
      marginTop: 4,
    },
  };
  const router = useRouter();

  return (
    <Tabs screenOptions={commonScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerTitle: () => <HeaderTitle subtitle="Dashboard" />,
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => { router.push('/modal') }}
            >
              <FontAwesome name="camera" size={24} color="#FFF" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="scheme"
        options={{
          title: "Schemes",
          headerTitle: () => <HeaderTitle subtitle="Schemes" />,
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          headerTitle: () => <HeaderTitle subtitle="News" />,
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerTitle: () => <HeaderTitle subtitle="Account" />,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
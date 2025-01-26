
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
  }}>

    <View>
      <Text style={{
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        letterSpacing: 1,
      }}>
        Dristhi
      </Text>
      <Text style={{
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        opacity: 0.9,
      }}>
        {subtitle}
      </Text>
    </View>
  </View>
);

export default function TabLayout() {
  const commonScreenOptions = {
    headerShown: false,
    // headerStyle: {
    //   backgroundColor: '#006400',
    //   elevation: 4,
    //   shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 3,
    //   height: Platform.OS === 'ios' ? 110 : 80,
    // },
    // headerTitleAlign: 'left' as const,
    tabBarActiveTintColor: '#006400',
    tabBarInactiveTintColor: '#666666',
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      height: Platform.OS === 'ios' ? 88 : 64,
      paddingBottom: Platform.OS === 'ios' ? 28 : 8,
      paddingTop: 8,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '500',
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
              // style={styles.quickAccessButton}
              onPress={() => { router.push('/modal') }}
            >
              <TabBarIcon name="camera" color="#FFF" style={{ marginRight: 20 }} />
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
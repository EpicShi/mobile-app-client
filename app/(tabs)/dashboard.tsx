import React from 'react';
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import SampleData from '@/constants/SampleData';


const screenWidth = Dimensions.get('window').width;
const lastValue = SampleData[SampleData.length - 1]
const secondLastValue = SampleData[SampleData.length - 2]

const tempChange = lastValue.temperature - secondLastValue.temperature
const humidityChange = lastValue.humidity - secondLastValue.humidity
const soilMoistureChange = lastValue.soil_moisture - secondLastValue.soil_moisture

export default function HomePageScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Monitor your farm's vital statistics</Text>
      </View>

      <Animated.View
        entering={FadeInUp.delay(100).springify()}
        layout={Layout.springify()}
        style={styles.statsContainer}
      >
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={styles.statsBox}
        >
          <MaterialIcons name="thermostat" size={24} color="#22C55E" style={styles.statsIcon} />
          <Text style={styles.statsLabel}>Temperature</Text>
          <View style={styles.statsValueContainer}>
            <Text style={styles.statsValue}>{lastValue.temperature}</Text>
            <View style={styles.changeContainer}>
              <MaterialIcons
                name={tempChange >= 0 ? "arrow-upward" : "arrow-downward"}
                color={tempChange >= 0 ? "#22C55E" : "#EF4444"}
                size={12}
              />
              <Text style={
                {
                  ...styles.changeText,
                  color: tempChange >= 0 ? "#22C55E" : "#EF4444"
                }
              }>{Math.round(Math.abs(tempChange) * 100) / 100}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(300).springify()}
          style={styles.statsBox}
        >
          <MaterialIcons name="water-drop" size={24} color="#22C55E" style={styles.statsIcon} />
          <Text style={styles.statsLabel}>Humidity</Text>
          <View style={styles.statsValueContainer}>
            <Text style={styles.statsValue}>{lastValue.humidity}</Text>
            <View style={styles.changeContainer}>
              <MaterialIcons
                name={humidityChange >= 0 ? "arrow-upward" : "arrow-downward"}
                color={humidityChange >= 0 ? "#22C55E" : "#EF4444"}
                size={12}
              />
              <Text style={
                {
                  ...styles.changeText,
                  color: humidityChange >= 0 ? "#22C55E" : "#EF4444"
                }
              }>{Math.round(Math.abs(humidityChange) * 100) / 100}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).springify()}
          style={styles.statsBox}
        >
          <MaterialIcons name="grass" size={24} color="#22C55E" style={styles.statsIcon} />
          <Text style={styles.statsLabel}>Soil Moisture</Text>
          <View style={styles.statsValueContainer}>
            <Text style={styles.statsValue}>{lastValue.soil_moisture}</Text>
            <View style={styles.changeContainer}>
              <MaterialIcons
                name={soilMoistureChange >= 0 ? "arrow-upward" : "arrow-downward"}
                color={soilMoistureChange >= 0 ? "#22C55E" : "#EF4444"}
                size={12}
              />
              <Text style={
                {
                  ...styles.changeText,
                  color: soilMoistureChange >= 0 ? "#22C55E" : "#EF4444"
                }
              }>{Math.round(Math.abs(soilMoistureChange) * 100) / 100}</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(500).springify()}
        style={styles.card}
      >
        <Text style={styles.chartTitle}>Humidity Levels Over Time</Text>
        <LineChart
          data={humidityData}
          width={screenWidth - 72}
          height={160}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(600).springify()}
        style={styles.card}
      >
        <Text style={styles.chartTitle}>Soil Moisture Levels</Text>
        <BarChart
          data={soilData}
          width={screenWidth - 72}
          height={160}
          chartConfig={chartConfig}
          style={styles.chart}
          yAxisLabel=""
          yAxisSuffix="%"
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  header: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#09090B',
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
  card: {
    backgroundColor: '#18181B95',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#22C55E30',
    padding: 16,
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
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e2e2e5',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statsBox: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#18181B95',
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
  statsIcon: {
    marginBottom: 12,
  },
  statsLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
    fontWeight: '500',
  },
  statsValueContainer: {
    marginTop: 4,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e2e5',
    marginBottom: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    color: '#22C55E',
    marginLeft: 2,
    fontWeight: '500',
  },
});

const humidityData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [65, 70, 60, 75, 80, 68],
    },
  ],
};

const soilData = {
  labels: ['Corn', 'Wheat', 'Rice'],
  datasets: [
    {
      data: [45, 60, 55],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#121215',
  backgroundGradientTo: '#121215',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#4ADE80',
  },
  fillShadowGradient: '#4ADE80',
  fillShadowGradientOpacity: 0.2,
};

const nodeStats = {
  temperature: {
    value: '32.1°C',
    change: '2.1°C',
  },
  humidity: {
    value: '39.0%',
    change: '2.4%',
  },
  soilMoisture: {
    value: '763',
    change: '291',
  },
};
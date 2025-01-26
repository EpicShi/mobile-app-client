import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomePageScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farmer Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Humidity Levels Over Time</Text>
        <LineChart
          data={humidityData}
          width={screenWidth - 60} // Adjust width for card padding
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Soil Moisture Levels</Text>
        <BarChart
          data={soilData}
          width={screenWidth - 60} // Adjust width for card padding
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Irrigation System Progress</Text>
        <ProgressChart
          data={dataProgress}
          width={screenWidth - 60} // Adjust width for card padding
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={progressChartConfig}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Light green gradient
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 15, // Add padding to the card
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#388E3C',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
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

const dataProgress = {
  labels: ['Irrigation Progress'],
  data: [0.65],
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#388E3C',
  },
};

const progressChartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};
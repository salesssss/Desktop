import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const recommendedExercises = [
  { 
    title: 'Obliques', 
    duration: '45', 
    image: require('./assets/obliques.png'), 
    description: 'Description of how to perform obliques exercise.' 
  },
  { 
    title: 'Lunge Lift', 
    duration: '30', 
    image: require('./assets/lunge.png'), 
    description: 'Description of how to perform lunge lift exercise.' 
  },
  { 
    title: 'Front Press', 
    duration: '45', 
    image: require('./assets/press.png'), 
    description: 'Description of how to perform front press exercise.' 
  },
];

const categories = [
  {
    title: 'Cardio',
    description: 'Any type of exercise that gets your heart rate up.',
    image: require('./assets/cardio.png'),
  },
];

const HomePage = ({ onLogout }) => {
  const navigation = useNavigation();

  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseDetail', exercise);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <Image 
          source={require('./assets/posturapp.png')}
          style={styles.logoImage} 
        />
        <Text style={styles.logoText}>PosturApp</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Recommended */}
        <Text style={styles.sectionTitle}>Recommended</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {recommendedExercises.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.recommendCard} 
              onPress={() => handleExercisePress(item)} // Navigate to ExerciseDetail
            >
              <Image source={item.image} style={styles.exerciseImage} />
              <Text style={styles.exerciseTitle}>{item.title}</Text>
              <Text style={styles.exerciseTime}>{item.duration} sec</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryCard}>
            <Image source={item.image} style={styles.categoryImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Text style={styles.categoryDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#0D47A1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  logout: {
    color: '#fff',
    fontSize: 14,
  },
  scrollContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  recommendCard: {
    width: 140,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
  },
  exerciseImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  exerciseTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  exerciseTime: {
    fontSize: 12,
    color: '#555',
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#444',
  },
});
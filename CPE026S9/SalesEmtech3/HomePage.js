import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable
} from 'react-native';

const recommendedExercises = [
  {
    title: 'Obliques',
    duration: '45sec',
    image: require('./assets/obliques.png'),
    description: 'This exercise strengthens the muscles on the side of your core, helping improve balance and posture.',
  },
  {
    title: 'Lunge Lift',
    duration: '30sec',
    image: require('./assets/lunge.png'),
    description: 'This works your legs and glutes while also improving coordination and core strength.',
  },
  {
    title: 'Front Press',
    duration: '45sec',
    image: require('./assets/press.png'),
    description: 'Targets your shoulders and arms. Great for building upper body strength.',
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
  const user = JSON.parse(localStorage.getItem('posturapp_current_user'));

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExercisePress = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
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
            <View key={index} style={styles.recommendCard}>
              <Image source={item.image} style={styles.exerciseImage} />
              <Text style={styles.exerciseTitle}>{item.title}</Text>
              <Text style={styles.exerciseTime}>{item.duration}</Text>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => handleExercisePress(item)}
              >
                <Text style={styles.playIcon}>▶</Text>
              </TouchableOpacity>
            </View>
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

      {/* Modal Popup */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedExercise && (
              <>
                <Text style={styles.modalTitle}>{selectedExercise.title}</Text>
    <Image source={selectedExercise.image} style={styles.modalImage} />
    <Text style={styles.modalText}>Duration: {selectedExercise.duration}</Text>

    {/* Add this line to show the description */}
    <Text style={styles.modalText}>{selectedExercise.description}</Text>

    <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
      <Text style={{ color: 'white' }}>Close</Text>
    </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    width: 60,
    height: 60,
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
  playButton: {
    marginTop: 5,
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  playIcon: {
    color: '#fff',
    fontSize: 14,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

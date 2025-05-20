import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Alert
} from 'react-native';

const recommendedExercises = [
  { title: 'Obliques', duration: '45', image: require('./assets/obliques.png'), description: 'Strengthens side core muscles.' },
  { title: 'Lunge Lift', duration: '30', image: require('./assets/Lungelift.png'), description: 'Targets lower body and balance.' },
  { title: 'Front Press', duration: '45', image: require('./assets/press.png'), description: 'Works shoulder and chest.' },
  { title: 'Plank', duration: '60', image: require('./assets/plank.png'), description: 'Works your core muscles, as well as your upper and lower body.' },
  { title: 'Lunges', duration: '45', image: require('./assets/lunge.png'), description: 'Strengthens legs and improves coordination.' },
  { title: 'Bridges', duration: '30', image: require('./assets/bridges.png'), description: 'Activates glutes and strengthens posterior chain.' },
  { title: 'Side Squats', duration: '45', image: require('./assets/sidesquats.png'), description: 'Improves lateral movement and leg strength.' },
  { title: 'Side Plank', duration: '25', image: require('./assets/sideplank.png'), description: 'Strengthens the side of the body and improves posture.' },
  { title: 'Pushups', duration: '45', image: require('./assets/pushups.png'), description: 'Builds upper body and core strength.' },
];

const HomePage = ({ onLogout }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);

  useEffect(() => {
    let countdown;
    if (modalVisible && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            Alert.alert('Time is up!', 'Exercise duration completed.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [modalVisible, timer]);

  const handlePlayPress = (exercise) => {
    setSelectedExercise(exercise);
    setTimer(parseInt(exercise.duration));
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <Image source={require('./assets/posturapp.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>PosturApp</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAboutVisible(true)}>
          <Text style={styles.menuButton}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFaqVisible(true)}>
          <Text style={styles.menuButton}>FAQs</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Recommended Exercises */}
        <Text style={styles.sectionTitle}>Recommended</Text>
        {recommendedExercises.map((item, index) => (
          <View key={index} style={styles.recommendCard}>
            <Image source={item.image} style={styles.exerciseImage} />
            <Text style={styles.exerciseTitle}>{item.title}</Text>
            <Text style={styles.exerciseTime}>{item.duration} sec</Text>
            <TouchableOpacity style={styles.playButton} onPress={() => handlePlayPress(item)}>
              <Text style={styles.playIcon}>▶</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal for Exercise Details */}
      <Modal
        transparent
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
                <Text style={styles.modalText}>Duration: {selectedExercise.duration} sec</Text>
                <Text style={styles.modalText}>{selectedExercise.description}</Text>
                <Text style={styles.timerText}>Time Left: {timer} sec</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for About */}
      <Modal
        transparent
        visible={aboutVisible}
        animationType="slide"
        onRequestClose={() => setAboutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>About This App</Text>
            <Text style={styles.modalText}>
              PosturApp helps you improve your posture through various guided exercises.
              Developed by a team of fitness enthusiasts, this app aims to provide users with effective workouts.
            </Text>
            <Text>Creators</Text>
            <Text>Sales Aj Angelo S.</Text>
            <Text>Kenn Cherwin Yu.</Text>
            <Text>Santos Lance</Text>
            <Text>Tugadi marlv.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setAboutVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for FAQs */}
      <Modal
        transparent
        visible={faqVisible}
        animationType="slide"
        onRequestClose={() => setFaqVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Frequently Asked Questions</Text>
            <Text style={styles.modalText}>
              1. How does this app work?{"\n"}
              - The app provides a series of exercises to improve posture and strengthen core muscles.
              {"\n\n"}2. Is it free to use?{"\n"}
              - Yes, PosturApp is completely free to use!
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setFaqVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  logout: { color: '#fff', fontSize: 14 },
  menuButton: { color: '#fff', fontSize: 14, marginLeft: 10 },
  scrollContainer: { padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  recommendCard: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  exerciseImage: { width: 120, height: 80, borderRadius: 8, marginBottom: 5 },
  exerciseTitle: { fontWeight: 'bold', fontSize: 14 },
  exerciseTime: { fontSize: 12, color: '#555' },
  playButton: {
    marginTop: 5,
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  playIcon: { color: '#fff', fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 14, textAlign: 'center', marginBottom: 10 },
  timerText: { fontSize: 16, fontWeight: 'bold', color: '#d32f2f', marginBottom: 10 },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
});

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const API_URL = 'https://your-api-url.com/analyze-photo';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [apiResult, setApiResult] = useState<string | null>(null);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async function capturePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      sendPhotoToApi(photo.uri);
    }
  }

  async function sendPhotoToApi(uri: string) {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setApiResult(result.message);
      setIsResultModalVisible(true);
    } catch (error) {
      console.error('Error sending photo to API:', error);
    }
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const cameraRef = React.useRef<CameraView>(null);

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          locations={[0, 1]}
          style={styles.overlay}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={capturePhoto}>
            <Text style={styles.buttonText}>Capture Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      <Modal visible={isResultModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>API Result</Text>
            <Text style={styles.modalText}>{apiResult}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsResultModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  message: {
    fontSize: 16,
    color: '#e2e2e5',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#18181b95',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#22C55E30',
  },
  buttonText: {
    fontSize: 16,
    color: '#22C55E',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e2e2e5',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#18181b',
    fontWeight: '500',
  },
});
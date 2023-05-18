import React, { useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const InputComponent = ({ onAddItem }) => {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleTextChange = (text) => {
    setInputText(text);
  };

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      onAddItem(inputText);
      setInputText('');
      setModalVisible(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleModalClose = () => {
    if (inputText.trim() !== '') {
      setInputText('');
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={inputText}
        onChangeText={handleTextChange}
      /> */}
      <Button title="Add Goal" onPress={() => setModalVisible(true)} />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleModalClose}
        backdropTransitionOutTiming={0}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              value={inputText}
              onChangeText={handleTextChange}
              placeholder="Enter your goal"
              autoFocus
            />
            <Button title="Submit" onPress={handleAddItem} />
          </View>
        </View>
      </Modal>
      {showAlert && (
        <Modal isVisible={true} onBackdropPress={handleAlertClose}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>Please enter text</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    width: 400,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  modal: {
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
  },
  modalContent: {
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
  },
});

export default InputComponent;

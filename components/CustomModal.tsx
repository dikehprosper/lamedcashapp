/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const CustomModal = ({visible, children, onClose, height, navigation}: any) => {
  const onTouchInsideModal = () => {
    // This event handler can be left empty since clicking inside the modal should have no effect
  };

  return (
    <SafeAreaView>
      <Modal visible={visible} transparent>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={onClose}>
          <View style={styles.overlay} />
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.modal, {height: height + 40}]}
            // onTouchStart={onTouchInsideModal}
            >
            {React.Children.map(children, child =>
              React.cloneElement(child, {navigation}),
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default CustomModal;

import React from 'react';
import { Modal, StyleSheet, View, Platform } from 'react-native';

export default class GeneralModalComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    shouldShowModal: this.props.isModalVisible,
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({ shouldShowModal: newProps.isModalVisible });
  }

  render() {
    return (
      <Modal
        visible={this.state.shouldShowModal}
        animationType="slide"
        transparent={true}
        onRequestClose={this.onRequestCloseHandler}
        style={styles.modalStyle}>
        <View
          pointerEvents={this.props.isLoading ? 'none' : 'auto'}
          style={styles.mainViewStyle}>
          {this.props.children}
        </View>
      </Modal>
    );
  }

  onRequestCloseHandler = () => {
    if (Platform.OS !== 'android' && this.props.onRequestClose !== undefined) {
      this.props.onRequestClose();
    } else if (Platform.OS == 'android' && this.props.shouldDismissModalOnBackButton) {
      this.props.onRequestClose();
    } else {
      console.log('Hardware back button pressed, do nothing.');
    }
  }
}

const styles = StyleSheet.create({
  //Modal Style
  modalStyle: {
    flex: 1,
  },
  //Main top view
  mainViewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
});

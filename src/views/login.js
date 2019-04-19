import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import LoginScreen1 from './login/LoginScreen1';
import LoginScreen2 from './login/LoginScreen2';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993} ref={(c) => { this._scrollView = c; }}>
          <LoginScreen1 navigation={this.props.navigation}/>
          <LoginScreen2 />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

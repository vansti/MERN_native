import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import { cacheFonts } from "../../helpers/AssetsCaching";
import { loginUser, clearErrors } from '../../actions/authActions';
import { connect } from 'react-redux';
import isEmptyObj from '../../validation/is-empty'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/e.png');

class LoginScreen1 extends Component {
  constructor() {
    super();

    this.state = {
      fontLoaded: false,
      email: '',
      password: '',
      showLoading: false,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.navigation.navigate('App');
    }

    if (!isEmptyObj(nextProps.errors)) {
      this.setState({ errors: nextProps.errors, showLoading: false });
    }
  }

  async componentDidMount() {
    await cacheFonts({
      georgia: require('../../../assets/fonts/Georgia.ttf'),
      regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  submitLoginCredentials() {

    this.setState({
      showLoading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.clearErrors();
    this.props.loginUser(userData);
  }

  render() {
    const { email, password, showLoading, errors } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          {this.state.fontLoaded ? (
            <View style={styles.loginView}>
              <View style={styles.loginInput}>
                <Input
                  leftIcon={
                    <Icon
                      name="user-o"
                      type="font-awesome"
                      color="rgba(171, 189, 219, 1)"
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  inputStyle={{ marginLeft: 10, color: 'white' }}
                  keyboardAppearance="light"
                  placeholder="Email"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => {
                    this.passwordInput.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor="white"
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                  errorMessage={
                    errors.email_login && errors.email_login
                  }
                />
                <Input
                  leftIcon={
                    <Icon
                      name="lock"
                      type="font-awesome"
                      color="rgba(171, 189, 219, 1)"
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  inputStyle={{ marginLeft: 10, color: 'white' }}
                  secureTextEntry={true}
                  keyboardAppearance="light"
                  placeholder="Mật khẩu"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="done"
                  ref={input => (this.passwordInput = input)}
                  blurOnSubmit={true}
                  placeholderTextColor="white"
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                  errorMessage={
                    errors.password_login && errors.password_login
                  }
                />
              </View>
              <Button
                title="Đăng nhập"
                activeOpacity={1}
                underlayColor="transparent"
                onPress={this.submitLoginCredentials.bind(this)}
                loading={showLoading}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                  height: 50,
                  width: 250,
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'white' }}
              />
              <View style={styles.footerView}>
                <Text style={{color:"rgba(171, 189, 219, 1)"}}>Đăng ký tài khoản</Text>
                <Icon
                  name='arrow-right'
                  type='font-awesome'
                  color="rgba(171, 189, 219, 1)"
                  size={25} />
              </View>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    marginTop: 200,
    backgroundColor: 'transparent',
    width: 250,
    height: 400,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'bold',
  },
  plusText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser, clearErrors })(LoginScreen1);
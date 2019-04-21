import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Linking, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUsers } from '../actions/userActions';
import PropTypes from 'prop-types';
import isEmptyObj from '../validation/is-empty';

const SCREEN_WIDTH = Dimensions.get('window').width;

class PeopleInCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');
    this.props.getUsers(courseId);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmptyObj(nextProps.users)) {
      const {users} = nextProps.users
      this.setState({users: users})
    }
  }

  render() {
    const { users } = this.state
    console.log(users)
    return (
      <View style={{ flex: 1 }}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
});

const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, { getUsers })(PeopleInCourse); 
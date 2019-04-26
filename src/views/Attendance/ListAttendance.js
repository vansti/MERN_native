import React, { Component } from 'react';
import { StyleSheet, View, Text, Linking, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Card, ListItem, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmptyObj from '../../validation/is-empty'; 
import moment from "moment";


class ListAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');

  }

  render() {
    const { } = this.state
    return (
      <View style={{ flex: 1 }}>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, {  })(ListAttendance); 
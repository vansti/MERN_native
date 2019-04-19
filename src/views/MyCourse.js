import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getCurentCourse } from '../actions/courseActions'; 

class MyCourse extends Component {
  componentDidMount = () => {
    this.props.getCurentCourse();
  }
  render() {
    const {currentcourses} = this.props.courses
    if(currentcourses !== null){
      console.log(currentcourses)
    }
    return (
      <View style={styles.container}>
        <Text>Course</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  courses: state.courses
});
export default connect(mapStateToProps, { getCurentCourse })(MyCourse); 
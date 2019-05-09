import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { connect } from 'react-redux';
const LOGO_IMAGE = require('../images/e-icon.png');

const SCREEN_WIDTH = Dimensions.get('window').width;

class Dashboard extends Component {
  handleAllCourse = () =>{
    this.props.navigation.navigate('CourseList');
  }
  handleMyCourse = () =>{
    this.props.navigation.navigate('MyCourse');
  }
  render() {
    const { name } = this.props.auth.user

    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <Text style={styles.nameHeader}>Xin chào <Text style={{fontWeight:'bold'}}>{name},</Text></Text>
        </View>
        <View style={styles.center}>
          <View style={{marginHorizontal:100}}>
            <Image
              source={LOGO_IMAGE}
              style={{ width: 150, height: 150 }}
            />
          </View>
          <View style={{marginHorizontal: 52, marginVertical: 20}}>
            <Text style={{fontWeight:'bold', fontSize: 18}}>HỆ THỐNG QUẢN LÝ HỌC VIÊN</Text>
          </View>
          <Button
            title="Xem khóa học hiện có"
            titleStyle={{ fontWeight: '700', color: 'white' }}
            buttonStyle={{
              marginHorizontal: 52,
              backgroundColor: 'grey',
              borderRadius: 20,
            }}
            onPress={this.handleAllCourse.bind(this)}
          />
          <Button
            title="Xem khóa học của bạn"
            titleStyle={{ fontWeight: '700', color: 'white' }}
            buttonStyle={{
              marginHorizontal: 52,
              marginTop:20,
              backgroundColor: 'grey',
              borderRadius: 20
            }}
            onPress={this.handleMyCourse.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'black',
    fontSize: 18,
    marginLeft: 20,
  },
  center: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {  })(Dashboard); 
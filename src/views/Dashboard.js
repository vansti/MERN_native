import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { connect } from 'react-redux';
const LOGO_IMAGE = require('../images/e-icon.png');

const SCREEN_WIDTH = Dimensions.get('window').width;

class Dashboard extends Component {
  render() {
    const { name, role } = this.props.auth.user
    var Content = null ;

    switch (role) {
      case 'student': 
        Content = 
          <View>
            <Button
              title="Thông tin cá nhân"
              titleStyle={{ fontWeight: '700', color: 'white' }}
              buttonStyle={{
                marginHorizontal: 52,
                marginTop:20,
                backgroundColor: 'grey',
                borderRadius: 20
              }}
              onPress={()=>this.props.navigation.navigate('MyInfo')}
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
              onPress={()=>this.props.navigation.navigate('MyCourse')}
            />
          </View>
        break;

      case 'teacher': 
        Content = 
          <View>
            <Button
              title="Điểm danh"
              titleStyle={{ fontWeight: '700', color: 'white' }}
              buttonStyle={{
                marginHorizontal: 52,
                marginTop:20,
                backgroundColor: 'grey',
                borderRadius: 20
              }}
              onPress={()=>this.props.navigation.navigate('Attendance')}
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
              onPress={()=>this.props.navigation.navigate('MyCourse')}
            />
          </View>
        break;

      case 'educator': 
        Content = 
          <View>
            <Button
              title="Danh sách khóa học"
              titleStyle={{ fontWeight: '700', color: 'white' }}
              buttonStyle={{
                marginHorizontal: 52,
                marginTop:20,
                backgroundColor: 'grey',
                borderRadius: 20
              }}
              onPress={()=>this.props.navigation.navigate('ViewCourse')}
            />
            <Button
              title="Lịch sử điểm danh"
              titleStyle={{ fontWeight: '700', color: 'white' }}
              buttonStyle={{
                marginHorizontal: 52,
                marginTop:20,
                backgroundColor: 'grey',
                borderRadius: 20
              }}
              onPress={()=>this.props.navigation.navigate('ViewAttendance')}
            />
          </View>
        break;

      case 'ministry': 
        Content = 
          <View>
            <Button
              title="Quản lý khóa học"
              titleStyle={{ fontWeight: '700', color: 'white' }}
              buttonStyle={{
                marginHorizontal: 52,
                marginTop:20,
                backgroundColor: 'grey',
                borderRadius: 20
              }}
              onPress={()=>this.props.navigation.navigate('ManageCourses')}
            />
          </View>
        break;

      case 'manager': 
        Content = 
          <View>
            <Button
              title="Tạo tài khoản"
              titleStyle={{ fontWeight: '700', color: 'white' }}
              buttonStyle={{
                marginHorizontal: 52,
                marginTop:20,
                backgroundColor: 'grey',
                borderRadius: 20
              }}
              onPress={()=>this.props.navigation.navigate('CreateAccount')}
            />
          </View>
        break;
      case 'admin': 
        Content = 
          <View>
          </View>
        break;
      default: break;
    }

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
          <View style={{ marginVertical: 20 }}>
            <Text style={{fontWeight:'bold', fontSize: 18, textAlign: 'center'}}>TRUNG TÂM ĐÀO TẠO</Text>
          </View>
          {Content}
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
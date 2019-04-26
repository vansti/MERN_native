import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import isEmptyObj from '../../validation/is-empty'; 
import { getTodayAttendance, addAttendance, editAttendance, clearSuccess } from '../../actions/attendanceActions';
import { getUsers } from '../../actions/userActions';

var moment = require('moment');
const SCREEN_WIDTH = Dimensions.get('window').width;

class CheckAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user:[],
      userAttendance:[],
      attendanceId:'',
      loadingUser: true,
      loadingUserAttendance: true,
      courseId: null,
      loadingSubmit1: false,
      loadingSubmit2: false
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');
    this.setState({
      courseId
    })
    this.props.getTodayAttendance(courseId);
    this.props.getUsers(courseId);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmptyObj(nextProps.users)) {
      const { users, loading } = nextProps.users

      users.students.map(user => {
        return user.isPresent = true;
      })

      this.setState({
        user: users.students,
        loadingUser: loading
      })
    }

    if (!isEmptyObj(nextProps.attendance)) {
      const { loading, today_attendance } = nextProps.attendance
      if(!isEmptyObj(today_attendance))
      {
        this.setState({
          attendanceId: today_attendance._id,
          userAttendance: today_attendance.students,
          loadingUserAttendance: loading
        })
      }else{
        this.setState({
          attendanceId: '',
          userAttendance: [],
          loadingUserAttendance: false
        })
      }
    }

    if (nextProps.success.data === "Điểm danh thành công") {
      Alert.alert(
        'Thành công',
        'Điểm danh thành công'
      )
      this.props.clearSuccess();
      this.props.getTodayAttendance(this.state.courseId);      
      this.setState({ loadingSubmit1: false, loadingSubmit2: false })
    }

  }

  onCheck(userid){
    this.state.user.map(user => {
      if(user._id.toString() === userid.toString())
        return user.isPresent = !user.isPresent;
      return user;
    })

    this.setState({
      user: this.state.user
    })
  }

  onCheck2(userid){
    this.state.userAttendance.map(user => {
      if(user.userId._id.toString() === userid.toString())
        return user.isPresent = !user.isPresent;
      return user;
    })

    this.setState({
      userAttendance: this.state.userAttendance
    })
  }

  submit = () => {
    var today = moment().format('YYYY-MM-DD');

    var newAttendance = {
      courseId: this.state.courseId,
      date: today,
      students: []
    };

    newAttendance.students = JSON.parse(JSON.stringify(this.state.user));
    newAttendance.students.map(student => {
      student.userId = student._id
      delete student._id
      delete student.name
      delete student.photo
      return student
    })
 
    this.props.addAttendance(newAttendance);
    this.setState({loadingSubmit1: true})

  }

  submit2 = () => {

    var editAttendance = {
      _id: this.state.attendanceId,
      students: []
    };

    editAttendance.students = JSON.parse(JSON.stringify(this.state.userAttendance));
    editAttendance.students.map(student => {
      return student.userId = student.userId._id
    })

    this.props.editAttendance(editAttendance);
    this.setState({loadingSubmit2: true})

  }

  render() {
    const { user, userAttendance, loadingUser, loadingUserAttendance, loadingSubmit1, loadingSubmit2 } = this.state

    var StudentList = <Text>Chưa có học viên ghi danh</Text>;

    if(!isEmptyObj(user) && isEmptyObj(userAttendance)){
      StudentList = 
      <ScrollView>
        <Button
          title="Lưu điểm danh"
          loading={loadingSubmit1}
          onPress = {this.submit}
          containerStyle={{ marginHorizontal: 10, height: 50, width: 200 }}
          titleStyle={{ fontWeight: 'bold' }}
        />
        {
          user.map(u => {
            return (
              <ListItem
                key={u._id}
                leftAvatar={{ rounded: true, source: { uri: u.photo } }}
                title={u.name}
                subtitle={u.email}
                containerStyle={{
                  borderRadius: 8,
                  marginTop: 10,
                  marginHorizontal: 10
                }}
                checkBox={{
                  checked: u.isPresent,
                  onPress: this.onCheck.bind(this, u._id)
                }}
              />
            );
          })
        }
      </ScrollView>
    }

    if(!isEmptyObj(user) && !isEmptyObj(userAttendance)){
      StudentList = 
      <ScrollView>
      <Button
        title="Chỉnh sửa điểm danh"
        loading={loadingSubmit2}
        onPress = {this.submit2}
        containerStyle = {{ marginHorizontal: 10, height: 50, width: 200 }}
        titleStyle = {{ fontWeight: 'bold' }}
      />
      {
        userAttendance.map(u => {
          return (
            <ListItem
              key={u._id}
              leftAvatar={{ rounded: true, source: { uri: u.userId.photo } }}
              title={u.userId.name}
              subtitle={u.userId.email}
              containerStyle={{
                borderRadius: 8,
                marginTop: 10,
                marginHorizontal: 10
              }}
              checkBox={{
                checked: u.isPresent,
                onPress: this.onCheck2.bind(this, u.userId._id)
              }}
            />
          );
        })
      }
      </ScrollView>
    }

    return (
      <View style={{ flex: 1 , backgroundColor: 'rgba(241,240,241,1)'}}>
      {
        loadingUser || loadingUserAttendance
        ?
        <View style={styles.container}> 
          <ActivityIndicator size="large" />
        </View>
        :
        <View>
          <View style={styles.statusBar} />
          <View style={styles.navBar}>
            <Text style={styles.nameHeader}>Điểm danh ngày {moment().format('DD/MM/YYYY')}</Text>
          </View>
          {StudentList}
        </View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
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
    fontSize: 25,
    marginLeft: 20,
  }
});

const mapStateToProps = state => ({
  users: state.users,
  attendance: state.attendance,
  success: state.success
});
export default connect(mapStateToProps, { getTodayAttendance, getUsers, addAttendance, editAttendance, clearSuccess })(CheckAttendance); 
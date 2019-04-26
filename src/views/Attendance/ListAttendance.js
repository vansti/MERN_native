import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { ListItem, Button, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import isEmptyObj from '../../validation/is-empty'; 
import { Calendar } from 'react-native-calendars';
import { getAttendance } from '../../actions/attendanceActions';

var moment = require('moment');
const SCREEN_WIDTH = Dimensions.get('window').width;

class ListAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendance: [],
      loading: true,
      highlightDates: {},
      selectDate: null,
      users: [],
      intialUsers: [],
      search: ''
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');
    this.props.getAttendance(courseId);
  }

  componentWillReceiveProps(nextProps) {

    if (!isEmptyObj(nextProps.attendance)) {
      const { loading, attendance } = nextProps.attendance

      this.setState({
        attendance,
        loading
      })

      var dateList = {};
      nextProps.attendance.attendance.forEach(element => {
        dateList[element.date] = {
          customStyles: {
            container: {
              backgroundColor: 'green',
            },
            text: {
              color: 'white',
              fontWeight: 'bold'
            },
          },
        }
      })
      this.setState({
        highlightDates: dateList
      })
    }
  }

  submit=()=>{
    if(this.state.selectDate !== null)
    {
      var userList = [];
      this.state.attendance.forEach(element => {
        if(this.state.selectDate === element.date)
          userList = element.students
      })
      this.setState({
        users: userList,
        intialUsers: userList
      })
    }
  }

  updateSearch = search => {
    var updatedList = JSON.parse(JSON.stringify(this.state.intialUsers));
    updatedList = updatedList.filter((user)=>
      user.userId.email.toLowerCase().search(search.toLowerCase()) !== -1 ||
      user.userId.name.toLowerCase().search(search.toLowerCase()) !== -1
    );
    this.setState({
      users: updatedList,
      search
    });
  };

  render() {
    const { loading, highlightDates, selectDate, users, search, intialUsers } = this.state
    return (
      <View style={{ flex: 1 , backgroundColor: 'rgba(241,240,241,1)'}}>
      {
        loading
        ?
        <View style={styles.container}> 
          <ActivityIndicator size="large" />
        </View>
        :
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            behavior="position"
          >
          <Calendar
            markingType={'custom'}
            markedDates={highlightDates}
            onDayPress={(day) => {
              this.setState({
                selectDate: day.dateString
              })
            }}
          />
          {
            selectDate
            ?
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}> Ngày {moment(selectDate).format('DD/MM/YYYY')}</Text>
              <Button
                title="Xem điểm danh"
                onPress = {this.submit}
                containerStyle={{ marginLeft: 10, height: 20, width: 150 }}
                titleStyle={{ fontWeight: 'bold' }}
              />
            </View>
            :
            null
          }
          {
            isEmptyObj(intialUsers)
            ?
            null
            :
            <View style={{marginBottom:20}}>
              <SearchBar
                placeholder="Email hoặc Họ Tên ..."
                platform="ios"
                onChangeText={this.updateSearch}
                value={search}
              />
              {
                users.map(user => {
                  return (
                    <ListItem
                      key={user._id}
                      leftAvatar={{ rounded: true, source: { uri: user.userId.photo } }}
                      title={user.userId.name}
                      subtitle={user.userId.email}
                      containerStyle={{
                        borderRadius: 8,
                        marginTop: 10,
                        marginHorizontal: 10
                      }}
                      badge = {
                        user.isPresent
                        ?
                        {
                          status: 'success',
                          value: 'Hiện diện'
                        }
                        :
                        {
                          status: 'error',
                          value: 'Vắng'
                        }
                      }
                      
                    />
                  );
                })
              }
            </View>
          }
          </KeyboardAvoidingView>
        </ScrollView>
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
  navBar: {
    marginTop: 10,
    height: 60,
    width: SCREEN_WIDTH,
    flexDirection: 'row'
  },
  nameHeader: {
    marginTop: 5,
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  }
});

const mapStateToProps = state => ({
  attendance: state.attendance
});
export default connect(mapStateToProps, { getAttendance })(ListAttendance); 
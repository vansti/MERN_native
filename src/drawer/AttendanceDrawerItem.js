import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MyCourseAttendance from '../views/MyCourseAttendance';
import CheckAttendance from '../views/Attendance/CheckAttendance';
import ListAttendance from '../views/Attendance/ListAttendance';


const AttendanceTab = createBottomTabNavigator(
  {
    CheckAttendance: {
      screen: CheckAttendance,
      path: '/check-attendance',
      navigationOptions: {
        tabBarLabel: 'Điểm danh học viên',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='check' size={30} type="font-awesome" color={tintColor} />
        )
      }
    },
    ListAttendance: {
      screen: ListAttendance,
      path: '/list-attendance',
      navigationOptions: {
        tabBarLabel: 'Lịch sử điểm danh',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="history" size={30} type="font-awesome" color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'CheckAttendance',
    animationEnabled: false,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showIcon: true,
    },
  }
);

const AttendanceDrawerItem = createStackNavigator(
  {
    MyCourseAttendance: {
      screen: MyCourseAttendance,
      path: '/',
      navigationOptions: ({ navigation }) => ({
        title: 'Điểm danh',
        headerLeft: (
          <Icon
            name="menu"
            size={30}
            type="entypo"
            iconStyle={{ paddingLeft: 10 }}
            onPress={navigation.toggleDrawer}
          />
        ),
      })
    },
    AttendanceTab: {
      screen: AttendanceTab,
      path: '/attendance',
      navigationOptions: {
        title: 'Chi tiết điểm danh',
      }
    }
  }
);

AttendanceDrawerItem.navigationOptions = {
  drawerLabel: 'Điểm danh',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="clock-o"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="font-awesome"
      color={tintColor}
    />
  ),
};

export default AttendanceDrawerItem;

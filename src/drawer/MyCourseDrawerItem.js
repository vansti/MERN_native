import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MyCourse from '../views/MyCourse';
import Exercise from '../views/Exercise';
import PeopleInCourse from '../views/PeopleInCourse';
import StudentInfo from '../views/StudentInfo';



const MyCourse_Detail = createBottomTabNavigator(
  {
    Exercise: {
      screen: Exercise,
      path: '/exercise',
      navigationOptions: {
        tabBarLabel: 'Bài tập',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='book' size={30} type="font-awesome" color={tintColor} />
        ),
      },
    },
    People: {
      screen: PeopleInCourse,
      path: '/people',
      navigationOptions: {
        tabBarLabel: 'Mọi người',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={30} type="font-awesome" color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Exercise',
    animationEnabled: false,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showIcon: true,
    },
  }
);

const MyCourseDrawerItem = createStackNavigator(
  {
    MyCourse: {
      screen: MyCourse,
      path: '/',
      navigationOptions: ({ navigation }) => ({
        title: 'Khóa học của tôi',
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
    MyCourse_Detail: {
      screen: MyCourse_Detail,
      path: '/mycourse_detail',
      navigationOptions: {
        title: 'Chi tiết khóa học',
      }
    },
    StudentInfo: {
      screen: StudentInfo,
      path: '/student-info',
      navigationOptions: {
        title: 'Thông tin học viên',
      }
    }
  }
);

MyCourseDrawerItem.navigationOptions = {
  drawerLabel: 'Khóa học của tôi',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="book"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default MyCourseDrawerItem;

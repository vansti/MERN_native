import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ManageCourses from '../views/ManageCourses';
import ApproveStudent from '../views/ApproveStudent';

const ManageCoursesDrawerItem = createStackNavigator(
  {
    ManageCourses: {
      screen: ManageCourses,
      path: '/',
      navigationOptions: ({ navigation }) => ({
        title: 'Quản lý khóa học',
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
    ApproveStudent: {
      screen: ApproveStudent,
      path: '/approve-student',
      navigationOptions: {
        title: 'Chi tiết điểm danh',
      }
    }
  }
);

ManageCoursesDrawerItem.navigationOptions = {
  drawerLabel: 'Quản lý khóa học',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="wrench"
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

export default ManageCoursesDrawerItem;

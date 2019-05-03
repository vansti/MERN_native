import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ManageCourses from '../views/ManageCourses';

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

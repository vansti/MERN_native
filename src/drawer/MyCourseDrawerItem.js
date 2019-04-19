import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MyCourse from '../views/MyCourse';

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
      }),
    },
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

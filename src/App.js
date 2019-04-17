import React, { Component } from 'react';
import AppLoading from "./components/AppLoading";
import { View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { createAppContainer, createDrawerNavigator, DrawerItems, createStackNavigator } from 'react-navigation';
import { cacheAssets, cacheFonts } from "./helpers/AssetsCaching";


import Components from './drawer/components';
import Ratings from './drawer/ratings';
import Pricing from './drawer/pricing';
import Profile from './drawer/profile';
import Lists from './drawer/lists';
import Settings from './drawer/settings';
import Logout from './drawer/Logout'

import Login from './views/login';
import LoadingScreen from './views/LoadingScreen';



const WINDOW_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('./images/e-icon.png')}
        style={{ width: 50, height: 50}}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
    <Logout navigation={props.navigation}/>
  </View>
);

const AppDrawer = createDrawerNavigator(
  {
    Profile: {
      path: '/profile',
      screen: Profile,
    },
    Lists: {
      path: '/lists',
      screen: Lists,
    },
    Components: {
      path: '/components',
      screen: Components,
    },
    Ratings: {
      path: '/ratings',
      screen: Ratings,
    },
    Pricing: {
      path: '/pricing',
      screen: Pricing,
    },
    Settings: {
      path: '/settings',
      screen: Settings,
    },
  },
  {
    initialRouteName: 'Components',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
    contentComponent: CustomDrawerContentComponent,
  }
);


const Application = createAppContainer(createStackNavigator(
  { 
    Loading: LoadingScreen,
    Login: Login, 
    App: AppDrawer 
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
));


export default class App extends Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheAssets([
      require("../assets/images/student.png"),
      require("../assets/images/teacher.png"),
    ]);

    const fontAssets = cacheFonts({
      "FontAwesome": require("@expo/vector-icons/fonts/FontAwesome.ttf"),
      "Ionicons": require("@expo/vector-icons/fonts/Ionicons.ttf"),
      "Entypo": require("@expo/vector-icons/fonts/Entypo.ttf"),
      "SimpleLineIcons": require("@expo/vector-icons/fonts/SimpleLineIcons.ttf"),
      "MaterialIcons": require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
      "MaterialCommunityIcons": require("@expo/vector-icons/fonts/MaterialCommunityIcons.ttf"),
    });

    await Promise.all([imageAssets, fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return <Application />;
  }
}
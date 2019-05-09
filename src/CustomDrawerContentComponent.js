import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Logout from './drawer/Logout'
import { DrawerItems } from 'react-navigation';

class CustomDrawerContentComponent extends Component {

  render() {
    const { role } = this.props.auth.user
    const { items, ...rest } = this.props;
    const studentItems = items.filter(item => item.key === "Dashboard" || item.key === "Profile" || item.key === "MyCourse" || item.key === "CourseList" );

    return (
      <View style={{ flex: 1, backgroundColor: '#43484d' }}>
        <ScrollView>
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
          {
            role === 'student'
            ?
            <DrawerItems items={studentItems} {...rest} />
            :
            <DrawerItems {...this.props} />
          }
          </View>
          <Logout navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { })(CustomDrawerContentComponent); 
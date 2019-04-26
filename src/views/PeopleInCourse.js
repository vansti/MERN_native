import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUsers } from '../actions/userActions';
import isEmptyObj from '../validation/is-empty';

class PeopleInCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {
        students:[],
        teachers:[]
      },
      loading: true
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');
    this.props.getUsers(courseId);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmptyObj(nextProps.users)) {
      const {users, loading} = nextProps.users
      this.setState({
        users,
        loading
      })
    }
  }

  render() {
    const { students, teachers } = this.state.users
    const { loading } = this.state
    return (
      <View style={{ flex: 1 }}>
      {
        loading
        ?
        <View style={styles.container}> 
          <ActivityIndicator size="large" />
        </View>
        :
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            <Card title="Giáo Viên">
            {
              teachers.length === 0
              ? <Text>Chưa có giáo viên tham gia</Text>
              :
              teachers.map(user => {
                return (
                  <ListItem
                    key={user._id}
                    leftAvatar={{ rounded: true, source: { uri: user.photo } }}
                    title={user.name}
                    subtitle={user.email}
                    containerStyle={{
                      borderWidth: 1,
                      borderColor: 'grey',
                      borderRadius: 8,
                      marginTop: 10
                    }}
                  />
                );
              })
            }
            </Card>
            <Card title="Học Viên">
            {
              students.length === 0
              ? <Text>Chưa có học viên</Text>
              :
              students.map(user => {
                return (
                  <ListItem
                    key={user._id}
                    leftAvatar={{ rounded: true, source: { uri: user.photo } }}
                    title={user.name}
                    subtitle={user.email}
                    containerStyle={{
                      borderWidth: 1,
                      borderColor: 'grey',
                      borderRadius: 8,
                      marginTop: 10
                    }}
                  />
                );
              })
            }
            </Card>
          </View>
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
  }
});

const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, { getUsers })(PeopleInCourse); 
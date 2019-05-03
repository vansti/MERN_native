import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, Dimensions, Alert } from 'react-native';
import { SearchBar, Card, Divider, Image, Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { getManageCourses, joinCourse, clearSuccess } from '../actions/courseActions'; 

const SCREEN_HEIGHT = Dimensions.get('window').height;
class ManageCourses extends Component {
  constructor() {
    super();
    this.state = {
      managecourses: [],
      intialManagecourses: [],
      loading: true,
      search: null,
      isLoadingJoinCourse: false
    };
    this.handleJoinCourse = this.handleJoinCourse.bind(this);
    this.handleClickApprove = this.handleClickApprove.bind(this);
  }

  componentDidMount=()=>{
    this.props.getManageCourses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.courses) {
      const { managecourses, loading } = nextProps.courses
      this.setState({ 
        intialManagecourses: managecourses,
        managecourses, 
        loading 
      });
    }

    if (nextProps.success === "Tham gia khóa học thành công" || nextProps.success === "Đã tham gia vào khóa học này") {
      Alert.alert('Thông báo', nextProps.success);
      this.setState({
        isLoadingJoinCourse: false
      })
      this.props.clearSuccess();
    }
  }

  onSearch = search =>{
    var updatedList = JSON.parse(JSON.stringify(this.state.intialManagecourses));
    updatedList = updatedList.filter((course)=>
      course.title.toLowerCase().search(search.toLowerCase()) !== -1
    );
    this.setState({ 
      managecourses: updatedList,
      search 
    });
  }

  handleJoinCourse(courseId){
    this.props.joinCourse(courseId);
    this.setState({isLoadingJoinCourse: true});
  }

  handleClickApprove(courseId){
    this.props.navigation.navigate('ApproveStudent',{ courseId: courseId })
  } 

  render() {
    let { managecourses, loading, search, isLoadingJoinCourse } = this.state;
    const { role } = this.props.auth.user;
    return (
      <View style={{ flex: 1 }}>
      {
        loading
        ?
        <View style={styles.container}> 
          <ActivityIndicator size="large" />
        </View>
        :
        <View >
          <SearchBar
            placeholder="Tên khóa học ..."
            platform="ios"
            value={search} 
            onChangeText={this.onSearch}
          />
          <ScrollView style={{height: SCREEN_HEIGHT - 160}}>
          <View>
            {
              managecourses.map(course =>
                <Card key={course._id}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: course.coursePhoto }}
                      style={{ width: 70, height: 70, borderColor:'rgba(241,240,241,1)', borderWidth: 1, borderRadius: 5 }}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        marginLeft: 10,
                        flex: 1, 
                        flexWrap: 'wrap'
                      }}
                    >
                      {course.title}
                    </Text>
                  </View>
                  <Divider style={{ backgroundColor: 'grey', marginTop: 10 }} />
                  {
                    role === 'teacher'
                    ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                      <Button
                        backgroundColor='#03A9F4'
                        containerStyle={{marginLeft: 20}}
                        onPress={this.handleJoinCourse.bind(this, course._id)}
                        title=' Tham gia' 
                      />
                    </View>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                      <Button
                        backgroundColor='#03A9F4'
                        onPress={this.handleClickApprove.bind(this, course._id)}
                        containerStyle={{marginLeft: 20}}
                        title=' Phê duyệt' 
                      />
                      <Button
                        backgroundColor='#03A9F4'
                        containerStyle={{marginLeft: 20}}
                        onPress={this.handleJoinCourse.bind(this, course._id)}
                        title=' Tham gia' 
                      />
                    </View>
                  }
                </Card>
              )
            }
          </View>
          </ScrollView>
        </View>
      }
        <Overlay
          isVisible={isLoadingJoinCourse}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width= {100}
          height= {70}
        >
          <ActivityIndicator style={{marginTop:10}}/>
        </Overlay>
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
  courses: state.courses,
  success: state.success,
  auth: state.auth
});
export default connect(mapStateToProps, { getManageCourses, joinCourse, clearSuccess })(ManageCourses); 
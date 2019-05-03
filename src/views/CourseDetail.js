import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Divider } from 'react-native-elements';
import isEmptyObj from '../validation/is-empty';
import { getCourseInfo, enrollCourse, unenrollCourse, clearSuccess } from '../actions/courseActions'; 
import moment from "moment";
import HTML from 'react-native-render-html';


class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: null,
      courseinfo: [],
      loading: true,
      isLoadingSubmit: false
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');
    this.setState({ courseId })
    this.props.getCourseInfo(courseId);
  }

  handleEnroll = () =>{
    this.props.enrollCourse(this.state.courseId);
    this.setState({isLoadingSubmit: true});
  }

  handleUnEnroll = () =>{
    this.props.unenrollCourse(this.state.courseId);
    this.setState({isLoadingSubmit: true});
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmptyObj(nextProps.courses)) {
      const { courseinfo, loading } = nextProps.courses
      this.setState({
        courseinfo,
        loading
      })
    }

    if (nextProps.success.data === 'Đã ghi danh thành công') {
      Alert.alert('Thành công','Đã ghi danh thành công');
      this.setState({isLoadingSubmit: false});
      this.props.clearSuccess();
    }

    if (nextProps.success.data === 'Đã hủy ghi danh thành công') {
      Alert.alert('Thành công','Đã hủy ghi danh thành công');
      this.setState({isLoadingSubmit: false});
      this.props.clearSuccess();
    }
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
    const { courseinfo, loading, isLoadingSubmit } = this.state
    const { role } = this.props.auth.user
    return (
      <View style={{flex: 1}}>
      {
        loading
        ?
        <View style={styles.container}> 
          <ActivityIndicator size="large" />
        </View>
        :
        <ScrollView>
          <View style={{margin: 15}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: courseinfo.course.coursePhoto}}
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
                {courseinfo.course.title}
              </Text>
              {
                role === 'student'
                ?
                <View>
                  {
                    courseinfo.isEnroll === false
                    ?
                    <Button
                      title="Ghi danh"
                      loading={isLoadingSubmit}
                      onPress={this.handleEnroll} 
                      buttonStyle={{
                        height: 70,
                        width: 80
                      }}
                    />
                    :
                    <Button
                      title="Hủy ghi danh"
                      onPress={this.handleUnEnroll}
                      loading={isLoadingSubmit}
                      buttonStyle={{
                        height: 70,
                        width: 80
                      }}
                    />
                  }
                </View>
                :
                null
              }
            </View>
            <Divider style={{ backgroundColor: 'grey', marginTop: 10 }} />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Icon type="font-awesome" name="hourglass" />
              <Text
                style={{
                  marginLeft: 10
                }}
              >
                Hạn đăng ký - 
              </Text>
              <Text style={{color: 'grey'}}>{moment(courseinfo.course.enrollDeadline).format(" HH:mm [ngày] DD [thg] MM, YYYY.")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Icon type="font-awesome" name="usd" />
              <Text
                style={{
                  marginLeft: 18
                }}
              >
                Học phí - 
              </Text>
              <Text style={{color: 'grey'}}> {this.formatNumber(courseinfo.course_detail.fee)} VND.</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Icon type="font-awesome" name="calendar" />
              <Text
                style={{
                  marginLeft: 10
                }}
              >
                Thời gian học - 
              </Text>
              <Text style={{color: 'grey'}}> {courseinfo.course_detail.studyTime}.</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Icon type="font-awesome" name="clock-o" />
              <Text
                style={{
                  marginLeft: 12
                }}
              >
                Ngày khai giảng -
              </Text>
              <Text style={{color: 'grey'}}>{moment(courseinfo.course_detail.openingDay).format(" HH:mm [ngày] DD [thg] MM, YYYY.")}</Text>
            </View>
            <Divider style={{ backgroundColor: 'grey', marginTop: 10 }} />
            <HTML html={courseinfo.course_detail.info} />
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
  courses: state.courses,  
  success: state.success,
  auth: state.auth
});
export default connect(mapStateToProps, { getCourseInfo,  enrollCourse, unenrollCourse, clearSuccess })(CourseDetail); 
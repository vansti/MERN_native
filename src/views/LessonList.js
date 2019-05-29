import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Divider, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getSchedule } from '../actions/scheduleAtions';
import isEmptyObj from '../validation/is-empty';
import { NavigationEvents } from 'react-navigation';
import moment from "moment";
import 'moment/locale/vi';

class LessonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      loading :true
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');
    this.setState({ courseId })
    this.props.getSchedule(courseId)
  }

  componentWillReceiveProps(nextProps) {
    const { schedule, loading } = nextProps.schedule
    if(!isEmptyObj(schedule))
      this.setState({ 
        events: schedule.events,
        loading 
      });
    this.setState({
      loading 
    });  
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleClickLesson(courseId, lessonId){
    this.props.navigation.navigate('Lesson',{ courseId, lessonId })
  } 

  render() {
    const { events, loading } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />
      {
        loading
        ?
        <View style={styles.container}> 
          <ActivityIndicator size="large" />
        </View>
        :
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
          {
            events.length === 0
            ?
            <Text style={{marginTop: 10, textAlign:"center", fontSize:20}}>Chưa có ngày học</Text>
            :
            events.map((e, i) => {
              return (
                <View key={i} style={{marginTop:10}}>
                  <Card title={this.capitalizeFirstLetter(moment(e.date).locale('vi').format("dddd, [ngày] DD [thg] MM, YYYY"))}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>- Bài học: {e.text}</Text>
                      <Text style={{color: 'grey'}}>- Giờ học: {e.time[0]} - {e.time[1]}</Text>
                      <Divider style={{ backgroundColor: 'grey', marginTop: 10 }} />
                      <Button
                        buttonStyle={{marginTop:10}}
                        title="Xem nội dung bài học"
                        type="outline"
                        onPress={this.handleClickLesson.bind(this, this.state.courseId,  e.lessonId)}
                      />
                    </View>
                  </Card>
                </View>
              );
            })
          }
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
  schedule: state.schedule
});
export default connect(mapStateToProps, { getSchedule })(LessonList); 
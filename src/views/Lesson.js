import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Divider, Card, ListItem } from 'react-native-elements';
import isEmptyObj from '../validation/is-empty';
import { getLessonIncourse } from '../actions/lessonActions'; 
import moment from "moment";
import HTML from 'react-native-render-html';
import Comment from './Comment';


class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: '',
      content: '',
      files: [],
      exercises: [],
      quizzes: []
    };
    this.handleGoToUrl = this.handleGoToUrl.bind(this);
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');
    const lessonId = navigation.getParam('lessonId', 'NO-ID');
    this.props.getLessonIncourse(courseId, lessonId)
  }

  componentWillReceiveProps(nextProps) {
    
    const { lesson_in_course, loading } = nextProps.lesson
    if(!isEmptyObj(lesson_in_course))
    {
      var { text, content, files, exercises, quizzes } = lesson_in_course

      this.setState({ 
        text,
        content,
        files,
        exercises,
        quizzes,
        loading 
      });
    }
    this.setState({ 
      loading
    });

  }

  handleGoToUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Lỗi','Không thể mở');
      }
    });
  }

  render() {
    const { 
      content, 
      text, 
      loading,
      files,
      exercises,
      quizzes 
    } = this.state;
    // const { role } = this.props.auth.user
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
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {text}
              </Text>
            </View>
            <Divider style={{ backgroundColor: 'grey', marginTop: 10 }} />
            <View style={{ alignItems: 'center',  marginTop: 20 }}>
              <Text style={styles.title}>Nội dung bài học</Text>
            </View>
            <View style={{ marginTop: 20, marginBottom:20 }}>
            {
              content
              ?
              <HTML html={content} />
              :
              <Text style={{ color: 'grey'}}>Chưa cập nhật nội dung bài học</Text>
            }
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Tài liệu học</Text>
            </View>
            <View style={{ marginTop: 20, marginBottom:20 }}>
              {
                files.length === 0
                ?
                <Text style={{ color: 'grey'}}>Chưa có tài liệu học</Text>
                :
                <View>
                {
                  files.map(file=>
                    <ListItem
                      key={file.id}
                      leftAvatar={{ rounded: false, source: { uri: file.thumbnail } }}
                      title={file.name}
                      titleStyle={{ color: 'blue', textDecorationLine: 'underline' }}
                      onPress={this.handleGoToUrl.bind(this, file.url)}
                      containerStyle={{
                        borderWidth: 1,
                        borderColor: 'rgba(110, 120, 170, 1)',
                        borderRadius: 8,
                        marginTop: 10
                      }}
                    />
                  )
                }
                </View>
              }
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Bài tập</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
            {
              exercises.length === 0
              ?
              <Text style={{ color: 'grey'}}>Chưa có bài tập</Text>
              :
              exercises.map((e, i) => {
                return (
                  <View key={i} style={{marginTop:10}}>
                    <Card title={e.title}>
                      <View>
                        <Text style={{color: 'grey'}}>{moment(e.created).format("[- Ngày đăng:] HH:mm [ngày] DD/MM/YYYY")}</Text>
                        <Text style={{color: 'grey'}}>{moment(e.deadline).format("[- Hạn nộp:] HH:mm [ngày] DD/MM/YYYY")}</Text>
                        <Divider style={{ backgroundColor: 'grey', marginTop: 10 }} />
                        <Text style={{marginTop: 10}}>{e.text}</Text>
                        {
                          e.attachFiles.map(file=>
                            <ListItem
                              key={file.id}
                              leftAvatar={{ rounded: false, source: { uri: file.thumbnail } }}
                              title={file.name}
                              titleStyle={{ color: 'blue', textDecorationLine: 'underline' }}
                              onPress={this.handleGoToUrl.bind(this, file.url)}
                              containerStyle={{
                                borderWidth: 1,
                                borderColor: 'rgba(110, 120, 170, 1)',
                                borderRadius: 8,
                                marginTop: 10
                              }}
                            />
                          )
                        }
                        <Divider style={{ backgroundColor: 'grey', marginTop: 10 }} />
                        <Comment exercise={e}/>
                      </View>
                    </Card>
                  </View>
                );
              })
            }
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Bài trắc nghiệm</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
            {
              quizzes.length === 0
              ?
              <Text style={{ color: 'grey'}}>Chưa có bài trắc nghiệm</Text>
              :
              quizzes.map((quiz,index) =>{
                return (
                  <View key={index} style={{marginTop:10}}>
                    <Card title={quiz.quizId.title}>
                      <Text>{moment(quiz.deadline).format("[- Hạn làm:] HH:mm [ngày] DD/MM/YYYY")}</Text>
                    </Card>
                  </View>
                );
              })
            }
            </View>
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
  },
  title: {
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => ({
  lesson: state.lesson
});
export default connect(mapStateToProps, { getLessonIncourse })(Lesson); 
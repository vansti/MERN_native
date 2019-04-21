import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Linking, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getExerciseList } from '../actions/exerciseActions';
import PropTypes from 'prop-types';
import isEmptyObj from '../validation/is-empty';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Exercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: []
    };
    this.handleGoToUrl = this.handleGoToUrl.bind(this);
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const courseId = navigation.getParam('courseId', 'NO-ID');
    this.props.getExerciseList(courseId);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmptyObj(nextProps.exercises)) {
      const {exercises} = nextProps.exercises
      this.setState({exercises: exercises})
    }
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
    const { exercises } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
          {
            exercises.map((e, i) => {
              return (
                <View key={i} style={{marginTop:10}}>
                  <Card  title={e.title}>
                    <View>
                      <Text>{e.text}</Text>
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
                    </View>
                  </Card>
                </View>
              );
            })
          }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

Exercise.propTypes = {
  getExerciseList: PropTypes.func.isRequired,
  exercises: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exercises: state.exercises
});
export default connect(mapStateToProps, { getExerciseList })(Exercise); 
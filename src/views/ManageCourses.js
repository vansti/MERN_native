import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, Dimensions } from 'react-native';
import { SearchBar, Card, Divider, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { getManageCourses } from '../actions/courseActions'; 

const SCREEN_HEIGHT = Dimensions.get('window').height;
class ManageCourses extends Component {
  constructor() {
    super();
    this.state = {
      managecourses: [],
      intialManagecourses: [],
      loading: true,
      search: null
    };
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

  render() {
    let { managecourses, loading, search } = this.state;
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
                </Card>
              )
            }
          </View>
          </ScrollView>
        </View>
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
  auth: state.auth
});
export default connect(mapStateToProps, { getManageCourses })(ManageCourses); 
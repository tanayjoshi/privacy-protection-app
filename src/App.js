import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, Button, FlatList, NavigatorIOS, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { List, ListItem } from "react-native-elements";
import file from '../csvjson.json'
import Details from './Details.js'
import Installed from './Installed.js'

import SearchBar from 'react-native-searchbar'
var InstalledApps = require('react-native-installed-packages');
console.disableYellowBox = true;

//Opening view: shows the list of apps for which score is available.


//The following commented code is used when connecting to the back-end mongoose client. Since this version works locally, for easier use, this has been commented.
/*const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://tanayjoshi:Piano123@ds249839.mlab.com:49839/appsecurity';

// Database Name
const dbName = 'appsecurity';*/

// Use connect method to connect to the Server
/*MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  const col = db.collection('newcollection');
  // Insert a single document
  /*col.insertMany([{a:1}, {a:1}, {a:1}], function(err, r) {
    assert.equal(null, err);
    assert.equal(3, r.insertedCount);

    // Get first two documents that match the query
    col.find({a:1}).limit(2).toArray(function(err, docs) {
      assert.equal(null, err);
      assert.equal(2, docs.length);
      client.close();
    });
  });*/
//});
 /*class FlatListBasics extends Component {
  
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;    
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: 'Overview',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
      
    );
  }
 }*/

/*fetcher =() =>  {
  
  const a = fetch('https://api.mlab.com/api/1/databases/appsecurity?apiKey=aHMa1D8t5VqQ7MUejmpRNCZV88S7xkV1').
  then((response) => response.connect).
  then((responseJson) => console.log(responseJson))
  
  return a
}*/


class MyScene extends React.Component {
  /*static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward(item) {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: Details,
      title: item.Name + ' Details',
      passProps: {index: nextIndex, app: item},
    });
  }*/
  static navigationOptions = {
    title: "Overview"
  }
  
  render() {
    return (      
      <View style={styles.container}>
      <SearchBar style={{color: 'red'}}
        ref={(ref) => this.searchBar = ref}
        data={file}
        handleResults={this._handleResults}
        showOnLoad
        heightAdjust={-15}
      />
        <FlatList 
          data={file}
          renderItem={({item}) => <ListItem 
          title={item.Name} 
          onPress={() => this.props.navigation.navigate('Profile',{app: item})} 
          subtitle={item.Genre}
          />}
          keyExtractor={item => item.Name}
        />

      </View>
    );
  }
}


const HomeStack= StackNavigator({
  Home: {screen: MyScene},
  Profile: { screen: Details },
});

const SettingsStack = StackNavigator({
  Settings: { screen: Installed },
  Details: { screen: Details },
});


export default TabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
  },
  {
    /* Other configuration remains unchanged */
  }
);



const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 10
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderColor: 'grey',
    borderWidth: 0.3
  },
  list: {
    flex:0.8,
  }
})

AppRegistry.registerComponent('Project', () => FlatListBasics);

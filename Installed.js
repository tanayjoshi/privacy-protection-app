import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, Button, FlatList, NavigatorIOS, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { List, ListItem } from "react-native-elements";

import Distribution from './Distribution'
import Details from './Details'
import file from './csvjson.json'

import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install';

var InstalledApps = AppInstalledChecker.getAppList()

//Opening view: shows the list of installed apps.

export default class Installed extends React.Component {
  static navigationOptions = {
      title:  "Installed Apps"
  }

  render() {
    const { params } = this.props.navigation.state;       
    return (
      <View style={{ flex: 1, }}>
        <FlatList
        data={InstalledApps}
        renderItem={({item}) => <ListItem
            title={item}
            onPress={() =>         
                {
                    var obj = file.find(function (obj) { return obj.Name.search(item); })    
                    if (obj!=-1)   {
                        console.log(obj)                    
                        this.props.navigation.navigate('Details',{app: obj})
                    }
                    else {
                        <Text>NOT FOUND</Text>
                        console.log("not found")
                        console.log(obj)
                    }            
                }
            }
        />}
        keyExtractor={item => item}
        />
      </View>
    );
  }
}

StackNavigator({
  Settings: { screen: Installed },
  Details: { screen: Details },
});

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   color: 'red'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})


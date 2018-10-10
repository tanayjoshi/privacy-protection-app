
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, Button, FlatList, NavigatorIOS, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { BarChart, Grid } from 'react-native-svg-charts'
import { LineChart, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

//This component is responsible for showing the comparison graphs and scores in a detailed view.

export default class Distribution extends React.Component {
    constructor(){
        super();
        this.state = {
            status:false,
            but:'Show Expected Ratings'
        }
    }
    ShowHideTextComponentView = () => { 
        if(this.state.status == true)
        {
        this.setState({status: false,but:'Show Expected Ratings'})
        }
        else
        {
        this.setState({status: true,but:'Hide Expected Ratings'})
        }
    }
    render() {
        const { params } = this.props.navigation.state;    
        const rawData = params.SubScore           
        const data2 = params.SubScoreName      
        const data = [0,0,0,0,0,0,0,0,0,0]
        const exp = [0,0,0,0,0,0,0,0,0,0]
        const fill = (params.total>5)?'#D7816A':'#B3D89C'         
        const fill2 = (params.total>5)?'#D7816A':'#5B9341'        
        for (var i=0; i<data.length;i++)    {
            if (i==6||i==10)    continue
            else if (i==5)  data[i]=(rawData[i]+rawData[i+1])/2
            else if (i==0)  data[i]=(rawData[i]+rawData[10])/2
            else data[i]=rawData[i]
        }
        for (var i=0; i<exp.length;i++)    {
            if (i==6||i==10)    continue
            else if (i==5)  exp[i]=(mult[i]+mult[i+1])/2
            else if (i==0)  exp[i]=(mult[i]+mult[10])/2
            else exp[i]=mult[i]
        }
        
        return (
            <View style={{ height: '80%', padding: 20 }}>
                <View style={{height:'30%'}}>
                <BarChart
                    style={{ flex: 1, }}
                    data={ data }
                    gridMin={ 0 }
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ fill }}
                >
                    <Grid/>
                </BarChart>
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={ data }
                    contentInset={{ left: 10, right: 10 }}
                    spacing={0.9}
                    scale={scale.scaleBand}
                    svg={{ fontSize: 10, fill: 'black' }}
                    formatLabel={ (value, index) => index+1 }
                />
                </View>
                
                {this.state.status?<View style={{height:'30%'}}>
                <BarChart
                    style={{ flex: 1, }}
                    data={ exp.map( function(value) { 
                        return value; 
                    } ) }
                    gridMin={ 0 }
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ fill2 }}
                >
                    <Grid/>
                </BarChart>
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={ exp }
                    contentInset={{ left: 10, right: 10 }}
                    spacing={0.9}
                    scale={scale.scaleBand}
                    svg={{ fontSize: 10, fill: 'black' }}
                    formatLabel={ (value, index) => index+1 }
                />
                </View>:null}
                <View style={{flexDirection:'row'}}>
                    <Text style={{width:'50%',color:fill2}}>
                        <Text>1 - Device Info : {data[0].toFixed(1)} {"\n"}</Text>
                        <Text>2 - Location : {data[1].toFixed(1)} {"\n"}</Text>
                        <Text>3 - Contacts : {data[2].toFixed(1)} {"\n"}</Text>
                        <Text>4 - Phone : {data[3].toFixed(1)} {"\n"}</Text>
                        <Text>5 - SMS : {data[4].toFixed(1)} {"\n"}</Text>
                        <Text>6 - Photo/Media/Files : {data[5].toFixed(1)} {"\n"}</Text>
                        <Text>7 - Camera : {data[6].toFixed(1)} {"\n"}</Text>
                        <Text>8 - Microphone : {data[7].toFixed(1)} {"\n"}</Text>
                        <Text>9 - Network : {data[8].toFixed(1)} {"\n"}</Text>
                        <Text>10 - Other : {data[9].toFixed(1)} {"\n"}</Text>
                    </Text>
                    {this.state.status?<View style={{width:'50%'}}>
                        <Text>1 - Device Info : {exp[0].toFixed(1)}</Text>
                        <Text>2 - Location : {exp[1].toFixed(1)}</Text>
                        <Text>3 - Contacts : {exp[2].toFixed(1)}</Text>
                        <Text>4 - Phone : {exp[3].toFixed(1)}</Text>
                        <Text>5 - SMS : {exp[4].toFixed(1)}</Text>
                        <Text>6 - Photo/Media/Files : {exp[5].toFixed(1)}</Text>
                        <Text>7 - Camera : {exp[6].toFixed(1)}</Text>
                        <Text>8 - Microphone : {exp[7].toFixed(1)}</Text>
                        <Text>9 - Network : {exp[8].toFixed(1)}</Text>
                        <Text>10 - Other : {exp[9].toFixed(1)}</Text>
                    </View>:null}
                </View>
                
                <Button title={this.state.but} 
                        onPress={this.ShowHideTextComponentView} 
                />
                <Text style={{textAlign:'center',alignItems:'center', color:'#4D7298'}}>(for {params.genre} genre) {'\n'}</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}
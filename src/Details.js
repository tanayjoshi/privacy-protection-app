import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, Button, FlatList, NavigatorIOS, StyleSheet, Text, TouchableHighlight, View, Linking, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'

import Distribution from './Distribution'
import OpenSettings from 'react-native-open-settings';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

//This component is responsible for showing the breakdown of the score.

const Zeroer = ['view Wi-Fi connections','view network connections','full network access','control vibration','receive data from Internet','prevent device from sleeping','read sync statistics','pair with Bluetooth devices','send sticky broadcast','connect and disconnect from Wi-Fi','change your audio settings','control Near-Field Communication','read sync settings','run at startup','toggle sync on and off','install shortcuts','uninstall shortcuts','read Google service configuration','change network connectivity']
const Oner = ['modify system settings','change system display settings','draw over other apps']
const Twoer = ['approximate location (network-based)','precise location (GPS and network-based)','read the contents of your USB storage','modify or delete the contents of your USB storage','take pictures and videos','receive text messages (SMS)','send SMS messages','read phone status and identity','create accounts and set passwords','use accounts on the device','record audio','find accounts on the device','read your contacts']
// 	All Perm: Number,Name,Identity,Contacts,Locations,SMS,Phone,PMF,Storage,Camera,Microphone,Network,DeviceIDCall,Other,
  
const ShoppingMultiplier = {
    DeviceInfo: 6,
    Contacts: 7,
    Locations: 4,
    SMS: 6,
    Phone: 5,
    PMF: 7,
    Camera: 6,
    Microphone: 9,
    Network: 1,
    Other: 4 
}

//Most Important Bit: Category Scores
const ShoppingMult = [6,7,4,6,5,7,0,6,9,1,0,4]
const CommunicationMult = [2,1,3,3,3,3,0,5,4,1,0,3]
const GameMult = [2,7,5,8,9,5,0,7,2,1,0,4]
const TravelMult = [1,7,1,2,5,3,0,3,7,1,0,3]
const EntertainmentMult = [2,8,5,9,9,4,0,6,7,2,0,5]
const ToolsMult = [5,8,9,9,9,5,0,7,8,2,0,5]

var Multiplier = [
    {name: 'Shopping', prop: ShoppingMult},
    {name: 'Communication', prop: CommunicationMult},
    {name: 'Games', prop: GameMult},
    {name: 'Travel', prop: TravelMult},
    {name: 'Entertainment', prop: EntertainmentMult},
    {name: 'Tools', prop: ToolsMult}        
]

const SubScore = [0,0,0,0,0,0,0,0,0,0,0,0,0]
const SubScoreName = ['DeviceInfo','Contacts','Locations','SMS','Phone','PMF','Storage','Camera','Microphone','Network','DeviceIDCall','Other']
var total = 0    
let genre=''

calculator = (app) => {
    const DeviceInfo = app.Identity.split(',')          
    const Contacts = app.Contacts.split(',')          
    const Locations = app.Locations.split(',')          
    const SMS = app.SMS.split(',')          
    const Phone = app.Phone.split(',')          
    const PMF = app.PMF.split(',')          
    const Storage = app.Storage.split(',') 
    const Camera = app.Camera.split(',') 
    const Microphone = app.Microphone.split(',')    
    const Network = app.Network.split(',') 
    const DeviceIDCall = app.DeviceIDCall.split(',') 
    const Other = app.Other.split(',')
    const Genre = app.Genre.split(',')[0] 
    genre=Genre
    const All = [DeviceInfo,Contacts,Locations, SMS, Phone, PMF, Storage, Camera, Microphone, Network, DeviceIDCall, Other]
    var _ = require('underscore')
    /*if (Other.indexOf("full network access")!=-1) {
        OtherScore+=1
    }*/
    total=0
    const Score = []
    var obj = Multiplier.find(function (obj) { return obj.name === Genre; })
    mult = obj.prop
    for (var i=0;i<All.length;i++)  {
        var ZeroScore = _.intersection(All[i],Zeroer)
        var OneScore = _.intersection(All[i],Oner)
        var TwoScore = _.intersection(All[i],Twoer)
        Score[i] = (OneScore.length*1 + TwoScore.length*2)/All[i].length
        if (i==5||i==6)   {
            total += Score[i]*(mult[5]/2);
            SubScore[i] += Score[i]*(mult[5]/2);
        }
        else if (i==0||i==10)    {
            total += Score[i]*(mult[0]/2);
            SubScore[i] += Score[i]*(mult[0]/2);
        }
        else {
            total += Score[i]*mult[i];
            SubScore[i] += Score[i]*mult[i];
        }
    }

    total = (total)/10
    //SubScore[5] *=2
    
    return (
        <View style={{flex: 1}}>
            <View >
                {DeviceInfo[0]!=''?<Text><Text style={styles.item}>Device Info : </Text>{DeviceInfo+DeviceIDCall}</Text>:null}
                {Locations[0]!=''?<Text><Text style={styles.item}>Location : </Text>{Locations}</Text>:null}
                {Contacts[0]!=''?<Text><Text style={styles.item}>Contacts : </Text>{Contacts}</Text>:null}
                {Phone[0]!=''?<Text><Text style={styles.item}>Phone : </Text>{Phone} </Text>:null}
                {SMS[0]!=''?<Text><Text style={styles.item}>SMS : </Text>{SMS}</Text>:null}
                {PMF[0]!=''?<Text><Text style={styles.item}>Photo/Media/Files : </Text>{PMF} </Text>:null}
                {Camera[0]!=''?<Text><Text style={styles.item}>Camera : </Text>{Camera}</Text>:null}
                {Microphone[0]!=''?<Text><Text style={styles.item}>Microphone : </Text>{Microphone}</Text>:null}
                {Network[0]!=''?<Text><Text style={styles.item}>Network : </Text>{Network}</Text>:null}
                {Other[0]!=''?<Text><Text style={styles.item}>Others : </Text>{Other}</Text>:null}
        	</View>
        </View>
    )
}

let result = ''
            
const activeCat = (app) => {
    const DeviceInfo = app.Identity.split(',')          
    const Contacts = app.Contacts.split(',')          
    const Locations = app.Locations.split(',')          
    const SMS = app.SMS.split(',')          
    const Phone = app.Phone.split(',')          
    const PMF = app.PMF.split(',')          
    const Storage = app.Storage.split(',') 
    const Camera = app.Camera.split(',') 
    const Microphone = app.Microphone.split(',')    
    const Network = app.Network.split(',') 
    const DeviceIDCall = app.DeviceIDCall.split(',') 
    const Other = app.Other.split(',')
    const Genre = app.Genre.split(',')[0] 
    genre=Genre
    const All = [DeviceInfo,Contacts,Locations, SMS, Phone, PMF, Storage, Camera, Microphone, Network, DeviceIDCall, Other]
    var _ = require('underscore')
    /*if (Other.indexOf("full network access")!=-1) {
        OtherScore+=1
    }*/
    total=0
    const Score = []
    var obj = Multiplier.find(function (obj) { return obj.name === Genre; })
    mult = obj.prop
    for (var i=0;i<All.length;i++)  {
        var ZeroScore = _.intersection(All[i],Zeroer)
        var OneScore = _.intersection(All[i],Oner)
        var TwoScore = _.intersection(All[i],Twoer)
        Score[i] = (OneScore.length*1 + TwoScore.length*2)/All[i].length
        if (i==5||i==6)   {
            total += Score[i]*(mult[5]/2);
            SubScore[i] += (Score[i]*(mult[5]/2))/All[i].length;
        }
        else if (i==0||i==10)    {
            total += Score[i]*(mult[0]/2);
            SubScore[i] += (Score[i]*(mult[0]/2))/(All[i].length);
        }
        else {
            total += Score[i]*mult[i];
            SubScore[i] += (Score[i]*mult[i])/All[i].length;
        }
    }

    total = (total)/10
    result=''
    if (DeviceInfo.length + DeviceIDCall.length>2) result += 'Device Info, '
    if (Locations.length>=2) result += 'Location, '
    if (Contacts.length>=2) result += 'Contacts, '
    if (Phone.length>=3)    result += 'Phone, '
    if (SMS.length>=4) result += 'SMS, '
    if (PMF.length>=3) result += 'Photo/Media/Files, '
    if (Camera.length>1)   result += 'Camera, '
    if (Microphone.length>=1&&Microphone[0]!='')   result += 'Microphone, '
    if (Other.length>6) result += 'Other'
    return (
        <Text style={{flex: 1}}>
            <Text style={getTextStyle(total)}>
                Safety Score: {total} {'\n'}
            </Text> 
            <Text style={styles.heading}>The Main Permissions Required Are: <Text style={{fontSize:10}}>(click for more info){'\n'}</Text></Text>
            {result?<Text style={styles.category}>{result}</Text>:<Text style={styles.category}>None</Text>}
        </Text>
    )
}

const getTextStyle = (total) => {
    if(total < 2) {
        return {
        height: 80, color: 'green', fontSize: 40, padding:5, alignItems: 'center', paddingTop: 20, paddingBottom: 20, fontWeight: 'bold',borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,
        }
    } else if (total >=2 && total < 5){
        return {
            height: 80, color: 'orange', fontSize: 40, padding:5, alignItems: 'center', paddingTop: 20, paddingBottom: 20, fontWeight: 'bold',borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,
        }
    }
    else{
        return {
            height: 80, color: 'red', fontSize: 40, padding:5, alignItems: 'center', paddingTop: 20, paddingBottom: 20, fontWeight: 'bold',borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,
        }  
    }
}

class Details extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.app.Name}` + ' Details',
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'white',
            },
        });
    constructor(){
        super();
        this.state = {
            status:false,
            but:"Show Detailed Info",
            button:true
        }
    }

    ShowHideTextComponentView = () => { 
        if(this.state.status == true)
        {
        this.setState({status: false,but:"Show Detailed Info"})
        }
        else
        {
        this.setState({status: true,but:"Hide Detailed Info"})
        }
    }

    render() {
        const { params } = this.props.navigation.state;       
        return (
          <ScrollView style={{ padding:0, height:1 }}>
            <Button
            onPress={() => { 
                this.props.navigation.navigate('MyModal',{SubScore,SubScoreName,mult,genre,total})
                }}
            title="More Info"
            color="blue"
            />
            <Text style={{padding:5}}onPress={() => {
                this.popupDialog.show();
                this.setState({button:false})
                }}>{activeCat(params.app)}</Text>
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                dialogTitle={<DialogTitle title="What does this mean?" />}
                style={{position:'fixed'}}
                height='0.5'
                onDismissed={()=>{this.setState({button:true})}}
            >
                <ScrollView style={{padding:10, position:'absolute'}}>
                    {detailInfo(result)}
                </ScrollView>
            </PopupDialog>

            {this.state.button?<Button title={this.state.but} onPress={this.ShowHideTextComponentView} />:null}
            {this.state.status?<View style={{padding:5}}>{calculator(params.app)}</View>:null}
            <View>{direct()}</View>
            
            
          </ScrollView>
        );
      }
}

const detailInfo = (result) => {
    let words = result.split(', ')
    let ans = ''
    if (words.indexOf('Device Info')!=-1)  ans += 'Having access to Device Info means that this app can access and edit information stored on your phone like accounts, contact cards, and other identity information \n\n'
    if (words.indexOf('Location')!=-1)  ans += 'The app has access to location services, i.e. it can access your current location and possibly transmit that data its servers \n\n'
    if (words.indexOf('Contacts')!=-1)  ans += 'The app has access to important contact information stored on your phone, and could potentially edit/modify/add that information \n\n'
    if (words.indexOf('Phone')!=-1)  ans += 'The app has can read your phone\'s status, access call logs, and potentially even make calls on your behalf  \n\n'
    if (words.indexOf('SMS')!=-1)  ans += 'The app can read/write your text messages  \n\n'
    if (words.indexOf('Photo/Media/Files')!=-1)  ans += 'The app has access to to your storage device, and can read/delete/modify contents on your phone \n\n'
    if (words.indexOf('Camera')!=-1)  ans += 'The app has access to the camera, and can take photos and videos\n\n'
    if (words.indexOf('Microphone')!=-1)  ans += 'The app has access to the microphone, and can record audio \n\n'
    if (words.indexOf('Network')!=-1)  ans += 'The app has access to the network connections on this phone\n\n'
    if (words.indexOf('Other')!=-1)  ans += 'The app has access to various other resources, like access to the Internet, Bluetooth, NFC up to sleep times, vibration, alerts, etc.\n\n'
    
    return <Text style={styles.catInfo}>{ans}</Text>
}

const direct = () => {
        if (total>5)    {
            return <View>
                <Text></Text>
                <Text style={styles.red}>It is recommended that you change privacy settings for this app</Text>
                <Button
                    onPress={() => Linking.openURL('app-settings:')}
                    title="Go To Settings"
                    color="blue"
                />
            </View>
        }
        else    {
            return <Text style={styles.container}>The app permissions are in line with the expectations! </Text>
        }
}




export default  RootStack = StackNavigator(
    {
      Main: {
        screen: Details,
      },
      MyModal: {
        screen: Distribution,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none'
    }
);

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   color: getTextStyle(total).color
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  heading:  {
    fontSize: 25,
    padding:5
  },
  catInfo:  {
    fontSize: 20,
    padding:5,
    paddingTop:28
  },
  category: {
      fontSize: 22,
      padding: 5,
      color: 'grey'
  },
  red:{
      color:'red'
  }
})


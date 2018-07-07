/**
* Created by nghinv on Sat Jul 07 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SmartNotifPanel from 'react-native-smart-notif-panel';

class Example extends PureComponent {
  state = {
    direction: 'bottom'
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ width: 100, height: 60, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.setState({ direction: 'top' })}
        >
          <Text>Change direction</Text>
        </TouchableOpacity>

        <SmartNotifPanel
          // maxWidthOrHeight={600}
          direction={this.state.direction}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#ffffff80', marginBottom: 10, alignItems: 'center' }}>
              Hello every body
            </Text>
          </View>
        </SmartNotifPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Example;

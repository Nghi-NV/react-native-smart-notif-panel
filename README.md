
# react-native-smart-notif-panel

## Getting started

`$ npm install react-native-smart-notif-panel --save`

### Mostly automatic installation

`$ react-native link react-native-interactable`

### Manual installation

## Usage
```javascript
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
          minWidthOrHeight={80}
          backgroundColor='#182e43f0'
          direction={this.state.direction}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#ffffff80', marginBottom: 10, alignItems: 'center' }}>
              Notify panel
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
```
  
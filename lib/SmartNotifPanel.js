/**
* Created by nghinv on Fri Jul 06 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  SafeAreaView,
  ViewPropTypes,
  TouchableWithoutFeedback
} from 'react-native';
import Interactable from 'react-native-interactable';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  panelFooter: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  panelHandle: {
    borderRadius: 4,
    backgroundColor: '#ffffff80',
    margin: 12
  }
});

const SCREEN = Dimensions.get('window');

class SmartNotifPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      direction: this.props.direction || 'bottom'
    }
    this.refPannel = React.createRef();
    this.currentIndex = 2;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.direction !== this.state.direction) {
      this.setState({
        direction: nextProps.direction
      }, () => {
        if (this.refPannel) {
          this.refPannel.current.snapTo({ index: 1 })
        }
      })
    }
  }

  renderChildren = () => {
    if (this.props.children) {
      return this.props.children
    }

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#ffffff80', marginBottom: 10, alignItems: 'center' }}>
          NOTIFICATIONS
        </Text>
      </View>
    )
  }

  renderFooterPanel = () => {
    const { direction } = this.state;
    const horizontalOnly = direction === 'left' || direction === 'right';

    let styleFooter = {}
    if (horizontalOnly) {
      styleFooter.width = 8
      styleFooter.height = 40
    } else {
      styleFooter.width = 40
      styleFooter.height = 8
    }

    return (
      <View style={styles.panelFooter} >
        <View style={[styles.panelHandle, { ...styleFooter }]} />
      </View>
    )
  }

  getMaxWidthOrHeight = () => {
    const {
      minWidthOrHeight,
      maxWidthOrHeight,
    } = this.props;
    const { direction } = this.state;
    const horizontalOnly = direction === 'left' || direction === 'right';

    if (horizontalOnly) {
      if (maxWidthOrHeight > SCREEN.width) {
        return SCREEN.width
      } else {
        return maxWidthOrHeight
      }
    } else {
      if (maxWidthOrHeight > SCREEN.height) {
        return SCREEN.height
      } else {
        return maxWidthOrHeight
      }
    }
  }

  getSnapPoints = () => {
    const {
      minWidthOrHeight,
      maxWidthOrHeight,
    } = this.props;
    const { direction } = this.state;

    if (direction === 'top') {
      return [
        { y: this.getMaxWidthOrHeight() },
        { y: -this.getMaxWidthOrHeight() + minWidthOrHeight * 3 },
        { y: -this.getMaxWidthOrHeight() + minWidthOrHeight }
      ]
    } else if (direction === 'left') {
      return [
        { x: this.getMaxWidthOrHeight() },
        { x: -this.getMaxWidthOrHeight() + minWidthOrHeight * 3 },
        { x: -this.getMaxWidthOrHeight() + minWidthOrHeight }
      ]
    } else if (direction === 'right') {
      return [
        { x: SCREEN.width - this.getMaxWidthOrHeight() },
        { x: SCREEN.width - minWidthOrHeight * 3 },
        { x: SCREEN.width - minWidthOrHeight }
      ]
    } else {
      return [
        { y: SCREEN.height - this.getMaxWidthOrHeight() },
        { y: SCREEN.height - minWidthOrHeight * 3 },
        { y: SCREEN.height - minWidthOrHeight }
      ]
    }
  }

  getBoundaries = () => {
    const {
      minWidthOrHeight,
      maxWidthOrHeight,
    } = this.props;
    const { direction } = this.state;

    if (direction === 'top') {
      return { top: -this.getMaxWidthOrHeight() + minWidthOrHeight, bottom: 0, bounce: 1, haptics: true }
    } else if (direction === 'left') {
      return { left: -this.getMaxWidthOrHeight() + minWidthOrHeight, right: 0, bounce: 1, haptics: true }
    } else if (direction === 'right') {
      return { left: SCREEN.width - this.getMaxWidthOrHeight(), right: SCREEN.width, bounce: 1, haptics: true }
    } else {
      return { top: SCREEN.height - this.getMaxWidthOrHeight(), bottom: SCREEN.height, bounce: 1, haptics: true }
    }
  }

  getInitialPosition = () => {
    const {
      minWidthOrHeight,
      maxWidthOrHeight,
    } = this.props;
    const { direction } = this.state;

    if (direction === 'top') {
      return { y: -this.getMaxWidthOrHeight() + minWidthOrHeight }
    } else if (direction === 'left') {
      return { x: -this.getMaxWidthOrHeight() + minWidthOrHeight }
    } else if (direction === 'right') {
      return { x: SCREEN.width - minWidthOrHeight }
    } else {
      return { y: SCREEN.height - minWidthOrHeight }
    }
  }

  onPressPannel = () => {
    this.props.onPressPannel && this.props.onPressPannel()

    requestAnimationFrame(() => {
      if (this.refPannel) {
        if (this.currentIndex === 0) {
          this.refPannel.current.snapTo({ index: 2 })
        } else if (this.currentIndex === 1) {
          this.refPannel.current.snapTo({ index: 2 })
        } else {
          this.refPannel.current.snapTo({ index: 0 })
        }
      }
    })
  }

  _onSnap = ({ nativeEvent }) => {
    this.currentIndex = nativeEvent.index
  }

  render() {
    let {
      minWidthOrHeight,
      maxWidthOrHeight,
      containerStyle,
      backgroundColor,
      interactableProp
    } = this.props;
    const { direction } = this.state;

    const horizontalOnly = direction === 'left' || direction === 'right';
    let styleContent = {
      backgroundColor
    }

    if (!horizontalOnly) {
      styleContent.height = this.getMaxWidthOrHeight()
      if (direction === 'top') {
        styleContent.justifyContent = 'flex-end'
      }
    } else {
      styleContent.width = this.getMaxWidthOrHeight()
      styleContent.height = SCREEN.height
    }

    let styleHorizontalContent = {
      flexDirection: 'row',
      flex: 1,
      justifyContent: direction === 'left' ? 'flex-end' : 'flex-start',
    }

    return (
      <View pointerEvents='box-none' style={styles.container}>
        <Interactable.View
          {...interactableProp}
          ref={this.refPannel}
          verticalOnly={!horizontalOnly}
          horizontalOnly={horizontalOnly}
          animatedNativeDriver
          snapPoints={this.getSnapPoints()}
          boundaries={this.getBoundaries()}
          initialPosition={this.getInitialPosition()}
          onSnap={this._onSnap}
          onDrag={this._onDrag}
        >
          <TouchableWithoutFeedback onPress={this.onPressPannel}>
            <View
              style={[
                { ...styleContent },
                containerStyle
              ]}
            >
              <SafeAreaView style={horizontalOnly ? styleHorizontalContent : undefined}>
                {(direction === 'bottom' || direction == 'right') && this.renderFooterPanel()}
                {this.renderChildren()}
                {(direction == 'top' || direction == 'left') && this.renderFooterPanel()}
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </Interactable.View>
      </View>
    );
  }
}

SmartNotifPanel.defaultProps = {
  direction: 'bottom',
  minWidthOrHeight: 80,
  maxWidthOrHeight: SCREEN.height,
  backgroundColor: '#182e43f0'
}

SmartNotifPanel.propTypes = {
  direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  minWidthOrHeight: PropTypes.number,
  maxWidthOrHeight: PropTypes.number,
  containerStyle: ViewPropTypes.style,
  backgroundColor: PropTypes.string,
  onPressPannel: PropTypes.func,
  interactableProp: PropTypes.any
}

export default SmartNotifPanel;

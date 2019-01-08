"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroAmbientLight,
  ViroNode,
  ViroSpotLight,
  Viro3DObject,
  ViroFlexView,
  Button
} from "react-viro";

const lavObj = require("./res/lavender/lavender_plant.obj");
const lavMtl = require("./res/lavender/lavender_plant.mtl");
const lavPng = require("./res/lavender/lavender_plant.png");

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      flower: {
        source: lavObj,
        resources: [lavMtl, lavPng],
        position: [0, 0, 0],
        scale: [0.0007, 0.0007, 0.0007],
        type: "OBJ"
      }
      // obs = [],
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    const { source, resources, position, scale, type } = this.state.flower;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color="#ffffff" />
        <ViroSpotLight
          position={[0, -0.5, 0]}
          color="#777777"
          direction={[0, 0, -1]}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
          castShadow={true}
        />
        {console.log(this.props)}
        {this.props.sceneNavigator.viroAppProps.renderFlower && (
          <ViroNode
            position={[0, -1, 0]}
            dragType="FixedToWorld"
            onDrag={() => {}}
          >
            <Viro3DObject
              source={source}
              resources={resources}
              position={position}
              scale={scale}
              type={type}
            />
          </ViroNode>
        )}
        {/* <ViroNode
          position={[0, -1, 0]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          <Viro3DObject
            source={source}
            resources={resources}
            position={position}
            scale={scale}
            type={type}
          />
        </ViroNode> */}
        {/* {this.state.obs && (this.state.obs.map((object,index) => {

        }))} */}
      </ViroARScene>
    );
  }

  // componentDidUpdate = (prevState, prevProps) => {
  //   if (this.props.renderFlower !== prevProps.props.renderFlower) {
  //     this.state;
  //   }
  // };

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  // _toggleRenderFlower = () => {
  //   this.setState((prevState) => ({renderFlower: !prevState.renderFlower})), () => {
  //     console.log('switched', this.state.renderFlower)
  //   }
  // }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;

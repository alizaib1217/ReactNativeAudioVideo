import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';
import Button from "./Button";

export default class App extends Component {

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
  };

  video: Video;

  onLoad = (data) => {
    this.setState({duration: data.duration});
  };

  onProgress = (data) => {
    this.setState({currentTime: data.currentTime});
  };

  onEnd = () => {
    this.setState({paused: true})
    this.video.seek(0)
  };

  onAudioBecomingNoisy = () => {
    this.setState({paused: true})
  };

  onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    this.setState({paused: !event.hasAudioFocus})
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate);

    return (
      <TouchableOpacity onPress={() => {
        this.setState({rate})
      }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode === resizeMode);

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          marginHorizontal: 5,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          borderRadius: 5,
        }}
        onPress={() => {
          this.setState({resizeMode})
        }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume === volume);

    return (
      <TouchableOpacity style={{
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 5,
      }} onPress={() => {
        this.setState({volume})
      }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>

        <Video
          ref={(ref: Video) => {
            this.video = ref
          }}
          /* For ExoPlayer */
          // source={{ uri: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4', type: 'mpd' }}
          source={require('./background.mp4')}
          style={styles.fullScreen}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          onAudioBecomingNoisy={this.onAudioBecomingNoisy}
          onAudioFocusChanged={this.onAudioFocusChanged}
          repeat={false}
          controls={false}
        />
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Button
            text={"Stop"}
            onPress={() => this.setState({paused: true})}

          />
          <Button
            style={{backgroundColor: "#FAB039"}}
            onPress={() => this.setState({paused: false})}
            text={"Play"}
          />
          <Button
            style={{backgroundColor: "#666060"}}

            text={"Test"}
          />
        </View>
        <Text style={{fontSize: 15, color: "#000", fontWeight: "bold", marginTop: 10}}>Volume Controls</Text>
        <View style={styles.volumeControl}>

          {this.renderVolumeControl(0.5)}
          {this.renderVolumeControl(1)}
          {this.renderVolumeControl(2)}
        </View>
        <Text style={{fontSize: 15, color: "#000", fontWeight: "bold", marginTop: 10}}>Video Resizer</Text>

        <View style={styles.resizeModeControl}>

          {this.renderResizeModeControl('cover')}
          {this.renderResizeModeControl('contain')}
          {this.renderResizeModeControl('stretch')}
        </View>

        <View style={styles.progress}>
          <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
          <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',mf
    // alignItems: 'center',
    // backgroundColor: 'black',
  },
  fullScreen: {
    height: 200,
    width: "100%"
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop:5,
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: 'red',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#fff',
    borderWidth:1
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: 'center',

  },
  resizeModeControl: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  controlOption: {
    fontSize: 15,
    color: '#fff',
  },
  trackingControls: {
    backgroundColor: "#000",
  }
});


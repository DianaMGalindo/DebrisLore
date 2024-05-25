import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        time: prevState.time + 1,
      }));
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>{this.formatTime(this.state.time)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '3%',
    left: '18%',
    backgroundColor: '#ffffff',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  timerText: {
    fontSize: 16,
  },
});

export default React.forwardRef((props, ref) => <Timer ref={ref} {...props} />);

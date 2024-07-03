import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CounterProps {
  title: string;
}

export default function Counter({title}: CounterProps) {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => setCount(c => c + 1)}
        style={styles.button}>
        <Text>Click me!</Text>
      </TouchableOpacity>

      <Text style={styles.text}>You clicked {count} times</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ADBDFF',
    padding: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
  },
  title: {
    color: '#C3E8BD',
    fontSize: 40,
  },
  text: {
    color: '#BFBFDF',
    fontSize: 20,
  },
});

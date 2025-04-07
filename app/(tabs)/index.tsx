import { StyleSheet, View, Text, Button, Platform, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Timer from '@/components/TImer';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function HomeScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentMode, setCurrentMode] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    if (time === 0){
      setIsActive(false);
      setIsRunning(prev => !prev);
      setTime(isRunning ? 300 : 1500);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time]);

  function handleStartStop() {
    setIsActive(!isActive);
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentMode]}]}>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === 'android' ? 30 : undefined }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header 
          currentMode={currentMode} 
          setCurrentMode={setCurrentMode} 
          setTime={setTime}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <Timer time={time}/>
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{ color: 'white', fontWeight: 'bold'}}>{isActive ? 'Detener' : 'Iniciar'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  }
});

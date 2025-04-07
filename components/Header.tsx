import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type HeaderProps = {
    currentMode: number; // 0: Pomodoro, 1: Shortbreak, 2: Longbreak
    setCurrentMode: (mode: number) => void;
    setTime: (time: number) => void;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
  };

const options = ["Pomodoro", "Shortbreak", "Longbreak"];

export default function Header({ currentMode, setCurrentMode, setTime, isActive, setIsActive }: HeaderProps)  {

    function handlePress(index: number) {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentMode(index);
        setTime(newTime * 60);
        if (isActive){
            setIsActive(!isActive);
        }
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            {options.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => handlePress(index)}
                    style={[styles.itemStyle, currentMode !== index && { borderColor: 'transparent' }]}
                >
                    <Text style={{fontWeight: 'bold'}}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        width: '33%',
        borderWidth: 3,
        padding: 5,
        borderColor: 'white',
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
    }
})
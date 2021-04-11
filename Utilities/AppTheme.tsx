import { StyleSheet } from "react-native";

export default class AppTheme {
    static styles = StyleSheet.create({
        button: {
            flex: 1,
            alignItems: 'center',
            alignSelf:  'center',
            textAlign: 'center',
            margin: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'white',
            fontSize: 14,
            padding: 5
        }
    });
}
import {Platform, StyleSheet} from 'react-native';
import Variables from '../../styles'

const styles = StyleSheet.create({
    header: { 
        backgroundColor: Variables.colors.primary,
        borderBottomWidth: 0.3,
        borderColor: Variables.colors.gray,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        textAlign: "center",
        color: Variables.colors.white,
        fontSize: 18,
        fontWeight: "500"
    }
});

export default styles;
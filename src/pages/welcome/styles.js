import {Platform, StyleSheet} from 'react-native';
import Variables from '../../styles'

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Variables.colors.lighter
    },
    header: { 
        backgroundColor: Variables.colors.primary,
        borderBottomWidth: 0.3,
        borderColor: Variables.colors.gray,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 0
    },
    headerText: {
        textAlign: "center",
        color: Variables.colors.white,
        fontSize: 18,
        fontWeight: "500"
    },
    headerSubText:{
        textAlign: "center",
        color: Variables.colors.white,
        fontSize: 14,
        fontWeight: "500"
    },
        
    logoBox: {
        marginTop: 0,
        alignSelf: "center",
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
});

export default styles;
import {Platform, StyleSheet} from 'react-native';
import Variables from '../../styles'

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.lighter,
        flex:1
    },
    header: { 
        backgroundColor: Variables.colors.primary,
        borderBottomWidth: 0.3,
        borderColor: Variables.colors.gray,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginTop: 0,
        flexDirection: 'row'
    },
    headerText: {
        textAlign: "center",
        color: Variables.colors.white,
        fontSize: 18,
        fontWeight: "500"
    },
    infoBoxLine: {
        flexDirection: "row",
        marginTop: 10
    },
    imageBox:{
        marginTop: 30,
        alignSelf: "center",
    },
    boxRepositories: {
        padding: 10,
        backgroundColor: Variables.colors.primaryDarken,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 100,
        borderRadius: 6,
        marginRight: 15
    },
    boxGists: {
        padding: 10,
        backgroundColor: Variables.colors.primaryLighter,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 100,
        borderRadius: 6,
        marginLeft: 15
    },
    boxText: {
        textAlign: "center",
        color: Variables.colors.white,
        fontSize: 14,
        fontWeight: "500"
    },
    infoText: {
        textAlign: "center",
        color: Variables.colors.dark,
        fontSize: 14,
        fontWeight: "500"
    },
    infoTextName: {
        textAlign: "center",
        color: Variables.colors.black,
        fontSize: 16,
        fontWeight: "800",
        marginTop: 10
    },
});

export default styles;
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {WebView} from 'react-native-webview'
import Variables from '../styles';
import Modal from 'react-native-modal';

export default class RevokeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            contactsTemp: [],
            contactsSelected: [],
            searchValue: ""
        }
    }

    componentDidMount(){}

    render() {
        return (
            <Modal isVisible={this.props.visible} deviceHeight={Variables.metrics.screenHeight} style={styles.fullModal} onRequestClose={() => this.props.setVisible()} >
                <View style={styles.modalOuter}>
                    <View style={styles.modalBox}>
                        <View style={styles.header}>

                            <Text style={styles.title}>Revoke you access</Text>

                            <TouchableOpacity style={styles.close} onPress={() => this.props.setVisible()} disabled={false} >
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>

                        <WebView
                            source={{ uri: this.props.url }}
                            style={{ marginTop: 0, flex: 10}}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
   
    header: {
        backgroundColor: Variables.colors.primary, 
        width: Variables.metrics.screenWidth, 
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    
    fullModal: {
        justifyContent: 'flex-end',
        margin: 5,
        padding: 0,
        backgroundColor: "red",
        height: 30
    },
    modalOuter:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 0
    },
    fullModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalBox:{
        height: Variables.metrics.screenHeight,
        paddingVertical: 0,
        flex: 1,
        width: Variables.metrics.screenWidth,
        backgroundColor: Variables.colors.whiteRedish,
        //borderRadius: Variables.metrics.baseRadius,
        justifyContent: "space-between",
    },

    title:{
        color: Variables.colors.white,
        fontSize: 16,
    },
    
    close:{
        //paddingLeft: Variables.metrics.basePadding / 2,
        //paddingRight: Variables.metrics.basePadding / 2,
    },
    closeText:{
        color: Variables.colors.white,
        fontSize: 14,
        textAlign: "center",
    },
})



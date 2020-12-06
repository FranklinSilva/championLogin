import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import styles from './styles';
import Variables from '../../styles';

//redux things
import {connect} from 'react-redux';

import * as championActions from '../../actions/champion';
import { bindActionCreators } from 'redux';
import deviceStorage from '../../services/deviceStorage';


class Champion extends Component {
    static navigationOptions = {
        header: null
      }

    constructor(props){
        super(props);
        this.state = {
            list: [],
            isLoading: false,
            fetchFailed: false,
            champion: {}
        }
    }

 

    componentDidMount(){
        console.log('this.props')
        console.log(this.props)
        this.fetchUser(this.props.champion);
    }

    fetchUser = (champion) => {
        this.setState({isLoading: false, champion})
        console.log(champion)
        
    }

    logout = () => {
        deviceStorage.clearStorage();
        console.log(this.props);
        this.props.navigation.goBack();
        console.log('oi')
    }

    render() {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{flex:1}}></View>
                <Text style={styles.headerText}>Your Information</Text>
                <TouchableOpacity style={{flex:1, alignItems: 'flex-end'}} onPress={() => this.logout()}>
                    <Image
                        style={{ 
                        height: 17,
                        width: 17, borderRadius: 8}}
                        resizeMode="contain"
                        source={require("../../images/exit.png")}/>
                    {/*<Text style={styles.headerText}>Logout</Text>*/}
                </TouchableOpacity>
            </View>
          
            <ScrollView style={{backgroundColor: Variables.colors.lighter}} contentContainerStyle={{justifyContent: "center",
                alignItems: "center"}}>
                    <View style={styles.imageBox}>
                        <Image
                        style={{ 
                        height: 150,
                        width: 200, borderRadius: 8}}
                        resizeMode="contain"
                        source={{uri:this.state.champion.avatar_url}}/>

                        <Text style={styles.infoTextName}>{this.state.champion.name}</Text>
                        <Text style={styles.infoText}>{this.state.champion.company}</Text>
                        <Text style={styles.infoText}>{this.state.champion.email}</Text>
                    </View>

                    <View style={styles.infoBoxLine}>
                        <View style={styles.boxRepositories}>
                            <Text style={styles.boxText}>{this.state.champion.public_repos}</Text>
                            <Text style={styles.boxText}>Repositories</Text>
                        </View>
                        <View style={styles.boxGists}>
                            <Text style={styles.boxText}>{this.state.champion.public_gists}</Text>
                            <Text style={styles.boxText}>Gists</Text>
                        </View>
                    </View>
                    

            </ScrollView>
        </SafeAreaView>
        );
    }

}

const mapStateToProps = state => ({
    champion: state.champion,
})

const mapDispatchToProps = dispatch => 
bindActionCreators({...championActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Champion);

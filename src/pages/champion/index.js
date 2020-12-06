import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from './styles';
import Variables from '../../styles';
import { revoke } from 'react-native-app-auth';

//redux things
import {connect} from 'react-redux';

import * as championActions from '../../actions/champion';
import { bindActionCreators } from 'redux';
import deviceStorage from '../../services/deviceStorage';

//Unsafe
import {CLIENT_ID, CLIENT_sECRET} from '../../services/constants';

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
        this.fetchUser(this.props.champion);
    }

    fetchUser = (champion) => {
        this.setState({isLoading: false, champion})
    }

    logout = (url) => {
        deviceStorage.clearStorage();
        this.props.navigation.goBack();
        if(!!url){
            this.props.navigation.state.params.revokeToken(url);
        }
    }

    revokeToken = async () => {
        const config = {
            redirectUrl: 'com.characterlist://oauthredirect',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_sECRET,
            scopes: ['identity'],
            serviceConfiguration: {
              authorizationEndpoint: 'https://github.com/login/oauth/authorize',
              tokenEndpoint: 'https://github.com/login/oauth/access_token',
              revocationEndpoint:
                'https://github.com/settings/connections/applications/' + CLIENT_ID
            }
          };


        const result = await revoke(config, {
            tokenToRevoke: this.state.champion.idToken,
            includeBasicAuth: true,
            sendClientId: true,
        });

        console.log(result)

        this.logout(result.url);
    }

    render() {
        return (
        <View style={styles.container}>
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
                    
                    <TouchableOpacity style={styles.revokeButton} onPress={() => this.revokeToken()}>
                        <Text style={styles.revokeText}>Logout and Revoke Token</Text>
                    </TouchableOpacity>

            </ScrollView>
        </View>
        );
    }

}

const mapStateToProps = state => ({
    champion: state.champion,
})

const mapDispatchToProps = dispatch => 
bindActionCreators({...championActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Champion);

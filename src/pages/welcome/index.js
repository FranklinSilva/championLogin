import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import styles from './styles';
import deviceStorage from '../../services/deviceStorage';
import Variables from '../../styles';
//redux things
import {connect} from 'react-redux';

import * as championActions from '../../actions/champion';
import { bindActionCreators } from 'redux';
import { authorize } from 'react-native-app-auth';

//Unsafe
import {CLIENT_ID, CLIENT_sECRET} from '../../services/constants';

class Welcome extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            list: [],
            isLoading: false,
            fetchFailed: true,
            isLoggedOut: false
        }
    }

    componentDidMount(){
        this.checkUserAutentication(); 
    }

    checkUserAutentication = () => {
        deviceStorage.loadCurrentUser()
        .then(res => 
        {
            if(!!res){
                this.props.getChampionInfoSuccess(JSON.parse(res))
                this.props.navigation.navigate('Champion');
                this.setState({isLoading: false, fetchFailed: true});

            }
            else
                this.setState({isLoading: false, fetchFailed: true});
        });
    }

    loginGithub = async () => {
        this.setState({isLoading: true});
        
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
          
          // Log in to get an authentication token
          const authState = await authorize(config);

          console.log(authState)
          if(!!authState.accessToken){
            //deviceStorage.saveItem("id_token", JSON.stringify(authState.accessToken));
            this.getChampionInfo(authState.accessToken)
          }
          else
            console.log('unhandled error');
    }

    getChampionInfo = (token) => {
        this.setState({isLoading: true});

        this.props.getChampionInfo(token)
        .then(() => {
            this.setState({isLoading: false, fetchFailed: true});
            this.props.navigation.navigate('Champion');
        })
        .catch(() => {
            this.setState({isLoading: false, fetchFailed: true});
        });
    } 

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Champion Login</Text>
                <Text style={styles.headerSubText}>Access your Github information</Text>
            </View>

                <View style={styles.logoBox}>
                    <Image
                        style={{ 
                        height: 150,
                        width: 200}}
                        resizeMode="contain"
                        source={require("../../images/Octocat.png")}/>

                    {this.state.isLoading &&
                        <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                            <ActivityIndicator size="small" color={Variables.colors.dark} />
                            <Text style={{fontSize: 14, color: Variables.colors.dark, marginLeft: 5}}>Loading your information</Text>
                        </View>
                    }

                    {this.state.fetchFailed && !this.state.isLoading &&
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                        <Text style={{fontSize: 14, color: Variables.colors.dark, marginLeft: 5}}>Auto login has failed</Text>
                        <TouchableOpacity style={{backgroundColor: Variables.colors.secondary, padding: 10, width: 180, marginTop: 10}} onPress={() => this.loginGithub()}>
                            <Text style={{color: Variables.colors.white, textAlign: "center", fontSize: 12}}>Login with your Github Account</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
        </View>
        );
    }

}

const mapStateToProps = state => ({
    champion: state.champion,
})

const mapDispatchToProps = dispatch => 
bindActionCreators({...championActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

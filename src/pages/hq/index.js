import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import styles from './styles';
import Variables from '../../styles';

import Character from '../../components/Character';

//redux things
import {connect} from 'react-redux';

import * as championActions from '../../actions/champion';
import { bindActionCreators } from 'redux';


class Welcome extends Component {

    constructor(props){
        super(props);
        this.state = {
            list: [],
            isLoading: false,
            fetchFailed: false
        }
    }

 

    componentDidMount(){
        this.getCharacters()
    }

    getCharacters = () => {
        this.setState({isLoading: true})
        this.props.getCharacters()
        .then(() => {
            this.setState({isLoading: false});
            console.log(this.props)
        })
        .catch(() => {
            this.setState({isLoading: false, fetchFailed: true});
        });
    }

    goToDetails=(item) => {
        this.props.navigation.navigate('Character', {character: item});
    }

    renderContacts = ({item, index}) => {
        return (
            <Character
                name={item.name}
                description={item.description}
                image={item.thumbnail.path}
                goToDetails={() => this.goToDetails(item)}
            />
            )
    }


    render() {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Character List</Text>
            </View>
            <View style={{backgroundColor: Variables.colors.lighter}}>
                <FlatList 
                    ref={(ref) => { this.flatListRef = ref; }}
                    data={this.props.characters.results}
                    keyExtractor={(item, index) => index + ""}
                    renderItem={this.renderList}
                    extraData={this.state}
                    inverted={false}
                    initialNumToRender={3}
                    horizontal={false}/>   
            </View>
          
            <ScrollView style={{backgroundColor: Variables.colors.lighter}} contentContainerStyle={{justifyContent: "center",
                alignItems: "center",}}>

               

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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

import React, {Component} from 'react'
import {
    Container,
    Header,
    Content,
    Footer,
    Title,
    InputGroup,
    Input,
    Icon
} from 'native-base';
import {
    Text,
    View,
    FlatList,
    Image,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    AsyncStorage,
    SafeAreaView
} from 'react-native'
import {
    SearchBar,
} from 'react-native-elements'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default class CleanSearch extends Component {

    constructor(props){
        super(props)

        this.state={
            search: '',
            selected: false
        }

    }

    render(){
        return (

            <Container style={styles.mainView}>
                <View style={{height: 13}} />

                <Content>

                    <InputGroup borderType="rounded" style={styles.searchBar}>
                        <Icon name='search' style={{color: '#384850'}} />
                        <Input placeholder='Search' />
                    </InputGroup>
                    <ScrollView style={{top: 10}}>

                        <Card style={styles.card}>
                        
                            <View>
                                <Image
                                style={{width: 100, height: 100}}
                                resizeMode='cover'
                                 source={{uri: 'https://i.scdn.co/image/ab67616d000048518074759e322b06e493cbe154'}}
                                />
                            </View>

                          <View style={styles.songInfo}>
                            <View>
                                <Text style={{fontSize: 30}}>This is the song title</Text>
                            </View>
                            

                            <View style={{top: 5}}>
                                
                                <Text style={{fontSize: 18}}>Artist Name - Album Name</Text>
                                
                            </View>
                          </View>

                        </Card>

                    </ScrollView>
                </Content>


            </Container>

        )
    }

}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'grey',

    },
    card: {
        backgroundColor: '#E7F9A9',
        color: '#E7F9A9',
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2.5,
        borderColor: 'white'
    },
    songInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        // left: 7,
        // top: 7,
        padding: 13,
        justifyContent: 'center'
    },
    searchBar: {
        backgroundColor: '#d6c2c0'
    }
})


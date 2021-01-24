import React from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Assets from '../Assets';
import GeneralModalComponent from '../Components/GeneralModalComponent';
import SearchViewComponent from '../Components/SearchViewComponent';
import ShowComponent from '../Components/ShowComponent';
import { PROGRAM_LIST } from '../utils/Constant';
import IGColors from '../utils/IGColors';
import { getProgramsList } from '../utils/ServiceManager';
import BaseContainer from './BaseContainer';

export default class HomeContainer extends React.Component {

    constructor(props) {
        super(props)
        this.arrayOfProgramList = []
    }

    state = {
        isSearchOpen: false
    }

    componentDidMount() {
        this.getProgramListAPI()
    }

    getProgramListAPI = () => {
        getProgramsList(
            PROGRAM_LIST + '?country=US&date=2014-12-01',
            this.onSuccessProgramList,
            this.onFailureProgramList
        )
    }

    onSuccessProgramList = (response) => {
        console.log("Success :::::::: ", response)
        // this.arrayOfProgramList = response
        if (response !== undefined && response.length > 0) {
            this.arrayOfProgramList = response
        } else {
            this.arrayOfProgramList = []
        }
        this.forceUpdate()
    }

    onFailureProgramList = (error) => {
        console.log("FAILURE :::: ", error)
    }

    searchListRenderView = () => {
        return (
            <GeneralModalComponent
                isModalVisible={this.state.isSearchOpen}
                onRequestClose={this.closeSearchList}
            >
                <SearchViewComponent
                    onRequestClose={this.closeSearchList}
                    onPress={(item) => {
                        this.closeSearchList()
                        this.navigateToDetail(item)
                    }}
                />

            </GeneralModalComponent>
        )
    }

    closeSearchList = () => {
        this.setState({
            isSearchOpen: false
        })
    }

    openSearchList = () => {
        this.setState({
            isSearchOpen: true
        })
    }

    showRenderView = ({ item }) => {
        return <ShowComponent item={item} onPress={this.navigateToDetail} />
    }

    navigateToDetail = (data) => {
        this.props.navigation.navigate('Detail', {
            id: data.id,
            name: data.name
        })
    }
    render() {
        return (
            <BaseContainer
                title={'Programs'}
                right={'search'}
                onRight={this.openSearchList}
            >
                {this.searchListRenderView()}
                <FlatList
                    style={Styles.container}
                    data={this.arrayOfProgramList}
                    numColumns={2}
                    renderItem={this.showRenderView}
                />

                {/* </View> */}
            </BaseContainer>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: IGColors.black
    }
})
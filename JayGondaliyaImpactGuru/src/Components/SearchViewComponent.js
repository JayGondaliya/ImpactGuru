import React from 'react'
import { SafeAreaView, TextInput, TouchableOpacity, View, FlatList, ImageBackground, Text, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IGColors from '../utils/IGColors'
import { getSearchList } from '../utils/ServiceManager'
import { SEARCH_LIST } from '../utils/Constant'
import Assets from '../Assets'
import ShowComponent from './ShowComponent'

export default class SearchViewComponent extends React.Component {

    constructor(props) {
        super(props)

        this.arrayOfSearchList = []
    }
    state = {
        strSearch: ""
    }

    onClearSearch = () => {
        this.setState({
            strSearch: ""
        })
        this.arrayOfSearchList = []
    }

    onChangeText = (text) => {
        this.setState({
            strSearch: text
        })
        this.getSearchListAPI()
    }

    getSearchListAPI = () => {
        getSearchList(
            SEARCH_LIST + '?q=' + this.state.strSearch,
            this.onSuccessSearchList,
            this.onFailureSearchList
        )
    }

    onSuccessSearchList = (response) => {
        console.log("Success :::::::: ", response)
        // this.arrayOfProgramList = response
        if (response !== undefined && response.length > 0) {
            this.arrayOfSearchList = response
        } else {
            this.arrayOfSearchList = []
        }
        this.forceUpdate()
    }

    onFailureSearchList = (error) => {
        console.log("FAILURE :::: ", error)
    }

    showRenderView = ({ item }) => {
        return <ShowComponent item={item} onPress={this.props.onPress} />
    }
    render() {
        return (
            <View style={Styles.container}>
                <SafeAreaView style={Styles.container}>
                    <TouchableOpacity style={Styles.closeStyle} onPress={this.props.onRequestClose}>
                        <MaterialIcons size={25} color={IGColors.primary} name={'close'} />
                    </TouchableOpacity>

                    <View style={Styles.searchViewStyle}>
                        <TextInput
                            style={Styles.inputStyle}
                            value={this.state.strSearch}
                            placeholderTextColor={IGColors.secondaryPrimary}
                            placeholder={'Search your program'}
                            onChangeText={this.onChangeText}
                        />
                        {this.state.strSearch !== "" ?
                            <TouchableOpacity onPress={this.onClearSearch} style={Styles.clearStyle}>
                                <MaterialIcons size={20} color={IGColors.primary} name={'close'} />
                            </TouchableOpacity>
                            : null}
                    </View>

                    <FlatList
                        style={Styles.listStyle}
                        data={this.arrayOfSearchList}
                        numColumns={2}
                        renderItem={this.showRenderView}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    closeStyle:{
        alignItems: 'flex-end', padding:10
    },
    searchViewStyle:{
        padding: 5, flexDirection: 'row', borderWidth: 1, borderColor: IGColors.primary, color: IGColors.primary, marginHorizontal: 10, borderRadius: 10, marginBottom: 20
    },
    inputStyle:{
        flex: 1, padding: 15, color: IGColors.primary
    },
    clearStyle:{
        borderColor: IGColors.primary, color: IGColors.primary, padding:10
    },
    listStyle:{
        backgroundColor: IGColors.black
    }
})
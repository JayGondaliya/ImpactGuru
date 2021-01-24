import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Assets from '../Assets'
import IGColors from '../utils/IGColors'

export default class ShowComponent extends React.Component {

    render() {
        return (
            <TouchableOpacity style={Styles.container}
                onPress={()=>this.props.onPress(this.props.item.show)}
            >
                <ImageBackground style={Styles.imageStyle}
                    source={this.props.item.show.image !== null && this.props.item.show.image.original !== null ?
                        { uri: this.props.item.show.image.original } : Assets.banner} >
                    <Text
                        style={Styles.textStyle}
                        numberOfLines={2}
                    >{this.props.item.show.name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1, marginHorizontal: 20, marginVertical: 10, borderRadius: 10, overflow: 'hidden'
    },
    imageStyle:{
        width: '100%', height: 200, justifyContent: 'flex-end'
    },
    textStyle:{
        backgroundColor: IGColors.offBlack, paddingHorizontal: 10, paddingVertical: 10, textAlign: 'center', color: IGColors.primary
    }
})
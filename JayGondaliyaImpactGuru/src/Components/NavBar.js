import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IGColors from '../utils/IGColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default class NavBar extends React.Component {

    render() {
        return (
            <SafeAreaView style={Styles.container}>
                <View style={Styles.subContainer}>
                    <TouchableOpacity onPress={this.props.onLeft}>
                        <MaterialIcons style={Styles.buttonStyle} size={25} color={IGColors.primary} name={this.props.left} />
                    </TouchableOpacity>
                    <Text style={Styles.textStyle}>{this.props.title}</Text>
                    <TouchableOpacity onPress={this.props.onRight}>
                        <MaterialIcons style={Styles.buttonStyle} size={25} color={IGColors.primary} name={this.props.right} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: IGColors.black
    },
    subContainer: {
        height: 60, backgroundColor: 'black', flexDirection: 'row', borderBottomColor: IGColors.primary, borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10
    },
    buttonStyle:{
        margin: 10
    },
    textStyle:{
        flex: 1, color: IGColors.primary, textAlign: 'center'
    }
})
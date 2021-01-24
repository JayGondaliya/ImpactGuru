import React from 'react';
import { View } from 'react-native';
import NavBar from '../Components/NavBar';
import IGColors from '../utils/IGColors';


export default class BaseContainer extends React.Component{

    render(){
        return(
            <View style={{flex:1, backgroundColor: IGColors.black}}>
                <NavBar
                    title={this.props.title}
                    right={this.props.right}
                    left={this.props.left}
                    onRight={this.props.onRight}
                    onLeft={this.props.onLeft}
                />
                {this.props.children}
            </View>
        )
    }
}
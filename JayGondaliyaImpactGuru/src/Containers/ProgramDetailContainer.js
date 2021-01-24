import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { getProgramsDetail } from '../utils/ServiceManager'
import BaseContainer from './BaseContainer'
import { SHOW_DETAIL } from '../utils/Constant'
import IGColors from '../utils/IGColors'
import WebView from 'react-native-webview'
import Assets from '../Assets'

export default class ProgramDetailContainer extends React.Component {

    constructor(props) {
        super(props)
        console.log("PARAM ::: ", this.props.route.params.id)
        this.programDetail = ""

        this.fontSize = "18px";
        this.meta = '<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></head>';
        this.customStyle = this.meta + "<style>* {max-width: 100%;} body {font-size:" + this.fontSize + ";background-color:" + IGColors.black + ";" + "color:" + IGColors.primary + ";}</style>";
    }

    componentDidMount() {
        this.getProgramDetailAPI()
    }

    getProgramDetailAPI = () => {
        getProgramsDetail(
            SHOW_DETAIL + this.props.route.params.id + '?embed=cast',
            this.onSuccessProgramDetail,
            this.onFailureProgramDetail
        )
    }

    onSuccessProgramDetail = (response) => {
        console.log("Success :::::::: ", response)

        this.programDetail = response
        this.forceUpdate()
    }

    onFailureProgramDetail = (error) => {
        console.log("FAILURE :::: ", error)
    }

    navigateToBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <BaseContainer
                title={this.props.route.params.name || ""}
                left={'chevron-left'}
                onLeft={this.navigateToBack}
            >
                {this.programDetail !== "" ?
                    <ScrollView>
                        <Image
                            style={Styles.imageStyle}
                            source={this.programDetail.image.original !== null && this.programDetail.image !== null ? { uri: this.programDetail.image.original } : Assets.banner} />
                        {this.programDetail.schedule.days.length !== 0 ?
                            <View style={Styles.scheduleView}>
                                {this.programDetail.schedule.days.length < 1 ?
                                    <Text style={Styles.scheduleText}>{this.programDetail.schedule.days[0] + " " + this.programDetail.schedule.time}</Text>
                                    : <Text style={Styles.scheduleText}>{this.programDetail.schedule.days[0] + " - " + this.programDetail.schedule.days[this.programDetail.schedule.days.length - 1] + " " + this.programDetail.schedule.time}</Text>}
                            </View>
                            : null}
                        {this.programDetail.rating.average !== null ?
                            <Text style={Styles.ratingText}>{'Rating - ' + this.programDetail.rating.average || ""}</Text>
                            : null}
                        <Text style={Styles.summaryText}>{'Summary:'}</Text>
                        <WebView
                            style={Styles.WebViewStyle}
                            source={{ html: this.customStyle + this.programDetail.summary }}
                        />
                    </ScrollView>
                    : null}
            </BaseContainer>
        )
    }
}

const Styles = StyleSheet.create({
    imageStyle: {
        height: 250
    },
    scheduleView: {
        backgroundColor: IGColors.secondaryPrimary, padding: 10, marginVertical: 10
    },
    scheduleText:{
        color: IGColors.white
    },
    ratingText:{
        padding: 10, color: IGColors.primary
    },
    summaryText:{
        color: IGColors.primary
    },
    WebViewStyle:{
        borderWidth: 1, borderColor: IGColors.primary, width: '100%', height: 250, marginVertical:10
    }
})
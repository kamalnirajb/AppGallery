import React from "react";
import { View, Text, Animated, Button, Alert, TouchableOpacity, Share } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import { Props } from "../Utilities/AppComponentProps";
import * as locale from './../i18n/locale.json';
import AppTheme from '../Utilities/AppTheme'

interface State {
    item: any,
    resizeMode: string
}

export default class GalleryDetailsScreen extends React.Component<Props, State> {

    private scale = new Animated.Value(1);
    private onZoomEvent = Animated.event([{ nativeEvent: { scale: this.scale } }], { useNativeDriver: true });
    private onZoomStateChange = ((event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(this.scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        }
    });

    constructor(props: Props) {
        super(props);

        this.state = {
            item: props.route.params,
            resizeMode: "contain"
        };
    }

    /**
     * Save image to camera roll
     */
    saveImageToCameraRoll(): void {
        RNFetchBlob.config({
            fileCache: true
        })
        .fetch('GET', this.state.item.download_url)
        .then(response=>{
            CameraRoll.save(response.data)
                .then(saveResponse=>{
                    Alert.alert(locale.en.imageSaved);
                }).catch(error=>{
                    Alert.alert(locale.en.imageSaveError);
                });
        }).catch(error=>{
            console.error(error);
        });
        
    }

    /**
     * Share the image using native share dialog
     */
    shareImage(): void {
        let shareImage = {
            title: this.state.item.author,
            message: "Found the image from picsum",
            url: this.state.item.download_url
        };
        Share.share(shareImage,{
            dialogTitle: "Share Image",
            tintColor: "gray"
        }).then(response=>{
            Alert.alert(locale.en.imageShared);
        }).catch(error=>{
            Alert.alert(locale.en.imageSaveError);
        });
    }
    /**
     * Render the screen
     * @returns Void
     */
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                <PinchGestureHandler
                    onGestureEvent={this.onZoomEvent}
                    onHandlerStateChange={this.onZoomStateChange}>
                    <Animated.Image
                        source={{
                            uri: this.state.item.download_url,
                            cache: 'default'
                        }}
                        style={{
                            width: '100%',
                            height: '90%',
                            transform: [{ scale: this.scale }]
                        }}
                        resizeMode='contain'
                    />
                </PinchGestureHandler>
                <View style={{ width: '100%', height: '10%', padding: 10, backgroundColor: 'rgba(52, 52, 52, 0.8)', flexDirection: "row" }}>
                    <Text style={{ flex: 2, color: 'white', alignSelf: 'center' }}>{this.state.item.author}</Text>
                    <TouchableOpacity
                        style={AppTheme.styles.button}
                        onPress={this.saveImageToCameraRoll.bind(this)}>
                        <Text>{locale.en.save}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AppTheme.styles.button}
                        onPress={this.shareImage.bind(this)}>
                        <Text>{locale.en.share}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
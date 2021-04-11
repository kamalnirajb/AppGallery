import React from "react";
import { View, Text, Button, FlatList, TouchableHighlight, Image, Dimensions, Alert } from "react-native";
import { Props } from "../Utilities/AppComponentProps";
import AppHttp from "../Utilities/AppHttp";
import * as locale from './../i18n/locale.json';

interface State {
    limit: number,
    page: number,
    data: any[],
    loaded: boolean,
    isLoadingMore: boolean
}

export default class GalleryScreen extends React.Component<Props, State> {

    appHttp: AppHttp;
    constructor(props: Props) {
        super(props);
        this.appHttp = new AppHttp();
        this.state = {
            limit: 100,
            page: 1,
            data: [],
            loaded: false,
            isLoadingMore: true
        };
        this.loadPics();
    }

    /**
     * Load all the pics with pagination
     * @returns {Promise<any>} Get the promise with error or success
     */
    loadPics(): Promise<any> {
        return this.appHttp.getPics(this.state.page, this.state.limit)
            .then((response: any)=>{
                this.setState({
                    loaded: true,
                    data: (this.state.data && this.state.data.length > 0 && this.state.page > 1) ? this.state.data.concat(response) : response,
                    page: this.state.page + 1
                });
            })
            .catch((error)=>{
                Alert.alert(locale.en.errorLoadingPics);
            });
    }

    /**
     * Render the UI
     * @returns Void
     */
    render() {
        const imgDimension = (Dimensions.get("window").width/4) - 4;
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
                <FlatList
                    data={this.state.data}
                    numColumns={4}
                    initialNumToRender={10}
                    refreshing={this.state.loaded}
                    onEndReached={this.loadPics.bind(this)}
                    renderItem={({item, index, separators}) => (
                        <TouchableHighlight
                            key={item.id}
                            onPress={() => this.props.navigation.navigate("GalleryDetails",item)}
                            >
                             <View style={{ backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    style={{width: imgDimension, height: imgDimension, margin:1, borderRadius: 5, borderWidth:1, borderColor: 'lightgray'}}
                                    resizeMode="cover"
                                    source={{uri: this.appHttp.getThumbnail(item.id, Math.ceil(imgDimension)), cache:  'default', }}
                                    />
                            </View>
                        </TouchableHighlight> 
                      )}
                />
            </View>
        );
    }
}
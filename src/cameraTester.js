'use strict';
import React, {PureComponent} from 'react';
import {AppRegistry, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class ExampleApp extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            cameraType: RNCamera.Constants.Type.front,
        };
    }

    onPictureTaken = () => {
        // 停止相机的预览
        this.camera.pausePreview();
        console.log("onPictureTaken");
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    autoFocus={RNCamera.Constants.AutoFocus.off}
                    style={styles.preview}
                    type={this.state.cameraType}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({barcodes}) => {
                        console.log(barcodes);
                    }}
                    onFacesDetected={(faces) => {
                        console.log("onFacesDetected", faces);
                    }}
                    onCameraReady={async (event)=>{
                        console.log('onCameraReady',event);
                    }}
                    // onPictureTaken={this.onPictureTaken}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{fontSize: 14}}> 拍照 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.switchCamera} style={styles.capture}>
                        <Text style={{fontSize: 14}}> 切换摄像头 </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: true, doNotSave: false};
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            alert("uri:" + data.uri);
        }
    };

    switchCamera = () => {
        if (this.state.cameraType == RNCamera.Constants.Type.back) {
            this.setState({
                cameraType: RNCamera.Constants.Type.front
            });
            // this.cameraType = RNCamera.Constants.Type.front;
        } else {
            this.setState({
                cameraType: RNCamera.Constants.Type.back
            });
            // this.cameraType = RNCamera.Constants.Type.back;
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

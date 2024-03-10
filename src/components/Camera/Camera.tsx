import React, { useState, useEffect } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const PhotoComponent = () => {
    const [photoUri, setPhotoUri] = useState(null);

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
            await FileSystem.copyAsync({ from: result.assets[0].uri, to: FileSystem.documentDirectory + 'photo.jpg' });
        }
    };

    useEffect(() => {
        const loadPhoto = async () => {
            const photoPath = FileSystem.documentDirectory + 'photo.jpg';
            const photoExists = await FileSystem.getInfoAsync(photoPath);
            //
            // Read the contents of the directory
            const ddd = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);

            // Log or use the list of files
            console.log('Files in directory:', ddd);
            console.log();
            if (photoExists.exists) {
                setPhotoUri(photoPath);
            }
        };
        loadPhoto();
    }, []);

    return (
        <View>
            {photoUri && <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />}
            <Button title="Take Photo" onPress={takePhoto} />
        </View>
    );
};

export default PhotoComponent;

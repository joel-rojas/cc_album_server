import AWS from 'aws-sdk';

const s3Url = 'https://s3.amazonaws.com/';
const bucketName = 'rauxacodingchallenge';
const albumName = 'album1';
const bucketUrl = `${s3Url}${bucketName}/`;
const bucketRegion = 'us-east-2';
const IdentityPoolId = 'us-east-2:5b3be707-f6c8-43e6-a7b9-d5cb6f74081c';

/**
 * Sets an AWS S3 property in order to use its API properties/methods.
 */
const s3 = (function initS3() {
    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId
        })
    });
    return new AWS.S3({
        apiVersion: '2006-03-01',
        params:{Bucket: bucketName}
    });
})();

/**
 * This method performs a AWS s3 method to get an S3 album folder data and its photos (items). 
 * If data is retrieved without errors then its data is saved into the Promise resolve method.
 * Otherwise, if an error is detected then Promise reject method is called and set its error data.
 * @returns {Promise} - Promise object
 */
export function photoList() {
    return new Promise((resolve, reject) => {
        const albumPhotoKey = `${encodeURIComponent(albumName)}/`;
        s3.listObjects({Prefix: albumPhotoKey}, (err, data) => {
            if (err) { return reject({success: false, data: 'There was an error loading the album: ' + err}); }
            const photos = data.Contents;
            if (photos.length === 0) { return resolve({success: true, data: 'No photos to show. Please add photos.'}); }
            return resolve({
                success: true, 
                data: photos.map((photo) => {
                    const photoKey = photo.Key;
                    return {
                        photoKey,
                        photoUrl: `${bucketUrl}${encodeURIComponent(photoKey)}`
                    };
                })
            });
        });
    });
}
/**
 * This method calls AWS S3 upload method to perform the uploading photo file process given a file data.
 * If the call is successful then its confirmation data gets wrapped into Promise resove method.
 * Otherwise, if an error is detected then Promise reject method is called and set its error data
 * @param {} file 
 * @return {Promise} - Promise object
 */
export function addPhoto(file) {
    return new Promise((resolve, reject) => {
        const fileName = file.name;
        const fileData = Buffer.from(file.data);
        const albumPhotosKey = `${encodeURIComponent(albumName)}//`;
        const photoKey = `${albumPhotosKey}${fileName}`;
        s3.upload({
            Key: photoKey,
            Body: fileData,
            ACL: 'public-read'
        }, (err, data) => {
            if (err) { return reject({success: false, data: `There was an error uploading the photo: ${err}`}); }
            return resolve({success: true, data});
        });
    });
}
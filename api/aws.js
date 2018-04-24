import AWS from 'aws-sdk';

const s3Url = 'https://s3.amazonaws.com/';
const bucketName = 'rauxacodingchallenge';
const albumName = 'album1';
const bucketUrl = `${s3Url}${bucketName}/`;
const bucketRegion = 'us-east-2';
const IdentityPoolId = 'us-east-2:5b3be707-f6c8-43e6-a7b9-d5cb6f74081c';

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

export function addPhoto(file) {
    return new Promise((resolve, reject) => {
        const fileName = file.name;
        const albumPhotosKey = `${encodeURIComponent(albumName)}//`;
        const photoKey = `${albumPhotosKey}${fileName}`;
        s3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, (err, data) => {
            if (err) { return reject({success: false, data: `There was an error uploading the photo: ${err}`}); }
            return resolve({success: true, data});
        });
    });
}
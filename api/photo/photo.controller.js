
import {Photo} from './photo.model';
import {photoList, addPhoto} from '../aws';
import { resolve } from 'path';

/**
 * This method searches for saved photos from DB server. If there are photos records the it returns the list of photos.
 * Otherwise, it returns the error response.
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @returns {Response} - Response object
 */
export function list (req, res) {
    Photo.findAll().then(photos => {
        return res.status(200).json({success: true, data: photos});
    }).catch(err => {
        const errMsg = typeof err === 'object' ? JSON.stringify(err) : err;        
        return res.status(503).json({success: false, data: `Couldn't retrieve list of photos: ${errMsg}`});
    });
}
/**
 * This method uploads a new photo file to AWS S3 server and creates a new photo record in DB server. 
 * Both calls are secuencial and if both of them are performed succesfully then it returns a JSON with a confirmation message.
 * Otherwise, it returns an error response.
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @returns {Response} - Response object
 */
export function add (req, res) {
    const bodyData = req.body;
    const files = req.files;
    const file = files.file;
    const {name, description} = bodyData;
    addPhoto(file).then(response => {
        const data = response.data;
        console.log(data);  
        return Photo.create({
            name,
            description,
            link: data.Location
        });
    }).then(photo => {
        return res.status(200).json({success: true, data: 'Photo successfully created.'});
    }).catch(err => {
        const errMsg = typeof err === 'object' ? JSON.stringify(err) : err;        
        return res.status(503).json({success: false, data: `Couldn't create photo: ${errMsg}`});
    });
}
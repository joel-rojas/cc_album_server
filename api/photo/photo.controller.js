
import {Photo} from './photo.model';
import {photoList, addPhoto} from '../aws';
import { resolve } from 'path';

export function list (req, res) {
    Photo.findAll().then(response => {
        const {data} = response;
        return res.status(200).json({success: true, data});
    }).catch(err => {
        const errMsg = typeof err === 'object' ? JSON.stringify(err) : err;        
        return res.status(503).json({success: false, data: `Couldn't retrieve list of photos: ${errMsg}`});
    });
}
export function add (req, res) {
    const bodyData = req.body;
    const {name, description, file} = bodyData;
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
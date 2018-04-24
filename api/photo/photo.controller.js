
import {Photo} from './photo.model';
import {photoList, addPhoto} from '../aws';

export function list (req, res) {
    const listPhotoDBProm = Photo.findAll();
    const listPhotoImgProm = photoList();
    Promise.all([listPhotoDBProm, listPhotoImgProm])
        .then(dataSet => {
            const photoDBSet = dataSet[0];
            const photoImgSet = dataSet[1];
            return res.status(200).json({photoDBSet, photoImgSet});
        }).catch(err => {
            return res.status(503).json({message: `Couldn't get photo list from server: ${JSON.stringify(err)}`});
        });
}
export function add (req, res) {}
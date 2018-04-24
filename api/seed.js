import {Photo} from './photo/photo.model';

export function exec() {
    Photo.findAll().then(photos => {
        if (photos.length === 0) {
            Photo.create({
                name: "FIRST LIFE",
                description: "This is a chill life",
                link: "https://s3.amazonaws.com/rauxacodingchallenge/life1.jpg",
                date: new Date().toUTCString()
            }).then(photo => {
                console.log('New photo data saved');
            });
        }
    }).catch((err) => {
        console.log(`Unable to access photo table: ${err}`);
    });
}

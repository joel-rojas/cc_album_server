import {Photo} from './photo/photo.model';

/**
 * This function gets called to register a new dummy record to photo table if it doesn't has any records in it.
 */
export function exec() {
    Photo.findAll().then(photos => {
        if (photos.length === 0) {
            Photo.create({
                name: "FIRST LIFE",
                description: "This is a chill life",
                link: "https://s3.amazonaws.com/rauxacodingchallenge/album1/life1.jpg",
                date: new Date().toUTCString()
            }).then(photo => {
                console.log('New photo data saved');
            });
        }
    }).catch((err) => {
        console.log(`Unable to access photo table: ${err}`);
    });
}

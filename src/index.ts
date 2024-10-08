import * as experiments from './diverse';
import * as another from './sample';
import * as oversubstitution from './oversubstitution/index';
import * as notoversubstitution from './not-oversubstitution/index';

export const sketches = [
    {
        "name": "Diverse",
        "description": "Plot of icons",
        "object": experiments,
        "options": {
            "width": 1080,
            "height": 1080,
            "fps": 60,
            "size": 1,
            "pixelDensity": window.devicePixelRatio
        },
        "audio": null
    },
    {
        "name": "Sample",
        "description": "Sample sketch for debugging",
        "object": another,
        "options": {
            "width": 720,
            "height": 720,
            "fps": 30,
            "size": 0.5,
            "pixelDensity": window.devicePixelRatio
        },
        "audio": "sample/song.ogg"
    },
    {
        "name": "過置換",
        "description": "An replication of <a href=\"https://github.com/qmelo/oversubstitution\" style=\"text-decoration-line: underline; color: #DDDDDD;\">Oversubstitution</a> by melonade.",
        "object": oversubstitution,
        "options": {
            "width": 1920,
            "height": 1080,
            "fps": 60,
            "size": 1,
            "pixelDensity": window.devicePixelRatio
        },
        "audio": "oversubstitution/oversubstitution.wav"
    },
    {
        "name": "一龠 + 過置換",
        "description": "Radical carried over to same rows in lyrics.",
        "object": notoversubstitution,
        "options": {
            "width": 1920,
            "height": 1080,
            "fps": 60,
            "size": 1,
            "pixelDensity": window.devicePixelRatio
        },
        "audio": "not-oversubstitution/mixed.wav"
    }
];
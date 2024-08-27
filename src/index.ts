import * as experiments from './diverse';
import * as another from './sample';

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
        }
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
        }
    }
];
import * as experiments from './experiments';
import * as another from './another';

export const sketches = [
    {
        "name": "Experiments",
        "description": "Collection of experiments",
        "object": experiments
    },
    {
        "name": "Another",
        "description": "Another sketch",
        "object": another,
        "options": {
            "width": 720,
            "height": 720,
            "fps": 30,
            "size": 0.5,
            "pixelDensity": 2
        }
    }
];
import { EventEmitter } from './eventUtils';
import { time } from '../audio';

export interface BPMEntry {
    beat: number;
    bpm: number;
    time?: number;
}

export class Beat {
    bpmList: BPMEntry[] = [{ beat: 0, bpm: 120 }];
    offset = 0; // in seconds
    constructor(bpm: number | Array<BPMEntry>, offset: number = 0) {
        if (Array.isArray(bpm)) this.bpmList = bpm;
        else this.bpmList = [{ beat: 0, bpm: bpm }];
        this.offset = offset;
        this.bpmList.sort((a, b) => a.beat - b.beat);
        this.preprocessBPM();
    }
    preprocessBPM() {
        this.bpmList.forEach((item, index) => {
            if (index == 0) item.time = 0;
            else {
                item.time = this.bpmList[index - 1].time! +
                    60 / this.bpmList[index - 1].bpm *
                    (item.beat - this.bpmList[index - 1].beat);
            }
        });
    }
    fromTime(time: number) {
        if (time < 0) return 0;
        let index = 0;
        for (
            index = 0;
            index < this.bpmList.length && time >= this.bpmList[index].time!;
            index++
        );
        return this.bpmList[index - 1].beat +
            (time - this.offset - this.bpmList[index - 1].time!) / 60 *
            this.bpmList[index - 1].bpm;
    }
    toTime(beat: number) {
        if (beat < 0) return 0;
        let index = 0;
        for (index = 0; index < this.bpmList.length && beat >= this.bpmList[index].beat; index++);
        return this.bpmList[index - 1].time! +
            (beat - this.bpmList[index - 1].beat) * 60 /
            this.bpmList[index - 1].bpm +
            this.offset;
    }
}
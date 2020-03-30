import { Subs, Cue } from "../models/subs.js";

export class Srt2Obj{
    convert(srtStr){
        const obj = new Subs();

        // remove dos newlines
        srtStr = srtStr.replace(/\r+/g, '');
        // trim white space start and end
        srtStr = srtStr.replace(/^\s+|\s+$/g, '');
    
        // get cues
        const cuelist = srtStr.split('\n\n');
    
        if (cuelist.length > 0) {
            cuelist.forEach(cue => {
                obj.cuelist.push(this.convertSrtCue(cue.trim()));
            });
        }
    
        return obj;
    }

    convertSrtCue(caption) {
        const cue = new Cue();

        // remove all html tags for security reasons
        //caption = caption.replace(/<[a-zA-Z\/][^>]*>/g, '');

        // Regex
        const shortTimestampRegex = /\d+:\d+:\d+/;
        const longSrtTimestampRegex = /(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/;
    
        let srt = caption.split(/\n/);
        let timestampIndex = 0;
    
        // Detect identifier
        if (!srt[0].match(shortTimestampRegex) && srt[1].match(shortTimestampRegex)) {
            cue.identifier = srt[0].trim();
            timestampIndex = 1;
        }
    
        // Convert timestamp
        if (srt[timestampIndex].match(longSrtTimestampRegex)) {
            let startTimeStr = srt[timestampIndex].split('-->')[0].trim();
            let endTimeStr = srt[timestampIndex].split('-->')[1].trim();

            startTimeStr = startTimeStr.split(':');
            endTimeStr = endTimeStr.split(':');
            startTimeStr[2] = startTimeStr[2].replace(/,/g, '.');
            endTimeStr[2] = endTimeStr[2].replace(/,/g, '.');

            cue.startTime = (parseInt(startTimeStr[0]) * 60 * 60 * 1000
                + parseInt(startTimeStr[1]) * 60 * 1000
                + parseFloat(startTimeStr[2]) * 1000.0).toFixed(0);
            cue.endTime = (parseInt(endTimeStr[0]) * 60 * 60 * 1000
                + parseInt(endTimeStr[1]) * 60 * 1000
                + parseFloat(endTimeStr[2]) * 1000.0).toFixed(0);

            cue.textLines = srt.splice(timestampIndex + 1);
        } else {
            // file format error
            throw new Error("Timestamp missing from a cue");
        }

        return cue;
    }
}
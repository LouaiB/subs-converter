import { Subs, Cue } from "../models/subs.js";

export class Webvtt2Obj{
    convert(webvttStr){
        const obj = new Subs();

        // remove dos newlines
        webvttStr = webvttStr.replace(/\r+/g, '');
        // remove WEBVTT header
        webvttStr = webvttStr.replace(/WEBVTT/i, '');
        // trim white space start and end
        webvttStr = webvttStr.replace(/^\s+|\s+$/g, '');
    
        // get cues
        const cuelist = webvttStr.split('\n\n');
    
        if (cuelist.length > 0) {
            cuelist.forEach(cue => {
                obj.cuelist.push(this.convertWebvttCue(cue.trim()));
            });
        }
    
        return obj;
    }

    convertWebvttCue(caption) {
        const cue = new Cue();

        // remove all html tags for security reasons
        //caption = caption.replace(/<[a-zA-Z\/][^>]*>/g, '');

        // Regex
        const shortTimestampRegex = /\d+:\d+:\d+/;
        const longWebvttTimestampRegex = /(\d+):(\d+):(\d+)(?:.(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:.(\d+))?/;
    
        let webvtt = caption.split(/\n/);
        let timestampIndex = 0;
    
        // Detect identifier
        if (!webvtt[0].match(shortTimestampRegex) && webvtt[1].match(shortTimestampRegex)) {
            cue.identifier = webvtt[0].trim();
            timestampIndex = 1;
        }
    
        // Convert timestamp
        if (webvtt[timestampIndex].match(longWebvttTimestampRegex)) {
            let startTimeStr = webvtt[timestampIndex].split('-->')[0].trim();
            let endTimeStr = webvtt[timestampIndex].split('-->')[1].trim();

            startTimeStr = startTimeStr.split(':');
            endTimeStr = endTimeStr.split(':');

            cue.startTime = (parseInt(startTimeStr[0]) * 60 * 60 * 1000
                + parseInt(startTimeStr[1]) * 60 * 1000
                + parseFloat(startTimeStr[2]) * 1000.0).toFixed(0);
            cue.endTime = (parseInt(endTimeStr[0]) * 60 * 60 * 1000
                + parseInt(endTimeStr[1]) * 60 * 1000
                + parseFloat(endTimeStr[2]) * 1000.0).toFixed(0);

            cue.textLines = webvtt.splice(timestampIndex + 1);
        } else {
            // file format error
            throw new Error("Timestamp missing from a cue");
        }

        return cue;
    }
}
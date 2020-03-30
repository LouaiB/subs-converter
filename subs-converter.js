import { Srt2Obj } from './srt/srt2obj.js';
import { Obj2Srt } from './srt/obj2srt.js';
import { Webvtt2Obj } from './webvtt/webvtt2obj.js';
import { Obj2Webvtt } from './webvtt/obj2webvtt.js';
import { Ass2Obj } from './ass/ass2obj.js';
import { Obj2Ass } from './ass/obj2ass.js';

export class SubsConverter{
    // Subtitle Formats Enum
    Formats = Object.freeze({
        ASS : 1,
        SRT : 2,
        WEBVTT : 3,
        SUBS : 4
    });

    convert(source, {from, to}){
        let obj = null;
        let result = "";

        // From
        switch(from){
            case this.Formats.SRT:
                const srt2obj = new Srt2Obj();
                obj = srt2obj.convert(source);
                break;
            case this.Formats.ASS:
                const ass2obj = new Ass2Obj();
                obj = ass2obj.convert(source);
                break;
            case this.Formats.WEBVTT:
                const webvtt2obj = new Webvtt2Obj();
                obj = webvtt2obj.convert(source);
                break;
            default:
                throw new Error("Invalid 'from' subtitles type specified");
        }

        // To
        switch(to){
            case this.Formats.SRT:
                const obj2srt = new Obj2Srt();
                result = obj2srt.convert(obj);
                break;
            case this.Formats.ASS:
                const obj2ass = new Obj2Ass();
                result = obj2ass.convert(obj);
                break;
            case this.Formats.WEBVTT:
                const obj2webvtt = new Obj2Webvtt();
                result = obj2webvtt.convert(obj);
                break;
            default:
                throw new Error("Invalid 'to' subtitles type specified");
        }

        return result;
    }
}
import { Subs, Cue } from "../models/subs.js";

export class Ass2Obj{
    convert(assSrt){
        const obj = new Subs();

        // remove dos newlines
        assSrt = assSrt.replace(/\r+/g, '');
        // remove comments
        assSrt = assSrt.split('\n').map(line => line.split(';')[0]).join('\n');
        // trim white space start and end
        assSrt = assSrt.replace(/^\s+|\s+$/g, '');
    
        // get script info
        obj.meta.scriptInfo = [];
        const scriptInfoStr = assSrt.split(/\[script info\]/i)[1]
            .split(/\[\w*\]/)[0]
            .split('\n');
        scriptInfoStr.forEach(info => {
            const key = info.split(':')[0]?.trim();
            const value = info.split(':')[1]?.trim();

            if(key && key != '')
                obj.meta.scriptInfo.push({key, value});
        });

        // get styles
        obj.meta.styles = [];
        const stylesStr = assSrt.split(/\[.*styles\]/i)[1]
            .split(/\[\w*\]/)[0].trim()
            .split('\n')
            .map(attr => attr.trim());
        const formatAttr = stylesStr[0].split(':')[1].split(',').map(attr => attr.trim());
        for(let i = 1; i < stylesStr.length; i++){
            const styleStr = stylesStr[i];
            if(styleStr == '') continue;

            const styleAttr = styleStr.split(':')[1].split(',').map(attr => attr.trim());
            const style = [];
            for(let j = 0; j < formatAttr.length; j++){
                const attribute = formatAttr[j];
                const value = styleAttr[j];

                if(attribute && attribute != '')
                    style.push({attribute, value});
            }
            obj.meta.styles.push(style);
        }

        // get cues
        const cuesStr = assSrt.split(/\[\w*event[s]?\]/i)[1]
            .split(/\[\w*\]/)[0].trim()
            .split('\n')
            .map(attr => attr.trim());
        const cueFormatAttr = cuesStr[0].split(':')[1].split(',').map(attr => attr.trim());
        for(let i = 1; i < cuesStr.length; i++){
            const cueStr = cuesStr[i];
            if(cueStr == '') continue;

            obj.cuelist.push(this.convertAssCue(cueStr, cueFormatAttr));
        }
    
        return obj;
    }

    convertAssCue(caption, cueFormatAttr) {
        const cue = new Cue();

        // remove all html tags for security reasons
        //caption = caption.replace(/<[a-zA-Z\/][^>]*>/g, '');

        // Regex
        const shortTimestampRegex = /\d+:\d+:\d+/;
        const longSrtTimestampRegex = /(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/;
    
        const cueAttr = caption.split('Dialogue:')[1].split(',').map(attr => attr.trim());
        const cueMeta = [];
        for(let j = 0; j < cueFormatAttr.length; j++){
            if(cueFormatAttr[j].toLowerCase() == 'start'){
                let startTimeStr = cueAttr[j].split(':');
                
                cue.startTime = (parseInt(startTimeStr[0]) * 60 * 60 * 1000
                    + parseInt(startTimeStr[1]) * 60 * 1000
                    + parseFloat(startTimeStr[2]) * 1000.0).toFixed(0);

                continue;
            } 
            if(cueFormatAttr[j].toLowerCase() == 'end'){
                let endTimeStr = cueAttr[j].split(':');
                
                cue.endTime = (parseInt(endTimeStr[0]) * 60 * 60 * 1000
                    + parseInt(endTimeStr[1]) * 60 * 1000
                    + parseFloat(endTimeStr[2]) * 1000.0).toFixed(0);

                continue;
            } 
            if(cueFormatAttr[j].toLowerCase() == 'text'){
                cue.textLines = cueAttr[j].replace(/\{.*\}/g, "").trim().split(/\\+n/i);

                continue;
            }

            cueMeta.push({attribute: cueFormatAttr[j], value: cueAttr[j]});
        }

        cue.meta = cueMeta;
        return cue;
    }
}
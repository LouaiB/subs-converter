

class Convert2Webvtt{

    /////////////// ASS TO WEBVTT ///////////////////
    ass2webvtt(data) {
        // remove dos newlines
        let ass = data.replace(/\r+/g, '');
        // trim white space start and end
        ass = ass.replace(/^\s+|\s+$/g, '');
    
        // remove text prior to [Events]
        ass = ass.split("[Events]").slice(1).join();
    
        // Get cue parts positions
        let formatLine = ass.split('\n')[1];
        formatItems = formatLine.split(",");
        const formatIndexes = {
            startIndex = -1,
            endIndex = -1,
            textIndex = -1
        }
    
        for(let i = 0; i < formatItems.length; i++){
            let item = formatItems[i];
            if(item.toLowerCase().indexOf("start") != -1) formatIndexes.startIndex = i;
            if(item.toLowerCase().indexOf("end") != -1) formatIndexes.endIndex = i;
            if(item.toLowerCase().indexOf("text") != -1) formatIndexes.textIndex = i;
        }
    
        // Remove comments and empty lines
        ass = ass.split("\n")
            .filter(line => line.trim().length > 0 && line.trim().charAt(0) != ';')
            .join("\n");
    
        // Slice off "Dialogue" and Format line and form cues list
        ass = ass.split("Dialogue:").slice(1);
        var cuelist = ass;
        var result = "";
    
        // Convert cues
        if (cuelist.length > 0) {
            result += "WEBVTT\n\n";
            cuelist.forEach(cue => {
                result += convertAssCue(cue.trim(), formatIndexes) + "\n\n";
            });
        }
    
        return result;
    }
    
    convertAssCue(caption, formatIndexes) {
        // remove all html tags for security reasons
        //caption = caption.replace(/<[a-zA-Z\/][^>]*>/g, '');
    
        let parts = caption.split(",");
    
        let start = parts[formatIndexes.startIndex].trim();
        let end = parts[formatIndexes.endIndex].trim();
        let text = parts.slice(formatIndexes.textIndex).join(",").trim();
    
        if(start.split(".")[1].length == 2) start += "0";
        if(end.split(".")[1].length == 2) end += "0";
    
        text = text.replace(/\{.*\}/g, "").trim();
        text = text.replace(/\\n/gi, "\n").trim();
    
        return start + " --> " + end + "\n" + text;
    }

    /////////////// SRT TO WEBVTT ///////////////////
    srt2webvtt(data) {
        // remove dos newlines
        let srt = data.replace(/\r+/g, '');
        // trim white space start and end
        srt = srt.replace(/^\s+|\s+$/g, '');
    
        // get cues
        const cuelist = srt.split('\n\n');
        let result = "";
    
        if (cuelist.length > 0) {
            result += "WEBVTT\n\n";
            cuelist.forEach(cue => {
                result += convertSrtCue(cue.trim());
            });
        }
    
        return result;
    }
    
    convertSrtCue(caption) {
        // remove all html tags for security reasons
        //caption = caption.replace(/<[a-zA-Z\/][^>]*>/g, '');

        // Regex
        const shortTimestampRegex = /\d+:\d+:\d+/;
        const longSrtTimestampRegex = /(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/;
    
        let vttCue = "";
        let srt = caption.split(/\n/);
        let timestampIndex = 0;
    
        // Detect identifier
        if (!srt[0].match(shortTimestampRegex) && srt[1].match(shortTimestampRegex)) {
            vttCue += srt[0].match(/\w+/) + '\n';
            timestampIndex = 1;
        }
    
        // Convert timestamp
        if (srt[timestampIndex].match(longSrtTimestampRegex)) {
                vttCue += srt[timestampIndex].replace(/,/g, '.');
        } else {
            // file format error
            throw new Error("Timestamp missing from a cue");
        }
    
        // Get cue text
        if (srt[timestampIndex + 1]) {
            vttCue += srt.splice(timestampIndex + 1).join("\n");
        }
        vttCue += '\n\n';

        return vttCue;
    }
}
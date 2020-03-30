export class Subs{
    constructor(cuelist, meta){
        this._cuelist = cuelist || [];
        this._meta = meta || [];
    }

    get cuelist(){ return this._cuelist }
    get meta(){ return this._meta }

    set cuelist(val){ this._cuelist = val }
    set meta(val){ this._meta = val }
}

export class Cue{
    constructor(identifier, startTime, endTime, textLines, meta){
        this._identifier = identifier || null;
        this._startTime = startTime || null;
        this._endTime = endTime || null;
        this._textLines = textLines || [];
        this._meta = meta || [];
    }

    get identifier(){ return this._identifier }
    get startTime(){ return this._startTime }
    get endTime(){ return this._endTime }
    get textLines(){ return this._textLines }
    get meta(){ return this._meta }

    set identifier(val){ this._identifier = val }
    set startTime(val){ this._startTime = val }
    set endTime(val){ this._endTime = val }
    set textLines(val){ this._textLines = val }
    set meta(val){ this._meta = val }
}
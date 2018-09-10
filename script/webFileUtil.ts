class WebFileReader {
    private _chunkDatas: string[] = []; // buffer to store reading data
    private _file: File;
    private _sliceSize: number;

    constructor(file: File, sliceSize: number = 4096) {
        this._file = file;
        this._sliceSize = sliceSize;
    }

    onProgressChanged: (progress: number) => void;
    onCompleted: (fileData: string[]) => void;

    startReading() {
        if (!this._file)
            return;

        this._chunkDatas = [];

        const reader = new FileReader();
        const fileSize = this._file.size;
        let progress = 0;
        let offset = 0;
        reader.onloadend = (e: ProgressEvent & { target: { readyState: number } } & { target: { result: string } }) => {
            if (e.target.readyState === FileReader.DONE) {
                const chunk = e.target.result;
                this._chunkDatas.push(chunk);

                progress = (offset / fileSize) * 100;

                if (offset < fileSize) {
                    offset += this._sliceSize;
                    const blob = this._file.slice(offset, offset + this._sliceSize);
                    reader.readAsText(blob);
                } else {
                    progress = 100;

                    console.log(`Read file complete ! chunk length: ${this._chunkDatas.length}`);

                    if (this.onCompleted) {
                        this.onCompleted(this._chunkDatas);
                    }
                };

                if (this.onProgressChanged)
                    this.onProgressChanged(progress);
            }
        };

        if (this.onProgressChanged)
            this.onProgressChanged(progress);

        const blob = this._file.slice(offset, offset + this._sliceSize);
        reader.readAsText(blob);
    };
};

class WebFileWriter {
    static writeFile(fileName:string, textContent:string) {
        const blob = new Blob([textContent], { type: "text/plain" });
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            const doc = window.document;
            const elem = doc.createElement("a");
            elem.href = window.URL.createObjectURL(blob);
            elem.download = fileName;

            doc.body.appendChild(elem);
            elem.click();   // click the <a/> element to fire the download action
            doc.body.removeChild(elem);
        };
    };
};

export { WebFileReader, WebFileWriter };

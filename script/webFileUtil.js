define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WebFileReader = /** @class */ (function () {
        function WebFileReader(file, sliceSize) {
            if (sliceSize === void 0) { sliceSize = 4096; }
            this._chunkDatas = []; // buffer to store reading data
            this._file = file;
            this._sliceSize = sliceSize;
        }
        WebFileReader.prototype.startReading = function () {
            var _this = this;
            if (!this._file)
                return;
            this._chunkDatas = [];
            var reader = new FileReader();
            var fileSize = this._file.size;
            var progress = 0;
            var offset = 0;
            reader.onloadend = function (e) {
                if (e.target.readyState === FileReader.DONE) {
                    var chunk = e.target.result;
                    _this._chunkDatas.push(chunk);
                    progress = (offset / fileSize) * 100;
                    if (offset < fileSize) {
                        offset += _this._sliceSize;
                        var blob_1 = _this._file.slice(offset, offset + _this._sliceSize);
                        reader.readAsText(blob_1);
                    }
                    else {
                        progress = 100;
                        console.log("Read file complete ! chunk length: " + _this._chunkDatas.length);
                        if (_this.onCompleted) {
                            _this.onCompleted(_this._chunkDatas);
                        }
                    }
                    ;
                    if (_this.onProgressChanged)
                        _this.onProgressChanged(progress);
                }
            };
            if (this.onProgressChanged)
                this.onProgressChanged(progress);
            var blob = this._file.slice(offset, offset + this._sliceSize);
            reader.readAsText(blob);
        };
        ;
        return WebFileReader;
    }());
    exports.WebFileReader = WebFileReader;
    ;
    var WebFileWriter = /** @class */ (function () {
        function WebFileWriter() {
        }
        WebFileWriter.writeFile = function (fileName, textContent) {
            var blob = new Blob([textContent], { type: "text/plain" });
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(blob, fileName);
            }
            else {
                var doc = window.document;
                var elem = doc.createElement("a");
                elem.href = window.URL.createObjectURL(blob);
                elem.download = fileName;
                doc.body.appendChild(elem);
                elem.click(); // click the <a/> element to fire the download action
                doc.body.removeChild(elem);
            }
            ;
        };
        ;
        return WebFileWriter;
    }());
    exports.WebFileWriter = WebFileWriter;
    ;
});
//# sourceMappingURL=webFileUtil.js.map
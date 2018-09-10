/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
<<<<<<< HEAD
define(["require", "exports", "./person", "./webFileUtil"], function (require, exports, person_1, webFileUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //
    // Global variable
    //
    var clickCount = 0;
    //
    // Global function
    //
=======
define(["require", "exports", "./person"], function (require, exports, person_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var clickCount = 0;
>>>>>>> acff4e75929657775e1af9eb5ad21212556bac01
    function startup() {
        $("#buttonTest").click(function () {
            clickCount++;
            $("#h2Result").html("App start up. You have clicked " + clickCount + " times.");
<<<<<<< HEAD
            var person = new person_1.Person("Jack"); // class import from external typescript module
=======
            var person = new person_1.Person("Jack");
>>>>>>> acff4e75929657775e1af9eb5ad21212556bac01
            var greeting = person.sayHello(clickCount);
            $("#h3Greeting").html(greeting);
        });
    }
    exports.startup = startup;
<<<<<<< HEAD
    //
    // Initial elements
    //
    $("#inputHiddenFileElem").change(function () {
        var file = $("#inputHiddenFileElem").prop("files")[0];
        var result = (!file) ? "No file selected." : file.name;
        $("#divSelectedFileName").html(result);
    });
    $("#btnFileSelect").click(function () {
        $("#inputHiddenFileElem").click();
    });
    //
    // Read file
    //
    var fileData = []; // global string array for data exchange
    $("#btnReadFile").click(function () {
        var file = $("#inputHiddenFileElem").prop("files")[0];
        if (!file)
            return;
        var reader = new webFileUtil_1.WebFileReader(file);
        reader.onProgressChanged = function (progress) {
            $("#progressBar").attr("style", "width: " + progress + "%").attr("aria-valuenow", progress);
            $("#divProgressNumber").html(progress + "%");
        };
        reader.onCompleted = function (_fileData) {
            fileData = _fileData;
        };
        reader.startReading();
    });
    //
    // Write file
    //
    $("#btnWriteFile").click(function () {
        if (fileData.length <= 0)
            return;
        var updateProgress2 = function (progress) {
            $("#progressBar2").attr("style", "width: " + progress + "%")
                .attr("aria-valuenow", progress);
            $("#divProgressNumber2").html(progress + "%");
        };
        var textContent = fileData.join("");
        updateProgress2("50");
        var fileName = "resultFile.txt";
        webFileUtil_1.WebFileWriter.writeFile(fileName, textContent);
        updateProgress2("100");
=======
    $("#fileElem").change(function () {
        var file = $("#fileElem").prop("files")[0];
        var result = (!file) ? "No file selected." : file.name;
        $("#selectedFileName").html(result);
    });
    $("#fileSelect").click(function () {
        $("#fileElem").click();
    });
    var updateProgress = function (progress) {
        $("#progressBar").attr("style", "width: " + progress + "%")
            .attr("aria-valuenow", progress);
        $("#divProgressNumber").html(progress + "%");
    };
    var FileData = [];
    $("#btnReadFile").click(function () {
        var file = $("#fileElem").prop("files")[0];
        if (!file)
            return;
        var reader = new FileReader();
        var fileSize = file.size;
        var sliceSize = 4096;
        var chunks = [];
        var progress = "0";
        var offset = 0;
        reader.onloadend = function (e) {
            if (e.target.readyState === FileReader.DONE) {
                var chunk = e.target.result;
                chunks.push(chunk);
                progress = ((offset / fileSize) * 100).toFixed(0);
                if (offset < fileSize) {
                    offset += sliceSize;
                    var blob_1 = file.slice(offset, offset + sliceSize);
                    reader.readAsText(blob_1);
                }
                else {
                    progress = "100";
                    console.log("Read file complete ! chunk length: " + chunks.length);
                    //console.log(chunks[0]);
                    FileData = chunks;
                }
                ;
                updateProgress(progress);
            }
        };
        updateProgress(progress);
        var blob = file.slice(offset, offset + sliceSize);
        reader.readAsText(blob);
>>>>>>> acff4e75929657775e1af9eb5ad21212556bac01
    });
});
//# sourceMappingURL=main.js.map
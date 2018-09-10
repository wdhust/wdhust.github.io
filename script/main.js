/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
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
    function startup() {
        $("#buttonTest").click(function () {
            clickCount++;
            $("#h2Result").html("App start up. You have clicked " + clickCount + " times.");
            var person = new person_1.Person("Jack"); // class import from external typescript module
            var greeting = person.sayHello(clickCount);
            $("#h3Greeting").html(greeting);
        });
    }
    exports.startup = startup;
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
    });
});
//# sourceMappingURL=main.js.map
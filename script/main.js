/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
define(["require", "exports", "./person"], function (require, exports, person_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var clickCount = 0;
    function startup() {
        $("#buttonTest").click(function () {
            clickCount++;
            $("#h2Result").html("App start up. You have clicked " + clickCount + " times.");
            var person = new person_1.Person("Jack");
            var greeting = person.sayHello(clickCount);
            $("#h3Greeting").html(greeting);
        });
    }
    exports.startup = startup;
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
    });
});
//# sourceMappingURL=main.js.map
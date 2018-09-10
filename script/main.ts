/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

import { Person } from "./person";
import { WebFileReader, WebFileWriter } from "./webFileUtil";

//
// Global variable
//
let clickCount = 0;

//
// Global function
//
function startup() {
    $("#buttonTest").click(() => {
        clickCount++;
        $("#h2Result").html(`App start up. You have clicked ${clickCount} times.`);

        const person = new Person("Jack");      // class import from external typescript module
        var greeting = person.sayHello(clickCount);
        $("#h3Greeting").html(greeting);
    });
}

//
// Initial elements
//
$("#inputHiddenFileElem").change(() => {
    const file = $("#inputHiddenFileElem").prop("files")[0];
    const result = (!file) ? "No file selected." : file.name;
    $("#divSelectedFileName").html(result);
});
$("#btnFileSelect").click(() => {
    $("#inputHiddenFileElem").click();
});

//
// Read file
//
let fileData:string[] = [];     // global string array for data exchange

$("#btnReadFile").click(() => {
    const file = $("#inputHiddenFileElem").prop("files")[0];
    if (!file)
        return;

    const reader = new WebFileReader(file);
    reader.onProgressChanged = (progress: number) => {
        $("#progressBar").attr("style", `width: ${progress}%`).attr("aria-valuenow", progress);
        $("#divProgressNumber").html(`${progress}%`);
    };
    reader.onCompleted = (_fileData) => {
        fileData = _fileData;
    };
    reader.startReading();
});

//
// Write file
//
$("#btnWriteFile").click(() => {
    if (fileData.length <= 0)
        return;

    const updateProgress2 = (progress) => {
        $("#progressBar2").attr("style", `width: ${progress}%`)
            .attr("aria-valuenow", progress);
        $("#divProgressNumber2").html(`${progress}%`);
    };

    const textContent = fileData.join("");
    updateProgress2("50");

    const fileName = "resultFile.txt";
    WebFileWriter.writeFile(fileName, textContent);

    updateProgress2("100");
});

export {startup};

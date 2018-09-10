/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

import { Person } from "./person";
<<<<<<< HEAD
import { WebFileReader, WebFileWriter } from "./webFileUtil";

//
// Global variable
//
let clickCount = 0;

//
// Global function
//
=======

let clickCount = 0;

>>>>>>> acff4e75929657775e1af9eb5ad21212556bac01
function startup() {
    $("#buttonTest").click(() => {
        clickCount++;
        $("#h2Result").html(`App start up. You have clicked ${clickCount} times.`);

<<<<<<< HEAD
        const person = new Person("Jack");      // class import from external typescript module
=======
        const person = new Person("Jack");
>>>>>>> acff4e75929657775e1af9eb5ad21212556bac01
        var greeting = person.sayHello(clickCount);
        $("#h3Greeting").html(greeting);
    });
}

<<<<<<< HEAD
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
=======
$("#fileElem").change(() => {
    const file = $("#fileElem").prop("files")[0];
    const result = (!file) ? "No file selected." : file.name;
    $("#selectedFileName").html(result);
});
$("#fileSelect").click(() => {
    $("#fileElem").click();
});


const updateProgress = (progress) => {
    $("#progressBar").attr("style", `width: ${progress}%`)
        .attr("aria-valuenow", progress);
    $("#divProgressNumber").html(`${progress}%`);
}

let FileData:string[] = [];

$("#btnReadFile").click(() => {
    const file = $("#fileElem").prop("files")[0];
    if (!file)
        return;

    const reader = new FileReader();
    const fileSize = file.size;
    const sliceSize = 4096;
    const chunks:string[] = [];

    let progress = "0";
    let offset = 0;
    reader.onloadend = (e: ProgressEvent & { target: { readyState: number } } & { target: { result: string } }) => {
        if (e.target.readyState === FileReader.DONE) {
            const chunk = e.target.result;
            chunks.push(chunk);

            progress = ((offset / fileSize) * 100).toFixed(0);

            if (offset < fileSize) {
                offset += sliceSize;
                const blob = file.slice(offset, offset + sliceSize);
                reader.readAsText(blob);
            } else {
                progress = "100";

                console.log(`Read file complete ! chunk length: ${chunks.length}`);
                //console.log(chunks[0]);
                FileData = chunks;
            };

            updateProgress(progress);
        }
    };

    updateProgress(progress);

    const blob = file.slice(offset, offset + sliceSize);
    reader.readAsText(blob);
>>>>>>> acff4e75929657775e1af9eb5ad21212556bac01
});

export {startup};

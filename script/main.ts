/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

import { Person } from "./person";

let clickCount = 0;

function startup() {
    $("#buttonTest").click(() => {
        clickCount++;
        $("#h2Result").html(`App start up. You have clicked ${clickCount} times.`);

        const person = new Person("Jack");
        var greeting = person.sayHello(clickCount);
        $("#h3Greeting").html(greeting);
    });
}

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
});

export {startup};

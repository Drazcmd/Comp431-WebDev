/**
See both https://developer.mozilla.org/en-US/docs/Web/API/File and
https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications 

This function takes in the resolve of a promise function, and calls it
when the image is loaded (since loading is asych)
*/
export const loadImageBytestream = ((fileObj, resolver, rejecter) => {
    let fileBytestream;
    const fileWrapper = {file: fileObj};

    //"Esatblish[es] the FileReader to handle asynchronously loading the
    //image" and setting fileBystream equal to the imgae's bytestream
    var reader = new FileReader();
    reader.addEventListener('loadend', ((e) => { 
        console.log('load ended')
        console.log("reader.result length in loadend", reader.result.length)
        fileBytestream = e.target.result
        console.log('e.target.result length in loadend', fileBytestream.length)
        resolver(fileBytestream)
    }));
    console.log('really begining load...')
    reader.readAsDataURL(fileObj);
    return
})

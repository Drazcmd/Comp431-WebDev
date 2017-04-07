/**
See both https://developer.mozilla.org/en-US/docs/Web/API/File and
https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications 

This function takes in the resolve of a promise function, and calls it
when the image is loaded (since loading is asych)
*/
export const loadImageBytestream = ((fileObj, resolver, rejecter) => {
    const fileWrapper = {file: fileObj};

    //"Esatblish[es] the FileReader to handle asynchronously loading the
    //image" and mutate the file object ot have the bytestream inside it
    var reader = new FileReader();
    reader.addEventListener('loadend', ((e) => { 
        resolver(fileObj)
    }));
    reader.readAsDataURL(fileObj);
    return
})

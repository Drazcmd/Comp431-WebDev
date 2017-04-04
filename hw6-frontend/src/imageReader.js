/**
See both https://developer.mozilla.org/en-US/docs/Web/API/File and
https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications 
*/
export const readImageBytestream = ((fileObj) => {
    let fileBytestream;
    const fileWrapper = {file: fileObj}
    //"Esatblish[es] the FileReader to handle asynchronously loading the
    //image" and setting fileBystream equal to the imgae's bytestream
    var reader = new FileReader();
    reader.onload = ((img) => { 
        return (evt) => { fileBytestream = evt.target.result }
    })(fileWrapper);
    reader.readAsDataURL(fileObj);
    console.log('rader, wrapper', reader, fileWrapper)
    console.log('file byestream:', fileBytestream)
    console.log('reader.result', reader.result)
    return fileBytestream
})

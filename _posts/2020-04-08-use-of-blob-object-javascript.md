---
layout: post
title: What's the use of Blob object in JavaScript?
image: /cdn/blob-object-javascript.png
categories: [JavaScript]
---

I was working on polishing my [Notepad](https://notepad.js.org/) app this fine quarantine afternoon. One feature that I was planning to add was an ability to download the content of the notes/text as a text file when user click the specified download button.

Just to give you a gist about this Notepad app, it basically uses a Textarea which acts as a writing pad to the user. Once the user types in the textarea, it gets saved it the LocalStorage so that it can be accesible next time when user comes back to the application.

Now, as I said earlier, I wanted to add an ability to download those Textarea content as a plain text file. And I wanted to do this just using JavaScript as the application doesn't have a backend.

So, I looked up to the holy internet and found [this handy little function](https://stackoverflow.com/a/19332584/1485183) which magically allows me to do what I wanted to do. This is how the function looks like.

```js
function saveTextAsFile(textToWrite, fileNameToSaveAs)
{
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";

	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	} else {
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}
```

And the function can be assigned to the `onclick` event of the link like so.

```html
<a onclick="saveTextAsFile(note.value,'download.txt')">
    Download File
</a>
```

Let's breakdown the `saveTextAsFile` function bit-by-bit.

The function is quite simple if you look it closely. It accepts two parameters: 

- `textToWrite` - The Textarea content that we want to save as a file
- `fileNameToSaveAs` - The name using which we want to save the file

Now comes the interesting part. The function is using the [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object.

From the official [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Blob),

> The `Blob` object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a `ReadableStream`     so its methods can be used for processing the data.
>
> Blobs can represent data that isn't necessarily in a JavaScript-native format. The `File` interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.

The primary function of the `Blob` is to create file-like object of the textarea content which can then be used to download as file because we can't use the text alone to generate a file.

The `Blob` object's constructor accepts two parameters.

- `blobPart` - From which the blob is going to be created
- `blobType` - The type of file used to create from the blob

In our case, `blobPart` is textarea content (passed as an array object) and `blobType` is `text/plain` type because we want to download a plain text file.

```js
var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
```

The next three lines in the function is used to create a virtual hyperlink which will have URL created from the blob object that we've created previously using this piece of code.

```js
downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
```

Basically, [createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) of the `URL` interface creates a `DOMString` containing a URL representing the object given in the parameter. The URL lifetime is tied to the `document` in the window on which it was created. The new object URL represents the specified `File` object or `Blob` object. The URL is downloadable by the browser.

In our case, we've provided the `textFileAsBlob` to the `createObjectURL()` method which creates a URL for the target file and assigned to the virtual link's `href` attribute.

It's almost done!

All we need to do it _click_ the generated link using `downloadLink.click()` and bam! we've nice text file for the textarea downloaded to our system!

You can see this feature in action here at [Notepad](https://notepad.js.org/).

## In Closing

Phew... That was long! I hope you'll like the article as much as I loved writing it. If you've any questions related to anything, please leave a comment below.

Until next time!


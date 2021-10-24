---
layout: post
title: How vscode.dev Interacts With User's Local Filesystem?
image: /cdn/how-vscode-dev-interacts-with-user-local-filesystem.png
categories: [VS Code]
fluidbox: true
---

The recently launched [https://vscode.dev](https://vscode.dev) by GitHub last week was all the buzz and talk of the town. People got crazy about it because now you're getting a full-fledged [VS Code](https://code.visualstudio.com/) right into your browser. And because of this, you don't need to install VS Code on your system anymore.

One of the talking points of this browser-based VS Code is, it's possible to open local directories, interact, and modify files and folders through it, which was not possible before unless it's a desktop application where you access the system-wide file system.

So, how on earth [vscode.dev](https://vscode.dev) can do this even if it's a web app? I dig through it and here's what I found.

* TOC*
{:toc}

## The File System Access API

After a little digging, I found that the [vscode.dev](https://vscode.dev) uses the [File System Access API](https://caniuse.com/native-filesystem-api) under the hood, to interact with files on a user's local device.

The core functionality of this API includes reading files, writing or saving files, and access to the directory structure. And that's all what [vscode.dev](https://vscode.dev) do as well.

So, this API includes a parent class [FileSystemHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle), which has two child classes, [FileSystemFileHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle) and [FileSystemDirectoryHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle), to handle files and directories respectively.

I'm not going to deep-dive into how these API works. I'll link the whole API's [documentation](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) that you can look upon if you want. 

But what I'll do is I can give you an overview of how it can be used in some of the use-cases

### Open Files or Directories

For instance, if you want to open a file or a directory, this is how you can do it.

```js
// store a reference to our file handle
let fileHandle;

async function getFile() {
  // open file picker
  [fileHandle] = await window.showOpenFilePicker();

  if (fileHandle.kind === 'file') {
    // run file code
  } else if (fileHandle.kind === 'directory') {
    // run directory code
  }

}
```

As you can tell, the `showOpenFilePicker()` function would give us the handle for the selected file or directory. And through this handle, it's possible to know whether it's a directory or a file and do the further manipulation accordingly.

### Saving Files

Now, to write to the files, the following `saveFile()` function can be used, for instance, that can open the save file picker, which returns a [FileSystemFileHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle) once a file is selected. A writable stream is then created using the [FileSystemFileHandle.createWritable()](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle/createWritable) method. 

```js
async function saveFile() {

  // create a new handle
  const newHandle = await window.showSaveFilePicker();

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write(imgBlob);

  // close the file and write the contents to disk.
  await writableStream.close();
}
```

A user-defined [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) is then written to the stream which is subsequently closed.

And that's how vscode.dev can interact with the local filesystem.

## Limitations

While [vscode.dev](https://vscode.dev) is great since now you're able to work with your local project using it, there are some limitations that it directly inherits from the File System Access API.

Since the File System Access API is [not supported by all the modern browsers](https://caniuse.com/native-filesystem-api), for instance, Mozzila Firefox or Safari, you won't be able to use [vscode.dev](https://vscode.dev) effectively at these places.

So, when you try to open [vscode.dev](https://vscode.dev) on Firefox, it will throw an error popup that says **"Local File System Access is Unsupported"**.

[![](/images/vscode-dev-firefox.png)](/images/vscode-dev-firefox.png)

For this reason, you're stuck on using it on Chromiun-based browsers only for the time being!
import { Folder } from 'types';

// Please update this type as same as with the data shape.
type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  // Validate input
  const isSourceAFolder = list.some((folder) => folder.id === source);
  const isDestinationAFile = list.some((folder) =>
    folder.files.some((file) => file.id === destination),
  );

  if (isSourceAFolder) throw new Error('You cannot move a folder');
  if (isDestinationAFile) throw new Error('You cannot specify a file as the destination');

  // find the folder index where we are gonna move the file to
  const destinationIndex = list.findIndex((folder) => folder.id === destination);
  let tempFile;

  const newList = list.map((folder, index) => {
    if (index !== destinationIndex) {
      // remove the file from old folder
      const newFiles = folder.files.filter((file) => {
        if (file.id === source) {
          tempFile = file;
        }
        return file.id !== source;
      });
      // return a new folder with a new files array that doesnt have the removed file
      return { ...folder, files: newFiles };
    }
    return folder;
  });

  if (tempFile) {
    // since we have a new folders array, and we removed the file from the sourceFolder,
    // and we have the folder dest index
    newList[destinationIndex].files = newList[destinationIndex].files.concat(tempFile);
  }

  return newList;
}

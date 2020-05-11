import React from 'react';

const FileListItem = ({fileName, key}) => {
  console.log(fileName)

  return (
    <div>
      <p>{fileName}</p>
    </div>
  )
}

export  default FileListItem;
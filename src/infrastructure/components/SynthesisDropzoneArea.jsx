import React, {useMemo, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import uploadImg from "../../assets/img/upload-img.png";
import { Box } from "@mui/material";
import "./SynthesisDrop.css"

const baseStyle = {
  flex: 1,
  width: '535px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#ddd',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#000',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  height: '385px',
  justifyContent: 'space-evenly'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export const SynthesisDropzoneArea = (props) => {

  const onDrop = useCallback(acceptedFiles => {
    props.handleChange(acceptedFiles);
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {'application/pdf': []},
    onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <Box component="img" alt="image" src={uploadImg}/>
        <b>Drag and drop PDF or Text files or click to select files</b>
        <span className="Limit-200MB-per-file">Limit 200MB per file</span>
      </div>
    </div>
  );
}
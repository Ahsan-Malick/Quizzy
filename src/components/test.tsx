import React, { useState } from 'react';
import axios from 'axios';

const PdfUploader: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [quiz, setQuiz] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      setUploadStatus('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/gen`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    //   setQuiz(response.data);
      setUploadStatus('File uploaded successfully!');
    } catch (error) {
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="pdf-uploader">
      <h2>Upload PDF File</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default PdfUploader;

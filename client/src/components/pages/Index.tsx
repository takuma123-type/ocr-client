import React, { useState } from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import Header from '../organisms/Header';

const Index: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      console.log('ファイルが選択されました:', selectedFile);
    }
  };


  return (
    <>
      <Header />

      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            画像アップロード
          </Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              画像を選択
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body1">{selectedFile.name}</Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadClick}
            disabled={!selectedFile}
          >
            アップロード
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Index;

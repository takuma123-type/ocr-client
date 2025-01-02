import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Grid,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Header from "../organisms/Header";
import { ProcessImageUsecase } from "../../usecases/OcrUsecase";
import { ProcessImageItem } from "../../models/presentation/ProcessImageItem";
import { OcrRepository } from "../../infrastructure/repository/OcrRepository";

const Index: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<{
    storeName?: string;
    registrationNumber?: string;
    phoneNumber?: string;
    address?: string;
    date?: string;
    amount?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // プレビュー用URLを作成
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      setIsLoading(true); // 読み込み中を表示
      try {
        const ocrRepository = new OcrRepository();
        const processImageUsecase = new ProcessImageUsecase(ocrRepository);

        // 入力作成
        const input = new ProcessImageItem({ file: selectedFile });

        // ユースケースの実行
        const output = await processImageUsecase.process(input);

        // 結果を表示
        setOcrResult({
          storeName: output.storeName,
          registrationNumber: output.registrationNumber,
          phoneNumber: output.phoneNumber,
          address: output.address,
          date: output.date,
          amount: output.amount,
        });
      } catch (error) {
        console.error("画像処理中にエラーが発生しました:", error);
        setOcrResult(null);
      } finally {
        setIsLoading(false); // 読み込み終了
      }
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-file">
            <Button variant="contained" component="span">
              画像を選択
            </Button>
          </label>
          {selectedFile && (
            <>
              <Typography variant="body2">
                選択されたファイル: {selectedFile.name}
              </Typography>
              {imagePreview && (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="選択した画像"
                  sx={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    marginTop: "1rem",
                    borderRadius: "8px",
                  }}
                />
              )}
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadClick}
            disabled={!selectedFile || isLoading}
          >
            アップロード
          </Button>
          {ocrResult && (
            <Card style={{ marginTop: "2rem", padding: "1rem" }}>
              <Typography variant="h6" gutterBottom>
                結果
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="店舗名"
                    fullWidth
                    value={ocrResult.storeName || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="登録番号"
                    fullWidth
                    value={ocrResult.registrationNumber || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="電話番号"
                    fullWidth
                    value={ocrResult.phoneNumber || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="住所"
                    fullWidth
                    value={ocrResult.address || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="日付"
                    fullWidth
                    value={ocrResult.date || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="合計金額"
                    fullWidth
                    value={ocrResult.amount || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Card>
          )}
        </Box>
      </Container>

      {/* 読み込み中のバックドロップ */}
      <Backdrop
        open={isLoading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Index;

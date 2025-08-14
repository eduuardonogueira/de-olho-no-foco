import styles from "./file.module.scss";
import { InboxOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Image, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

const { Dragger } = Upload;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface IFileProps {
  fileProps?: UploadProps;
}

export const File = ({ fileProps }: IFileProps) => {
  const [previewImage, setPreviewImage] = useState("");

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error("O arquivo não é um Blob ou File válido."));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const props: UploadProps = {
    ...fileProps,
    name: "file",
    multiple: true,
    accept: "image/*",
    onDrop(e) {
      console.log("Arquivos soltos:", e.dataTransfer.files);
    },
    onPreview: async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }

      setPreviewImage(file.url || (file.preview as string));
    },
  };

  return (
    <>
      <Dragger
        {...props}
        capture="user"
        listType="picture-card"
        className={styles.dragger}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Clique ou arraste o arquivo para essa área
        </p>
        <p className="ant-upload-hint">
          Suporte para upload único ou em massa. É estritamente proibido enviar
          dados da empresa ou outros arquivos proibidos.
        </p>
      </Dragger>
      {previewImage && (
        <Image
          preview={{
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

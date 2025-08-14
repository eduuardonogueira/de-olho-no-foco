import styles from "./reportImage.module.scss";
import { File } from "@components/index";
import { CreatePoint } from "@customtypes/map";
import { UploadProps } from "antd";

interface IReportImageProps {
  handleAddReportImage: (file: File) => void;
  handleRemoveReportImage: (files: File[]) => void;
  newReportPoint: CreatePoint;
}

export const ReportImage = ({
  handleAddReportImage,
  handleRemoveReportImage,
  newReportPoint,
}: IReportImageProps) => {
  const fileProps: UploadProps = {
    onRemove(file) {
      const prevImages = newReportPoint.images?.filter(
        (img) => img.uid !== file.uid
      );

      if (prevImages) handleRemoveReportImage(prevImages);
    },
    beforeUpload(file) {
      handleAddReportImage(file);
      return false;
    },
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Evidências</h2>
      <File fileProps={fileProps} />
    </section>
  );
};

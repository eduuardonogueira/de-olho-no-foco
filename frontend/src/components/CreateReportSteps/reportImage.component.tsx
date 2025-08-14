import styles from "./reportImage.module.scss";
import { File } from "@components/index";
import { ICreatePoint } from "@customtypes/map";
import { UploadProps } from "antd";
import { RcFile } from "antd/es/upload";

interface IReportImageProps {
  handleAddReportImage: (file: File) => void;
  handleRemoveReportImage: (files: File[]) => void;
  newReportPoint: ICreatePoint;
}

export const ReportImage = ({
  handleAddReportImage,
  handleRemoveReportImage,
  newReportPoint,
}: IReportImageProps) => {
  const fileProps: UploadProps = {
    onRemove(file) {
      const prevImages = newReportPoint.images?.filter(
        (img: RcFile) => img.uid !== file.uid
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

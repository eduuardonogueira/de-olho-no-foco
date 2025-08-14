import { useReports } from "@hooks/useReports";
import styles from "./reportsList.module.scss";
import cn from "classnames";
import { ICreatePoint, IListReport, Report } from "@customtypes/map";
import { useState } from "react";

interface IReportsListProps {
  newReportPoint: ICreatePoint | undefined;
  handleSelectReportType: (reportType: Report) => void;
}

export const ReportsList = ({
  newReportPoint,
  handleSelectReportType,
}: IReportsListProps) => {
  const { reports } = useReports();

  const [selectedReport, setSelectedReport] = useState<IListReport | null>();

  function handleClickReport(report: IListReport) {
    handleSelectReportType(report.type);
    setSelectedReport(report);
  }

  const reportSelected = (reportType: Report) =>
    reportType === newReportPoint?.type;

  return (
    <div className={styles.reportsContainer}>
      <h1 className={styles.reportTitle}>Qual o tipo da sua denúncia?</h1>
      <ul className={styles.reportList}>
        {reports.map((report) => (
          <li
            key={report.label}
            className={cn(
              {
                [styles.reportWrapper__selected]: reportSelected(report.type),
              },
              styles.reportWrapper
            )}
            onClick={() => handleClickReport(report)}
          >
            <img
              src={report.image}
              alt={report.label}
              className={styles.reportImage}
            />
            <p className={styles.reportText}>{report.label}</p>
          </li>
        ))}
      </ul>
      {selectedReport ? (
        <section className={styles.reportDescriptionWrapper}>
          <h3 className={styles.reportDescriptionTitle}>
            {selectedReport.type}
          </h3>
          <p className={styles.reportDescriptionText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            quisquam magnam numquam ipsum? Possimus ipsa eveniet, unde nemo
            necessitatibus quaerat harum ipsum reprehenderit similique vero,
            excepturi modi voluptate quod autem.
          </p>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

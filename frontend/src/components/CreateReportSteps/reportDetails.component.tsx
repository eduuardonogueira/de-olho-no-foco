import { CreatePoint } from "@customtypes/map";
import styles from "./reportDetails.module.scss";
import { Checkbox, Form, Input, Tag } from "antd";

const { TextArea } = Input;

const customizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => (
  <>
    {required ? (
      <Tag color="error">Obrigatório</Tag>
    ) : (
      <Tag color="warning">Opcional</Tag>
    )}
    {label}
  </>
);

interface IReportDetailsProps {
  handleInputChange: (obj: string, value: string) => void;
  handleCheckboxChange: (value: boolean) => void;
  newReportPoint: CreatePoint;
}

export const ReportDetails = ({
  handleInputChange,
  handleCheckboxChange,
  newReportPoint,
}: IReportDetailsProps) => {
  const requiredMark = "customize";

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Detalhes</h2>
      <Form
        className={styles.formDetails}
        layout="vertical"
        initialValues={{ requiredMarkValue: requiredMark }}
        requiredMark={customizeRequiredMark}
      >
        <Form.Item layout="vertical" label="Título:" name="title" required>
          <Input
            placeholder="Título curto descrevendo o incidente"
            onChange={(e) => handleInputChange("title", e.target.value)}
            defaultValue={newReportPoint.title}
          />
        </Form.Item>
        <Form.Item layout="vertical" label="Descrição:" name="description">
          <TextArea
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Descrição detalhada do incidente, incluindo o que você observou, pontenciais causas, e impactos causados..."
            autoSize={{ minRows: 3, maxRows: 5 }}
            defaultValue={newReportPoint.description}
          />
        </Form.Item>
        <Form.Item
          layout="horizontal"
          label="Anônimo"
          name="isAnonymous"
          valuePropName="checked"
          className={styles.checkbox}
          tooltip="Se marcado irá ocultar seus dados da denúncia"
        >
          <Checkbox
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            defaultChecked={newReportPoint.isAnonymous}
          />
        </Form.Item>
      </Form>
    </section>
  );
};

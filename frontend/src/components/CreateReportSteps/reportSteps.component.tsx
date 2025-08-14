import {
  AppSteps,
  ReportsList,
  ReportImage,
  ReportDetails,
} from "@components/index";
import { CreatePoint, ISteps, Report } from "@customtypes/index";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AlertContext, CurrentLocationContext } from "@contexts/index";
import { useLocalStorage, useApi } from "@hooks/index";
import { RcFile } from "antd/es/upload";

interface IReportStepsProps {
  closeModal: () => void;
}

export const ReportSteps = ({ closeModal }: IReportStepsProps) => {
  const { updateLocalPoints } = useLocalStorage();
  const { createPoint } = useApi();

  const { lat, lng } = useContext(CurrentLocationContext);
  const { setAlert } = useContext(AlertContext);

  const [newReportPoint, setNewReportPoint] = useState<CreatePoint>();

  const handleSelectReportType = useCallback(
    (reportType: Report) => {
      setNewReportPoint({
        type: reportType,
        position: "left",
        coordinates: { lat, lng },
        images: [],
        title: "",
      });
    },
    [lat, lng, setNewReportPoint]
  );

  const handleAddReportImage = useCallback(
    (file: RcFile) =>
      setNewReportPoint((prev) =>
        prev ? { ...prev, images: [...(prev.images || []), file] } : prev
      ),
    [setNewReportPoint]
  );

  const handleRemoveReportImage = useCallback(
    (files: RcFile[]) =>
      setNewReportPoint((prev) => (prev ? { ...prev, images: files } : prev)),
    [setNewReportPoint]
  );

  const handleInputChange = useCallback(
    (obj: string, value: string) =>
      setNewReportPoint((prev) => (prev ? { ...prev, [obj]: value } : prev)),
    [setNewReportPoint]
  );

  const handleCheckboxChange = useCallback(
    (value: boolean) => {
      setNewReportPoint((prev) =>
        prev ? { ...prev, isAnonymous: value } : prev
      );
    },
    [setNewReportPoint]
  );

  const steps = useMemo<ISteps[]>(
    () => [
      {
        title: "Classificação",
        content: ReportsList,
        validationFunction: () => newReportPoint?.type !== undefined,
        validMessage: "Selecione um tipo de denúncia!",
        contentProps: { newReportPoint, handleSelectReportType },
      },
      {
        title: "Imagem",
        content: ReportImage,
        contentProps: {
          handleAddReportImage,
          handleRemoveReportImage,
          newReportPoint,
        },
      },
      {
        title: "Detalhes",
        validationFunction: () => (newReportPoint?.title ? true : false),
        validMessage: "Preencha todos os campos obrigatórios!",
        content: ReportDetails,
        contentProps: {
          handleInputChange,
          handleCheckboxChange,
          newReportPoint,
        },
      },
    ],
    [
      newReportPoint,
      handleSelectReportType,
      handleAddReportImage,
      handleRemoveReportImage,
      handleInputChange,
      handleCheckboxChange,
    ]
  );

  async function handleFormSubmit() {
    if (newReportPoint) {
      try {
        const response = await createPoint(newReportPoint);

        if (response.status === 201) {
          updateLocalPoints("lastPoints", response.data);
          setAlert({
            message: "Sucesso!",
            description: "Denúncia criada com sucesso!",
            isOpen: true,
          });
        } else {
          setAlert({
            message: "Erro!",
            description: "Erro ao criar denúncia!",
            isOpen: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    closeModal();
  }

  useEffect(() => {
    console.log("newReportPoint mudou:", newReportPoint);
  }, [newReportPoint]);

  return <AppSteps steps={steps} handleStepFinished={handleFormSubmit} />;
};

export default ReportSteps;

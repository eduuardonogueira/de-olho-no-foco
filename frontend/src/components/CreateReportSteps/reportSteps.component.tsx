import {
  AppSteps,
  ReportsList,
  ReportImage,
  ReportDetails,
} from "@components/index";
import { ICreatePoint, ISteps, Report } from "@customtypes/index";
import { useCallback, useContext, useMemo, useState } from "react";
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

  const [newReportPoint, setNewReportPoint] = useState<ICreatePoint>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setNewReportPoint((prev: ICreatePoint | undefined) =>
        prev ? { ...prev, images: [...(prev.images || []), file] } : prev
      ),
    [setNewReportPoint]
  );

  const handleRemoveReportImage = useCallback(
    (files: RcFile[]) =>
      setNewReportPoint((prev: ICreatePoint | undefined) =>
        prev ? { ...prev, images: files } : prev
      ),
    [setNewReportPoint]
  );

  const handleInputChange = useCallback(
    (obj: string, value: string) =>
      setNewReportPoint((prev: ICreatePoint | undefined) =>
        prev ? { ...prev, [obj]: value } : prev
      ),
    [setNewReportPoint]
  );

  const handleCheckboxChange = useCallback(
    (value: boolean) => {
      setNewReportPoint((prev: ICreatePoint | undefined) =>
        prev ? { ...prev, isAnonymous: value } : prev
      );
    },
    [setNewReportPoint]
  );

  async function handleFormSubmit() {
    if (!newReportPoint) {
      setAlert({
        message: "Erro!",
        description: "Dados da denúncia não foram preenchidos.",
        isOpen: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await createPoint(newReportPoint);

      if (response.status === 201) {
        updateLocalPoints("lastPoints", response.data);
        setAlert({
          message: "Sucesso!",
          description: "Denúncia criada com sucesso!",
          isOpen: true,
        });
        closeModal();
      } else {
        setAlert({
          message: "Erro!",
          description: `Erro ao criar denúncia! (código ${response.status})`,
          isOpen: true,
        });
      }
    } catch (error) {
      console.error("Erro ao enviar denúncia: ", error);
      setAlert({
        message: "Erro!",
        description: "Ocorreu um erro inesperado ao criar a denúncia.",
        isOpen: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

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

  return (
    <AppSteps
      steps={steps}
      handleStepFinished={handleFormSubmit}
      isLoading={isLoading}
    />
  );
};

export default ReportSteps;

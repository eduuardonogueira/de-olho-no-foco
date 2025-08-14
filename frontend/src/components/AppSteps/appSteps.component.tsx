import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import { ISteps } from "@customtypes/index";

interface IAppStepsProps {
  steps: ISteps[];
  handleStepFinished: () => void;
}

export const AppSteps = ({ steps, handleStepFinished }: IAppStepsProps) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const stepIsValid = () => {
    const { validationFunction, validMessage } = steps[current];
    const isValid = validationFunction ? validationFunction() : true;
    return { isValid, validMessage };
  };

  const next = () => {
    const { isValid, validMessage } = stepIsValid();

    if (isValid) {
      setCurrent(current + 1);
    } else {
      message.warning(validMessage || "Preencha os campos obrigatórios.");
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const finished = () => {
    const { isValid, validMessage } = stepIsValid();

    console.log(isValid, validMessage);

    if (isValid) {
      handleStepFinished();
    } else {
      message.warning(validMessage || "Preencha os campos obrigatórios.");
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  const { content: Content, contentProps } = steps[current];

  return (
    <>
      <Steps current={current} items={items} className="" />
      <div style={contentStyle}>
        <Content {...contentProps} />
      </div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Próximo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={finished}>
            Concluir
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Anterior
          </Button>
        )}
      </div>
    </>
  );
};

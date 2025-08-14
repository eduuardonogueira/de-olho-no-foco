export interface ISteps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: (props: any) => JSX.Element;
  contentProps?: object;
  validationFunction?: () => void;
  validMessage?: string;
}

import React, { ReactNode, ReactElement } from "react";
import "./App.css";

function Heading({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function HeadingWithContent({ children }: { children: ReactNode }): ReactElement {
  return <h1>{children}</h1>;
}

const defaultContainerProps = {
  heading: <strong>My heading</strong>,
};

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;
function Container({ heading, children }: ContainerProps): ReactElement {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

Container.defaultProps = defaultContainerProps;

function TextWithNumber({ header, children }: { header: (num: number) => ReactNode; children: (num: number) => ReactNode }) {
  const [state, stateSet] = React.useState<number>(1);

  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <div>{children(state)}</div>
      <div>
        <button onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  );
}

function List<ListItem>({ items, render }: { items: ListItem[]; render: (item: ListItem) => ReactNode }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <Heading title="Hello!"></Heading>
      <HeadingWithContent>
        <strong>Hi!</strong>
      </HeadingWithContent>
      <Container>Hey!</Container>
      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>{(num: number) => <div>Today's number is {num}</div>}</TextWithNumber>
      <List items={["One", "Two"]} render={(item: string) => <div>{item.toLowerCase()}</div>}></List>
    </div>
  );
}

export default App;

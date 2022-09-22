import { Component } from "./Component";

export function Page() {
  return (
    <Component>
      {({ test }) => (
        <>
          <h1>
            Using function of child in parent component without declaretion in
            parent
          </h1>
          {test()}
        </>
      )}
    </Component>
  );
}

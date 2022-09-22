interface argsProps {
  test: () => JSX.Element;
  test2?: boolean;
}

export function Component({
  children,
}: {
  children: (args: argsProps) => JSX.Element;
}) {
  function testFunction() {
    return (
      <>
        <h1>Testing function access in parent.</h1>
      </>
    );
  }
  return <>{children({ test: testFunction })}</>;
}

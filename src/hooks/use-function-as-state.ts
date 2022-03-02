import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useFunctionAsState = <T extends Function>(functionForInitialState: T | null): [
  T | null,
  React.Dispatch<React.SetStateAction<T>>,
] => {
  const [val, setVal] = React.useState<T | null>(() => functionForInitialState);

  const setFunc = React.useCallback((functionForUpdate) => {
    setVal(() => functionForUpdate);
  }, []);

  return [val, setFunc];
};

import * as C from '@chakra-ui/react';

import { createStandaloneToast, extendTheme } from '@chakra-ui/react';

const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
};

const extendedTheme = extendTheme(theme);

export function MainContainer() {
  const { ToastContainer } = createStandaloneToast({ theme: extendedTheme });

  return (
    <>
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <C.ChakraProvider theme={extendedTheme}>
      <MainContainer />
    </C.ChakraProvider>
  );
}

export default App;

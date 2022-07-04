import { useContext } from 'react';

import { ConfigContext } from 'contexts/config';

// ==============================|| CONFIG - HOOKS  ||============================== //

const useConfig = () => useContext(ConfigContext);

export default useConfig;

import { Dimensions } from 'react-native';


const window = Dimensions.get('window');
const isSmallDevice = window.width < 375;
const windowSize = {
  width: window.width,
  height: window.height
};


const layout = {
  windowSize: windowSize,
  isSmallDevice: isSmallDevice,
};

export default layout;
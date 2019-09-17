import { Platform } from 'react-native';

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-US');
}

export const { format: formatPrice } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

import { listen } from './app';
import Loaders from './loaders/index';

Loaders.start();
listen(3030, () => console.log('Server is Running...'));
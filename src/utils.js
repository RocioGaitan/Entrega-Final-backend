import {fileURLToPath} from 'url';
import { dirname } from 'path';
//se declara dirname para el package.json en el type module
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);



export default _dirname;
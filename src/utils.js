//solo para type module y para el tema de las rutas relativas

import  {fileURLToPath} from 'url'

import {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default __dirname;
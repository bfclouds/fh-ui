import LjButton from "./button"
import { version } from '../package.json'

const components = [
  LjButton
]

const install = (app, opts = {}) => {
  components.forEach(comp => {
    app.use(comp)
  })
}

export default {
  version
}
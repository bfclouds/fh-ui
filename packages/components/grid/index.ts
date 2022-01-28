import { withInstall, withNoopInstall } from '../../utils/with-install'
import Col from './src/Col.vue'
import Row from './src/Row.vue'

export const FhCol = withInstall(Row, { Col })
export const FhRow = withNoopInstall(Row)
export default FhCol

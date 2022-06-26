import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import jwtKoa from 'koa-jwt'
import cors from '@koa/cors'
import user from './router/user'
import sign from './router/sign'
import './dbHelper'
import responseFilter from './middleware/responseFilter'
import { jwtConfig } from "./config/index";

const app = new Koa()
app.use(cors())
app.use(bodyParser())

// app.use(jwtKoa({secret: jwtConfig}).unless({
//   path: [/^\/api\/login/] //数组中的路径不需要通过jwt验证
// }))

app.use(logger())

app.use(responseFilter())

app.use(sign.routes()).use(sign.allowedMethods())
app.use(user.routes()).use(user.allowedMethods())

export default app
import express, { json, urlencoded } from "express"
import HTTP_CODE from "http-status-codes"
import { useExpressServer } from "routing-controllers"

import { CONSTANT, NODE_ENV, SERVICE_PORT } from "../enum"
import { Logger } from "../utils/logger/logger.util"
import { generateRoutingControllerConfig } from "./rc.bootstrap"

export const start = async () => {
  // create express app
  const app = express()
  app.use(urlencoded({ extended: true }))
  app.use(json())

  // health check route
  app.get("/health", (_req, res) => {
    res.status(HTTP_CODE.OK).send(`welcome to ${CONSTANT.SERVICE_NAME} service`)
  })

  const config = generateRoutingControllerConfig()
  useExpressServer(app, config)

  // start express server
  app.listen(SERVICE_PORT, () =>
    Logger.info(`🚀 ${CONSTANT.SERVICE_NAME} service listening at ${SERVICE_PORT} in ${NODE_ENV} mode`)
  )
}

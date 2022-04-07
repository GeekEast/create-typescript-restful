import { RoutingControllersOptions } from "routing-controllers"

import { CONSTANT } from "../enum"
import { AuthGuard } from "../guards/auth.guard"
import { ErrorLogger } from "../utils/middlewares/error.logger"

export const generateRoutingControllerConfig = () => {
  const routingControllersOptions: RoutingControllersOptions = {
    routePrefix: CONSTANT.SERVICE_URL_SUFFIX,
    cors: false,
    validation: false,
    classTransformer: false,
    controllers: [],
    middlewares: [ErrorLogger],
    authorizationChecker: AuthGuard,
    development: true
  }

  return routingControllersOptions
}

import { RoutingControllersOptions } from "routing-controllers"

import { AuthGuard } from "../guards/auth.guard"
import { ErrorLogger } from "../utils/middlewares/error.logger"

export const generateRoutingControllerConfig = () => {
  const routingControllersOptions: RoutingControllersOptions = {
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

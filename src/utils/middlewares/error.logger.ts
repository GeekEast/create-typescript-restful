import safeStringify from "fast-safe-stringify"
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers"
import { Service } from "typedi"

import { Logger } from "../logger/logger.util"

@Middleware({ type: "after" })
@Service()
export class ErrorLogger implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: any, _req: unknown, _res: any, _next: (err?: unknown) => unknown) {
    Logger.error("======================= Global Middleware Error Boundary =====================")
    Logger.error(error?.name)
    Logger.error(error?.message)
    Logger.error(safeStringify(error?.errors))
    Logger.error(error)
    Logger.error("======================= Global Middleware Error Boundary =====================")
  }
}

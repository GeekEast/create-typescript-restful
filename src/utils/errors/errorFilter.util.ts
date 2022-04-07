import { InternalServerError } from "routing-controllers"

import { Logger } from "../logger/logger.util"

export const ErrorFilter = () => (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value
  descriptor.value = async function (...args: never[]) {
    try {
      return await originalMethod.apply(this, args)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Logger.error("======================= Local Error Boundary =====================")
      Logger.error(err?.name)
      Logger.error(err?.message)
      Logger.error(err?.errors)
      Logger.error(err)
      Logger.error("======================= Local Error Boundary =====================")

      throw new InternalServerError(err.message)
    }
  }
  return descriptor
}

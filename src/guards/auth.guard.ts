import { Action } from "routing-controllers"

export const AuthGuard = async (action: Action): Promise<boolean> => {
  return true
}

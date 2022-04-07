import "reflect-metadata"

import { useContainer } from "routing-controllers"
import { Container } from "typedi"

import { start } from "./bootstrap/express.bootstrap"
import { registerProviders } from "./providers"
import { startNodeProcessErrorMonitor } from "./utils/errors/nodeMonitor.util"

const main = async () => {
  startNodeProcessErrorMonitor()
  useContainer(Container)
  await registerProviders()
  start()
}

main()

import "reflect-metadata"

import { defaultMetadataStorage } from "class-transformer/cjs/storage"
import { validationMetadatasToSchemas } from "class-validator-jsonschema"
import cors from "cors"
import express from "express"
import { getMetadataArgsStorage } from "routing-controllers"
import { routingControllersToSpec } from "routing-controllers-openapi"
import swaggerUi from "swagger-ui-express"

import { generateRoutingControllerConfig } from "./bootstrap/rc.bootstrap"
import { SERVICE_API_DOC_PORT, SERVICE_PORT } from "./enum"
import { Logger } from "./utils/logger/logger.util"

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: "#/components/schemas/"
})

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage()

const spec = routingControllersToSpec(storage, generateRoutingControllerConfig(), {
  servers: [{ url: `http://localhost:${SERVICE_PORT}/api/v1` }],
  components: { schemas },
  info: {
    description: "API Documentation",
    title: "XX®",
    version: "1.0.0"
  }
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec, { customSiteTitle: "PredictiveHire® IDP" }))
app.use("/json", (_req, res) => {
  res.json(spec)
})

app.listen(SERVICE_API_DOC_PORT, () =>
  Logger.info(`🚀 Swagger Document running on http://localhost:${SERVICE_API_DOC_PORT}/docs`)
)

export const SERVICE_PORT = process.env.SERVICE_PORT || 80
export const SERVICE_API_DOC_PORT = process.env.SERVICE_API_DOC_PORT || 3500
export const NODE_ENV = process.env.NODE_ENV

export enum CONSTANT {
  SERVICE_NAME = "serviceName",
  SERVICE_URL_SUFFIX = "/api/v1"
}

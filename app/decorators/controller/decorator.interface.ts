export interface RouteDefinition {
  path: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  methodName: string
}

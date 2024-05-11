import 'reflect-metadata'
import { RouteDefinition } from '../controller/decorator.interface'

export function Delete(path: string) {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>
    routes.push({
      method: 'delete',
      path,
      methodName: propertyKey,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

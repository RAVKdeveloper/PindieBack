import 'reflect-metadata'
import { Container } from 'typedi'
import { Router } from 'express'
import { RouteDefinition } from './decorator.interface'
import { RequestHandler } from 'express'

export const router = Router()

export function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }
    if (!Reflect.hasMetadata('middlewares', target)) {
      Reflect.defineMetadata('middlewares', [], target)
    }
    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', target)
    const instance: any = Container.get(target)
    routes.forEach((route: RouteDefinition) => {
      const middlewares: RequestHandler[] =
        Reflect.getMetadata('middlewares', target.prototype, route.methodName) ?? []
      router[route.method](
        `${prefix}${route.path}`,
        ...middlewares,
        instance[route.methodName].bind(instance),
      )
    })
  }
}

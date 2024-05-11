import 'reflect-metadata'
import { Container } from 'typedi'
import { Router } from 'express'
import { RouteDefinition } from './decorator.interface'

export const router = Router()

export function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }
    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', target)
    const instance: any = Container.get(target)
    routes.forEach((route: RouteDefinition) => {
      router[route.method](`${prefix}${route.path}`, instance[route.methodName].bind(instance))
    })
  }
}

import 'reflect-metadata'
import { Container } from 'typedi'
import { Router } from 'express'
import { RouteDefinition } from './decorator.interface'

export const router = Router()

export function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineProperty(target, prefix, 'prefix')
    if (!Reflect.has(target, 'routes')) {
      Reflect.defineProperty(target, '', 'prefix')
    }
    const routes: Array<RouteDefinition> = Reflect.get(target, target)
    const instance: any = Container.get(target)
    routes.forEach((route: RouteDefinition) => {
      router[route.method](`${prefix}${route.path}`, instance[route.methodName].bind(instance))
    })
  }
}

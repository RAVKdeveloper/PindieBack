import 'reflect-metadata'
import { RequestHandler } from 'express'

export function Middleware(middleware: RequestHandler): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const middlewares: RequestHandler[] =
      Reflect.getMetadata('middlewares', target, propertyKey) || []
    Reflect.defineMetadata('middlewares', [...middlewares, middleware], target, propertyKey)
  }
}

import type { Response } from 'express'
import { ZodError } from 'zod'
import { ApiError } from '../../helpers/Error.utils'

// Теперь в Контроллерах и сервисах не надо писать try {} catch, декоратор всё отловит

export function ErrorHandling() {
  return (target: any, nameMethod: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args: any[]) {
      let res = args[1] as Response
      try {
        const executionMethod = await originalMethod.apply(this, args)
        return executionMethod
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(400).send({ message: err, status: 'Fail', code: 400 })
        }
        if (err instanceof ApiError) {
          return res
            .status(err.status)
            .send({ message: err.message, status: 'Fail', code: err.status })
        }
        return res.status(500).send({ message: 'Server Internal', status: 'Fail', code: 500 })
      }
    }
  }
}

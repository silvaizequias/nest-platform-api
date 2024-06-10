import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function main() {
  const PORT = process.env.PORT ?? ''

  const app = await NestFactory.create(AppModule, { rawBody: true })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.enableCors({
    origin: ['http://localhost:4200', 'https://dedicado.digital'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  })

  await app
    .listen(PORT || 3000)
    .then(() => console.log(`🆙 server running on http://localhost:${PORT}`))
}
main()

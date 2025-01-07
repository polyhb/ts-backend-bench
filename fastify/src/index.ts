import { Type } from '@sinclair/typebox';
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifySwagger from '@fastify/swagger';

async function build() {
  const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>();

  await fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      }
    }
  });

  fastify.put(
    '/authors/:id',
    {
      schema: {
        description: 'Update author by ID',
        summary: 'Update author',
        params: Type.Object({
          id: Type.String({ description: 'Author ID', examples: ['4'] })
        }),
        body: Type.Object({
          age: Type.Number({ description: 'Author age', examples: [30] })
        }),
        response: {
          200: Type.Object({
            id: Type.String({ description: 'Author ID', examples: ['4'] }),
            age: Type.Number({ description: 'Author age', examples: [30] })
          })
        }
      }
    },
    async (req, reply) => {
      const { id } = req.params;
      const { age } = req.body;

      reply.status(200).send({ id, age });
    }
  );
  return fastify;
}

async function start() {
  const fastify = await build();
  fastify.listen({ port: 3000 }, async (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

start();

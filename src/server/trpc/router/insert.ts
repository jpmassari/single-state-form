import { z } from "zod";

import { router, publicProcedure } from "../trpc";

// Define the types for the input data
const robotData = z.object({
  name: z.string(),
  type: z.string(),
  status: z.string(),
  tasks: z.array(z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
  })),
  apiId: z.number()
});

const taskData = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
  items: z.array(z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
  })),
  robot: z.object({
    connect: z.object({
      id: z.number(),
    }),
  }),
});

const itemData = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
  task: z.object({
    connect: z.object({
      id: z.number(),
    }),
  }),
});

const apiData = z.object({
  url: z.string(),
  client: z.string(),
  password: z.string(),
  auth: z.string(),
  code: z.string(),
  robot: z.object({
    connect: z.object({
      id: z.number(),
    }),
  }),
});

export const insert = router({

  insertRobot: publicProcedure
    .input(z.object({
      robot: z.object({
        name: z.string(),
        type: z.string(),
      }),
      tasks: z.array(
        z.object({
          name: z.string(),
          description: z.string()
      })),
      api: z.number()
    }))
  .mutation(async ({ input, ctx }) => { //implemente inputs from form component
    // Validate the input data
 /*    const validatedRobotData = robotData.parse({
      name: input.name, 
      type: 'Robot',
      status: 'active',
      tasks: [{
        name: 'Task1',
        description: 'The first task',
        status: 'open',
      },
      {
        name: 'Task2',
        description: 'The second task',
        status: 'open',
      }],
      apiId: 1
    }) */

    // Insert the validated data into the database
   const result = await ctx.prisma.robot.create({
    data: {
        name: input.robot.name,
        type: input.robot.type,
        status: 'on',
        tasks: {
          create: input.tasks.map(task => ({
            name: task.name,
            description: task.description,
            status: 'on',
          })),
        },
        apiId: input.api
    }
    }); 
  })
})

  /*   await ctx.prisma.task.create({
      data: {
        name: validatedTaskData.name,
        description: validatedTaskData.description,
        status: validatedTaskData.status,
        items: {
          create: validatedTaskData.items.map(item => ({
            name: item.name,
            description: item.description,
            status: item.status,
          })),
        },
        robot: {
          connect: {
            id: validatedTaskData.robot.connect.id,
          },
        },
      }
    });
    await ctx.prisma.item.create({
      data: validatedItemData,
    });
    return await ctx.prisma.aPI.create({
      data: validatedApiData,
    });
  })
})



const validatedTaskData = taskData.parse({
  name: 'Task3',
  description: 'The third task',
  status: 'open',
  items: [{
    name: 'Item1',
    description: 'The first item',
    status: 'open',
  },
  {
    name: 'Item2',
    description: 'The second item',
    status: 'open',
  }],
  robot: {
    connect: {
      id: 1,
    },
  },
})
const validatedItemData = itemData.parse({
  name: 'Item3',
  description: 'The third item',
  status: 'open',
  task: {
    connect: {
      id: 3,
    },
  },
});

const validatedApiData = apiData.parse({
  url: 'api.example.com',
  client: 'Jane',
  password: '67890',
  auth: 'bearer',
  code: 'fghij',
  robot: {
    connect: {
      id: 1,
    },
  },
}); */
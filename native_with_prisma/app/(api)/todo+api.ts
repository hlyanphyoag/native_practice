
import { PrismaClient } from '@/prisma/generated/client';
import { withAccelerate } from '@prisma/extension-accelerate'

export async function GET() {
    const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL }).$extends(withAccelerate())
    const todos = await prisma.todo.findMany();
    return new Response(JSON.stringify(todos), {status: 200})
}

export async function POST(request: Request) {
    try {
        console.log('request:', request)
        const { title } = await request.json();

        if (!title) {
            return new Response('No title provided', { status: 400 })
        }

        const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL }).$extends(withAccelerate())

        const todo = await prisma.todo.create({
            data: {
                title,
            }
        })
        return new Response(JSON.stringify(todo), { status: 201 })
    } catch (error) {
        console.error('Error in POST: ', error)
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
    }
}



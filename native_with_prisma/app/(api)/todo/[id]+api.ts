
import { PrismaClient } from '@/prisma/generated/client';
import { withAccelerate } from '@prisma/extension-accelerate'

export async function DELETE(request: Request, { id }: { id: string }) {
    try {
        console.log('id:', id)
        const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL }).$extends(withAccelerate())
        const res = await prisma.todo.delete({ where: { id } })
        return new Response(JSON.stringify(res), {status: 200})
    }catch(error) {
        console.log('Error:', error)
    }
}

export async function PUT(request: Request , {id}: {id: string}) {
    const {title} = await request.json();
    console.log('UpdateTitle:', title)
    try{
       const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL }).$extends(withAccelerate());
       const res = await prisma.todo.update({where: {id}, data: {title}})
       return new Response(JSON.stringify(res), {status: 200})
    }catch(error){
        console.log("Error:", error)
    }
}


import { prisma } from './prisma_init'

export async function find_courses_after_date(date: Date) {
    return await prisma.course.findMany({
        where: {
            createdAt: {
                gt: date,
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    })
}

import { prisma } from './prisma_init'

export async function find_students_by_name_pattern(pattern: string) {
    return await prisma.student.findMany({
        include: {
            person: true,
        },
        where: {
            person: {
                name: {
                    contains: pattern,
                },
            },
        },
    })
}

import { prisma } from './prisma_init'

export async function find_students_without_courses() {
    return await prisma.student.findMany({
        where: {
            grades: {
                none: {} // Студенты, у которых нет ни одной оценки
            }
        },
        include: {
            person: true
        }
    })
}

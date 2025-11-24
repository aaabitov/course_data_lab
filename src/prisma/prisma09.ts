import { prisma } from './prisma_init'

export async function delete_students_without_grades() {
    const result = await prisma.student.deleteMany({
        where: {
            grades: {
                none: {}, // студенты без оценок
            },
        },
    })

    return result.count
}

import { prisma } from './prisma_init'

export async function delete_courses_without_grades() {
    // Находим все курсы с оценками
    const coursesWithGrades = await prisma.grade.findMany({
        select: { courseId: true },
        distinct: ['courseId']
    })
    const courseIdsWithGrades = coursesWithGrades.map(c => c.courseId)

    // Удаляем все курсы, которых нет в списке с оценками
    const result = await prisma.course.deleteMany({
        where: {
            id: { notIn: courseIdsWithGrades }
        }
    })

    return result.count
}

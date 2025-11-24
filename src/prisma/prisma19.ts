import { prisma } from './prisma_init'

export async function find_most_popular_course() {
    // Группируем оценки по courseId и считаем уникальных студентов
    const grouped = await prisma.grade.groupBy({
        by: ['courseId'],
        _count: {
            studentId: true,
        },
        orderBy: {
            _count: {
                studentId: 'desc',
            }
        },
        take: 1, // Берем только курс с максимальным количеством студентов
    })

    if (grouped.length === 0) return null

    const topGroup = grouped[0]

    // Получаем информацию о курсе
    const course = await prisma.course.findUnique({
        where: { id: topGroup.courseId }
    })

    if (!course) return null

    return {
        ...course,
        studentCount: topGroup._count.studentId
    }
}

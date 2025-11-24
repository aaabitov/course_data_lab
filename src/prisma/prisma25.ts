import { prisma } from './prisma_init'

export async function update_courses_without_grades_description() {
    // Сначала находим курсы без оценок
    const coursesWithoutGrades = await prisma.course.findMany({
        where: {
            grades: { none: {} }
        }
    })

    if (coursesWithoutGrades.length === 0) return 0

    // Обновляем описание всех таких курсов
    const result = await prisma.course.updateMany({
        where: {
            id: { in: coursesWithoutGrades.map(c => c.id) }
        },
        data: { description: 'Нет оценок' }
    })

    return result.count
}

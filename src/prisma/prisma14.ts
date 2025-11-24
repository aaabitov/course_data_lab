import { prisma } from './prisma_init'

export async function find_students_above_course_average(courseTitle: string) {
    // Находим курс
    const course = await prisma.course.findFirst({
        where: { title: courseTitle }
    })
    if (!course) return []

    // Получаем все оценки по курсу
    const grades = await prisma.grade.findMany({
        where: { courseId: course.id },
        include: { student: { include: { person: true } } }
    })
    if (grades.length === 0) return []

    // Среднее значение
    const avg = grades.reduce((sum, g) => sum + g.grade, 0) / grades.length

    // Фильтруем студентов с оценкой выше среднего
    return grades.filter(g => g.grade > avg)
}

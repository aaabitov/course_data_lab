import { prisma } from './prisma_init'

export interface CourseWithAverage {
    courseId: number
    title: string
    averageGrade: number | null
}

export async function find_top_courses(limit: number): Promise<CourseWithAverage[]> {
    // Загружаем все курсы
    const courses = await prisma.course.findMany()

    // Загружаем все оценки
    const grades = await prisma.grade.findMany()

    // Вычисляем среднюю оценку для каждого курса
    const coursesWithAvg: CourseWithAverage[] = courses.map(course => {
        const courseGrades = grades.filter(g => g.courseId === course.id).map(g => g.grade)
        const averageGrade = courseGrades.length > 0
            ? courseGrades.reduce((a, b) => a + b, 0) / courseGrades.length
            : null
        return {
            courseId: course.id,
            title: course.title,
            averageGrade
        }
    })

    // Сортируем по убыванию средней оценки, null в конец
    coursesWithAvg.sort((a, b) => {
        if (b.averageGrade === null) return -1
        if (a.averageGrade === null) return 1
        return b.averageGrade - a.averageGrade
    })

    return coursesWithAvg.slice(0, limit)
}

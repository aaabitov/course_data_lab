import { prisma } from './prisma_init'

export async function find_courses_with_excellent_students() {
    // Получаем все курсы
    const courses = await prisma.course.findMany()

    // Получаем все оценки с информацией о course и student
    const grades = await prisma.grade.findMany({
        where: { grade: 5 } // сразу фильтруем отличные оценки
    })

    // Для каждого курса считаем количество уникальных студентов с оценкой 5
    const result = courses.map(course => {
        const excellentStudents = grades
            .filter(g => g.courseId === course.id)
            .map(g => g.studentId)
        const uniqueStudentIds = Array.from(new Set(excellentStudents))
        return { ...course, excellentCount: uniqueStudentIds.length }
    })

    return result
}

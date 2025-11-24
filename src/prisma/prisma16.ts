import { prisma } from './prisma_init'

export async function find_students_with_most_courses() {
    const students = await prisma.student.findMany({
        include: { person: true }
    })

    const grades = await prisma.grade.findMany()

    // Считаем количество уникальных курсов для каждого студента
    const studentCourseMap = students.map(student => {
        const courses = grades
            .filter(g => g.studentId === student.id)
            .map(g => g.courseId)
        const uniqueCourseCount = new Set(courses).size
        return { student, courseCount: uniqueCourseCount }
    })

    // Находим максимальное количество курсов
    const maxCount = Math.max(...studentCourseMap.map(s => s.courseCount))

    // Возвращаем студентов с максимальным количеством курсов
    return studentCourseMap
        .filter(s => s.courseCount === maxCount)
        .map(s => ({ ...s.student, courseCount: s.courseCount }))
}

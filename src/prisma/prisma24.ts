import { prisma } from './prisma_init'

export async function find_students_with_all_courses() {
    // Получаем все курсы
    const courses = await prisma.course.findMany()
    const courseIds = courses.map(c => c.id)

    if (courseIds.length === 0) return []

    // Получаем всех студентов с их оценками
    const students = await prisma.student.findMany({
        include: { person: true, grades: true }
    })

    // Фильтруем студентов, у которых есть оценки по всем курсам
    const result = students.filter(student => {
        const studentCourseIds = new Set(student.grades.map(g => g.courseId))
        return courseIds.every(id => studentCourseIds.has(id))
    })

    return result
}

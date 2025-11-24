import { prisma } from './prisma_init'

export interface CourseWithStudentCount {
    id: number
    title: string
    description: string | null
    studentCount: number
}

export async function find_courses_with_student_count(): Promise<CourseWithStudentCount[]> {
    const courses = await prisma.course.findMany({
        include: {
            grades: {
                distinct: ['studentId'], // Учитываем только уникальных студентов
                select: {
                    studentId: true
                }
            }
        }
    })

    return courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        studentCount: course.grades.length // Количество уникальных studentId
    }))
}
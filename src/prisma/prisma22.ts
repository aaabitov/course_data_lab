import { prisma } from './prisma_init'

export async function find_courses_min_max_average() {
    const courses = await prisma.course.findMany({
        include: {
            grades: true
        }
    })

    const coursesWithAvg = courses.map(course => {
        const grades = course.grades.map(g => g.grade)
        const averageGrade = grades.length > 0 ? grades.reduce((a, b) => a + b, 0) / grades.length : 0
        return { ...course, averageGrade }
    })

    let min = coursesWithAvg[0]
    let max = coursesWithAvg[0]

    for (const course of coursesWithAvg) {
        if (course.averageGrade < min.averageGrade) min = course
        if (course.averageGrade > max.averageGrade) max = course
    }

    return { min, max }
}

import { prisma } from './prisma_init'

export interface StudentWithAverage {
    studentId: number
    studentName: string
    averageGrade: number
    gradeCount: number
}

export async function find_top_students(limit: number): Promise<StudentWithAverage[]> {
    // Группируем оценки по студентам
    const grades = await prisma.grade.groupBy({
        by: ['studentId'],
        _avg: { grade: true },
        _count: { grade: true },
        orderBy: { _avg: { grade: 'desc' } },
        take: limit
    })

    const studentIds = grades.map(g => g.studentId)
    const students = await prisma.student.findMany({
        where: { id: { in: studentIds } },
        include: { person: true }
    })

    // Формируем итоговый массив с нужными данными
    return grades.map(g => {
        const student = students.find(s => s.id === g.studentId)!
        return {
            studentId: student.id,
            studentName: student.person.name,
            averageGrade: g._avg.grade!,
            gradeCount: g._count.grade
        }
    })
}

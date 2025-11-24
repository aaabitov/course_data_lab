import { prisma } from './prisma_init'

export async function find_student_progress_by_semester() {
    // Получаем все оценки с информацией о студенте
    const grades = await prisma.grade.findMany({
        include: { student: { include: { person: true } } },
        orderBy: { createdAt: 'asc' }
    })

    // Группируем по студенту и по месяцу
    const studentMap: Record<string, any> = {}

    for (const grade of grades) {
        const studentId = grade.studentId
        const month = grade.createdAt.toISOString().slice(0, 7) // YYYY-MM

        if (!studentMap[studentId]) {
            studentMap[studentId] = {
                studentId,
                studentName: grade.student.person.name,
                progress: []
            }
        }

        let monthEntry = studentMap[studentId].progress.find((p: any) => p.month === month)
        if (!monthEntry) {
            monthEntry = { month, averageGrade: 0, gradeCount: 0, totalGrade: 0 }
            studentMap[studentId].progress.push(monthEntry)
        }

        monthEntry.totalGrade += grade.grade
        monthEntry.gradeCount += 1
    }

    // Вычисляем средние баллы
    for (const student of Object.values(studentMap)) {
        for (const monthEntry of student.progress) {
            monthEntry.averageGrade = monthEntry.totalGrade / monthEntry.gradeCount
            delete monthEntry.totalGrade
        }
    }

    return Object.values(studentMap)
}

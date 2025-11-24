import { prisma } from './prisma_init'

export async function find_students_with_excellent_grades() {
    // Получаем всех студентов с person
    const students = await prisma.student.findMany({
        include: { person: true }
    })

    // Получаем все оценки
    const grades = await prisma.grade.findMany()

    // Фильтруем студентов, у которых есть хотя бы одна оценка 5
    const excellentStudents = students.filter(student =>
        grades.some(grade => grade.studentId === student.id && grade.grade === 5)
    )

    return excellentStudents
}

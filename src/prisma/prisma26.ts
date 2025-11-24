import { prisma } from './prisma_init'

export async function find_oldest_and_newest_students() {
    // Получаем всех студентов с их person
    const students = await prisma.student.findMany({
        include: { person: true }
    })

    if (students.length === 0) return { oldest: null, newest: null }

    // Инициализируем oldest и newest первым студентом
    let oldest = students[0]
    let newest = students[0]

    for (const student of students) {
        if (student.person.createdAt < oldest.person.createdAt) {
            oldest = student
        }
        if (student.person.createdAt > newest.person.createdAt) {
            newest = student
        }
    }

    return { oldest, newest }
}

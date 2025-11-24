import { prisma } from './prisma_init'

export async function delete_duplicate_students_by_email() {
    // Получаем всех студентов с их person
    const students = await prisma.student.findMany({
        include: { person: true },
        orderBy: { id: 'asc' }
    })

    const seenEmails = new Set<string>()
    const studentsToDelete: number[] = []

    for (const student of students) {
        const email = student.person.email
        if (seenEmails.has(email)) {
            studentsToDelete.push(student.id)
        } else {
            seenEmails.add(email)
        }
    }

    if (studentsToDelete.length === 0) return 0

    const deleteResult = await prisma.student.deleteMany({
        where: { id: { in: studentsToDelete } }
    })

    return deleteResult.count
}

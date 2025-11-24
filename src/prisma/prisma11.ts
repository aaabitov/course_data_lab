import { prisma } from './prisma_init'

export async function update_students_email_domain(oldDomain: string, newDomain: string) {
    // Находим всех студентов с email на oldDomain
    const students = await prisma.student.findMany({
        where: {
            person: {
                email: {
                    endsWith: oldDomain
                }
            }
        },
        include: { person: true }
    })

    // Обновляем email каждого студента
    for (const student of students) {
        const oldEmail = student.person.email
        const newEmail = oldEmail.replace(new RegExp(`${oldDomain}$`), newDomain)
        await prisma.person.update({
            where: { id: student.personId },
            data: { email: newEmail }
        })
    }

    return students.length
}

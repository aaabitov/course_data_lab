import { prisma } from './prisma_init'

export async function update_student_names_pattern(oldPattern: string, newPattern: string) {
    // Находим студентов, у которых имя содержит oldPattern
    const students = await prisma.student.findMany({
        include: { person: true }
    })

    let updatedCount = 0

    for (const student of students) {
        if (student.person.name.includes(oldPattern)) {
            const newName = student.person.name.replace(oldPattern, newPattern)
            await prisma.person.update({
                where: { id: student.personId },
                data: { name: newName }
            })
            updatedCount++
        }
    }

    return updatedCount
}

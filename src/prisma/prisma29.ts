import { prisma } from './prisma_init'

export async function find_students_with_same_names() {
    // Получаем всех студентов с их person
    const students = await prisma.student.findMany({
        include: { person: true }
    })

    // Группируем студентов по имени
    const groups: Record<string, typeof students> = {}
    for (const student of students) {
        const name = student.person.name
        if (!groups[name]) groups[name] = []
        groups[name].push(student)
    }

    // Оставляем только группы с более чем одним студентом
    const duplicates = Object.entries(groups)
        .filter(([_, group]) => group.length > 1)
        .map(([name, group]) => ({ name, students: group }))

    return duplicates
}

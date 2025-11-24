import { prisma } from './prisma_init'

export async function delete_students_before_date(date: Date) {
    const result = await prisma.student.deleteMany({
        where: {
            createdAt: { lt: date } // все студенты с датой меньше указанной
        }
    })
    return result.count
}

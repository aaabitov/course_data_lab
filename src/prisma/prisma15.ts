import { prisma } from './prisma_init'

export async function update_low_grades() {
    const result = await prisma.grade.updateMany({
        where: { grade: { lt: 3 } }, // оценки меньше 3
        data: { grade: 3 }           // обновляем на 3
    })
    return result.count
}

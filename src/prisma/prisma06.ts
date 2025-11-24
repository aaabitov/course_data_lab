import { prisma } from "./prisma_init";

export async function find_students_without_grades() {
  return await prisma.student.findMany({
    where: {
      grades: {
        none: {}, // нет ни одной оценки
      },
    },
    include: {
      person: true,
    },
  });
}

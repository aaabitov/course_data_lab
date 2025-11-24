import { prisma } from "./prisma_init";

export async function find_grades_in_range(minGrade: number, maxGrade: number) {
  return await prisma.grade.findMany({
    where: {
      grade: {
        gte: minGrade,
        lte: maxGrade,
      },
    },
    include: {
      student: true,
      course: true,
    },
  });
}

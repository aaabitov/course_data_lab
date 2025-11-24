import { prisma } from "./prisma_init";

export async function find_students_by_email_domain(domain: string) {
  return await prisma.student.findMany({
    include: {
      person: true,
    },
    where: {
      person: {
        email: {
          endsWith: domain,
        },
      },
    },
  });
}

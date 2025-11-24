import { prisma } from "./prisma_init";

export async function update_student_email(
  studentId: number,
  newEmail: string
) {
  // Находим студента, чтобы получить personId
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  // Обновляем email в таблице person
  await prisma.person.update({
    where: { id: student.personId },
    data: { email: newEmail },
  });

  // Возвращаем обновлённого студента с person
  return await prisma.student.findUnique({
    where: { id: studentId },
    include: { person: true },
  });
}

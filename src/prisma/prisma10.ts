import { prisma } from './prisma_init'

export async function get_course_average_grade(courseTitle: string): Promise<number | null> {
    // Находим курс по title
    const course = await prisma.course.findFirst({
        where: { title: courseTitle }
    });

    if (!course) return null;

    // Находим среднее по оценкам курса
    const result = await prisma.grade.aggregate({
        where: { courseId: course.id },
        _avg: { grade: true }
    });

    return result._avg.grade ?? null;
}

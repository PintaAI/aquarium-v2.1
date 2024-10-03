import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const student = await prisma.user.create({
    data: {
      email: 'student@example.com',
      name: 'Korean Learner',
      role: 'MURID',
      plan: 'FREE',
      password: await hash('password123', 12),
    },
  });

  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@example.com',
      name: 'Korean Teacher',
      role: 'GURU',
      plan: 'PREMIUM',
      password: await hash('password456', 12),
    },
  });

  // Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Park Min-young',
        role: 'Student',
        content: '이 플랫폼 덕분에 한국어 실력이 크게 향상되었어요!',
        imageUrl: 'https://example.com/minyoung.jpg',
      },
      {
        name: 'Kim Soo-hyun',
        role: 'Language Enthusiast',
        content: 'The interactive lessons make learning Korean fun and engaging!',
        imageUrl: 'https://example.com/soohyun.jpg',
      },
    ],
  });

  // Create Courses
  const beginnerCourse = await prisma.course.create({
    data: {
      title: 'Korean for Beginners',
      description: 'Start your journey in Korean language',
      level: 'BEGINNER',
      authorId: teacher.id,
      members: {
        connect: { id: student.id },
      },
    },
  });

  const intermediateCourse = await prisma.course.create({
    data: {
      title: 'Intermediate Korean Conversation',
      description: 'Enhance your Korean speaking skills',
      level: 'INTERMEDIATE',
      authorId: teacher.id,
    },
  });

  // Create Modules
  await prisma.module.createMany({
    data: [
      {
        title: 'Hangul Basics',
        description: 'Learn the Korean alphabet',
        jsonDescription: JSON.stringify({ content: 'Master the fundamentals of Hangul' }),
        htmlDescription: '<p>Master the fundamentals of Hangul</p>',
        order: 1,
        courseId: beginnerCourse.id,
      },
      {
        title: 'Basic Greetings',
        description: 'Common Korean greetings and introductions',
        jsonDescription: JSON.stringify({ content: 'Learn essential Korean greetings' }),
        htmlDescription: '<p>Learn essential Korean greetings</p>',
        order: 2,
        courseId: beginnerCourse.id,
      },
      {
        title: 'Daily Conversations',
        description: 'Practice everyday Korean conversations',
        jsonDescription: JSON.stringify({ content: 'Improve your daily Korean conversation skills' }),
        htmlDescription: '<p>Improve your daily Korean conversation skills</p>',
        order: 1,
        courseId: intermediateCourse.id,
      },
      {
        title: 'Korean Idioms',
        description: 'Learn common Korean idioms and expressions',
        jsonDescription: JSON.stringify({ content: 'Master popular Korean idioms and their usage' }),
        htmlDescription: '<p>Master popular Korean idioms and their usage</p>',
        order: 2,
        courseId: intermediateCourse.id,
      },
    ],
  });

  // Create Accounts (for OAuth)
  await prisma.account.createMany({
    data: [
      {
        userId: student.id,
        type: 'oauth',
        provider: 'google',
        providerAccountId: '123456',
        access_token: 'dummy_access_token_1',
        expires_at: 1234567890,
        token_type: 'Bearer',
        scope: 'openid profile email',
      },
      {
        userId: teacher.id,
        type: 'oauth',
        provider: 'github',
        providerAccountId: '654321',
        access_token: 'dummy_access_token_2',
        expires_at: 1234567890,
        token_type: 'Bearer',
        scope: 'user',
      },
    ],
  });

  console.log('Seed data for Korean learning courses created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
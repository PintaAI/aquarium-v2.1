import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
      role: 'MURID',
      plan: 'FREE',
      password: 'password123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'guru1@example.com',
      name: 'Guru One',
      role: 'GURU',
      plan: 'PREMIUM',
      password: 'password456',
    },
  });

  // Create sample courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Introduction to Aquariums',
      description: 'A beginner course on setting up and maintaining aquariums.',
      jsonDescription: '{}',
      htmlDescription: '<p>A beginner course on setting up and maintaining aquariums.</p>',
      level: 'BEGINNER',
      authorId: user2.id,
    },
  });

  // Create sample testimonials
  await prisma.testimonial.create({
    data: {
      name: 'Happy Customer',
      role: 'Aquarium Enthusiast',
      content: 'This course transformed my aquarium setup!',
      imageUrl: 'https://example.com/image.jpg',
    },
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
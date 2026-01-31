// src/seeder/sea-jobs-seeder.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { Crew } from '../crew/entities/crew.entity';
import { faker } from '@faker-js/faker';

// Maritime-related positions
const positions = [
  'Captain',
  'Chief Engineer',
  'First Officer',
  'Second Officer',
  'Deckhand',
  'Cook',
  'Navigator',
  'Radio Operator',
  'Bosun',
  'Steward',
  'Electrician',
];

// Maritime certifications
const certifications = [
  'Master Mariner',
  'Marine Engineering',
  'Advanced Firefighting',
  'Bridge Resource Management',
  'STCW Safety Training',
  'GMDSS Radio Operator',
  'Food Safety & Hygiene',
  'Medical First Aid',
  'Oil Tanker Familiarization',
  'Environmental Compliance',
];

function generateSeedData(count = 33): Partial<Crew>[] {
  const data: Partial<Crew>[] = [];

  for (let i = 0; i < count; i++) {
    const position = faker.helpers.arrayElement(positions);
    const fullName = faker.person.fullName();
    const email = faker.internet.email({
      firstName: fullName.split(' ')[0],
      lastName: fullName.split(' ')[1],
      provider: 'fleet.io',
    });

    const experienceYears = faker.number.int({ min: 1, max: 25 });
    const certification = faker.helpers.arrayElement(certifications);
    const availability =
      faker.datatype.boolean() ? 'Available' : `At sea until ${faker.date.future().toLocaleString('default', { month: 'short' })}`;
    const location = `${faker.location.city()}, ${faker.location.countryCode()}`;

    data.push({
      fullName,
      email: email.toLowerCase(),
      position,
      experienceYears,
      certifications: certification,
      availability,
      location,
      isActive: faker.datatype.boolean(),
      isSeeded: true,
    });
  }

  return data;
}

async function runSeeder() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const dataSource = appContext.get(DataSource);
  const repo = dataSource.getRepository(Crew);

  const action = process.argv[2]; // "seed" or "clear"

  if (action === 'seed') {
    const existingCount = await repo.count({ where: { isSeeded: true } });
    if (existingCount > 0) {
      console.log(`✅ Found ${existingCount} seeded records. Skipping insertion.`);
    } else {
      const seedData = generateSeedData(33);
      await repo.save(seedData);
      console.log(`🌱 Inserted ${seedData.length} Crew seed records successfully.`);
    }
  } else if (action === 'clear') {
    const result = await repo.delete({ isSeeded: true });
    console.log(`🧹 Deleted ${result.affected ?? 0} seeded records.`);
  } else {
    console.log('❌ Please specify an action:');
    console.log('   npm run seed:sea-jobs          # to insert seed data');
    console.log('   npm run seed:sea-jobs:clear    # to delete seeded data');
  }

  await appContext.close();
  process.exit(0);
}

runSeeder().catch((err) => {
  console.error('❌ Seeder failed:', err);
  process.exit(1);
});

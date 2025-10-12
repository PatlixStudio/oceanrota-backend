import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeaJobsService } from '../sea-jobs/sea-jobs.service';
import { CreateSeaJobDto } from '../sea-jobs/dto/create-sea-job.dto';
import { faker } from '@faker-js/faker';

async function runSeeder() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const seaJobsService = appContext.get(SeaJobsService);

  const action = process.argv[2]; // "seed" or "clear"

  if (action === 'seed') {
    // Check if seeded data already exists
    const existingJobs = await seaJobsService.findAllPaginated();
    if (existingJobs.data.some(j => j.isSeed)) {
      console.log('✅ Seed data already exists. Skipping insertion.');
    } else {
      const seedData: CreateSeaJobDto[] = generateJobs(33);
      for (const job of seedData) {
        await seaJobsService.create(job);
      }
      console.log(`🌱 Inserted ${seedData.length} SeaJob records.`);
    }
  } else if (action === 'clear') {
    // Remove seeded jobs
    const jobs = await seaJobsService.findAllPaginated();
    const seededJobs = jobs.data.filter(j => j.isSeed);
    for (const job of seededJobs) {
      await seaJobsService.remove(job.id);
    }
    console.log(`🧹 Deleted ${seededJobs.length} seeded jobs.`);
  } else {
    console.log('❌ Specify an action: seed | clear');
  }

  await appContext.close();
  process.exit(0);
}

function generateJobs(count = 33): CreateSeaJobDto[] {
  const positions = ['Captain', 'Chief Engineer', 'First Officer', 'Cook', 'Navigator', 'Deckhand'];
  const certifications = ['Master Mariner', 'Marine Engineering', 'STCW Safety', 'Navigation Expert'];

  const jobs: CreateSeaJobDto[] = [];

  for (let i = 0; i < count; i++) {
    const position = faker.helpers.arrayElement(positions);
    const title = `${position} for ${faker.company.name()} Vessel`;
    jobs.push({
      title,
      position,
      description: faker.lorem.sentence(),
      location: faker.location.city(),
      requiredExperience: faker.number.int({ min: 1, max: 25 }),
      certifications: [faker.helpers.arrayElement(certifications)],
      isActive: true,
      isSeed: true,
    });
  }

  return jobs;
}

runSeeder().catch(err => {
  console.error('❌ Seeder failed:', err);
  process.exit(1);
});

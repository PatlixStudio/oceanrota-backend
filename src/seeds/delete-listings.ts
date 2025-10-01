import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Listing } from '../marketplace/entities/listing.entity';

async function deleteAllListings() {
    await AppDataSource.initialize();
    console.log('Data source initialized');

    const repo = AppDataSource.getRepository(Listing);
    const result = await repo.delete({ isSeeded: true });

    console.log(`Deleted ${result.affected} seeded listings`);
    await AppDataSource.destroy();
    console.log('Cleanup finished');
}

if (require.main === module) {
    deleteAllListings().catch((err) => console.error(err));
}

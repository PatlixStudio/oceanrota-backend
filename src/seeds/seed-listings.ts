import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Listing } from '../marketplace/entities/listing.entity';
import { User } from '../user/entities/user.entity';
import { faker } from '@faker-js/faker';

const CATEGORIES = ['Power', 'Sail', 'Other'];

const BOAT_CLASSES = [
    'Motor Yacht', 'Cruiser', 'Express Cruiser', 'Cruiser/Racer', 'Flybridge',
    'Convertible Boat', 'Sport Fishing', 'Saltwater Fishing', 'Racing/High Performance',
    'Center Console', 'Cuddy Cabin', 'Trawler', 'Bowrider', 'Other'
];
const MAKES = [
    'Sea Ray', 'Beneteau', 'Hatteras', 'Bayliner', 'Carver', 'Catalina', 'Bertram', 'Hunter',
    'Boston Whaler', 'Grand Banks', 'Custom', 'Tiara', 'Viking', 'Chris Craft', 'Mainship', 'Jeanneau',
    'Pursuit', 'Silverton', 'Azimut', 'Wellcraft', 'Sunseeker', 'Pearson', 'Albin', 'Grady-White',
    'C&C', 'Luhrs', 'Formula', 'J/Boats', 'Regal', 'Tartan', 'Ocean Alexander', 'Hinckley', 'Lagoon',
    'Contender', 'Nordhavn', 'Gulfstar', 'Cheoy Lee', 'Sabre', 'Morgan', 'Cape Dory', 'Ferretti Yachts',
    'Pershing', 'Riva'
];

const BOAT_TYPES = ['Sailboat', 'Motorboat', 'Yacht', 'Catamaran', 'Fishing Boat', 'Trawler', 'Speedboat'];
const CONDITIONS = ['New', 'Used'];
const PORTS = ['Marina Bay', 'Port of Singapore', 'Port Klang', 'Jakarta Harbor', 'Port of Los Angeles', 'Barcelona Port', 'Marina del Rey', 'Copenhagen Harbor'];

function randomPriceForType(type: string) {
    switch (type) {
        case 'Yacht': return faker.number.float({ min: 150000, max: 5_000_000, fractionDigits: 2 });
        case 'Catamaran': return faker.number.float({ min: 80000, max: 1_200_000, fractionDigits: 2 });
        case 'Sailboat': return faker.number.float({ min: 8000, max: 250_000, fractionDigits: 2 });
        case 'Motorboat': return faker.number.float({ min: 5000, max: 200_000, fractionDigits: 2 });
        case 'Fishing Boat': return faker.number.float({ min: 3000, max: 120_000, fractionDigits: 2 });
        case 'Trawler': return faker.number.float({ min: 30_000, max: 1_000_000, fractionDigits: 2 });
        case 'Speedboat': return faker.number.float({ min: 10_000, max: 350_000, fractionDigits: 2 });
        default: return faker.number.float({ min: 5000, max: 200_000, fractionDigits: 2 });
    }
}

async function getBoatImages(query: string, count = 3): Promise<string[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
    query
  )}&count=${count}&client_id=${accessKey}&orientation=landscape`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Unsplash API error: ${resp.statusText}`);
    const data = await resp.json();
    return data.map((img: any) => img.urls.regular);
  } catch (err) {
    console.error('Error fetching Unsplash images:', err);
    // fallback to Picsum if Unsplash fails
    return [
      `https://picsum.photos/seed/${query}-1/800/600`,
      `https://picsum.photos/seed/${query}-2/800/600`,
      `https://picsum.photos/seed/${query}-3/800/600`,
    ];
  }
}

async function seed(count = 20) {
    await AppDataSource.initialize();
    console.log('Data source initialized');

    const listingRepo = AppDataSource.getRepository(Listing);
    const userRepo = AppDataSource.getRepository(User);

    // Fetch all users
    const users = await userRepo.find();
    if (!users.length) throw new Error('No users found in the database. Please create some users first.');

    const listings: Listing[] = [];

    for (let i = 0; i < count; i++) {
        const type = faker.helpers.arrayElement(BOAT_TYPES);
        const category = faker.helpers.arrayElement(CATEGORIES);
        const boatClass = faker.helpers.arrayElement(BOAT_CLASSES);
        const make = faker.helpers.arrayElement(MAKES);

        const year = faker.number.int({ min: 1970, max: 2025 });
        const length_m = faker.number.float({ min: 3, max: 40, fractionDigits: 2 });
        const condition = faker.helpers.arrayElement(CONDITIONS);
        const port = faker.helpers.arrayElement(PORTS);
        const price = Number(randomPriceForType(type).toFixed(2));
        const currency = faker.helpers.arrayElement(['USD', 'EUR', 'AUD', 'IDR', 'SGD']);

        const title = `${make} ${type} — ${Math.round(length_m)}m ${year} (${condition})`;
        const description = faker.lorem.paragraph();

        // Dynamic Unsplash images based on type
        const images = await getBoatImages(type + " boat");

        const owner = faker.helpers.arrayElement(users);

        const listing = listingRepo.create({
            title,
            description,
            price,
            currency,
            country: faker.location.country(),
            city: faker.location.city(),
            port,
            boatType: type,
            category,
            boatClass,
            make,
            length_m,
            year,
            condition,
            images,
            owner,
            isActive: true,
            isSeeded: true,
        });

        listings.push(listing);
    }

    const saved = await listingRepo.save(listings);
    console.log(`Inserted ${saved.length} listings`);
    await AppDataSource.destroy();
    console.log('Seeder finished');
}

// run directly
if (require.main === module) {
    const count = Number(process.argv[2] ?? 20);
    seed(count).catch((err) => console.error(err));
}

export { seed };

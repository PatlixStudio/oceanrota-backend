import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Listing } from '../marketplace/entities/listing.entity';
import { faker } from '@faker-js/faker';

const CATEGORIES = ['Power', 'Sail', 'Other'];
const BOAT_CLASSES = [
  'Motor Yacht', 'Cruiser', 'Express Cruiser', 'Cruiser/Racer', 'Flybridge', 
  'Convertible Boat', 'Sport Fishing', 'Saltwater Fishing', 'Racing/High Performance', 
  'Center Console', 'Cuddy Cabin', 'Trawler', 'Bowrider', 'Other'
];
const MAKES = [
  'Sea Ray','Beneteau','Hatteras','Bayliner','Carver','Catalina','Bertram','Hunter',
  'Boston Whaler','Grand Banks','Custom','Tiara','Viking','Chris Craft','Mainship','Jeanneau',
  'Pursuit','Silverton','Azimut','Wellcraft','Sunseeker','Pearson','Albin','Grady-White',
  'C&C','Luhrs','Formula','J/Boats','Regal','Tartan','Ocean Alexander','Hinckley','Lagoon',
  'Contender','Nordhavn','Gulfstar','Cheoy Lee','Sabre','Morgan','Cape Dory','Ferretti Yachts',
  'Pershing','Riva'
];

const BOAT_TYPES = ['Sailboat', 'Motorboat', 'Yacht', 'Catamaran', 'Fishing Boat', 'Trawler', 'Speedboat'];
const CONDITIONS = ['New', 'Excellent', 'Good', 'Fair', 'Needs Work'];
const PORTS = ['Marina Bay', 'Port of Singapore', 'Port Klang', 'Jakarta Harbor', 'Port of Los Angeles', 'Barcelona Port', 'Marina del Rey', 'Copenhagen Harbor'];

function randomPriceForType(type: string) {
  switch (type) {
    case 'Yacht': return faker.number.float({ min: 150000, max: 5_000_000, precision: 0.01 });
    case 'Catamaran': return faker.number.float({ min: 80000, max: 1_200_000, precision: 0.01 });
    case 'Sailboat': return faker.number.float({ min: 8000, max: 250_000, precision: 0.01 });
    case 'Motorboat': return faker.number.float({ min: 5000, max: 200_000, precision: 0.01 });
    case 'Fishing Boat': return faker.number.float({ min: 3000, max: 120_000, precision: 0.01 });
    case 'Trawler': return faker.number.float({ min: 30_000, max: 1_000_000, precision: 0.01 });
    case 'Speedboat': return faker.number.float({ min: 10_000, max: 350_000, precision: 0.01 });
    default: return faker.number.float({ min: 5000, max: 200_000, precision: 0.01 });
  }
}

async function seed(count = 20) {
  await AppDataSource.initialize();
  console.log('Data source initialized');

  const repo = AppDataSource.getRepository(Listing);

  const listings: Listing[] = [];

  for (let i = 0; i < count; i++) {
    const type = faker.helpers.arrayElement(BOAT_TYPES);
    const category = faker.helpers.arrayElement(CATEGORIES);
    const boatClass = faker.helpers.arrayElement(BOAT_CLASSES);
    const make = faker.helpers.arrayElement(MAKES);

    const year = faker.number.int({ min: 1970, max: 2025 });
    const length_m = faker.number.float({ min: 3, max: 40, precision: 0.1 });
    const condition = faker.helpers.arrayElement(CONDITIONS);
    const port = faker.helpers.arrayElement(PORTS);
    const price = Number(randomPriceForType(type).toFixed(2));
    const currency = faker.helpers.arrayElement(['USD', 'EUR', 'AUD', 'IDR', 'SGD']);

    const title = `${make} ${type} — ${Math.round(length_m)}m ${year} (${condition})`;

    const description = faker.lorem.paragraphs(1);

    const images = [
      `https://picsum.photos/seed/boat-${i}-1/800/600`,
      `https://picsum.photos/seed/boat-${i}-2/800/600`,
      `https://picsum.photos/seed/boat-${i}-3/800/600`,
    ];

    const listing = repo.create({
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
      ownerId: faker.number.int({ min: 1, max: 4 }), // adjust to your users
      isActive: true,
    });

    listings.push(listing);
  }

  const saved = await repo.save(listings);
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

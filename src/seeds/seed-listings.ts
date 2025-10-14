import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Listing, ListingStatus } from '../marketplace/entities/listing.entity';
import { Vessel } from '../marketplace/entities/vessel.entity';
import { User } from '../user/entities/user.entity';
import { faker } from '@faker-js/faker';

const CATEGORIES = ['Power', 'Sail', 'Other'];
const BOAT_CLASSES = [
  'Motor Yacht', 'Cruiser', 'Express Cruiser', 'Flybridge', 'Sport Fishing',
  'Trawler', 'Center Console', 'Catamaran', 'Other',
];
const MAKES = [
  'Sea Ray', 'Beneteau', 'Hatteras', 'Bayliner', 'Carver', 'Catalina',
  'Boston Whaler', 'Jeanneau', 'Azimut', 'Sunseeker', 'Lagoon', 'Pershing', 'Riva'
];
const BOAT_TYPES = ['Sailboat', 'Motorboat', 'Yacht', 'Catamaran', 'Fishing Boat', 'Trawler', 'Speedboat'];
const CONDITIONS = ['New', 'Used'];
const PORTS = ['Marina Bay', 'Port of Singapore', 'Port Klang', 'Port of LA', 'Barcelona Port', 'Marina del Rey'];

function randomPriceForType(type: string) {
  switch (type) {
    case 'Yacht': return faker.number.float({ min: 150000, max: 5_000_000, fractionDigits: 2 });
    case 'Catamaran': return faker.number.float({ min: 80000, max: 1_200_000, fractionDigits: 2 });
    case 'Sailboat': return faker.number.float({ min: 8000, max: 250_000, fractionDigits: 2 });
    case 'Motorboat': return faker.number.float({ min: 5000, max: 200_000, fractionDigits: 2 });
    case 'Fishing Boat': return faker.number.float({ min: 3000, max: 120_000, fractionDigits: 2 });
    default: return faker.number.float({ min: 5000, max: 200_000, fractionDigits: 2 });
  }
}

async function getBoatImages(query: string, count = 3): Promise<string[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&count=${count}&client_id=${accessKey}&orientation=landscape`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Unsplash API error: ${resp.statusText}`);
    const data = await resp.json();
    return data.map((img: any) => img.urls.regular);
  } catch {
    return [
      `https://picsum.photos/seed/${query}-1/800/600`,
      `https://picsum.photos/seed/${query}-2/800/600`,
      `https://picsum.photos/seed/${query}-3/800/600`,
    ];
  }
}

async function seed(count = 20) {
  await AppDataSource.initialize();
  console.log('Data source initialized ✅');

  const listingRepo = AppDataSource.getRepository(Listing);
  const vesselRepo = AppDataSource.getRepository(Vessel);
  const userRepo = AppDataSource.getRepository(User);

  const users = await userRepo.find();
  if (!users.length) throw new Error('❌ No users found. Create users first.');

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
    const currency = faker.helpers.arrayElement(['USD', 'EUR', 'AUD', 'SGD']);

    const title = `${make} ${type} — ${Math.round(length_m)}m ${year}`;
    const description = faker.lorem.paragraph();
    const owner = faker.helpers.arrayElement(users);

    const images = await getBoatImages(type + ' boat');

    /** Step 1: Create vessel */
    const vessel = vesselRepo.create({
      vesselName: `${make} ${type} ${year}`,
      category,
      boatType: type,
      boatClass,
      make,
      model: faker.vehicle.model(),
      length_m,
      year,
      condition,
      port,
      images,
      country: faker.location.country(),
      city: faker.location.city(),
      tokenizationStatus: 'not_tokenized', // ✅ correct field instead of isTokenized
      owner: owner,                        
      ownerId: owner.id,                   
    });
    await vesselRepo.save(vessel);

    /** Step 2: Create listing linked to vessel + owner */
    const listing = listingRepo.create({
      title,
      description,
      price,
      currency,
      owner,
      vessel,
      status: ListingStatus.PUBLISHED,  // ✅ use enum, not string
      isActive: true,
      isSeed: true,
      isNewArrival: faker.datatype.boolean(),
      isFeatured: faker.datatype.boolean(),
      isPriceReduced: faker.datatype.boolean(),
      isVerified: faker.datatype.boolean(),
    });

    listings.push(listing);
  }

  const saved = await listingRepo.save(listings);
  console.log(`✅ Inserted ${saved.length} listings successfully`);
  await AppDataSource.destroy();
  console.log('Seeder finished ✅');
}

// run directly
if (require.main === module) {
  const count = Number(process.argv[2] ?? 20);
  seed(count).catch(console.error);
}

export { seed };

import { User } from 'src/user/entities/user.entity';
import { AppDataSource } from '../data-source';
import { MaritimeService } from 'src/maritime-services/entities/service.entity';

const MARINE_SERVICES = [
    {
        title: 'Hull Repair & Painting',
        description: 'Complete hull inspection, surface prep, and repainting using antifouling coatings.',
        category: 'painting',
        price: 2500,
        location: 'Fort Lauderdale, FL',
    },
    {
        title: 'Engine Overhaul & Maintenance',
        description: 'Comprehensive engine diagnostics, oil change, and part replacement.',
        category: 'mechanical',
        price: 1800,
        location: 'San Diego, CA',
    },
    {
        title: 'Electrical System Rewiring',
        description: 'Full rewiring of onboard electrical systems with modern marine-grade cabling.',
        category: 'electrical',
        price: 1200,
        location: 'Seattle, WA',
    },
    {
        title: 'Marine Electronics Installation',
        description: 'GPS, radar, and communication equipment installation and calibration.',
        category: 'electronics',
        price: 950,
        location: 'Miami, FL',
    },
    {
        title: 'Custom Stainless Fabrication',
        description: 'Bespoke stainless steel rails, davits, and mounting brackets.',
        category: 'fabrication',
        price: 2200,
        location: 'Annapolis, MD',
    },
    {
        title: 'Underwater Hull Cleaning',
        description: 'Diver-performed underwater hull cleaning and propeller inspection.',
        category: 'cleaning',
        price: 400,
        location: 'Newport Beach, CA',
    },
    {
        title: 'Fiberglass Crack & Gelcoat Repair',
        description: 'Cosmetic and structural fiberglass repairs with color-matched gelcoat.',
        category: 'fiberglass',
        price: 850,
        location: 'Tampa, FL',
    },
    {
        title: 'Boat Interior Upholstery Refit',
        description: 'Custom marine-grade fabrics and stitching for interior cushions and seating.',
        category: 'upholstery',
        price: 1600,
        location: 'Sarasota, FL',
    },
    {
        title: 'Pre-Purchase Marine Survey',
        description: 'Comprehensive survey report for pre-purchase evaluation or insurance.',
        category: 'survey',
        price: 900,
        location: 'Portsmouth, UK',
    },
    {
        title: 'Winterization & Storage Prep',
        description: 'Engine flushing, fuel stabilization, and shrink-wrap storage prep.',
        category: 'storage',
        price: 600,
        location: 'Boston, MA',
    },
    {
        title: 'Boat Hauling & Transport',
        description: 'Overland boat transport with cradle setup and insurance coverage.',
        category: 'transport',
        price: 2800,
        location: 'Houston, TX',
    },
    {
        title: 'Advanced Navigation Training',
        description: 'Hands-on training for GPS and radar navigation systems.',
        category: 'training',
        price: 500,
        location: 'Auckland, NZ',
    },
    {
        title: 'Custom Cabin Lighting Upgrade',
        description: 'LED lighting retrofit for cabins and decks with smart controls.',
        category: 'electrical',
        price: 750,
        location: 'Monaco',
    },
    {
        title: 'Antifouling Bottom Paint Application',
        description: 'Sanding, priming, and applying multi-season antifouling paint.',
        category: 'painting',
        price: 1300,
        location: 'Nice, France',
    },
    {
        title: 'Bilge Pump Installation',
        description: 'Install automatic bilge pumps and float switches for safety.',
        category: 'mechanical',
        price: 450,
        location: 'Sydney, Australia',
    },
    {
        title: 'Canvas & Bimini Fabrication',
        description: 'Custom canvas tops, covers, and enclosures with UV-resistant materials.',
        category: 'upholstery',
        price: 1000,
        location: 'San Diego, CA',
    },
    {
        title: 'Propeller Balancing & Repair',
        description: 'Prop inspection, repair, and precision balancing for optimal efficiency.',
        category: 'repair',
        price: 700,
        location: 'Fort Lauderdale, FL',
    },
    {
        title: 'Custom Helm Refit & Instrument Panel',
        description: 'Modernize your helm with new switches, gauges, and layout redesign.',
        category: 'customization',
        price: 2400,
        location: 'Miami, FL',
    },
    {
        title: 'Teak Deck Restoration',
        description: 'Sanding, re-caulking, and oiling of aged teak decks for renewal.',
        category: 'maintenance',
        price: 1900,
        location: 'Palma de Mallorca, Spain',
    },
    {
        title: 'Hydraulic Steering System Repair',
        description: 'Diagnose and repair hydraulic steering leaks and stiffness.',
        category: 'repair',
        price: 1100,
        location: 'Los Angeles, CA',
    },
];


async function seedMarineServices() {
    await AppDataSource.initialize();
    console.log('✅ Connected to database...');

    const userRepo = AppDataSource.getRepository(User);
    const serviceRepo = AppDataSource.getRepository(MaritimeService);

    const defaultUser = await userRepo.findOne({ where: { id: 4 } });
    if (!defaultUser) {
        throw new Error('⚠️ No default user found (id=1). Please create one before seeding.');
    }

    for (const service of MARINE_SERVICES) {
        const newService = serviceRepo.create({
            ...service,
            provider: defaultUser,
        });
        await serviceRepo.save(newService);
    }

    console.log(`🌊 Seeded ${MARINE_SERVICES.length} marine services successfully!`);
    await AppDataSource.destroy();
}

seedMarineServices().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});

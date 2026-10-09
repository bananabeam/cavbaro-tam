import { PrismaClient, Role, RefereeClassification, GameCategory, CertificationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting CAVBARO TAM Database Seeding ---');

  // 1. Organization Settings
  await prisma.organizationSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      orgName: 'CAVBARO TAM',
      tagline: 'Integrity on Every Call. Excellence on Every Court.',
      email: 'info@cavbarotam.ph',
      phone: '+63 917 888 1234',
      address: 'Cavite & Metro Manila Region, Philippines',
      defaultRefereeFee: 500.00,
      defaultDeductionPct: 10.00,
      currency: 'PHP',
      timezone: 'Asia/Manila',
    },
  });

  const adminPasswordHash = await bcrypt.hash('CavbaroAdmin2026!', 10);
  const refereePasswordHash = await bcrypt.hash('RefereePass123!', 10);

  // 2. Super Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cavbarotam.ph' },
    update: {},
    create: {
      email: 'admin@cavbarotam.ph',
      passwordHash: adminPasswordHash,
      role: Role.SUPER_ADMIN,
      status: 'ACTIVE',
    },
  });

  // 3. Officers
  await prisma.officer.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'President Juan Dela Cruz',
        position: 'President & Head of Officiating',
        bio: '20+ years of FIBA officiating experience.',
        displayOrder: 1,
      },
      {
        name: 'Vice President Roberto Santos',
        position: 'Vice President & Rules Technical Director',
        bio: 'Former PBA table official and instructor.',
        displayOrder: 2,
      },
    ],
  });

  // 4. Sample Referees
  const ref1User = await prisma.user.upsert({
    where: { email: 'ref.salvador@cavbarotam.ph' },
    update: {},
    create: {
      email: 'ref.salvador@cavbarotam.ph',
      passwordHash: refereePasswordHash,
      role: Role.REFEREE,
      status: 'ACTIVE',
    },
  });

  const referee1 = await prisma.referee.upsert({
    where: { userId: ref1User.id },
    update: {},
    create: {
      userId: ref1User.id,
      refereeIdNumber: 'CT-2026-001',
      firstName: 'Ramon',
      lastName: 'Salvador',
      phone: '+63 918 111 2222',
      classification: RefereeClassification.FIBA_LICENSED,
      yearsExperience: 12,
      specialization: 'Senior Mens Open & College Level',
      isTableOfficial: false,
    },
  });

  await prisma.refereeCertification.create({
    data: {
      refereeId: referee1.id,
      certificationName: 'FIBA National Referee License',
      issuingOrg: 'FIBA / SBP',
      certificateNumber: 'FIBA-PH-2024-992',
      dateIssued: new Date('2024-01-15'),
      expirationDate: new Date('2027-01-15'),
      status: CertificationStatus.VALID,
    },
  });

  console.log('--- Database Seeding Complete ---');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
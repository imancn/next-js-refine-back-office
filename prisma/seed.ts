import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default roles and users
  const users = [
    {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 12),
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
    {
      email: 'manager@example.com',
      password: await bcrypt.hash('manager123', 12),
      firstName: 'John',
      lastName: 'Manager',
      role: 'MANAGER',
      status: 'ACTIVE',
    },
    {
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 12),
      firstName: 'Jane',
      lastName: 'User',
      role: 'USER',
      status: 'ACTIVE',
    },
    {
      email: 'guest@example.com',
      password: await bcrypt.hash('guest123', 12),
      firstName: 'Guest',
      lastName: 'User',
      role: 'GUEST',
      status: 'ACTIVE',
    },
  ];

  console.log('👥 Creating users...');
  for (const userData of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: userData,
      });
      console.log(`✅ Created user: ${user.email} (${user.role})`);
    } else {
      console.log(`⏭️  User already exists: ${userData.email}`);
    }
  }

  // Create sample audit logs
  console.log('📝 Creating sample audit logs...');
  const superAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (superAdmin) {
    const auditLogs = [
      {
        userId: superAdmin.id,
        action: 'SYSTEM_INITIALIZED',
        resource: 'System',
        details: { message: 'Database seeded successfully' },
        ipAddress: '127.0.0.1',
        userAgent: 'Seed Script',
      },
      {
        userId: superAdmin.id,
        action: 'USER_CREATED',
        resource: 'User',
        details: { message: 'Default users created during seeding' },
        ipAddress: '127.0.0.1',
        userAgent: 'Seed Script',
      },
    ];

    for (const logData of auditLogs) {
      await prisma.auditLog.create({
        data: logData,
      });
    }
    console.log('✅ Created sample audit logs');
  }

  // Create sample verification tokens (for testing)
  console.log('🔐 Creating sample verification tokens...');
  const sampleUser = await prisma.user.findUnique({
    where: { email: 'user@example.com' },
  });

  if (sampleUser) {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: sampleUser.email,
        token: '123456',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      },
    });
    console.log(`✅ Created verification token for: ${sampleUser.email}`);
  }

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📋 Default Login Credentials:');
  console.log('Super Admin: admin@example.com / admin123');
  console.log('Manager: manager@example.com / manager123');
  console.log('User: user@example.com / user123');
  console.log('Guest: guest@example.com / guest123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
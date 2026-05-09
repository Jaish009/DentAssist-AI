const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateAvatar(name, gender) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % 100;
  const genderPath = gender === 'FEMALE' ? 'women' : 'men';
  return `https://randomuser.me/api/portraits/${genderPath}/${index}.jpg`;
}

async function updateAvatars() {
  try {
    const doctors = await prisma.doctor.findMany();
    console.log(`Found ${doctors.length} doctors.`);
    
    for (const doc of doctors) {
      const newUrl = generateAvatar(doc.name, doc.gender);
      await prisma.doctor.update({
        where: { id: doc.id },
        data: { imageUrl: newUrl }
      });
      console.log(`Updated ${doc.name} (${doc.gender}) -> ${newUrl}`);
    }
    
    console.log('Successfully updated all doctor avatars.');
  } catch (error) {
    console.error('Error updating avatars:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAvatars();

// Script to download car images
const https = require('https');
const fs = require('fs');
const path = require('path');

const cars = [
  {
    name: 'toyota-corolla',
    url: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&q=80',
  },
  {
    name: 'honda-city',
    url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  },
  {
    name: 'suzuki-swift',
    url: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
  },
  {
    name: 'kia-sportage',
    url: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&q=80',
  },
  {
    name: 'hyundai-elantra',
    url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
  },
  {
    name: 'toyota-yaris',
    url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
  },
  {
    name: 'honda-civic',
    url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
  },
  {
    name: 'suzuki-cultus',
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
  },
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        console.log(`❌ Failed: ${url} (Status: ${response.statusCode})`);
        reject(new Error(`Failed to download ${url}`));
      }
    }).on('error', (err) => {
      console.log(`❌ Error: ${url}`);
      reject(err);
    });
  });
};

const main = async () => {
  const outputDir = path.join(__dirname, '../public/images/cars');
  
  // Create directory if not exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚗 Downloading car images...\n');

  for (const car of cars) {
    const filepath = path.join(outputDir, `${car.name}.jpg`);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipped (exists): ${car.name}.jpg`);
      continue;
    }

    try {
      await downloadImage(car.url, filepath);
    } catch (error) {
      console.log(`Failed to download ${car.name}`);
    }
  }

  console.log('\n✅ Done downloading images!');
};

main();
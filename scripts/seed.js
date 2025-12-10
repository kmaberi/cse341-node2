const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Contact = require('../models/contacts');
const Show = require('../models/shows');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI');
  process.exit(1);
}

async function run() {
  await mongoose.connect(uri);

  const contacts = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      favoriteColor: 'Red',
      birthday: '1992-02-02'
    }
  ];

  const shows = [
    {
      title: 'The Matrix',
      director: 'Wachowski',
      year: 1999,
      genre: 'Sci-Fi',
      rating: 'PG-13',
      seasons: 3,
      episodes: 24,
      platform: 'Netflix'
    },
    {
      title: 'Breaking Bad',
      director: 'Vince Gilligan',
      year: 2008,
      genre: 'Crime',
      rating: 'TV-MA',
      seasons: 5,
      episodes: 62,
      platform: 'AMC'
    }
  ];

  for (const c of contacts) {
    await Contact.updateOne({ email: c.email }, { $set: c }, { upsert: true });
  }

  for (const s of shows) {
    await Show.updateOne({ title: s.title, year: s.year }, { $set: s }, { upsert: true });
  }

  await mongoose.connection.close();
  console.log('Seed completed');
}

run().catch(async (err) => {
  console.error('Seed error:', err.message);
  try {
    await mongoose.connection.close();
  } catch {}
  process.exit(1);
});


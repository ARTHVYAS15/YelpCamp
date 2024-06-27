const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '665eb2beec83951f54a65388',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dfd5fqdz8/image/upload/v1719057532/YelpCamp/qlfhwwc9zhwh3vrlbaif.jpg',
                    filename: 'YelpCamp/qlfhwwc9zhwh3vrlbaif'
                },
                {
                    url: 'https://res.cloudinary.com/dfd5fqdz8/image/upload/v1719057535/YelpCamp/xk0hhamcnujmvoxjawgv.jpg',
                    filename: 'YelpCamp/xk0hhamcnujmvoxjawgv'
                },
                {
                    url: 'https://res.cloudinary.com/dfd5fqdz8/image/upload/v1719057535/YelpCamp/hbkoisbcs2yushr4txwq.jpg',
                    filename: 'YelpCamp/hbkoisbcs2yushr4txwq'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
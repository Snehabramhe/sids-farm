/**
 * Seed script — populates the products collection with a realistic
 * Sid's Farm dairy catalog so the storefront looks like a real shop.
 *
 * Usage (from the server/ directory):
 *   npm run seed
 *
 * It upserts by productName, so it is safe to run repeatedly: existing
 * products are updated and new ones are inserted (no duplicate-key errors).
 */
require('dotenv').config({path: __dirname + '/../.env'});
const mongoose = require('mongoose');
const {ProductsTable} = require('../database/schema/product.schema');

const IMG = {
    cowMilk: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80',
    buffaloMilk: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
    bottleMilk: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=600&q=80',
    curd: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&q=80',
    paneer: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
    ghee: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&q=80',
    butter: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80',
    buttermilk: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=600&q=80',
    lassi: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&q=80',
    cream: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80',
    flavoredMilk: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    cheese: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&q=80',
    khoa: 'https://images.unsplash.com/photo-1606101273945-e9eba91c0dc4?w=600&q=80',
    honey: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
};

const products = [
    {productName: 'Cow Milk (500 ml)', price: 35, imageUrl: IMG.cowMilk, energy: 62, protein: 3.2, fat: 4.1, nutritionalInfo: 'Farm-fresh single-origin cow milk, pasteurised & homogenised. No preservatives.'},
    {productName: 'Cow Milk (1 L)', price: 68, imageUrl: IMG.cowMilk, energy: 62, protein: 3.2, fat: 4.1, nutritionalInfo: 'Pure cow milk delivered fresh every morning. Rich in calcium and vitamins.'},
    {productName: 'Buffalo Milk (500 ml)', price: 45, imageUrl: IMG.buffaloMilk, energy: 97, protein: 3.8, fat: 6.9, nutritionalInfo: 'Creamy full-fat buffalo milk, ideal for curd, ghee and sweets.'},
    {productName: 'Buffalo Milk (1 L)', price: 88, imageUrl: IMG.buffaloMilk, energy: 97, protein: 3.8, fat: 6.9, nutritionalInfo: 'Thick, creamy buffalo milk straight from the farm.'},
    {productName: 'A2 Gir Cow Milk (500 ml)', price: 60, imageUrl: IMG.bottleMilk, energy: 65, protein: 3.4, fat: 4.3, nutritionalInfo: 'A2 milk from desi Gir cows. Easy to digest, contains A2 beta-casein.'},
    {productName: 'Toned Milk (1 L)', price: 56, imageUrl: IMG.bottleMilk, energy: 50, protein: 3.1, fat: 1.5, nutritionalInfo: 'Low-fat toned milk for everyday tea, coffee and cooking.'},
    {productName: 'Set Curd (400 g)', price: 40, imageUrl: IMG.curd, energy: 61, protein: 3.1, fat: 3.3, nutritionalInfo: 'Thick set curd made from fresh milk with live active cultures.'},
    {productName: 'Curd (1 kg)', price: 90, imageUrl: IMG.curd, energy: 61, protein: 3.1, fat: 3.3, nutritionalInfo: 'Naturally fermented dahi, perfect for raita and buttermilk.'},
    {productName: 'Malai Paneer (200 g)', price: 95, imageUrl: IMG.paneer, energy: 265, protein: 18.3, fat: 20.8, nutritionalInfo: 'Soft, fresh cottage cheese made daily from full-cream milk.'},
    {productName: 'Malai Paneer (500 g)', price: 220, imageUrl: IMG.paneer, energy: 265, protein: 18.3, fat: 20.8, nutritionalInfo: 'Restaurant-style soft paneer with no additives.'},
    {productName: 'Cow Ghee (500 ml)', price: 380, imageUrl: IMG.ghee, energy: 900, protein: 0, fat: 99.9, nutritionalInfo: 'Aromatic ghee made from cow milk using the traditional bilona method.'},
    {productName: 'A2 Bilona Ghee (250 ml)', price: 499, imageUrl: IMG.ghee, energy: 900, protein: 0, fat: 99.9, nutritionalInfo: 'Hand-churned A2 ghee from desi cow curd. Granular and golden.'},
    {productName: 'Buffalo Ghee (500 ml)', price: 360, imageUrl: IMG.ghee, energy: 900, protein: 0, fat: 99.9, nutritionalInfo: 'Rich buffalo ghee with a deep aroma, great for festive cooking.'},
    {productName: 'White Butter (200 g)', price: 130, imageUrl: IMG.butter, energy: 717, protein: 0.9, fat: 81, nutritionalInfo: 'Unsalted homemade-style white butter (makhan) churned from cream.'},
    {productName: 'Buttermilk (500 ml)', price: 25, imageUrl: IMG.buttermilk, energy: 40, protein: 3.3, fat: 0.9, nutritionalInfo: 'Spiced chaas with curry leaves and ginger. Refreshing and light.'},
    {productName: 'Sweet Lassi (200 ml)', price: 30, imageUrl: IMG.lassi, energy: 110, protein: 3.0, fat: 3.5, nutritionalInfo: 'Thick, creamy sweet lassi made from fresh curd.'},
    {productName: 'Fresh Cream (250 ml)', price: 120, imageUrl: IMG.cream, energy: 292, protein: 2.5, fat: 30, nutritionalInfo: 'Pure dairy cream for desserts, gravies and whipping.'},
    {productName: 'Chocolate Milk (200 ml)', price: 35, imageUrl: IMG.flavoredMilk, energy: 120, protein: 3.4, fat: 3.0, nutritionalInfo: 'Flavoured chocolate milk, a wholesome treat for kids.'},
    {productName: 'Cheese Block (200 g)', price: 160, imageUrl: IMG.cheese, energy: 350, protein: 25, fat: 27, nutritionalInfo: 'Mild processed cheese block, great for sandwiches and pizzas.'},
    {productName: 'Khoa / Mawa (250 g)', price: 150, imageUrl: IMG.khoa, energy: 421, protein: 14.6, fat: 25.7, nutritionalInfo: 'Reduced-milk khoa for making authentic Indian sweets.'},
    {productName: 'Raw Forest Honey (500 g)', price: 320, imageUrl: IMG.honey, energy: 304, protein: 0.3, fat: 0, nutritionalInfo: 'Unprocessed raw honey, naturally harvested. No added sugar.'},
    {productName: 'Greek Yogurt (200 g)', price: 70, imageUrl: IMG.curd, energy: 97, protein: 9, fat: 5, nutritionalInfo: 'High-protein strained Greek yogurt, thick and creamy.'},
];

const seed = async () => {
    const mongoDBUrl = process.env.MONGO_DB_URL;
    const database = process.env.MONGO_DATABASE;
    if (!mongoDBUrl || !database) {
        console.error('MONGO_DB_URL / MONGO_DATABASE missing in server/.env');
        process.exit(1);
    }

    await mongoose.connect(mongoDBUrl, {dbName: database});
    console.log('Connected to MongoDB. Seeding products...');

    const operations = products.map((product) => ({
        updateOne: {
            filter: {productName: product.productName},
            update: {$set: product},
            upsert: true,
        },
    }));

    const result = await ProductsTable.bulkWrite(operations);
    const total = await ProductsTable.countDocuments({});
    console.log(`Done. Inserted: ${result.upsertedCount}, Updated: ${result.modifiedCount}. Total products: ${total}.`);

    await mongoose.disconnect();
    process.exit(0);
};

seed().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});

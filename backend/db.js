const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://internData:bh2024@cluster2.zl3tlbd.mongodb.net/intern_data?retryWrites=true&w=majority&appName=Cluster2'

const mongooseMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected Successfully from mongoose');

        const fetched_data_food_items = await mongoose.connection.db.collection('food_items');
        const data = await fetched_data_food_items.find({}).toArray();
            global.food_items = data;
            if(data){
                const fetched_data_foodCategory = await mongoose.connection.db.collection('foodCategory')
                const categoryData = await fetched_data_foodCategory.find({}).toArray();
                global.foodCategory = categoryData 
            }
        
            // console.log(global.food_items)
       
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

}

module.exports = mongooseMongoDB;
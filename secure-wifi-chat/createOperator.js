const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        const email = 'operator@example.com';
        const password = 'operatorpassword';
        const name = 'Operator One';

        // Check if exists
        let user = await User.findOne({ email });
        if (user) {
            console.log('Operator already exists');
            process.exit();
        }

        user = new User({ name, email, password, role: 'operator' });
        await user.save();
        console.log('Operator created successfully');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/C-KART').then(() => console.log('Connection to database sucessfull!')).catch(() => {
    console.log('Failed to connect to database!')
});

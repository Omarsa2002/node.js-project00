const   mongoose = require('mongoose');
const validator = require('validator');



const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        img: {
            type: String,
            require: true,
        },
        class: {
            type: String,
            require: true,
        },
        flight: {
            type: String,
            require: true,
        },
        car: {
            type: String,
            require: true,
        },
        hotel: {
            type: String,
            require: true,
        },
        imgCountry: {
            type: String,
            require: true,
        },
        the_popular: [
            {
                name: {
                    type: String,
                    require: true,
                },
                img: {
                    type: String,
                    require: true,
                },
                imgClass: {
                    type: String,
                    require: true,
                },
                link: {
                    type: String,
                    require: true,
                },
                description: {
                    type: String,
                    require: true,
                }
            }
        ],
        countryHotels: [
            {
                name: {
                    type: String,
                    require: true,
                },
                city: {
                    type: String,
                    require: true,
                },
                location: {
                    type: String,
                    require: true,
                },
                stars: {
                    type: Number,
                    require: true,
                },
                link: {
                    type: String,
                    require: true,
                },
                img : {
                    type: String,
                    require: true,
                },
                price: {
                    type: Number,
                    require: true
                }
            }
        ],
        guides: [
            {
                name: {
                    type: String,
                    require: true,
                },
                place: {
                    type: String,
                    require: true,
                },
                stars: {
                    type: Number,
                    require: true,
                },
                img : {
                    type: String,
                    require: true,
                }
            }
        ]
    }
);

module.exports = mongoose.model('Country', countrySchema);
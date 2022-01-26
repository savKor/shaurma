const path = require('path');

module.exports = {
    entry: {
        home:'./src/home-page.js',
        'shop-cart':'./src/shop-cart.js', 
        ragistration:'./src/registration-page.js',
        login:'./src/login-page.js'
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
        }
        ]
    }
};
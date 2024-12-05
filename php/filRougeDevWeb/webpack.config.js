const path = require('path');

module.exports = {
    entry: './assets/app.js', // Point d'entrée principal
    output: {
        filename: 'app.bundle.js', // Fichier JS généré
        path: path.resolve(__dirname, 'public/build'), // Chemin de sortie
        publicPath: '/build/', // Chemin public pour servir les assets
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpile JavaScript moderne
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.scss$/, // Compile SCSS vers CSS
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/, // Gestion des fichiers image
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
        ],
    },
    mode: 'development', // Mode par défaut
};
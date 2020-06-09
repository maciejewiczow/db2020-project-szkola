const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const fronted_base_dir = "src/app/frontend"

module.exports = {
    entry: path.resolve(__dirname, fronted_base_dir, './index.tsx'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, fronted_base_dir, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '*']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: fronted_base_dir + '/index.html',
            filename: './index.html'
        })
    ]
}

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js'
  },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   port: 3000,
   static : false,
   historyApiFallback: true,
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
  module: {
        
    rules: [

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader",
          }
        },

        {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader,'css-loader']
          },

        {
            test: /\.(jpg|jpeg|gif|png)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: 'images',
                    outputPath: 'images',
                }
            }
        },

        {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: 'fonts',
                    outputPath: 'fonts',
                }
            }
        },
    ]
,
},
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }), new MiniCssExtractPlugin()],
}

/*
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        chunkFilename: "main.[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    module: {
        
            rules: [

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    }
                },

                {
                    test: /\.css$/i,
                    exclude: /node_modules/,
                    use: [
                      'style-loader',
                      {
                        loader: 'css-loader',
                        options: {
                          modules: true,
                        },
                      },
                    ],
                  },

                {
                    test: /\.(jpg|jpeg|gif|png)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'images',
                            outputPath: 'images',
                        }
                    }
                },

                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'fonts',
                            outputPath: 'fonts',
                        }
                    }
                },
            ]
        ,
    }
}
*/
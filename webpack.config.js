var htmlwp = require('html-webpack-plugin');
module.exports={
    entry:'./src/main.js',
    output:{
        path : __dirname+'/dv',
        filename:'xy.js'
    },
    module:{
        loaders:[
            {
                test: /\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader:'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.less/,
                loader:'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg)$/,
                loader:'url-loader?limit=20000'
            },
            //{
            //    test: /\.js$/,
            //    loader:'babel-loader',
            //    exclude:/node_modules/
            //},
            {
                test: /.vue$/,
                loader:'vue-loader'
            },
            //{
            //    test:/vue-preview.src.*?js$/,
            //    loader:'babel'
            //}
        ]
    },
    //babel:{
    //    presets:['es2015'],
    //    plugins:['transform-runtime']
    //},
    plugins:[
        new htmlwp({
            title: '首页',
            filename: 'index.html',
            template: 'index1.html'
        })
    ]
}
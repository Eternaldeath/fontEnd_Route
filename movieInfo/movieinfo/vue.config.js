module.exports = {
    publicPath : '/movie',
    devServer: {
            proxy: {
            //   /api 部分填写需要对哪些请求进行代理
            '/ajax': {
                target: 'https://m.maoyan.com/',
                // target: 'https://www.softeem.xin/maoyanApi/',
            //   ws: true,
                changeOrigin: true
            },
            // '/ajax/search?kw':{
            //     target:'https://m.maoyan.com/',
            //     changeOrigin:true
            // }
            // '/foo': {
            //   target: '<other_url>'
            // }
            }
        }
}
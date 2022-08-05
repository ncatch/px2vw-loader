把样式中的px 转化为 vw

计算方式为 px / 19.2vw | px / 4.14vw;

webpack 配置：
module: {
    rules: [{
        test: /\.less$/,
        // 只处理目录下的文件
        include: [
            path.join(__dirname, 'src/adaptionPages'),
        ],
        use: [
            {
                loader: path.resolve(__dirname, "./loader/less-extends-loader.js"),
                options:{
                    pc: "@vw", // 可使用具体值 19.2vw 也可使用变量（在代码中必须声明）
                    mobileWidth: "768px|@mobile-width",
                    mobile: "@vwm", // 4.14vw
                },
            },
        ]
    }]
}

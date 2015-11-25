#barrage-nw


##开发
```
npm install


webpack -w //watch menu.js 也就是使用了react 写的一个东西
//其他部分都是写在html里面

nw . //启动应用，如果是开发模式下可以把menu.html 里面的关于 dev.js的script注释取消掉加载进来

// gulp stage 打包成stage模式下的应用


// gulp production 打包成生产环境下的应用，主要是里面的server_url是不一样的

```

##简介

用了nw.js 开发的应用，然后主要的程序用的是react，因为es6需要babel来弄一下，而webpack是很棒的东西


###目录说明
build 是当你打包程序之后会产生的
cache 是默认的去下载nw的目录
dist 是webpack打包出的js的存放目录

resource 是一个近乎干净的主要程序的目录，也就是去掉了src等，直接将需要的复制进去，用于打包程序用的

src 是程序主要的目录，也就是react程序的目录
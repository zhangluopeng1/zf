
注意

凡是以这个模板开发的项目, 都需要从这个项目的 master 分支分发出去, 改动文件规则请看规则

如果安装 yarn or npm i 缓慢, 请先更换为中国镜像. 这里推荐用自带 CMD or PowerShell 否则有权限问题



上手开发



克隆项目代码
预装好 node.js 12+ 安装包
如果使用 vscode 开发,可使用我们推荐的 vscode 配置 你也可以选择自定义配置(命令: cp vscode.config/ .vscode/ -rf)
安装项目的依赖 npm i 或使用 yarn (需要预装，命令：npm i -g yarn)

修改开发环境代理 ip 配置 文件在 .env.local

确认安装依赖无错，即可运行 npm run dev

打包压缩
npm run build  文件夹中会出现dist文件夹 将他剪切放入服务器即可

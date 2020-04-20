# 项目开始
## 码云(github的国内版)
+ 1. git init  创建本地仓库
+ 2. git status 查看现在的状态
+ 3. git add . 添加到暂存区
+ 4. git commit -m "init my product" 提交到本地仓库
+ 5. git remote add origin https://gitee.com/lock92/cloud_shopping.git 绑定远程仓库地址
+ 6. git push -u origin master  如果弹出输入账号密码 就输入码云的账号密码

### 同命令修改后的代码上传到码云(github的国内版)
1. git add .
2. git commit -m "提交信息"
3. git push

### 可视化工具 vscode 提交至远程仓库
 * 点击 +
 * 输入框输入修改的信息
 * 点击上面的 √ 提交至本地仓库
 * 点击 ... 的推送 提交远程仓库

## 制作首页App组件
1. 使用 Mint-ui 完成 Header 头部
2. 使用 MUI框架 完成 footer 底部
    + 注意这里MUI没有购物车图标，需要导入bootstrap
    + bootstrap 使用3.x.x版本，4以后图标被分离了
    + 需要在配置文件中配置 {test:/\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'}
    + 类名添加 mui-icon 可以保证和MUI格式一致
3. 在中间放置一个 router-view 来展示路由组件 
    + 创建路由模块，引入路由
    + 引入Mint-ui中轮播图
        - 安装 vue-resource
        - 导入 vue-resource  获取ajax数据
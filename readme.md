# 小程序组件 taro-city-picker

小程序中国地区选择器



## 使用

- 下载项目代码

```bash
git clone https://github.com/liuchuancong/taro-city-picker.git
```

- 进入目录安装依赖，国内用户推荐使用 cnpm 进行加速

```bash
npm i
```

或者

```bash
yarn  i
```

或借助 cnpm 加速

- 启动本地服务器

```bash
npm run dev:weapp # 微信小程序
npm run dev:qq # qq小程序
```

- 用开发者工具打开代码目录,记得把 appid 改成自己的,或者点击测试号,如果不改就默认是作者的,以防万一不能访问,最好改成自己或测试的.
- 在修改代码或添加新页面之后,工具中页面样式发生错乱,反复查找问题还未解决,建议重启服务和开发工具,有意想不到的效果.

## 项目中使用

- 在代码中 import 并按照文档说明使用

```bash
import NavBar from 'taro-navigationbar';
```

## 示例代码

```bash
<!--WXML示例代码-->
<NavBar
          title='有返回和home'
          background='#fff'
          back
          home
          onBack={this.handlerGobackClick}
          onHome={this.handlerGohomeClick}
        />
```

更多使用方式请移步[仓库地址](https://github.com/lingxiaoyi/Taro-navigation-bar)查看 demo 和使用方式.

## 属性列表

| 属性               | 类型         | 默认值     | 必填 | 说明                                                                                                                       |
| ------------------ | ------------ | ---------- | ---- | -------------------------------------------------------------------------------------------------------------------------- |
| ext-class          | string       |            | 否   | 添加在组件内部结构的 class，可用于修改组件内部的样式                                                                       |
| title              | string       |            | 否   | 导航标题，如果不提供，则名为 renderCenter 的 slot 有效                                                                     |
| background         | string       | #ffffff    | 否   | 导航背景色                                                                                                                 |
| backgroundColorTop | string       | background | 否   | 导航下拉背景色,默认取 background 的颜色,不理解[见 issue 问题](https://github.com/lingxiaoyi/Taro-navigation-bar/issues/15) |
| color              | string       | #000000    | 否   | 导航字体颜色                                                                                                               |
| iconTheme          | string       | black      | 否   | 主题图标和字体颜色,当背景色为深色时,可以设置'white'                                                                        |
| back               | boolean      | false      | 否   | 是否显示返回按钮，默认点击按钮会执行 navigateBack，如果为 false，则名为 renderLeft 的 slot 有效                            |
| home               | boolean      | false      | 否   | 是否显示 home 按钮，执行方法自定义,或者看例子                                                                              |
| searchBar          | boolean      | false      | 否   | 是否显示搜索框，默认点击按钮会执行 onSearch，如果为 false，则名为 renderCenter 的 slot 有效                                |
| searchText         | string       | 点我搜索   | 否   | 搜索框文字                                                                                                                 |
| onHome             | eventhandler |            | 否   | 在 home 为 true 时，点击 home 按钮触发此事件                                                                               |
| onBack             | venthandler  |            | 否   | 在 back 为 true 时，点击 back 按钮触发此事件，detail 包含 delta                                                            |
| onSearch           | eventhandler |            | 否   | 在 searchBar 为 true 时，点击 search 按钮触发此事件                                                                        |

## 注意

- iconTheme 设置为 white 的时候,一定要记得自己去 json 文件设置"navigationBarTextStyle": "white"
- 跳转搜索页面,在 Android 机子会出现文字被键盘弹起顶出 input 框,解决方案是页面设置一个死的高度不要高于 windowHeight - navheight. 例子中是写死 500px,或者可以在 didMount 中通过 JS 计算赋值页面高度.
- input 框文字抖动问题我是借鉴别人写的,可以最大限度减小文字抖动的大小,提升用户体验.
- title searchBar renderCenter 如果全部有内容,是这样的先后显示顺序.
- 默认配置满足不了功能的,请使用 slot 功能,见例子 1 6 7[仓库地址](https://github.com/lingxiaoyi/Taro-navigation-bar)
- 由于本人精力有限,只测试了常规的 20 多款手机.如有哪种机型出现问题,请备注机型和小程序版本库.本人会以最快方式解决问题.
- 用法和测试 demo 请 clone 代码[仓库地址](https://github.com/lingxiaoyi/Taro-navigation-bar)

## 后续

- 还需要其他样子的例子请留言,如果功能比较重要和主流的话,我会考虑第一时间添加

~
创作不易,如果对你有帮助，请给个星星 star✨✨ 谢谢
~


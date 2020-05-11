# 小程序组件 taro-city-picker

小程序中国地区选择器，采用动态数据渲染，避免第一次打开全部预读所有数据。ui可以自定义，让你的小程序更加完美！

## 使用

- 下载项目代码

```bash
git clone https://github.com/liuchuancong/taro-city-picker.git
```

- 启动本地服务器

```bash
npm run dev:weapp # 微信小程序
npm run dev:qq # qq小程序
```

- 用开发者工具打开代码目录,记得把 appid 改成自己的,或者点击测试号,如果不改就默认是作者的,以防万一不能访问,最好改成自己或测试的.
- 在修改代码或添加新页面之后,工具中页面样式发生错乱,反复查找问题还未解决,建议重启服务和开发工具,有意想不到的效果.

## 项目中使用

- 进入目录安装依赖，国内用户推荐使用 cnpm 进行加速
- npm 使用方式移步[仓库地址](https://www.npmjs.com/package/city_pickers)

```bash
 npm i city_pickers --save
```

```bash
import CityPicker from 'city_pickers'
```

## 示例代码

```bash
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import CityPicker from 'city_pickers'
export default class Index extends Component {

  state = {
    isOpen: false
  };
  constructor(props){
    super(props);
    this.togglePicker = this.togglePicker.bind(this);
    this.getPickerSelected = this.getPickerSelected.bind(this);
  }
  togglePicker() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  getPickerSelected(val) {
    this.togglePicker();
    console.log(val);
  }
  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <CityPicker
          openState
          onPickerClose={this.togglePicker}
          onPickerConfirm={this.getPickerSelected}
        />
      </View>
    )
  }
}

```

更多使用方式请移步[仓库地址](https://github.com/liuchuancong/taro-city-picker)查看 demo 和使用方式.

## 属性列表

| 属性               | 类型         | 默认值                        | 必填 | 说明      |
| -----------------  | ------------ | -----------------------------| ---- | ----------------------- |
| selecedLocation    | Array        |["110000", "110100", "110101"]| 否   |                                                               |
| single             | boolean      |                              | 否   | 下方是否出现两个按钮             |
| color              | string       | #1aad19                      | 否   | 确定按钮的背景颜色  |
| textColor          | string       | #fff                         | 否   | 确定按钮的文字颜色 |
| indicatorStyle     | string       | 'height: 50rpx;'             | 否   | indicatorStyle   |
| indicatorClass     | string       |                              | 否   | indicatorClass|    |
| maskClass          | string       |                              | 否   | maskClass                            |
| maskStyle          | string       |                              | 否   | maskStyle       |
| openState          | boolean      | false                        | 是   | 控制选择器的打开和关闭             |
| height             | string       |                              | 否   | 选择器container的高         |
| `onPickerClose()`  | Function     |                              | 是   | 点击选择器取消或者背景时触发                                                             |
| `onPickerConfirm()`| Function     |                              | 是   | 点击选择器确定时触发,可以拿到回调信息  

更多使用方式请移步[微信参考文档](https://developers.weixin.qq.com/miniprogram/dev/component/picker-view.html)查看属性和使用方式.

## 后续

- 还需要其他样子的例子请留言,如果功能比较重要和主流的话,我会考虑第一时间添加

~
创作不易,如果对你有帮助，请给个星星 star✨✨ 谢谢
~

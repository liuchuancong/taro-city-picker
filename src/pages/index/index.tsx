import Taro, { Component, Config } from "@tarojs/taro";
import { View,  Button } from "@tarojs/components";
import "./index.scss";
const myPluginInterface = Taro.requirePlugin("myPlugin");

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页",
    usingComponents: {
      "city-picker": "plugin://myPlugin/city-picker"
    }
  };
  state = {
    isOpen: false
  };
  constructor(props){
    super(props);
    this.togglePicker = this.togglePicker.bind(this);
    this.getPickerSelected = this.getPickerSelected.bind(this);
  }
  componentWillMount() {
    myPluginInterface.sayHello();
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
  render() {
    const extraProps = {
      openState: this.state.isOpen,
      onPickerClose: this.togglePicker,
      onPickerConfirm: this.getPickerSelected,
    };
    return (
      <View className="index">
        <Button onClick={()=>this.togglePicker()}>{this.state.isOpen ? "关闭" : "打开"}picker</Button>
        <CityPicker
        extraProps={extraProps}
        ></CityPicker>
      </View>
    );
  }
}

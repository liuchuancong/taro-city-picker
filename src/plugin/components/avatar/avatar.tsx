import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./avatar.scss";
interface IProps {
  text: string;
}

export default class Avatar extends Component<IProps, {}> {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <View>
        <Text>{this.props.text}</Text>
        <Text>！！！！！！！！！！！！！</Text>
      </View>
    );
  }
}

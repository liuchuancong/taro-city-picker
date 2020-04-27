import Taro, { Component } from "@tarojs/taro";

import {
  View,
  Button,
  PickerView,
  PickerViewColumn,
  Text
} from "@tarojs/components";

import "./city-picker.scss";
import { provincesData, citiesData } from "./city";

interface Props {
  openState: boolean;
  onPickerClose: Function;
  onPickerConfirm: Function;
  selecedLocation: Array<string>;
  single?: boolean;
  color?:string,
  textColor?: string,
  height?:string,
  indicatorStyle?:string,
  indicatorClass?:string,
  maskClass?:string,
  maskStyle?:string,
}
interface State {
  value: Array<number>;
  provinces: Array<string>;
  provice: string;
  cities: Array<string>;
  city: string;
  areas: Array<string>;
  area: string;
}

const _defaultProps = {
  selecedLocation: ["110000", "110100", "110101"],
  single: true,
  color: '#1aad19',
  textColor: '#fff',
  height: '400',
  indicatorStyle:'height: 50rpx;',
  indicatorClass:'',
  maskClass:'',
  maskStyle:'',
};

export default class CityPicker extends Component<Props, State> {
  static defaultProps = _defaultProps;
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.initData();
  }

  getLocationInfomation(pickCodeArr) {
    const selecedArr: Array<string> = pickCodeArr;
    const provincesArr: Array<string> = [];
    const citiesArr: Array<string> = [];
    const areasArr: Array<string> = [];
    for (const province in provincesData) {
      if (provincesData.hasOwnProperty(province)) {
        const provinceData: string = provincesData[province];
        provincesArr.push(provinceData);
        if (province == selecedArr[0]) {
          //选择的城市
          for (const cities in citiesData[selecedArr[0]]) {
            //得到市的列表
            citiesArr.push(citiesData[selecedArr[0]][cities].name);
            if (cities == selecedArr[1]) {
              for (const area in citiesData[cities]) {
                //得到全区
                const areaData = citiesData[cities][area];
                areasArr.push(areaData.name);
              }
            }
          }
        }
      }
    }
    return {
      provincesArr,
      citiesArr,
      areasArr
    };
  }

  initData() {
    const codeArr = this.props.selecedLocation;
    const { selectedIndexArr, selectedLocationArr } = this.getIndexFromCode(
      codeArr
    );
    const { provincesArr, citiesArr, areasArr } = this.getLocationInfomation(
      codeArr
    );
    this.state = {
      provinces: provincesArr,
      provice: selectedLocationArr[0],
      cities: citiesArr,
      city: selectedLocationArr[1],
      areas: areasArr,
      area: selectedLocationArr[2],
      value: selectedIndexArr
    };
  }
  getIndexFromCode(pickIndexArr: any = []) {
    const selecedArr: Array<string> =
      pickIndexArr || this.props.selecedLocation || [];
    const selectedIndexArr: Array<number> = [];
    const selectedLocationArr: Array<string> = [];
    //得到省的索引和名称
    const nationWide = Object.keys(provincesData);
    this.pushIndex(nationWide, selecedArr[0], selectedIndexArr);
    const provinces = Object.values(provincesData);
    selectedLocationArr.push(provinces[selectedIndexArr[0]]);
    // 得到城市的索引和名称
    if (selecedArr[1]) {
      const cityWide = Object.keys(citiesData[selecedArr[0]]);
      this.pushIndex(cityWide, selecedArr[1], selectedIndexArr);
      const cities: Array<any> = Object.values(citiesData[selecedArr[0]]);
      selectedLocationArr.push(cities[selectedIndexArr[1]].name);
    }
    // 得到区的索引和名称
    if (selecedArr[2]) {
      const wholeArea = Object.keys(citiesData[selecedArr[1]]);
      this.pushIndex(wholeArea, selecedArr[2], selectedIndexArr);
      const areas: Array<any> = Object.values(citiesData[selecedArr[1]]);
      selectedLocationArr.push(areas[selectedIndexArr[2]].name);
    }
    return { selectedIndexArr, selectedLocationArr };
  }
  pushIndex(arr, key, selecedArr) {
    if (arr.indexOf(key) != -1) {
      selecedArr.push(arr.indexOf(key));
    }
  }
  getCodeFromIndex(indexArr) {
    const selecedArr: Array<number> = indexArr;
    const selectedCodeArr: Array<string> = [];
    const nationWide = Object.keys(provincesData);
    selectedCodeArr.push(nationWide[selecedArr[0]]);
    if (citiesData.hasOwnProperty(nationWide[selecedArr[0]])) {
      const cityWide = Object.keys(citiesData[nationWide[selecedArr[0]]]);
      selectedCodeArr.push(cityWide[selecedArr[1]]);
      if (citiesData.hasOwnProperty(cityWide[selecedArr[1]])) {
        const wholeArea = Object.keys(citiesData[cityWide[selecedArr[1]]]);
        selectedCodeArr.push(wholeArea[selecedArr[2]]);
      }
    }

    // 得到区的code

    return selectedCodeArr;
  }
  whenLocationUpdate(arr) {
    const codeArr = this.getCodeFromIndex(arr);
    const pickArr = this.getIndexFromCode(codeArr);
    const { provincesArr, citiesArr, areasArr } = this.getLocationInfomation(
      codeArr
    );
    this.setState(
      {
        provinces: provincesArr,
        provice: pickArr.selectedLocationArr[0],
        cities: citiesArr,
        city: pickArr.selectedLocationArr[1]
          ? pickArr.selectedLocationArr[1]
          : "",
        areas: areasArr,
        area: pickArr.selectedLocationArr[2]
          ? pickArr.selectedLocationArr[2]
          : ""
      },
      () => {
        this.setState({
          value: arr
        });
      }
    );
  }
  onClosePciker() {
    this.props.onPickerClose();
  }
  getUpdataCodeArr(tempArr) {
    const upDataArr: Array<number> = [];
    const currentIndexArr = this.state.value;
    if (currentIndexArr[0] != tempArr[0]) {
      upDataArr.push(tempArr[0], 0, 0);
    } else if (
      currentIndexArr[0] == tempArr[0] &&
      currentIndexArr[1] != tempArr[1]
    ) {
      upDataArr.push(tempArr[0], tempArr[1], 0);
    } else if (
      currentIndexArr[0] == tempArr[0] &&
      currentIndexArr[1] == tempArr[1] &&
      currentIndexArr[2] != tempArr[2]
    ) {
      upDataArr.push(tempArr[0], tempArr[1], tempArr[2]);
    }
    return upDataArr;
  }
  onChange = e => {
    this.whenLocationUpdate(this.getUpdataCodeArr(e.detail.value));
  };
  onSelectedPciker() {
    const params: any = {};
    const { provice, city, area } = this.state;
    params.provice = provice;
    if (city) params.city = city;
    if (area) params.area = area;
    this.props.onPickerConfirm(params);
  }

  getFooterView() {
    const { single,color,textColor } = this.props;
    if (single) {
      return (
        <View className="layout-footer">
          <View className="btn-single">
            <Button
              type="primary"
              style={`background: ${color};color:${textColor}`}
              className="layout-footer-button-single  border-radius"
              onClick={this.onSelectedPciker.bind(this)}
            >
              确定
            </Button>
          </View>
        </View>
      );
    }
    return (
      <View className="layout-footer">
        <View className="btn">
          <Button
            className="layout-footer-button"
            onClick={this.onClosePciker.bind(this)}
          >
            取消
          </Button>
        </View>
        <View className="btn">
          <Button
            type="primary"
            style={`background: ${color};color:${textColor}`}
            className="layout-footer-button  border-radius"
            onClick={this.onSelectedPciker.bind(this)}
          >
            确定
          </Button>
        </View>
      </View>
    );
  }
  render() {
    const { openState } = this.props;
    return (
      <View className={openState ? "float-layout active" : "float-layout"}>
        <View
          className="float-layout__overlay"
          onClick={this.onClosePciker.bind(this)}
        ></View>
        <View className="float-layout__container layout">
          <View className="layout-header">
            <View className="picker-header">
              <Text className="text">
                {this.state.provice}
                {this.state.city}
                {this.state.area}
              </Text>
            </View>
          </View>
          <View className="layout-body">
            <View className="page-body">
              <View className="page-section">
                <PickerView
                  indicatorStyle={this.props.indicatorStyle}
                  indicatorClass={this.props.indicatorClass}
                  maskClass={this.props.indicatorClass}
                  maskStyle={this.props.indicatorClass}
                  style={`height: ${this.props.height}rpx`}
                  value={this.state.value}
                  onChange={this.onChange}
                >
                  <PickerViewColumn>
                    {this.state.provinces.map((item, index) => {
                      return (
                        <View className="picker-text-line" key={index}>
                          <Text className="text-style">{item}</Text>
                        </View>
                      );
                    })}
                  </PickerViewColumn>

                  <PickerViewColumn>
                    {this.state.cities.length > 0 &&
                      this.state.cities.map((item, index) => {
                        return (
                          <View className="picker-text-line" key={index}>
                            <Text className="text-style">{item}</Text>
                          </View>
                        );
                      })}
                  </PickerViewColumn>
                  <PickerViewColumn>
                    {this.state.areas.length > 0 &&
                      this.state.areas.map((item, index) => {
                        return (
                          <View className="picker-text-line" key={index}>
                            <Text className="text-style">{item}</Text>
                          </View>
                        );
                      })}
                  </PickerViewColumn>
                </PickerView>
              </View>
            </View>
          </View>
          {this.getFooterView()}
        </View>
      </View>
    );
  }
}

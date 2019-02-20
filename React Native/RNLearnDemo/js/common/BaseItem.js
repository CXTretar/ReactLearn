import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PropTypes} from 'prop-types';

export default class BaseItem extends Component {

    static propTypes = {
        projectModel: PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
        }
    }
    // 将 props 中的属性和 state 绑定, 当 props属性变化时state也会变化,并且重新渲染
    static getDerivedStateFromProps(nextProps, prevState) {
        const isFavorite = nextProps.projectModel.isFavorite;
        if (prevState.isFavorite !== isFavorite) {
            return {
                isFavorite: isFavorite,
            };
        }
        return null;
    }

    setFavoriteState(isFavorite) {
        console.log(`isFavorite${isFavorite}`);
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
        });
    }
    // 设置详情界面的callback函数
    onItemClick() {
        this.props.onSelect(
            (isFavorite) => {
                this.setFavoriteState(isFavorite);
            }
        )
    }

    onPressFavorite() {
        console.log(this.state.isFavorite);
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
    }


    _favoriteIcon() {
        const {theme} = this.props;
        return <TouchableOpacity
            style={{padding: 6}}
            underlayColor='transparent'
            onPress={() => {
                this.onPressFavorite()
            }}
        >
            <FontAwesome
                name={this.state.isFavorite ? 'star' : 'star-o'}
                size={26}
                style={{color: theme.themeColor}}
            />

        </TouchableOpacity>
    }


}
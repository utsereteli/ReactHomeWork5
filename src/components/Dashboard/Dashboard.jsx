import React, { Component } from 'react';
import GlobalInfo from './GlobalInfo/GlobalInfo';
import TotalPercentage from './TotalPercentage/TotalPercentage';
import Statistic from './Statistic/Statistic';
import axios from "axios";

import '../Dashboard/Dashboard.scss';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageSelect: 25,
            filtered: ''
        };
    }

    setSelect = (value) => {
        this.setState({ pageSelect: value });
    };

    search = (value) => {
        this.setState({ filtered: value });
    }


    componentDidMount() {
        axios
            .get(`https://api.covid19api.com/summary`)
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch(() => {
                console.error('Error');
            });
    }


    render() {
        return (
            <>
                <GlobalInfo
                    data={this.state.data}
                />

                <TotalPercentage
                    data={this.state.data}
                />

                <Statistic
                    data={this.state.data}
                    setSelect={this.setSelect}
                    pageSelect={this.state.pageSelect}
                    search={this.search}
                    filtered={this.state.filtered}
                />
            </>
        );
    }
}

import React, { Component } from 'react';
import _ from 'lodash';

//npm install lodash

class Picker extends Component {
    state = {
        times: {

        }
    }

    changeTimesOpen = (e) => {
        let obj = e.target.className
        const result = _.get(this.state.times, obj, "")
        let Close = ""
        if (result) {
            Close = _.get(result, 'Close', "")
        }
        this.setState({
            times: {
                ...this.state.times,
                [e.target.className]: {
                    Open: e.target.value,
                    Close
                }
            }
        })
    }
    changeTimesClose = (e) => {
        let obj = e.target.className
        const result = _.get(this.state.times, obj, "")
        let Open = ""
        if (result) {
            Open = _.get(result, 'Open', "")
        }
        this.setState({
            times: {
                ...this.state.times,
                [e.target.className]: {
                    Close: e.target.value,
                    Open
                }
            }
        })
    }
    changeDate = (e) => {
        if (e.target.checked) {
            this.setState({
                times: {
                    ...this.state.times,
                    [e.target.name]: { Open: "", Close: "" }
                }
            })
        } else if (!e.target.checked) {
            this.setState({
                times: {
                    ...this.state.times,
                    [e.target.name]: ""
                }
            })
        }
    }

    validateTimes = () => {
        let arr = Object.entries(this.state.times)
        let data = []
        if (arr.length === 0) {
          return false
        }
        for (let i = 0; i < arr.length; i++) {
          if (typeof arr[i][1] !== 'string') {
            if (!arr[i][1].Open || !arr[i][1].Close) {
              return false
            }
            data.push(arr[i])
          }
        }
        return data
    }

    BikinSpot = () => {
        const operatingTimes = this.validateTimes()
        if (operatingTimes) {
            // axios post bikin karna udah di validasi
        } else {
            // alest tentang waktu masih ada yang kosong
        }
    }
    render() {
        return (
            <div>
                {/* GANTI:
                name, className = hari 
                checked = this.state.items{HARI}
                value = this.state.times.{HARI} ? this.state.times.{HARI}.Open 
                */}


                {/* Hari Minggu */}
                <div>
                    <input onChange={this.changeDate} type="checkbox" name="Sunday" className="Sunday" checked={this.state.times.Sunday ? true : false} /> Sunday
                    <input onChange={this.changeTimesOpen} type="time" name="Open" className="Sunday" value={this.state.times.Sunday ? this.state.times.Sunday.Open : null} />
                    <input onChange={this.changeTimesClose} type="time" name="Close" className="Sunday" value={this.state.times.Sunday ? this.state.times.Sunday.Close : null} />
                </div>
                {/* Hari Senin */}
                <div>
                    <input onChange={this.changeDate} type="checkbox" name="Monday" className="Monday" checked={this.state.times.Monday ? true : false} /> Monday
                    <input onChange={this.changeTimesOpen} type="time" name="Open" className="Monday" value={this.state.times.Monday ? this.state.times.Monday.Open : '--:--'} />
                    <input onChange={this.changeTimesClose} type="time" name="Close" className="Monday" value={this.state.times.Monday ? this.state.times.Monday.Close : '--:--'} />
                </div>

                <button onClick={() => { console.log(this.state) }}>check state</button>
            </div>
        );
    }
}

export default Picker;
import React, { Component } from 'react'
import _ from 'lodash';

class OpenHours extends Component {

    state = {
        times: {}
    }


    // changeDate = (e) => {
    //     if (e.target.checked) {
    //         this.setState({
    //             times: {
    //                 ...this.state.times,
    //                 [e.target.name]: { Open: "", Close: "" }
    //             }
    //         })
    //     } else if (!e.target.checked) {
    //         this.setState({
    //             times: {
    //                 ...this.state.times,
    //                 [e.target.name]: ""
    //             }
    //         })
    //     }
    // }

    changeDate = e => {
        let times = this.state.times;
        if (e.target.checked) {
            times = {
                ...this.state.times,
                [e.target.name]: { Open: null, Close: null }
            }
        } else {
            times = {
                ...this.state.times,
                [e.target.name]: null
            }
        }
        this.setState({ times });
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
        }, this.sendSelectedOpenHours)
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
        }, this.sendSelectedOpenHours)
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

    sendSelectedOpenHours = () => {
        // console.log('masuk');
        this.props.OpenHoursCallBack(this.state.times)
    }


    render() {

        return (
            <div className="form-group">
                {/* <label>Operating Time</label> <br /> */}

                <div className="custom-control custom-checkbox">
                    <div>
                        <input type="checkbox" className="custom-control-input Monday" id="Monday" name="Monday" onChange={this.changeDate} checked={this.state.times.Monday ? true : false} />
                        <label className="custom-control-label" for="Monday">Monday</label>
                    </div>
                    <div>
                        <input onChange={this.changeTimesOpen} type="time" name="Open" className="Monday" value={this.state.times.Monday ? this.state.times.Monday.Open : '--:--'} /> to <nbsp /><nbsp />
                        <input onChange={this.changeTimesClose} type="time" name="Close" className="Monday" value={this.state.times.Monday ? this.state.times.Monday.Close : '--:--'} />
                    </div>
                </div>
                <div className="custom-control custom-checkbox">
                    <div>
                        <input type="checkbox" className="custom-control-input Tuesday" id="Tuesday" name="Tuesday" onChange={this.changeDate} checked={this.state.times.Tuesday ? true : false} />
                        <label className="custom-control-label" for="Tuesday">Tuesday</label>
                    </div>
                    <div>
                        <input onChange={this.changeTimesOpen} type="time" name="Open" className="Tuesday" value={this.state.times.Tuesday ? this.state.times.Tuesday.Open : '--:--'} /> to <nbsp /><nbsp />
                        <input onChange={this.changeTimesClose} type="time" name="Close" className="Tuesday" value={this.state.times.Tuesday ? this.state.times.Tuesday.Close : '--:--'} />
                    </div>
                </div>
                <div className="custom-control custom-checkbox">
                    <div>
                        <input type="checkbox" className="custom-control-input Wednesday" id="Wednesday" name="Wednesday" onChange={this.changeDate} checked={this.state.times.Wednesday ? true : false} />
                        <label className="custom-control-label" for="Wednesday">Wednesday</label>
                    </div>
                    <div>
                        <input onChange={this.changeTimesOpen} type="time" name="Open" className="Wednesday" value={this.state.times.Wednesday ? this.state.times.Wednesday.Open : '--:--'} /> to <nbsp /><nbsp />
                        <input onChange={this.changeTimesClose} type="time" name="Close" className="Wednesday" value={this.state.times.Wednesday ? this.state.times.Wednesday.Close : '--:--'} />
                    </div>
                </div>
                <div className="custom-control custom-checkbox">
                    <div>
                        <input type="checkbox" className="custom-control-input Thursday" id="Thursday" name="Thursday" onChange={this.changeDate} checked={this.state.times.Thursday ? true : false} />
                        <label className="custom-control-label" for="Thursday">Thursday</label>
                    </div>
                    <div>
                        <input onChange={this.changeTimesOpen} type="time" name="Open" className="Thursday" value={this.state.times.Thursday ? this.state.times.Thursday.Open : '--:--'} /> to <nbsp /><nbsp />
                        <input onChange={this.changeTimesClose} type="time" name="Close" className="Thursday" value={this.state.times.Thursday ? this.state.times.Thursday.Close : '--:--'} />
                    </div>
                </div>
                <div className="custom-control custom-checkbox">
                    <div>
                        <input type="checkbox" className="custom-control-input Friday" id="Friday" name="Friday" onChange={this.changeDate} checked={this.state.times.Friday ? true : false} />
                        <label className="custom-control-label" for="Friday">Friday</label>
                    </div>
                    <div>
                        <input onChange={this.changeTimesOpen} type="time" name="Open" className="Friday" value={this.state.times.Friday ? this.state.times.Friday.Open : '--:--'} /> to <nbsp /><nbsp />
                        <input onChange={this.changeTimesClose} type="time" name="Close" className="Friday" value={this.state.times.Friday ? this.state.times.Friday.Close : '--:--'} />
                    </div>
                </div>

                <div className="custom-control custom-checkbox">
                    <div>
                        <input type="checkbox" className="custom-control-input Saturday" id="Saturday" name="Saturday" onChange={this.changeDate} checked={this.state.times.Saturday ? true : false} />
                        <label className="custom-control-label" for="Saturday">Saturday</label>
                    </div>
                    <div>
                        <input onChange={this.changeTimesOpen} type="time" name="Open" className="Saturday" value={this.state.times.Saturday ? this.state.times.Saturday.Open : '--:--'} /> to <nbsp /><nbsp />
                        <input onChange={this.changeTimesClose} type="time" name="Close" className="Saturday" value={this.state.times.Saturday ? this.state.times.Saturday.Close : '--:--'} />
                    </div>
                </div>
                <div className="custom-control custom-checkbox">
                    <div>
                        <input type="checkbox" className="custom-control-input Sunday" id="Sunday" name="Sunday" onChange={this.changeDate} checked={this.state.times.Sunday ? true : false} />
                        <label className="custom-control-label" for="Sunday">Sunday</label>
                    </div>
                    <div>
                        <input onChange={this.changeTimesOpen} type="time" name="Open" className="Sunday" value={this.state.times.Sunday ? this.state.times.Sunday.Open : '--:--'} /> to <nbsp /><nbsp />
                        <input onChange={this.changeTimesClose} type="time" name="Close" className="Sunday" value={this.state.times.Sunday ? this.state.times.Sunday.Close : '--:--'} />
                    </div>
                </div>
            </div>
        )
    }
}
export default OpenHours
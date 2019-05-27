import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './main.scss'

interface StatisticDateItem {
    schoolName: string
    total: number
    inited: number
    initRatio: number
}

interface AppState {
    data: StatisticDateItem[]
}

class App extends React.Component<{}, AppState> {
    constructor() {
        super({})
        this.state = {
            data: []
        }
    }

    componentDidMount(): void {
        fetch("http://api-test.pnyjy.com/user_auth/user_statistics/student_inited_rate/")
            .then(resp => {
                return resp.json()
            })
            .then(json => {
                const staticsData = json
                const newDatas = []
                for (const item of staticsData.data) {
                    console.log(item)
                    const dataItem = {
                        schoolName: item.school_name,
                        total: item.total,
                        inited: item.inited == 1,
                        initRatio: item.init_ratio
                    }
                    newDatas.push(dataItem)
                }
                this.setState({data: newDatas})
            }, reaspon => {
                console.log(reaspon)
            })

    }

    render() {
        return (<ul>
            {
                this.state.data.map(item => {
                    return (<li>{item.schoolName}</li>)
                })
            }
        </ul>)

    }
}


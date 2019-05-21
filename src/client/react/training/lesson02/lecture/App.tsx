import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ReactNodeArray} from 'react'
import {FaBed, FaCar, FaPlane, FaSpaceShuttle} from 'react-icons/fa'
import './index.scss'
import * as text from './text'

interface TabsState {
    activeIndex: number
}

class Tabs extends React.Component<{}, TabsState> {
    constructor() {
        super({})
        this.state = {
            activeIndex: 0
        }
    }

    selectTabIndex = (activeIndex: number) => {
        this.setState({
            activeIndex
        })
    }

    render() {
        const children = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement<TabListProps>(child))
                return React.cloneElement(child, {
                    activeIndex: this.state.activeIndex,
                    onSelectTab: this.selectTabIndex
                })
            else
                return child
        })
        return (
            <div className="Tabs">
                {children}
            </div>
        )
    }

}

interface TabListProps {
    activeIndex?: number,
    onSelectTab?: (index: number) => void
}

class TabList extends React.Component<TabListProps> {
    render() {
        const {activeIndex} = this.props
        const children = React.Children.map(this.props.children, (child, index) => {
            if (React.isValidElement<TabProps>(child))
                return React.cloneElement(child, {
                    isActive: index === activeIndex,
                    onSelect: () => this.props.onSelectTab!(index)
                })
            else
                return child
        })

        return (
            <div className="tabs">
                {children}
            </div>
        )
    }
}

interface TabProps {
    isActive?: boolean,
    isDisabled?: boolean,
    onSelect?: () => void
}

class Tab extends React.Component<TabProps> {
    constructor(props: TabProps) {
        super(props)
    }

    render() {
        const {isActive, isDisabled, onSelect} = this.props
        return (
            <div className={isDisabled ? "tab disabled" : isActive ? "tab active" : "tab"}
                 onClick={isDisabled ? undefined : onSelect}>
                {this.props.children}
            </div>
        )

    }
}

interface TabPanelsProps {
    activeIndex?: number,
    children: ReactNodeArray
}

class TabPanels extends React.Component<TabPanelsProps> {
    render() {
        const {activeIndex, children} = this.props
        return (
            <div className="panels">
                {children[activeIndex!]}
            </div>
        )
    }
}

class TabPanel extends React.Component {
    render() {
        return this.props.children
    }
}

interface DataTabsProps {
    data: { label: React.ReactElement, content: React.ReactElement }[]
}

class DataTabs extends React.Component<DataTabsProps> {
    render() {
        const {data} = this.props

        return (
            <Tabs>
                <TabPanels>
                    {data.map(tab =>
                        <TabPanel>
                            {tab.content}
                        </TabPanel>
                    )}
                </TabPanels>
                <TabList>
                    {data.map(tab =>
                        <Tab>
                            {tab.label}
                        </Tab>
                    )}
                </TabList>
            </Tabs>
        )
    }
}

class App extends React.Component {
    render(): React.ReactNode {
        const tabData = [
            {
                label: <FaCar/>,
                content: text.cars
            },
            {
                label: <FaBed/>,
                content: text.hotels
            },
            {
                label: <FaPlane/>,
                content: text.flights
            },
            {
                label: <FaSpaceShuttle/>,
                content: text.space
            }
        ]

        return (
            <div className="App">
                <DataTabs data={tabData}/>
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("container"))
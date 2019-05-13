import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import {ReactNodeArray} from 'react'
import {FaBed, FaCar, FaPlane, FaSpaceShuttle} from 'react-icons/fa'
import './index.scss'
import * as text from './text'

interface TabContextType {
    activeIndex?: number
    onSelectTab?: (index:number)=>void
}

const TabContext = React.createContext<TabContextType>({})

interface TabsState {
    activeIndex: number
}

class Tabs extends React.Component<{}, TabsState> {

    constructor() {
        super({})
        this.state = {
            activeIndex: 1
        }
    }

    selectTabIndex = (activeIndex: number) => {
        this.setState({
            activeIndex
        })
    }

    render() {
        return (
            <div className="Tabs">
                <TabContext.Provider value={{activeIndex:this.state.activeIndex,onSelectTab:this.selectTabIndex}}>
                {this.props.children}
                </TabContext.Provider>
            </div>
        )
    }

}

class TabList extends React.Component {
    static contextType = TabContext

    context!: React.ContextType<typeof TabContext>

    render() {
        const {activeIndex} = this.context
        const children = React.Children.map(this.props.children, (child, index) => {
            if (React.isValidElement<TabProps>(child))
                return React.cloneElement(child, {
                    isActive: index === activeIndex,
                    onSelect: () => this.context.onSelectTab!(index)
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
    static contextType = TabContext
    context!: React.ContextType<typeof TabContext>

    render() {
        const {activeIndex} = this.context
        return (
            <div className="panels">
                {this.props.children[activeIndex!]}
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
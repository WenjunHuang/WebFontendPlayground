import * as React from 'react';

interface VehiclesState {
    vehicles: { [name: string]: any }[]
}

export default class Vehicles extends React.Component<{}, VehiclesState> {
    constructor() {
        super({});

        this.state = {
            vehicles: []
        }

    }

    async componentDidMount() {
        let response = await fetch("https://swapi.co/api/vehicles/");
        let json = await response.json();
        json.results.forEach((result,index) =>{
            if (index === 2){
                delete result.films
            }
        })

        this.setState({
            vehicles: json.results
        });
    }

    render(): React.ReactNode {
        return this.state.vehicles.length !== 0 ? (
            <ul>
                {
                    this.state.vehicles.map(v => (
                        <li key={v.id}>
                            {v.name} ({v.films.length})
                        </li>
                    ))
                }
            </ul>
        ) : (
            <div>Loading...</div>
        )
    }
}
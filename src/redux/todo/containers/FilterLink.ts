import {connect} from 'react-redux'
import {setVisibilityFilter, VisibilityFilters} from "../actions";
import {Link} from '../components/Link'
import {AppState} from "../reducers";
import {Action, Dispatch} from "redux";

interface FilterLinkProps{
    filter:VisibilityFilters
}

const mapStateToProps = (state: AppState,ownProps:FilterLinkProps) =>{
    return {
        active: ownProps.filter === state.visibilityFilter.filter
    }
}

const mapDispatchToProps = (dispatch:Dispatch<Action>,ownProps:FilterLinkProps) => {
    return {
        onClick: () =>{
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink
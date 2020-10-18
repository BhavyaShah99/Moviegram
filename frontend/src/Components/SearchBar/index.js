import ReactSearchBox from 'react-search-box'
import React from 'react';
import {getKeyMoviePairs} from '../../services/api.js'


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
    }
    handleEvent(movie) {
        this.props.history.push({pathname: "/movie/" + movie})
      }
    async componentDidMount(){
        const res = await getKeyMoviePairs()
        if(!res){
            this.setState({data: []})
        } else{
            const data = res.data

            this.setState({data: data.map(obj => {
                return {key: obj._id, value: obj.title}
            })})
        }

    }
    render() {
        return (

            <ReactSearchBox
              placeholder="Search Movie"
              data={this.state.data}
              onSelect={event =>{
                this.handleEvent(event.key)
              } }
              />);


            }

        }

        export default SearchBar;

import ReactSearchBox from 'react-search-box'
import React from 'react';
import {getGenres} from '../../services/api.js'


class GenreSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
    }
    handleEvent(genre) {
        this.props.history.push({pathname: "/genre/" + genre})
      }
    async componentDidMount(){
        const res = await getGenres()
        if(!res){
            this.setState({data: []})
        } else{
            const data = res.data
            this.setState({data: data.map(obj => {
                return {key: obj, value: obj}
            })})
        }

    }
    render() {
        return (

            <ReactSearchBox
              placeholder="Search by Genre"
              data={this.state.data}
              onSelect={event =>{
                this.handleEvent(event.key)
              } }
              />);


            }

        }

export default GenreSearchBar;

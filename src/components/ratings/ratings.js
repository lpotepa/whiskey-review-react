import React, {Component} from 'react'
import Rating from 'react-rating'
import _ from 'lodash'

class Ratings extends Component {

  renderRating(rating){
    return (
      <div key={rating.rating_type}>{_.capitalize(rating.rating_type)}:
        <Rating
          initialRating={rating.grade}
          readonly
          stop={10}
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
        />
      </div>
    )
  }

  renderRatings(){
    let { ratings } = this.props.object
    return _.map(ratings, ((value, key) => {
      return this.renderRating({rating_type: key, grade: value})
    }))
  }

  render(){
    return <div>{this.renderRatings()}</div>
  }
}

export default Ratings

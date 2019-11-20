import React, { Component } from 'react';

import {connect} from 'react-redux';
import Rating from 'react-rating';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class WhiskeyForm extends Component {

  constructor(props){
    super(props)
    this.renderRatings = this.renderRatings.bind(this)
  }

  handleRatingChange(rate){
    console.log(rate)
  }

  renderRating(rating){
    return (
      <Rating
        initialRating={rating.grade}
        stop={10}
        emptySymbol="fa fa-star-o fa-2x"
        fullSymbol="fa fa-star fa-2x"
        onChange={(rate) => alert(rate)}
      />
    )
  }

  render(){
    let { name, description, ratings } = this.props.whiskey;
    
  }
}

function mapStateToProps(state, ownProps) {
  return {
    form : state.form.whiskeyForm,
    initialValues: state.whiskeys[ownProps.match.params.id]
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  dispatch,
}, dispatch)

WhiskeyForm = reduxForm({ form: 'whiskeyForm'})(WhiskeyForm);

export default connect(mapStateToProps, mapDispatchToProps)(WhiskeyForm);

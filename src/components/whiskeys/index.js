import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {ListGroup, Col, Container, Row} from 'react-bootstrap'
import {connect} from 'react-redux';
import {fetchWhiskeys} from '../../actions/whiskeys'
import Ratings from '../ratings/ratings'
import qs from 'query-string';
import _ from 'lodash'
import {bindActionCreators} from 'redux';


class Whiskeys extends Component {
  
  componentDidMount(){
    let params = qs.parse(this.props.location.search)
    this.props.fetchWhiskeys(params);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search != this.props.location.search) {
      let params = qs.parse(this.props.location.search)
      this.props.fetchWhiskeys(params);
    }
  }

  renderWhiskeys(){
    return _.map(this.props.whiskeys, (whiskey, id) => {
      return(
        <Link key={whiskey.id} to={`/whiskeys/${whiskey.id}`}>
          <ListGroup.Item action>
            <Container>
              <Row>
                <Col>{whiskey.name}
                  <Ratings object={whiskey} />
                </Col>
                <Col>
                  <p>{whiskey.description}</p>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        </Link>
      )
    })
  }

  render(){
    return(
      <ListGroup as="ul">
        {this.renderWhiskeys()}
      </ListGroup>
    )
  }
}

function mapStateToProps(state) {
  return {
    whiskeys : state.whiskeys,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  dispatch,
  fetchWhiskeys,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Whiskeys);

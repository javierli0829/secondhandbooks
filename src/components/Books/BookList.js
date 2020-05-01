import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  CardBody,
  Alert,
} from 'reactstrap';
import Template from '../Templates/Dashboard';
import TablePagination from '../UI/TablePagination';

const BookList = ({
  error, loading, listPaginated, page, pagination, meta, history,
}) => (
  <Template pageTitle="Books">
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <p>Books</p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  </Template>
);

BookList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
};

BookList.defaultProps = {
  error: null,
  loading: false,
};

export default withRouter(BookList);

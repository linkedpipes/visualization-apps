import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  PagingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

import { getFetchQuery } from '../../../selectors';

import { count, select } from '../query';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'title', title: 'Title' }
      ],
      rows: [],
      totalCount: 0,
      pageSize: 15,
      currentPage: 0,
      loading: true,
    };

    this.loadPage = this.loadPage.bind(this);
  }
  componentDidMount() {
    this.loadCount();
    this.loadPage(0);
  }
  componentDidUpdate() {
    // this.loadPage();
  }
  loadCount() {
    const { fetchQuery } = this.props;

    fetchQuery(count)
      .then(response => response.json())
      .then(json => this.setState({
        totalCount: json['@graph'][0]['http://count']
      }));
  }
  loadPage(currentPage) {
    const { fetchQuery } = this.props;
    const { pageSize } = this.state;

    fetchQuery(select, { limit: pageSize, offset: pageSize * currentPage })
      .then(response => response.json())
      .then(json => this.setState({
        rows: json['@graph'].map(item => ({
          id: item['@id'],
          title: item['http://purl.org/dc/terms/title']
        })),
        currentPage
      }))
      .catch(() => this.setState({ loading: false }));
  }
  render() {
    const { rows, columns, pageSize, currentPage, totalCount } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.loadPage}
            pageSize={pageSize}
            totalCount={totalCount}
          />
          <TableView />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
      </div>
    );
  }
}

DataTable.propTypes = {
  fetchQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fetchQuery: getFetchQuery(state)
});

export default connect(mapStateToProps)(DataTable);

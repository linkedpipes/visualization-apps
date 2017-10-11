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

import { getConfig, getFetchQuery } from '../../../selectors';

import { count, countContext, select, selectContext } from '../query';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'mbox', title: 'Mailbox' },
        { name: 'homepage', title: 'Homepage' }
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

    fetchQuery(count, {}, countContext)
      .then(json => this.setState({
        totalCount: json['my:count']
      }));
  }
  loadPage(currentPage) {
    const { fetchQuery } = this.props;
    const { pageSize } = this.state;

    fetchQuery(select, { limit: pageSize, offset: pageSize * currentPage }, selectContext)
      .then((json) => {
        console.log(json);
        return json;
      })
      .then(json => this.setState({
        rows: json['@graph'].map(item => ({
          id: item['@id'],
          name: item['foaf:name'],
          mbox: item['foaf:mbox'],
          homepage: item['foaf:homepage']
        })),
        currentPage
      }))
      .catch(() => this.setState({ loading: false }));
  }
  render() {
    const { rows, columns, pageSize, currentPage, totalCount } = this.state;

    console.log('Rendering datatable with config', this.props.config);

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
  config: PropTypes.object.isRequired,
  fetchQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  config: getConfig(state),
  fetchQuery: getFetchQuery(state)
});

export default connect(mapStateToProps)(DataTable);

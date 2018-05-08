import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, InfiniteLoader, Table, defaultTableRowRenderer } from 'react-virtualized';

import 'react-virtualized/styles.css'; // only needs to be imported once
import styles from './InfiniteTable.css';

export default class InfiniteTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rows: {},
      totalCount: 0,
      loadedRowCount: 0,
      loadingRowCount: 0,
      initialLoading: true,
      error: false
    };

    this.loadRows = this.loadRows.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.getRow = this.getRow.bind(this);
    this.customRowRenderer = this.customRowRenderer.bind(this);
  }

  componentDidMount() {
    this.loadCount();
  }

  getRow({ index }) {
    const { rows } = this.state;

    return rows[index] ? rows[index] : { index, loading: false };
  }

  loadCount() {
    const { loadCount } = this.props;

    return loadCount().then((totalCount) => {
      if (Number.isInteger(totalCount)) {
        this.setState({
          totalCount,
          initialLoading: false
        });
      } else {
        this.setState({
          error: true,
          initialLoading: false
        });
      }
    });
  }

  loadRows({ startIndex, stopIndex }) {
    const { rows, loadingRowCount } = this.state;
    const { loadRows } = this.props;

    const increment = stopIndex - startIndex + 1;

    for (let i = startIndex; i <= stopIndex; i++) {
      rows[i] = {
        index: i,
        loading: true
      }; // loading indicator
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment,
    });

    return loadRows({ startIndex, stopIndex }).then((data) => {
      for (let i = startIndex; i <= stopIndex; i += 1) {
        const row = data[i - startIndex];
        if (row) {
          rows[i] = {
            ...row,
            index: i,
            loading: false
          };
        }
      }

      const { loadedRowCount, loadingRowCount } = this.state;

      this.setState({
        rows,
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment,
      });
    });
  }

  isRowLoaded({ index }) {
    const { rows } = this.state;
    return !!rows[index];
  }

  customRowRenderer(props) {
    const { index, className, key, style } = props;

    if (!this.isRowLoaded({ index })) {
      return (
        <div
          className={className}
          key={key}
          role="row"
          style={style}
        >
          ...
        </div>
      );
    }

    return defaultTableRowRenderer(props);
  }

  renderLoading() {
    return (
      <div className="InfiniteTable">
        <div className="TableStats loading">
          Loading...
        </div>
      </div>
    );
  }

  renderError() {
    return (
      <div className="InfiniteTable">
        <div className="TableStats error">
          Some error occurred.
        </div>
      </div>
    );
  }

  renderTable() {
    const { totalCount, loadingRowCount, loadedRowCount } = this.state;
    const { children } = this.props;

    return (
      <div className="InfiniteTable">
        <div className="TableStats">
          {loadingRowCount} loading, {loadedRowCount} loaded, {totalCount} total
        </div>
        <div className="TableContainer">
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadRows}
            rowCount={totalCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    ref={registerChild}
                    width={width}
                    height={height}
                    rowRenderer={this.customRowRenderer}
                    onRowsRendered={onRowsRendered}
                    headerClassName={styles.headerColumn}
                    headerHeight={40}
                    rowHeight={40}
                    rowCount={totalCount}
                    rowGetter={this.getRow}
                  >
                    { children }
                  </Table>
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </div>
      </div>
    );
  }

  render() {
    const { error, initialLoading } = this.state;

    if (error) {
      return this.renderError();
    }
    if (initialLoading) {
      return this.renderLoading();
    }
    return this.renderTable();
  }
}

InfiniteTable.propTypes = {
  children: PropTypes.array.isRequired,
  loadCount: PropTypes.func.isRequired,
  loadRows: PropTypes.func.isRequired
};


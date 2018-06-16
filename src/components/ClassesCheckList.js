import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import UriLabel from './UriLabel';

const styles= {
  listItem: {
    padding: 0
  }
}

class ClassesCheckList extends Component {
  constructor(props) {
    super();
    const { items } = props;
    this.state = {
      selectAllChecked: true,
      checked: items.reduce((acc, item) => { acc[item] = true; return acc }, {})
    };
  }

  handleToggleSelectAll = () => {
    const { selectAllChecked } = this.state;
    const { onChange, items } = this.props;

    const value = !selectAllChecked;

    this.setState({
      selectAllChecked: value,
      checked: items.reduce((acc, item) => { acc[item] = value; return acc }, {})
    })

    if (value) {
      onChange(items);
    } else {
      onChange([]);
    }
  };

  handleToggle = value => () => {
    const { onChange, items } = this.props;

    const checked = {
      ...this.state.checked,
      [value]: !this.state.checked[value]
    }
    this.setState({
      ...this.state,
      checked
    });

    onChange(items.filter(item => checked[item]));
  };

  render() {
    const { checked, selectAllChecked } = this.state;
    const { items, classes } = this.props;
    return (
      <List>
        <ListItem
          role={undefined}
          button
          onClick={this.handleToggleSelectAll}
          className={classes.listItem}
        >
          <Checkbox
            checked={selectAllChecked}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText primary="Select All" className={classes.listItemText} />
        </ListItem>
        {items.map(item => (
          <ListItem
            key={item}
            role={undefined}
            button
            onClick={this.handleToggle(item)}
            className={classes.listItem}
          >
            <Checkbox
              checked={checked[item]}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={<UriLabel uri={item}/>} className={classes.listItemText} />
          </ListItem>
        ))}
      </List>
    );
  }
}

ClassesCheckList.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default withStyles(styles)(ClassesCheckList);
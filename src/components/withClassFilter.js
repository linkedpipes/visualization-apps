import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';

import classnames from 'classnames';

import ClassesCheckList from './ClassesCheckList';

import { filterClasses } from '../utils';

import './withClassFilter.css';

const getClassName = id => {
  const  n = id.lastIndexOf('/');
  return id.substring(n + 1);
}

const withClassFilter = (WrappedComponent) => (
  class extends Component {
    constructor(props) {
      super();
      const { data } = props;

      const typesSet = data.reduce((set, item) => {
        const types = item['@type'];
        
        if (Array.isArray(types)) {
          types.forEach(type => {
            set.add(type);
          })
        }
        return set;
      }, new Set());

      const allTypes = [...typesSet];

      this.state = {
        enabled: allTypes.length > 0,
        expanded: false,
        types: allTypes,
        selected: allTypes
      };
    }

    handleChange = selected => {
      console.log("SELECTED CLASSES", selected);
      this.setState({
        ...this.state,
        selected,
      });
    };

    handleExpandClick = () => {
      this.setState({
        ...this.state,
        expanded: !this.state.expanded
      });
    };

    render() {
      const { enabled, expanded, types, selected } = this.state;
      const { data } = this.props;

      if (!enabled) {
        return (
          <WrappedComponent {...this.props} data={data}/>
        );
      }

      const filteredData = filterClasses(data, selected);

      return [
        <WrappedComponent {...this.props} key="component" data={filteredData}/>,
        <div className="filter" key="filter">
          <Card
            className={classnames({
              card: true,
              hidden: !expanded
            })}
          >
            <CardHeader title="Classes"/>
            <CardContent className="cardContent">
              <ClassesCheckList items={types} onChange={this.handleChange}/>
            </CardContent>
            <CardActions disableActionSpacing>
              <IconButton
                className="close"
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
              >
                <CloseIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Button
            variant="fab"
            className={classnames({
              fab: true,
              hidden: expanded
            })}
            color="secondary"
            onClick={this.handleExpandClick}
          >
            <SettingsIcon />
          </Button>
        </div>
      ];
    }
  }
);

export default withClassFilter;
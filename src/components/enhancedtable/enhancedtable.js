import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {order, orderBy, columnData} = this.props;

    return (<TableHead>
      <TableRow>
        {
          columnData.map(column => {
            return (<TableCell key={column.id} numeric={column.numeric} padding={column.disablePadding
                ? 'none'
                : 'default'} sortDirection={orderBy === column.id
                ? order
                : false}>
              <Tooltip title="Sort" placement={column.numeric
                  ? 'bottom-end'
                  : 'bottom-start'} enterDelay={300}>
                <TableSortLabel active={orderBy === column.id} direction={order} onClick={this.createSortHandler(column.id)}>
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>);
          }, this)
        }
      </TableRow>
    </TableHead>);
  }
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight: theme.palette.type === 'light'
    ? {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85)
    }
    : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.dark
    },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});

let EnhancedTableToolbar = props => {
  const {classes, tableTitle} = props;
  return (<Toolbar>
    <div className={classes.title}>
      <Typography variant="title" id="tableTitle" color="primary">
        {tableTitle}
      </Typography>
    </div>
    <div className={classes.spacer}/>
  </Toolbar>);
};
EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});
class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage))-1);
  };

  render() {
    const {classes, count, page, rowsPerPage, theme} = this.props;

    return (<div className={classes.root}>
      <IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={this.handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Next Page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={this.handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Last Page">
      {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>);
  }

}
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
TablePaginationActions,
);
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props = props
    this.state = {
      order: 'asc',
      orderBy: this.props.orderBy,
      selected: [],
      data: this.props.data,
      page: 0,
      actualPage:1,
      rowsPerPage: 10
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = order === 'desc'
      ? this.props.data.sort((a, b) => (
        b[orderBy] < a[orderBy]
        ? -1
        : 1))
      : this.props.data.sort((a, b) => (
        a[orderBy] < b[orderBy]
        ? -1
        : 1));

    this.setState({data, order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({
        selected: this.state.data.map(n => n.id)
      });
      return;
    }
    this.setState({selected: []});
  };

  handleClick = (url) => {
    //console.log(`clicked ${url}`)
    this.props.onRowClick(url)
  };

  handleChangePage = (event, page) => {
    const counter = this.state.rowsPerPage * page
    if (counter < this.props.count) {
      this.setState({page});
      this.props.handleChangePage(page)
    }
  };

  handleChangeRowsPerPage = event => {
    console.error('Not supported')
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {classes, tableTitle} = this.props;
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page
    } = this.state;

    return (<Paper className={classes.root}>
      <EnhancedTableToolbar numSelected={selected.length} tableTitle={tableTitle}/>
      <Table className={classes.table} aria-labelledby="tableTitle">
        <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={this.handleSelectAllClick} onRequestSort={this.handleRequestSort} rowCount={this.props.count} columnData={this.props.columnData}/>
        <TableBody>
          {
            this.props.data.map(datum => {
              return (<TableRow hover={true} onClick={() => this.handleClick(datum.url)} tabIndex={-1} key={datum.id}>
                {
                  this.props.columnData.map((columnDatum, index) => {
                    return (<TableCell key={`${datum.id}-${index}`}>
                      {datum[columnDatum.id]}
                    </TableCell>)
                  })
                }
              </TableRow>);
            })
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination colSpan={5} count={this.props.count} rowsPerPage={rowsPerPage} page={page} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage} ActionsComponent={TablePaginationActionsWrapped}/>
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>);
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);

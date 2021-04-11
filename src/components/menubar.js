import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
import FilmsPage from './films/filmspage'
import PeoplePage from './people/peoplepage'
import PlanetsPage from './planets/planetspage'
import SpeciesPage from './species/speciespage'
import StarShipsPage from './starships/starshipspage'
import VehiclesPage from './vehicles/vehiclespage'
import Tooltip from '@material-ui/core/Tooltip'
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuBar extends React.Component {
  state = {

    anchorEl: null,
  };

  handleChange = (event, checked) => {

  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip id="tooltip-fab" title="Click on the menu to explore the SW-API">
            <IconButton className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                >
              <MenuIcon/>
            </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}>
              <MenuItem onClick={this.handleClose}><Link to={`/films`}>Films</Link></MenuItem>
              <MenuItem onClick={this.handleClose}><Link to={`/people`}>People</Link></MenuItem>
              <MenuItem onClick={this.handleClose}><Link to={`/planets`}>Planets</Link></MenuItem>
              <MenuItem onClick={this.handleClose}><Link to={`/species`}>Species</Link></MenuItem>
              <MenuItem onClick={this.handleClose}><Link to={`/starships`}>Starships</Link></MenuItem>
              <MenuItem onClick={this.handleClose}><Link to={`/vehicles`}>Vehicles</Link></MenuItem>
            </Menu>
            <Typography variant="title" color="inherit" className={classes.flex}>
              StarWars API from swapi.co
            </Typography>
          </Toolbar>
        </AppBar>
        <Route exact={true} path="/films" component={FilmsPage}></Route>
        <Route exact={true} path="/people" component={PeoplePage}></Route>
        <Route exact={true} path="/planets" component={PlanetsPage}></Route>
        <Route exact={true} path="/species" component={SpeciesPage}></Route>
        <Route exact={true} path="/starships" component={StarShipsPage}></Route>
        <Route exact={true} path="/vehicles" component={VehiclesPage}></Route>
      </div>
    </Router>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);

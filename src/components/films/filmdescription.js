import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SimpleTable from '../simpletable/simpletable'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu: {
    width: 200,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
class FilmDescription extends Component{
  constructor(props){
    super(props)
    this.props = props
    this.state={

    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
 render(){

   return (<div>
      <Card className={this.props.classes.card}>
        <CardContent>
          <Typography  variant="headline" component="h4" color="primary">
          Film Description
          </Typography>
            <Typography className={this.props.classes.pos} component="div" color="textSecondary">
              {this.props.film!=null?<FilmDetails film={this.props.film}/>:`Please click on a row in the data table to view`}
            </Typography>
        </CardContent>
      </Card>
    </div>)
 }
}

const FilmDetails = props =>{
  const {film} = props
  return(
    <div>
      <Paper elevation={4}>
        <Typography component="div">
          <SimpleTable
            tableData={[{"label":"Title","key":"title","isArray":false},
                        {"label":"Episode","key":"episode_id","isArray":false},
                      {"label":"Opening Crawler","key":"opening_crawl","isArray":false},
                    {"label":"Director","key":"director","isArray":false},
                  {"label":"Producer","key":"producer","isArray":false},
                {"label":"Released On","key":"release_date","isArray":false},
              {"label":"Characters","key":"characters","isArray":true},
            {"label":"Planets","key":"planets","isArray":true},
          {"label":"Starships","key":"starships","isArray":true},
          {"label":"Created on","key":"created","isArray":false},
          {"label":"Edited on","key":"edited","isArray":false},
          {"label":"Url","key":"url","isArray":false}]}
            data={film}/>
        </Typography>
      </Paper>
    </div>
  )
}
FilmDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(FilmDescription);

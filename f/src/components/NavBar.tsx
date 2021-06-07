import React, {useState} from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CVE_Item } from "../types";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    
  }),
);
interface Props {
    drawerOpenState: boolean;
    setDrawerOpenState: any;
    setFoundByCVEID: any;
    data:CVE_Item[] | undefined;
  }

const NavBar: React.FC<Props> = (props:Props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState<string>('')
  const { drawerOpenState, setDrawerOpenState, setFoundByCVEID, data } = props;

  let filteredDataByCVEID: CVE_Item[] | undefined


  //search trough data by cve-id string
  const searchByCVE = (cveID:string) => {
    setSearchValue(cveID)
    filteredDataByCVEID = data?.filter((cveItem)=>(cveItem.cve.CVE_data_meta.ID.toLocaleLowerCase().includes(cveID.toLocaleLowerCase())))  
    setFoundByCVEID(filteredDataByCVEID)
  }

  // resets search field and also sets foundbySearchCVE

  const resetSearch = () => {
    setSearchValue('')
    setFoundByCVEID(null)
  }

  
  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open-drawer"
            onClick={() => setDrawerOpenState(!drawerOpenState)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            CVE-ANALYSIS
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search by CVE-ID"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchValue}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => {searchByCVE(event.target.value)}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={()=>{resetSearch()}}
                  >
                    <ClearIcon fontSize="small"  color="primary"/>
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}



export default NavBar
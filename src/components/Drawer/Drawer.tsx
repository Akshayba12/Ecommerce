import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function SideDrawer({open, toggleDrawer, setUser} : any) {

  const navigation = useNavigate()
   
  const handleLogout = () => {
     localStorage.removeItem("userData")
     localStorage.removeItem("selectedCategory")
     setUser(null)
  }
// 
  const handleSideDrawer = (item) =>{
     switch(item){
      case 'Home':
        navigation("/Home")
      break;
      case 'Orders' : 
       navigation("/Orders")
       break;
       case 'Products':
        break;
       case 'Cart' :
        navigation("/Cart")
        break;
        default:
          navigation("/")
        break;
     }
  }

  const handleSettings = () =>{
    console.log("settings")
  }

 
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Home', 'Orders', 'Products', 'Cart'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleSideDrawer(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Settings', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={text==='Logout' ? handleLogout : handleSettings} >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

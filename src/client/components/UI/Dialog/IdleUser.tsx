import React, { useState, useEffect } from 'react'
import {
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Button,
} from '@mui/material'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface IdleUserDialogProps {
  open: boolean;
  onClose: () => void;
}

const IdleUserDialog: React.FC<IdleUserDialogProps> = (props) => {
    const {
      open,
      onClose,
    } = props;

    const navigate = useNavigate()

    const handleLogout = () => {
      Cookies.remove('token');
      sessionStorage.clear();
      navigate('/login')
    };  

    const [seconds, setSeconds] = useState(59);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else {
          handleLogout();
        }
  
      }, 1000);
  
      return () => clearInterval(interval);
    }, [seconds]);

    return (
      <Dialog 
        open={open} 
        onClose={onClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Session Timeout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The current session is going to expire in {seconds} seconds. <br />
            Would you like to continue the current session?
          </DialogContentText>
          <DialogActions>
            <Button
              color="primary"
              onClick={onClose}
            >
              Stay
            </Button>
            <Button
              color="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default IdleUserDialog;



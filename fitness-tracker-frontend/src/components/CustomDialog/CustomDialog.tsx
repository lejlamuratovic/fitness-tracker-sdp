import { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface DialogAction {
  label: string;
  handler: () => void;
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions: DialogAction[];
}

const CustomDialog = ({
    open,
    onClose,
    title,
    children,
    actions
  } : CustomDialogProps) => {
  return (
    <Dialog 
        open={open} 
        onClose={onClose} 
        sx={
        { '& .MuiDialog-paper': { width: '100%', maxWidth: '400px' } }
    }>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button 
            key={index} 
            color={action.color}
            onClick={action.handler}
        >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;

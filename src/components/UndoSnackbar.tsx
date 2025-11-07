import { Snackbar, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;   // clears lastDeleted in context
  onUndo: () => void;    // restores deleted task
}

export default function UndoSnackbar({ open, onClose, onUndo }: Props) {
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return; 
    onClose(); // ✅ ensures lastDeleted resets when snackbar closes
  };

  const handleUndoClick = () => {
    onUndo();   // restore task
    onClose();  // ✅ also close snackbar & clear lastDeleted properly
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={4000}
      message="Task deleted"
      action={
        <Button color="secondary" size="small" onClick={handleUndoClick}>
          Undo
        </Button>
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
}

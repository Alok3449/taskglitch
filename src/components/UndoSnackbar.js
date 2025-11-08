import { jsx as _jsx } from "react/jsx-runtime";
import { Snackbar, Button } from '@mui/material';
export default function UndoSnackbar({ open, onClose, onUndo }) {
    const handleClose = (_event, reason) => {
        if (reason === "clickaway")
            return;
        onClose(); // ✅ ensures lastDeleted resets when snackbar closes
    };
    const handleUndoClick = () => {
        onUndo(); // restore task
        onClose(); // ✅ also close snackbar & clear lastDeleted properly
    };
    return (_jsx(Snackbar, { open: open, onClose: handleClose, autoHideDuration: 4000, message: "Task deleted", action: _jsx(Button, { color: "secondary", size: "small", onClick: handleUndoClick, children: "Undo" }), anchorOrigin: { vertical: "bottom", horizontal: "center" } }));
}

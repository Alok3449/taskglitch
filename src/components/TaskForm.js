import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect, useMemo, useState } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
// } from '@mui/material';
// import { Priority, Status, Task } from '@/types';
// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (value: Omit<Task, 'id'> & { id?: string }) => void;
//   existingTitles: string[];
//   initial?: Task | null;
// }
// const priorities: Priority[] = ['High', 'Medium', 'Low'];
// const statuses: Status[] = ['Todo', 'In Progress', 'Done'];
// export default function TaskForm({ open, onClose, onSubmit, existingTitles, initial }: Props) {
//   const [title, setTitle] = useState('');
//   const [revenue, setRevenue] = useState<number | ''>('');
//   const [timeTaken, setTimeTaken] = useState<number | ''>('');
//   const [priority, setPriority] = useState<Priority | ''>('');
//   const [status, setStatus] = useState<Status | ''>('');
//   const [notes, setNotes] = useState('');
//   useEffect(() => {
//     if (!open) return;
//     if (initial) {
//       setTitle(initial.title);
//       setRevenue(initial.revenue);
//       setTimeTaken(initial.timeTaken);
//       setPriority(initial.priority);
//       setStatus(initial.status);
//       setNotes(initial.notes ?? '');
//     } else {
//       setTitle('');
//       setRevenue('');
//       setTimeTaken('');
//       setPriority('');
//       setStatus('');
//       setNotes('');
//     }
//   }, [open, initial]);
//   const duplicateTitle = useMemo(() => {
//     const current = title.trim().toLowerCase();
//     if (!current) return false;
//     const others = initial ? existingTitles.filter(t => t.toLowerCase() !== initial.title.toLowerCase()) : existingTitles;
//     return others.map(t => t.toLowerCase()).includes(current);
//   }, [title, existingTitles, initial]);
//   const canSubmit =
//     !!title.trim() &&
//     !duplicateTitle &&
//     typeof revenue === 'number' && revenue >= 0 &&
//     typeof timeTaken === 'number' && timeTaken > 0 &&
//     !!priority &&
//     !!status;
//   const handleSubmit = () => {
//     const safeTime = typeof timeTaken === 'number' && timeTaken > 0 ? timeTaken : 1; // auto-correct
//     const payload: Omit<Task, 'id' | 'createdAt' | 'completedAt'> & { id?: string } = {
//       title: title.trim(),
//       revenue: typeof revenue === 'number' ? revenue : 0,
//       timeTaken: safeTime,
//       priority: ((priority || 'Medium') as Priority),
//       status: ((status || 'Todo') as Status),
//       notes: notes.trim() || undefined,
//       ...(initial ? { id: initial.id } : {}),
//     };
//     onSubmit(payload);
//     onClose();
//   };
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{initial ? 'Edit Task' : 'Add Task'}</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2} mt={1}>
//           <TextField
//             label="Title"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             error={!!title && duplicateTitle}
//             helperText={duplicateTitle ? 'Duplicate title not allowed' : ' '}
//             required
//             autoFocus
//           />
//           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//             <TextField
//               label="Revenue"
//               type="number"
//               value={revenue}
//               onChange={e => setRevenue(e.target.value === '' ? '' : Number(e.target.value))}
//               inputProps={{ min: 0, step: 1 }}
//               required
//               fullWidth
//             />
//             <TextField
//               label="Time Taken (h)"
//               type="number"
//               value={timeTaken}
//               onChange={e => setTimeTaken(e.target.value === '' ? '' : Number(e.target.value))}
//               inputProps={{ min: 1, step: 1 }}
//               required
//               fullWidth
//             />
//           </Stack>
//           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//             <FormControl fullWidth required>
//               <InputLabel id="priority-label">Priority</InputLabel>
//               <Select labelId="priority-label" label="Priority" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
//                 {priorities.map(p => (
//                   <MenuItem key={p} value={p}>{p}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth required>
//               <InputLabel id="status-label">Status</InputLabel>
//               <Select labelId="status-label" label="Status" value={status} onChange={e => setStatus(e.target.value as Status)}>
//                 {statuses.map(s => (
//                   <MenuItem key={s} value={s}>{s}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Stack>
//           <TextField label="Notes" value={notes} onChange={e => setNotes(e.target.value)} multiline minRows={2} />
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained" disabled={!canSubmit}>
//           {initial ? 'Save Changes' : 'Add Task'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
import { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, MenuItem, Select, InputLabel, FormControl, } from '@mui/material';
export default function TaskForm({ open, onClose, onSubmit, existingTitles, initial }) {
    const [title, setTitle] = useState('');
    const [revenue, setRevenue] = useState('');
    const [timeTaken, setTimeTaken] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Todo');
    const [notes, setNotes] = useState('');
    useEffect(() => {
        if (!open)
            return;
        if (initial) {
            setTitle(initial.title);
            setRevenue(initial.revenue);
            setTimeTaken(initial.timeTaken);
            setPriority(initial.priority);
            setStatus(initial.status);
            setNotes(initial.notes ?? '');
        }
        else {
            setTitle('');
            setRevenue('');
            setTimeTaken('');
            setPriority('Medium');
            setStatus('Todo');
            setNotes('');
        }
    }, [open, initial]);
    const duplicateTitle = useMemo(() => {
        const current = title.trim().toLowerCase();
        if (!current)
            return false;
        return existingTitles
            .filter(t => t.toLowerCase() !== initial?.title.toLowerCase())
            .some(t => t.toLowerCase() === current);
    }, [title, existingTitles, initial]);
    const canSubmit = !!title.trim() &&
        !duplicateTitle &&
        typeof revenue === 'number' &&
        revenue >= 0 &&
        typeof timeTaken === 'number' &&
        timeTaken > 0 &&
        !!priority &&
        !!status;
    const handleSubmit = () => {
        const safeTime = typeof timeTaken === 'number' && timeTaken > 0 ? timeTaken : 1;
        const payload = {
            title: title.trim(),
            revenue: typeof revenue === 'number' ? revenue : 0,
            timeTaken: safeTime,
            priority,
            status,
            notes: notes.trim() || undefined,
            ...(initial ? { id: initial.id } : {}),
        };
        onSubmit(payload);
        onClose();
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, fullWidth: true, maxWidth: "sm", children: [_jsx(DialogTitle, { children: initial ? 'Edit Task' : 'Add Task' }), _jsx(DialogContent, { children: _jsxs(Stack, { spacing: 2, mt: 1, children: [_jsx(TextField, { label: "Title", value: title, onChange: e => setTitle(e.target.value), error: duplicateTitle, helperText: duplicateTitle ? 'Title already exists' : '', fullWidth: true }), _jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 2, children: [_jsx(TextField, { label: "Revenue", type: "number", value: revenue, onChange: e => setRevenue(e.target.value === '' ? '' : Number(e.target.value)), fullWidth: true }), _jsx(TextField, { label: "Time Taken (h)", type: "number", value: timeTaken, onChange: e => setTimeTaken(e.target.value === '' ? '' : Number(e.target.value)), fullWidth: true })] }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Priority" }), _jsxs(Select, { value: priority, label: "Priority", onChange: e => setPriority(e.target.value), children: [_jsx(MenuItem, { value: "High", children: "High" }), _jsx(MenuItem, { value: "Medium", children: "Medium" }), _jsx(MenuItem, { value: "Low", children: "Low" })] })] }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Status" }), _jsxs(Select, { value: status, label: "Status", onChange: e => setStatus(e.target.value), children: [_jsx(MenuItem, { value: "Todo", children: "Todo" }), _jsx(MenuItem, { value: "In Progress", children: "In Progress" }), _jsx(MenuItem, { value: "Done", children: "Done" })] })] }), _jsx(TextField, { label: "Notes", value: notes, onChange: e => setNotes(e.target.value), multiline: true, minRows: 3, fullWidth: true })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, children: "Cancel" }), _jsx(Button, { variant: "contained", disabled: !canSubmit, onClick: handleSubmit, children: initial ? 'Save Changes' : 'Add Task' })] })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useMemo, useState } from 'react';
// import { Box, Button, Card, CardContent, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import { DerivedTask, Task } from '@/types';
// import TaskForm from '@/components/TaskForm';
// import TaskDetailsDialog from '@/components/TaskDetailsDialog';
// interface Props {
//   tasks: DerivedTask[];
//   onAdd: (payload: Omit<Task, 'id'>) => void;
//   onUpdate: (id: string, patch: Partial<Task>) => void;
//   onDelete: (id: string) => void;
// }
// export default function TaskTable({ tasks, onAdd, onUpdate, onDelete }: Props) {
//   const [openForm, setOpenForm] = useState(false);
//   const [editing, setEditing] = useState<Task | null>(null);
//   const [details, setDetails] = useState<Task | null>(null);
//   const existingTitles = useMemo(() => tasks.map(t => t.title), [tasks]);
//   const handleAddClick = () => {
//     setEditing(null);
//     setOpenForm(true);
//   };
//   const handleEditClick = (e: React.MouseEvent, task: Task) => {
//     e.stopPropagation(); //  Prevents row click
//     setEditing(task);
//     setOpenForm(true);
//   };
//   const handleDeleteClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation(); //  Prevents row click
//     onDelete(id);
//   };
//   const handleSubmit = (value: Omit<Task, 'id'> & { id?: string }) => {
//     if (value.id) {
//       const { id, ...rest } = value as Task;
//       onUpdate(id, rest);
//     } else {
//       onAdd(value as Omit<Task, 'id'>);
//     }
//   };
//   return (
//     <Card>
//       <CardContent>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
//           <Typography variant="h6" fontWeight={700}>Tasks</Typography>
//           <Button startIcon={<AddIcon />} variant="contained" onClick={handleAddClick}>Add Task</Button>
//         </Stack>
//         <TableContainer sx={{ maxHeight: 520 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell align="right">Revenue</TableCell>
//                 <TableCell align="right">Time (h)</TableCell>
//                 <TableCell align="right">ROI</TableCell>
//                 <TableCell>Priority</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tasks.map(t => (
//                 <TableRow key={t.id} hover onClick={() => setDetails(t)} sx={{ cursor: 'pointer' }}>
//                   <TableCell>
//                     <Stack spacing={0.5}>
//                       <Typography fontWeight={600}>{t.title}</Typography>
//                       {t.notes && (
//                         <Typography
//                           variant="caption"
//                           color="text.secondary"
//                           noWrap
//                           title={t.notes}
//                           dangerouslySetInnerHTML={{ __html: t.notes as unknown as string }}
//                         />
//                       )}
//                     </Stack>
//                   </TableCell>
//                   <TableCell align="right">${t.revenue.toLocaleString()}</TableCell>
//                   <TableCell align="right">{t.timeTaken}</TableCell>
//                   <TableCell align="right">{t.roi == null ? 'N/A' : t.roi.toFixed(1)}</TableCell>
//                   <TableCell>{t.priority}</TableCell>
//                   <TableCell>{t.status}</TableCell>
//                   <TableCell align="right">
//                     <Stack direction="row" spacing={1} justifyContent="flex-end">
//                       <Tooltip title="Edit">
//                         <IconButton onClick={(e) => handleEditClick(e, t)} size="small">
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton onClick={(e) => handleDeleteClick(e, t.id)} size="small" color="error">
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {tasks.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={7}>
//                     <Box py={6} textAlign="center" color="text.secondary">
//                       No tasks yet. Click "Add Task" to get started.
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//       <TaskForm
//         open={openForm}
//         onClose={() => setOpenForm(false)}
//         onSubmit={handleSubmit}
//         existingTitles={existingTitles}
//         initial={editing}
//       />
//       <TaskDetailsDialog open={!!details} task={details} onClose={() => setDetails(null)} onSave={onUpdate} />
//     </Card>
//   );
// }
// import { useMemo, useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   IconButton,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Tooltip,
//   Typography,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import type { DerivedTask, Task } from '@/types';
// import TaskForm from '@/components/TaskForm';
// import TaskDetailsDialog from '@/components/TaskDetailsDialog';
// interface Props {
//   tasks: DerivedTask[];
//   onAdd: (payload: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
//   onUpdate: (id: string, patch: Partial<Task>) => void;
//   onDelete: (id: string) => void;
// }
// export default function TaskTable({ tasks, onAdd, onUpdate, onDelete }: Props) {
//   const [openForm, setOpenForm] = useState(false);
//   const [editing, setEditing] = useState<Task | null>(null);
//   const [details, setDetails] = useState<Task | null>(null);
//   const existingTitles = useMemo(() => tasks.map(t => t.title), [tasks]);
//   const handleAddClick = () => {
//     setEditing(null);
//     setOpenForm(true);
//   };
//   const handleEditClick = (e: React.MouseEvent, task: Task) => {
//     e.stopPropagation();
//     setEditing(task);
//     setOpenForm(true);
//   };
//   const handleDeleteClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     onDelete(id);
//   };
//   const handleSubmit = (value: Omit<Task, 'id' | 'createdAt' | 'completedAt'> & { id?: string }) => {
//     if (value.id) {
//       const { id, ...rest } = value;
//       onUpdate(id, rest); // Edit mode
//     } else {
//       onAdd(value); // Add mode
//     }
//   };
//   return (
//     <Card>
//       <CardContent>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
//           <Typography variant="h6" fontWeight={700}>Tasks</Typography>
//           <Button startIcon={<AddIcon />} variant="contained" onClick={handleAddClick}>
//             Add Task
//           </Button>
//         </Stack>
//         <TableContainer sx={{ maxHeight: 520 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell align="right">Revenue</TableCell>
//                 <TableCell align="right">Time (h)</TableCell>
//                 <TableCell align="right">ROI</TableCell>
//                 <TableCell>Priority</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tasks.map(t => (
//                 <TableRow
//                   key={t.id}
//                   hover
//                   onClick={() => setDetails(t)}
//                   sx={{ cursor: 'pointer' }}
//                 >
//                   <TableCell>
//                     <Stack spacing={0.5}>
//                       <Typography fontWeight={600}>{t.title}</Typography>
//                       {t.notes && (
//                         <Typography
//                           variant="caption"
//                           color="text.secondary"
//                           noWrap
//                           title={t.notes}
//                         >
//                           {t.notes}
//                         </Typography>
//                       )}
//                     </Stack>
//                   </TableCell>
//                   <TableCell align="right">${t.revenue.toLocaleString()}</TableCell>
//                   <TableCell align="right">{t.timeTaken}</TableCell>
//                   <TableCell align="right">{t.roi == null ? 'N/A' : t.roi.toFixed(1)}</TableCell>
//                   <TableCell>{t.priority}</TableCell>
//                   <TableCell>{t.status}</TableCell>
//                   <TableCell align="right">
//                     <Stack direction="row" spacing={1} justifyContent="flex-end">
//                       <Tooltip title="Edit">
//                         <IconButton onClick={(e) => handleEditClick(e, t)} size="small">
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton onClick={(e) => handleDeleteClick(e, t.id)} size="small" color="error">
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {tasks.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={7}>
//                     <Box py={6} textAlign="center" color="text.secondary">
//                       No tasks yet. Click "Add Task" to get started.
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//       <TaskForm
//         open={openForm}
//         onClose={() => setOpenForm(false)}
//         onSubmit={handleSubmit}
//         existingTitles={existingTitles}
//         initial={editing}
//       />
//       <TaskDetailsDialog
//         open={!!details}
//         task={details}
//         onClose={() => setDetails(null)}
//         onSave={onUpdate}
//       />
//     </Card>
//   );
// }
import { useMemo, useState } from 'react';
import { Box, Button, Card, CardContent, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from '@/components/TaskForm';
import TaskDetailsDialog from '@/components/TaskDetailsDialog';
export default function TaskTable({ tasks, onAdd, onUpdate, onDelete }) {
    const [openForm, setOpenForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [details, setDetails] = useState(null);
    const existingTitles = useMemo(() => tasks.map(t => t.title), [tasks]);
    const handleAddClick = () => {
        setEditing(null);
        setOpenForm(true);
    };
    const handleEditClick = (e, task) => {
        e.stopPropagation();
        setEditing(task);
        setOpenForm(true);
    };
    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        onDelete(id);
    };
    const handleSubmit = (value) => {
        if (value.id) {
            const { id, ...rest } = value;
            onUpdate(id, rest);
        }
        else {
            onAdd(value);
        }
    };
    return (_jsxs(Card, { children: [_jsxs(CardContent, { children: [_jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", mb: 2, children: [_jsx(Typography, { variant: "h6", fontWeight: 700, children: "Tasks" }), _jsx(Button, { startIcon: _jsx(AddIcon, {}), variant: "contained", onClick: handleAddClick, children: "Add Task" })] }), _jsx(TableContainer, { sx: { maxHeight: 520 }, children: _jsxs(Table, { stickyHeader: true, children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Title" }), _jsx(TableCell, { align: "right", children: "Revenue" }), _jsx(TableCell, { align: "right", children: "Time (h)" }), _jsx(TableCell, { align: "right", children: "ROI" }), _jsx(TableCell, { children: "Priority" }), _jsx(TableCell, { children: "Status" }), _jsx(TableCell, { align: "right", children: "Actions" })] }) }), _jsxs(TableBody, { children: [tasks.map(t => (_jsxs(TableRow, { hover: true, onClick: () => setDetails(t), sx: { cursor: 'pointer' }, children: [_jsx(TableCell, { children: _jsxs(Stack, { spacing: 0.5, children: [_jsx(Typography, { fontWeight: 600, children: t.title }), t.notes && (_jsx(Typography, { variant: "caption", color: "text.secondary", noWrap: true, title: t.notes, children: t.notes }))] }) }), _jsxs(TableCell, { align: "right", children: ["$", t.revenue.toLocaleString()] }), _jsx(TableCell, { align: "right", children: t.timeTaken }), _jsx(TableCell, { align: "right", children: t.roi == null ? 'N/A' : t.roi.toFixed(1) }), _jsx(TableCell, { children: t.priority }), _jsx(TableCell, { children: t.status }), _jsx(TableCell, { align: "right", children: _jsxs(Stack, { direction: "row", spacing: 1, justifyContent: "flex-end", children: [_jsx(Tooltip, { title: "Edit", children: _jsx(IconButton, { onClick: (e) => handleEditClick(e, t), size: "small", children: _jsx(EditIcon, { fontSize: "small" }) }) }), _jsx(Tooltip, { title: "Delete", children: _jsx(IconButton, { onClick: (e) => handleDeleteClick(e, t.id), size: "small", color: "error", children: _jsx(DeleteIcon, { fontSize: "small" }) }) })] }) })] }, t.id))), tasks.length === 0 && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 7, children: _jsx(Box, { py: 6, textAlign: "center", color: "text.secondary", children: "No tasks yet. Click \"Add Task\" to get started." }) }) }))] })] }) })] }), _jsx(TaskForm, { open: openForm, onClose: () => setOpenForm(false), onSubmit: handleSubmit, existingTitles: existingTitles, initial: editing }), _jsx(TaskDetailsDialog, { open: !!details, task: details, onClose: () => setDetails(null), onSave: onUpdate })] }));
}

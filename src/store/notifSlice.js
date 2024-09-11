import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotifs = createAsyncThunk('notifications/fetchNotifs', async (_, { getState }) => {
    const { user } = getState().auth; // Ambil user dari Redux state
    if (user.role === "3") {
        const response = await axios.get(`https://api.tatakelolakesmas.com/api/notif/${user.kabupaten}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
        });
        return response.data.data;
    }
    const response = await axios.get('https://api.tatakelolakesmas.com/api/notif', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
        },
    });
    return response.data.data;
});

// Thunk untuk menandai notifikasi sebagai read
export const markAsRead = createAsyncThunk('notifications/markAsRead', async (notifId, { getState }) => {
    const { user } = getState().auth; // Ambil user dari Redux state
    await axios.get(`https://api.tatakelolakesmas.com/api/notif/read/${notifId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
        },
    });
    return notifId;
});


const notifSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifs: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifs.fulfilled, (state, action) => {
                state.notifs = action.payload;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                const notif = state.notifs.find((n) => n.id === action.payload);
                if (notif) {
                    notif.is_read = '1';
                }
            });
    },
});

export default notifSlice.reducer;

export const selectThemeColors = (theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        // primary25: '#7367f01a', // for option hover bg-color
        // primary: '#7367f0', // for selected option bg-color
        primary75: "#E7FFFE", // for option hover bg-color
        primary50: "#E7FFFE", // for option hover bg-color
        primary25: "#E7FFFE", // for option hover bg-color
        primary: "#00B1A9", // for selected option bg-color
        neutral10: "#D9DEE3", // for tags bg-color
        neutral20: "#D9DEE3", // for input border-color
        neutral30: "#16B3AC", // for input hover border-color
    },
});
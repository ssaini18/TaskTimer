export const formatDateTime = (dateValue: string): string => {
    const date = new Date(dateValue);

    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: string = String(date.getFullYear()).slice(-2);

    let hours: number = date.getHours();
    let minutes: string = String(date.getMinutes()).padStart(2, '0');
    const isPM: boolean = hours >= 12;
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    const timeString: string = `${hours}:${minutes} ${isPM ? 'PM' : 'AM'}`;

    return `${day}/${month}/${year} ${timeString}`;
}
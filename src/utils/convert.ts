

export function convertDate(params: Date) {
    return new Date(params).toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

}
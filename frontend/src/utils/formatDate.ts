function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthDate = date.getMonth() + 1;

    let month;
    switch (monthDate) {
        case 1:
            month = 'styczeń';
            break;
        case 2:
            month = 'luty';
            break;
        case 3:
            month = 'marzec';
            break;
        case 4:
            month = 'kwiecień';
            break;
        case 5:
            month = 'maj';
            break;
        case 6:
            month = 'czerwiec';
            break;
        case 7:
            month = 'lipiec';
            break;
        case 8:
            month = 'sierpień';
            break;
        case 9:
            month = 'wrzesień';
            break;
        case 10:
            month = 'październik';
            break;
        case 11:
            month = 'listopad';
            break;
        case 12:
            month = 'grudzień';
            break;
    }

    return `${month} ${year}`;
}

export default formatDate;
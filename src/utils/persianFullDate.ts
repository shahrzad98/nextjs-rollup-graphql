const persianFullDate = (date: Date): string =>
    `${Intl.DateTimeFormat('fa-IR', { dateStyle: 'full' }).format(date)}`
        .replace(',', '')
        .split(' ')
        .reverse()
        .join(' ');

export default persianFullDate;

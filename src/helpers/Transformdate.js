export default function Transformdate(date){
    const selectedDate=new window.Date(date);
    const getfullyear=selectedDate.getFullYear();
    const getmonths=(selectedDate.getMonth()+1).toString().padStart(2,'0');
    const getday=selectedDate.getDate().toString().padStart(2,'0');

    return `${getfullyear}-${getmonths}-${getday}`
}
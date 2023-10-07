export default (username: string) => {
    const nowDate = new Date().getUTCMilliseconds().toString();
    const startDate = new Date().getTime().toString();
    let asciis = 0;
    for(let i = 0, len = username.length; i < len; i++)
    {
        asciis += username.charCodeAt(i);
    }
    return (nowDate + startDate + asciis.toString());
}
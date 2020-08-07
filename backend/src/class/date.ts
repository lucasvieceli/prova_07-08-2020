import * as moment from 'moment-timezone';

export class DateZone {

    static setTimezone() {
        moment.tz.setDefault('America/Sao_Paulo');
    }
    public static  get(date?, toDate = true): any{
        this.setTimezone();
        if(date && date.toString().match(/\d+/g)[0].length == date.length){
            date = parseInt(date);
        }
    
        const  value = (date) ? moment(date) : moment();
    
        if(toDate){
            return value.toDate();
        }
    
        return value;
    }
    
}



export function createHash (hashLength) {
  return Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
}


export function formatTime (time) {

  let date = new Date(time);
  if(date == 'Invalid Date'){
    return time;
  }else{
    Date.prototype.format = function(format) {
      /*
      * eg:format="YYYY-MM-dd hh:mm:ss";

      */
      var o = {
          "M+" :this.getMonth() + 1, // month
          "d+" :this.getDate(), // day
          "h+" :this.getHours(), // hour
          "m+" :this.getMinutes(), // minute
          "s+" :this.getSeconds(), // second
          "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
          "S" :this.getMilliseconds()
      // millisecond
      }
      if (/(Y+)/.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + "")
                  .substr(4 - RegExp.$1.length));
      }
      for ( var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                      : ("00" + o[k]).substr(("" + o[k]).length));
          }
      }
      return format;
    }

    return date.format('YYYY-MM-dd hh:mm') || time
  }
  
}

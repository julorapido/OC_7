export const dateParser = (num, mode) => {
    let options = {
      hour: "2-digit",
        minute: "2-digit",
 //    second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    let options_2 = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    let timestamp = Date.parse(num);
    if (mode){
        let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
        return date.toString();
    }else {
        let date = new Date(timestamp).toLocaleDateString("fr-FR", options_2);
        return date.toString();
    }

}
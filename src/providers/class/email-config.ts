export class EmailConfig{
    email_receive : string = "";
    email_sender: string = ""
    smtp_server: string = "";
    username: string = "";
    password: string = "";

    constructor(){}

    parseData(data){
        if(data){
            if("email_receive" in data)this.email_receive = data.email_receive;
            if("email_sender" in data)this.email_sender = data.email_sender;
            if("smtp_server" in data)this.smtp_server = data.smtp_server;
            if("username" in data)this.username = data.username;
            if("password" in data)this.password = data.password;
        }
    }
}
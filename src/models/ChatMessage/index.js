class ChatMessage {
    constructor(authorId, content, date) {
        this._authorId = authorId;
        this._content = content;
        const convertOptions = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
        this._date = date instanceof Date ? date.toLocaleDateString(ChatMessage.locale, convertOptions) : date;
    }

    get authorId() {
        return this._authorId;
    }

    get content() {
        return this._content;
    }

    get date() {
        return this._date;
    }

    _clone() {
        return new ChatMessage(this.authorId, this.content, this.date);
    }
}

ChatMessage.locale = 'pl-PL';

export default ChatMessage;
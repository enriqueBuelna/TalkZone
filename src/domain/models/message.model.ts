export class Message {
  private id: number;
  private sender_id: string;
  private receiver_id: string;
  private content: string;
  private media_url?: string;

  constructor(
    id: number,
    sender_id: string,
    receiver_id: string,
    content: string,
    media_url: string
  ) {
    this.id = id;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.content = content;
    this.media_url = media_url;
  }

  getId() {
    return this.id;
  }

  getSenderId() {
    return this.sender_id;
  }

  getReceiverId() {
    return this.receiver_id;
  }

  getContent() {
    return this.content;
  }

  getMediaUrl() {
    return this.media_url;
  }
}

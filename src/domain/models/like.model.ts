export class Like {
  private post_id!: string;
  private comment_id!: string;
  private post_id_comment!: string;
  constructor(post_id: string, comment_id: string, post_id_comment: string) {
    this.post_id = post_id;
    this.comment_id = comment_id;
    this.post_id_comment = post_id_comment;
  }

  getPostId() {
    return this.post_id;
  }

  getCommentId() {
    return this.comment_id;
  }

  getPostIdComment() {
    return this.post_id_comment;
  }
}

export class VoiceRoomToVoiceRoomTag {
  private tag_id: number;
  private tag_name: string;
  constructor(tag_id: number, tag_name: string) {
    this.tag_id = tag_id;
    this.tag_name = tag_name;
  }

  getTagID(): number {
    return this.tag_id;
  }

  getTagName(): string {
    return this.tag_name;
  }
}

import { Tag } from './tag.model';

export class UserPreferenceTag {
  private tag_id: number;
  private tag: Tag;

  constructor(tag_id: number, tag: Tag) {
    this.tag = tag;
    this.tag_id = tag_id;
  }

  getTagID(): number {
    return this.tag_id;
  }

  getTagName(): string {
    return this.tag.getTagName();
  }
}

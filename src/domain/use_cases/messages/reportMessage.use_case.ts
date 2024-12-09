import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageRepository } from '../../repositories/message.repository';

@Injectable({
  providedIn: 'root',
})
export class ReportMessage {
  constructor(private messageRespository: MessageRepository) {}

  execute(
    reason: string,
    details: string,
    reported_user_id: string,
    reporter_id: string,
    message_id: string
  ): Observable<boolean> {
    return this.messageRespository.reportMessage(
      reason,
      details,
      reported_user_id,
      reporter_id,
      message_id
    );
  }
}

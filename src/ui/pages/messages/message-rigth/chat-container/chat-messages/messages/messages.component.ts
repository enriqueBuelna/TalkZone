import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../../auth/services/user.service';
import { MessageService } from '../../../../../../../domain/services/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService as MS } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProgressBarModule, ToastModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  providers: [MS],
})
export class MessagesComponent implements OnInit, OnDestroy {
  @Input() content: string = '';
  @Input() whosMessage: string = '';
  @Input() sentAt!: Date;
  @Input() senderId!: string;
  @Input() id!: any;
  formReport!: FormGroup;

  ngOnDestroy(): void {
    this.content = '';
    this.whosMessage = '';;
    this.senderId = '';
  }

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _destroyRef: DestroyRef,
    private _ms: MS,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.formReport = this._formBuilder.group({
      reason: ['', [Validators.required]],
      details: ['', []],
    });
  }
  number = '';
  yeah = signal(false);
  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params) => {
        this.change();
      });
  }

  change() {
    // Expresión regular para extraer el número
    let regex =
      /Te invito a mi sala , ven rapido, no te la puedes perder: (\d+)/;

    // Usar `match` para buscar coincidencias
    let resultado = this.content.match(regex);

    if (resultado) {
      let numero = resultado[1];
      this.number = numero;
      this.yeah.set(true);
    } else {
      this.yeah.set(false);
    }
  }

  toggleOptionsMenu(event: Event) {
    event.stopPropagation(); // Prevenir propagación
    this.isOptionsMenuOpen = !this.isOptionsMenuOpen;
  }
  isOptionsMenuOpen = false;

  // Listener para clicks globales
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    // Verificar si el click NO está dentro del menú de opciones
    const optionsButton = event.target as HTMLElement;
    const optionsMenu = document.querySelector('.options-dropdown');

    if (
      this.isOptionsMenuOpen &&
      !optionsButton.closest('.options-menu-container') &&
      !optionsMenu?.contains(event.target as Node)
    ) {
      this.isOptionsMenuOpen = false;
    }
  }

  messageReport = signal(false);
  reportMessage() {
    this.messageReport.set(!this.messageReport());
  }

  submitEnter = signal(false);
  sendReport() {
    if (this.formReport.valid) {
      this.submitEnter.set(true);
      let { reason, details } = this.formReport.value;
      let reported_user_id = this.senderId;
      let reporter_id = this._userService.getUserId();
      let post_id = this.id;
      this._messageService
        .reportMessage(reason, details, reported_user_id, reporter_id, post_id)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (el) => {
            if (el) {
              this.reportMessage();
              this._ms.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Mensaje reportado correctamente',
              });
            }
          },
          error: (error) => {},
        });
    }
  }

  goToVoiceRoom() {
    this._router.navigate(['/voice_room', this.number]);
  }
}

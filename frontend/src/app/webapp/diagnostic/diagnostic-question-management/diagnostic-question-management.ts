import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { DiagnosticAdmin } from '../../../shared/services/diagnostic-admin.service';
import { DiagnosticQuestion } from '../../../shared/models/diagnostic.interface';

@Component({
  selector: 'app-diagnostic-question-management',
  imports: [MatIcon, FormsModule],
  templateUrl: './diagnostic-question-management.html',
  styleUrl: './diagnostic-question-management.css',
})
export class DiagnosticQuestionManagement {
  private diagnosticAdmin = inject(DiagnosticAdmin);
  private snackBar = inject(MatSnackBar);

  questions = signal<DiagnosticQuestion[]>([]);
  isLoading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  formData = { eventName: '', points: 0, order: 0 };

  constructor() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.isLoading.set(true);
    this.diagnosticAdmin.getQuestions().subscribe({
      next: (questions: DiagnosticQuestion[]) => {
        this.questions.set(questions);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  openNewForm() {
    this.formData = { eventName: '', points: 0, order: this.questions().length + 1 };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  editQuestion(q: DiagnosticQuestion) {
    this.formData = { eventName: q.eventName, points: q.points, order: q.order };
    this.editingId.set(q.id);
    this.showForm.set(true);
  }

  cancelForm() {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  saveQuestion() {
    const id = this.editingId();
    const obs = id
      ? this.diagnosticAdmin.updateQuestion(id, this.formData)
      : this.diagnosticAdmin.createQuestion(this.formData);

    obs.subscribe({
      next: () => {
        this.snackBar.open(id ? 'Question mise \u00e0 jour' : 'Question cr\u00e9\u00e9e', 'OK', {
          duration: 3000,
        });
        this.showForm.set(false);
        this.editingId.set(null);
        this.loadQuestions();
      },
      error: () => this.snackBar.open('Erreur', 'OK', { duration: 3000 }),
    });
  }

  deleteQuestion(id: number) {
    if (!confirm('Voulez-vous vraiment supprimer cette question ?')) return;

    this.diagnosticAdmin.deleteQuestion(id).subscribe({
      next: () => {
        this.snackBar.open('Question supprimée', 'OK', { duration: 3000 });
        this.loadQuestions();
      },
      error: () => this.snackBar.open('Erreur lors de la suppression', 'OK', { duration: 3000 }),
    });
  }
}

import { Component, Input, OnDestroy } from '@angular/core';
import { ProductI } from 'src/app/models/ProductModel';
import { DatabaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnDestroy {
  @Input() product!: ProductI;
  showModal = false;
  public componentDestroyed$ = new Subject<void>();
  reviewForm = new FormGroup({
    feedbackText: new FormControl('', [Validators.required]),
    rating: new FormControl(5, [Validators.required]),
  });

  constructor(public db: DatabaseService) {}

  switchModal() {
    this.showModal = !this.showModal;
  }

  sendReview() {
    if (this.reviewForm.invalid) return;
    console.log();
    this.db
      .sendData('reviews', {
        ...this.reviewForm.value,
        productName: this.product.name,
      })
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe();
    this.reviewForm.reset({ feedbackText: '', rating: 5 });
    this.switchModal();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}

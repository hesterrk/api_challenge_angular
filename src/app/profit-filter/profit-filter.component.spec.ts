import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitFilterComponent } from './profit-filter.component';

describe('ProfitFilterComponent', () => {
	let component: ProfitFilterComponent;
	let fixture: ComponentFixture<ProfitFilterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ProfitFilterComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfitFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

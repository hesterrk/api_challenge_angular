import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActioncustomComponent } from './actioncustom.component';

describe('ActioncustomComponent', () => {
	let component: ActioncustomComponent;
	let fixture: ComponentFixture<ActioncustomComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ActioncustomComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ActioncustomComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

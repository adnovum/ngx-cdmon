import { ApplicationRef, Inject, Injectable, OnDestroy, Optional } from '@angular/core';

import { TICK_REPORTERS, TickReporter } from './tick-reporter';

@Injectable()
export class CDMon implements OnDestroy {
	private _enabled = false;
	private readonly originalTick = this.app.tick;

	constructor(
		private readonly app: ApplicationRef,
		@Optional() @Inject(TICK_REPORTERS) private readonly reporters: TickReporter[]
	) {
		this.reporters = reporters || [];
	}

	ngOnDestroy(): void {
		this.disable();
	}

	get enabled(): boolean {
		return this._enabled;
	}

	set enabled(value: boolean) {
		if (this._enabled === value) {
			return;
		}
		this._enabled = value;
		if (value) {
			this.enable();
		} else {
			this.disable();
		}
	}

	enable(): void {
		const originalTick = this.originalTick;
		const reporters = this.reporters;

		reporters.forEach(reporter => reporter.startup());
		this.app.tick = function() {
			reporters.forEach(reporter => reporter.beforeTick());
			originalTick.call(this, arguments);
			reporters.forEach(reporter => reporter.afterTick());
		};
	}

	disable(): void {
		this.reporters.forEach(reporter => reporter.shutdown());
		this.app.tick = this.originalTick;
	}
}

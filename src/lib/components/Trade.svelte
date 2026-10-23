<script lang="ts">
	import { tick } from 'svelte';
	import Icon from './Icon.svelte';
	import { enquiry } from '$lib/enquiry.svelte';
	import { site } from '$lib/config';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
	const f = $derived(t.trade.form);
	const objects = $derived(t.collection.items.map((it) => `${it.type} — ${it.name}`));

	let name = $state('');
	let email = $state('');
	let studio = $state('');
	let projectType = $state('');
	let object = $state('');
	let message = $state('');
	let consent = $state(false);

	let errors = $state<{ name?: string; email?: string; consent?: string }>({});
	let attempted = $state(false);
	let sending = $state(false);
	let failed = $state(false);
	let done = $state<'' | 'sent' | 'mailed'>('');
	let formEl: HTMLFormElement | undefined = $state();
	let resultEl: HTMLDivElement | undefined = $state();

	// "Request details" on a product card pre-selects it here.
	$effect(() => {
		object = enquiry.object;
	});

	function validate() {
		const e: typeof errors = {};
		if (!name.trim()) e.name = f.errors.name;
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = f.errors.email;
		if (!consent) e.consent = f.errors.consent;
		return e;
	}

	// Re-validate live once the visitor has tried to submit.
	$effect(() => {
		if (attempted) errors = validate();
	});

	async function submit(ev: SubmitEvent) {
		ev.preventDefault();
		attempted = true;
		failed = false;
		errors = validate();
		const first = Object.keys(errors)[0];
		if (first) {
			await tick();
			const field = formEl?.querySelector<HTMLElement>(`[name="${first}"]`);
			formEl?.querySelector('.summary')?.scrollIntoView({
				block: 'start',
				behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
			});
			field?.focus({ preventScroll: true });
			return;
		}

		const data = { name, email, studio, projectType, object: object || f.objectAny, message };

		if (site.formEndpoint) {
			sending = true;
			try {
				const res = await fetch(site.formEndpoint, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
					body: JSON.stringify(data)
				});
				if (!res.ok) throw new Error(String(res.status));
				done = 'sent';
			} catch {
				failed = true;
			} finally {
				sending = false;
			}
		} else {
			const lines = [`${f.name}: ${data.name}`, `${f.email}: ${data.email}`];
			if (data.studio) lines.push(`${f.studio}: ${data.studio}`);
			if (data.projectType) lines.push(`${f.projectType}: ${data.projectType}`);
			lines.push(`${f.object}: ${data.object}`);
			if (data.message) lines.push('', data.message);
			const body = lines.join('\n');
			location.href = `mailto:${site.email}?subject=${encodeURIComponent(f.mailSubject)}&body=${encodeURIComponent(body)}`;
			done = 'mailed';
		}

		if (done) {
			await tick();
			resultEl?.focus();
		}
	}

	function reset() {
		name = email = studio = projectType = object = message = '';
		consent = false;
		attempted = false;
		errors = {};
		done = '';
		enquiry.object = '';
	}
</script>

<section id="trade" class="section trade field-pine" aria-labelledby="trade-title">
	<div class="container grid">
		<div class="copy">
			<p class="label eyebrow">{t.trade.eyebrow}</p>
			<h2 id="trade-title" class="h2 title">
				{#each t.trade.title as line, i (i)}
					<span class="line l{i}">{line.text}</span>{' '}
				{/each}
			</h2>
			<p class="lead">{t.trade.lead}</p>
			<ul class="topics">
				{#each t.trade.topics as topic, i (i)}
					<li>{topic}</li>
				{/each}
			</ul>
		</div>

		<div class="form-wrap">
			{#if done}
				<div class="result" bind:this={resultEl} tabindex="-1" role="status">
					<span class="tick" aria-hidden="true"><Icon name="check" /></span>
					<p class="result-title">{f.successTitle}</p>
					<p class="result-text">{done === 'sent' ? f.successSent : f.successMail}</p>
					<button class="link" type="button" onclick={reset}>{f.again}</button>
				</div>
			{:else}
				<form bind:this={formEl} novalidate onsubmit={submit}>
					{#if attempted && Object.keys(errors).length}
						<p class="summary" role="alert">{f.errors.summary}</p>
					{/if}

					<div class="field" class:invalid={errors.name}>
						<label for="f-name">{f.name}</label>
						<input
							id="f-name"
							name="name"
							type="text"
							autocomplete="name"
							required
							bind:value={name}
							aria-invalid={errors.name ? 'true' : undefined}
							aria-describedby={errors.name ? 'e-name' : undefined}
						/>
						{#if errors.name}<p class="err" id="e-name">{errors.name}</p>{/if}
					</div>

					<div class="field" class:invalid={errors.email}>
						<label for="f-email">{f.email}</label>
						<input
							id="f-email"
							name="email"
							type="email"
							inputmode="email"
							autocomplete="email"
							required
							bind:value={email}
							aria-invalid={errors.email ? 'true' : undefined}
							aria-describedby={errors.email ? 'e-email' : undefined}
						/>
						{#if errors.email}<p class="err" id="e-email">{errors.email}</p>{/if}
					</div>

					<div class="field">
						<label for="f-studio">{f.studio} <span class="opt">({f.optional})</span></label>
						<input id="f-studio" name="studio" type="text" autocomplete="organization" bind:value={studio} />
					</div>

					<div class="field">
						<label for="f-type">{f.projectType} <span class="opt">({f.optional})</span></label>
						<div class="select">
							<select id="f-type" name="projectType" bind:value={projectType}>
								<option value="">—</option>
								{#each f.projectTypes as pt (pt)}<option value={pt}>{pt}</option>{/each}
							</select>
						</div>
					</div>

					<div class="field full">
						<label for="f-object">{f.object} <span class="opt">({f.optional})</span></label>
						<div class="select">
							<select id="f-object" name="object" bind:value={object}>
								<option value="">{f.objectAny}</option>
								{#each objects as o (o)}<option value={o}>{o}</option>{/each}
							</select>
						</div>
					</div>

					<div class="field full">
						<label for="f-message">{f.message} <span class="opt">({f.optional})</span></label>
						<textarea
							id="f-message"
							name="message"
							rows="4"
							placeholder={f.messagePlaceholder}
							bind:value={message}
						></textarea>
					</div>

					<div class="field full check" class:invalid={errors.consent}>
						<label class="consent">
							<input
								type="checkbox"
								name="consent"
								required
								bind:checked={consent}
								aria-invalid={errors.consent ? 'true' : undefined}
								aria-describedby={errors.consent ? 'e-consent' : undefined}
							/>
							<span class="box" aria-hidden="true"><Icon name="check" /></span>
							<span>{f.consent}</span>
						</label>
						{#if errors.consent}<p class="err" id="e-consent">{errors.consent}</p>{/if}
					</div>

					{#if failed}
						<p class="summary full" role="alert">{f.errors.generic} <a href="mailto:{site.email}">{site.email}</a></p>
					{/if}

					<div class="full actions">
						<button class="btn submit" type="submit" disabled={sending}>
							{sending ? f.sending : f.submit}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		gap: clamp(3rem, 7vw, 4.5rem);
	}
	.eyebrow {
		color: var(--muted);
	}
	.title {
		margin-top: 1.25rem;
	}
	.title .line {
		display: block;
	}
	.title .l1 {
		padding-left: 0.6em;
	}
	.lead {
		margin-top: 1.75rem;
		color: var(--muted);
	}
	.topics {
		margin-top: 2.25rem;
		border-top: 1px solid var(--line);
	}
	.topics li {
		padding-block: 0.9rem;
		border-bottom: 1px solid var(--line);
		color: var(--ink);
		font-size: 1.0625rem;
	}

	form {
		display: grid;
		gap: 1.75rem;
	}
	.field {
		display: grid;
		gap: 0.2rem;
	}
	label {
		font-size: var(--fs-meta);
		font-weight: 500;
		color: var(--muted);
	}
	.opt {
		font-weight: 400;
		opacity: 0.8;
	}
	input[type='text'],
	input[type='email'],
	select,
	textarea {
		width: 100%;
		min-height: 3rem;
		padding: 0.6rem 0;
		border: 0;
		border-bottom: 1px solid var(--control);
		border-radius: 0;
		background: transparent;
		color: var(--ink);
		font-size: 1.0625rem; /* ≥16px prevents iOS zoom */
		line-height: 1.4;
		transition: border-color var(--fast) var(--ease);
	}
	textarea {
		resize: vertical;
		min-height: 7rem;
	}
	textarea::placeholder {
		color: var(--muted);
		opacity: 0.75;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: var(--ink);
	}
	input:focus-visible,
	select:focus-visible,
	textarea:focus-visible {
		outline: none;
		border-bottom: 2px solid var(--ink);
		margin-bottom: -1px;
	}
	.select {
		position: relative;
	}
	.select::after {
		content: '';
		position: absolute;
		right: 0.35rem;
		top: 50%;
		width: 0.45rem;
		height: 0.45rem;
		border-right: 1.25px solid var(--ink);
		border-bottom: 1.25px solid var(--ink);
		transform: translateY(-70%) rotate(45deg);
		pointer-events: none;
	}
	select {
		appearance: none;
		padding-right: 2rem;
		cursor: pointer;
	}
	select option {
		color: #233d32;
		background: #f3ede2;
	}
	.invalid input,
	.invalid .box {
		border-color: var(--ink);
		border-bottom-width: 2px;
	}
	.err {
		margin-top: 0.4rem;
		font-size: var(--fs-small);
		color: var(--ink);
	}
	.summary {
		padding: 0.85rem 1.1rem;
		border-radius: 0.5rem;
		background: rgb(243 237 226 / 0.08);
		color: var(--ink);
		font-size: var(--fs-small);
	}
	.summary a {
		text-decoration: underline;
	}

	.consent {
		position: relative;
		display: grid;
		grid-template-columns: 1.35rem 1fr;
		gap: 0.85rem;
		align-items: start;
		font-size: var(--fs-small);
		font-weight: 400;
		line-height: 1.55;
		color: var(--text);
		cursor: pointer;
		min-height: var(--target);
	}
	.consent input {
		position: absolute;
		left: 0;
		top: 0;
		width: 1.35rem;
		height: 1.35rem;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}
	.box {
		display: grid;
		place-items: center;
		width: 1.35rem;
		height: 1.35rem;
		border: 1px solid var(--control);
		border-radius: 0.3rem;
		color: transparent;
		transition:
			background-color var(--fast) var(--ease),
			color var(--fast) var(--ease);
	}
	.box :global(.icon) {
		width: 0.9rem;
		height: 0.9rem;
		stroke-width: 2;
	}
	.consent input:checked + .box {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--arje-pine);
	}
	.consent input:focus-visible + .box {
		outline: 2px solid var(--focus);
		outline-offset: 3px;
	}

	.submit {
		width: 100%;
	}
	.submit:disabled {
		opacity: 0.7;
		cursor: progress;
	}

	.result {
		display: grid;
		gap: 0.75rem;
		justify-items: start;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line-strong);
	}
	.result:focus {
		outline: none;
	}
	.tick {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px var(--line-strong);
		color: var(--ink);
		margin-bottom: 0.5rem;
	}
	.result-title {
		font-family: var(--font-display);
		font-weight: 300;
		font-stretch: var(--display-stretch);
		font-size: 2.75rem;
		line-height: 1;
		color: var(--ink);
	}
	.result-text {
		color: var(--text);
		max-width: 28rem;
	}

	@media (min-width: 48rem) {
		form {
			grid-template-columns: 1fr 1fr;
			column-gap: 2rem;
		}
		.full,
		.summary {
			grid-column: 1 / -1;
		}
		.submit {
			width: auto;
		}
	}

	@media (min-width: 64rem) {
		.grid {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			column-gap: var(--gutter);
			align-items: start;
		}
		.copy {
			grid-column: 1 / span 5;
		}
		.title {
			font-size: clamp(3rem, 4.9vw, 5.25rem);
		}
		.form-wrap {
			grid-column: 7 / -1;
			padding-top: 2.5rem;
		}
	}
</style>

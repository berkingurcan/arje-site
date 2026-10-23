import type { Dict } from './tr';

const en: Dict = {
	meta: {
		title: 'ARJE — by architect Arzu Gürcan | Designer Home Objects',
		description:
			'ARJE is a boutique design house by architect Arzu Gürcan. Sculptural forms, enduring lines and home objects of quiet presence.',
		ogLocale: 'en_US'
	},
	a11y: {
		skip: 'Skip to content',
		home: 'ARJE home',
		menuOpen: 'Open menu',
		menuClose: 'Close menu',
		language: 'Choose language',
		themeToLight: 'Switch to light theme',
		themeToDark: 'Switch to dark theme',
		prev: 'Previous',
		next: 'Next',
		backToTop: 'Back to top',
		mainNav: 'Main navigation'
	},
	ui: {
		menu: 'Menu',
		close: 'Close',
		themeLight: 'Light',
		themeDark: 'Dark',
		theme: 'Theme',
		language: 'Language',
		enquire: 'Enquire'
	},
	nav: {
		collection: 'Collection',
		approach: 'Approach',
		trade: 'For Architects',
		contact: 'Contact'
	},
	dock: {
		label: 'Sections',
		home: 'Home',
		collection: 'Collection',
		approach: 'Approach',
		trade: 'Architects',
		contact: 'Contact'
	},
	attribution: 'Architect Arzu Gürcan',
	attributionLead: 'Designed by',
	hero: {
		eyebrow: 'Designer objects for the home',
		title: [{ text: 'Objects' }, { text: 'of quiet', em: true }, { text: 'presence.' }],
		lead: 'Sculptural forms, enduring lines. A personal expression of home, by architect Arzu Gürcan.',
		ctaPrimary: 'Explore the collection',
		ctaSecondary: 'For architects',
		caption: 'First collection in preparation',
		scroll: 'Scroll down'
	},
	manifesto: {
		eyebrow: 'ARJE in three words',
		items: [
			{
				word: 'Considered.',
				text: 'Every proportion, edge and surface is weighed — not once, but many times. Simple at first glance; subtle at the second.'
			},
			{
				word: 'Collected.',
				text: 'On a console, a shelf or a dining table, each piece is chosen to give shape to the space it occupies.'
			},
			{
				word: 'Kept.',
				text: 'Not seasonal, but lasting. Objects that, over the years, become part of a home’s memory.'
			}
		]
	},
	collection: {
		eyebrow: 'Collection',
		title: 'Selected objects',
		note: 'The first collection is in preparation. Prices, dimensions and materials on request.',
		status: 'Price on request',
		request: 'Request details',
		representative: 'Representative image',
		swipe: 'Swipe to explore',
		items: [
			{ type: 'Table sculpture', name: 'Masa' },
			{ type: 'Wall light', name: 'Duvar' },
			{ type: 'Decorative dish', name: 'Renko' },
			{ type: 'Wall planter', name: 'Saksı' },
			{ type: 'Book holder', name: 'Kitap' },
			{ type: 'Garden sculpture', name: 'Bahçe' }
		],
		endTitle: 'The full collection',
		endText: 'Be the first to know as new pieces arrive.',
		endCta: 'Keep me informed'
	},
	approach: {
		eyebrow: 'Approach',
		title: [{ text: 'Luxury lives not in display,' }, { text: 'but in proportion, material and authorship.', em: true }],
		lead: 'At ARJE, every object begins as an architectural question: how does it stand in a room, how does it meet the light, how does it feel in the hand? We look for the answer not in ornament, but in measure, texture and restraint.',
		pillars: [
			{ title: 'Proportion', text: 'Measure and balance, set with an architect’s discipline.' },
			{ title: 'Material', text: 'Surfaces chosen for their texture, their weight and the character they gain over time.' },
			{ title: 'Authorship', text: 'Each piece carries its designer’s personal view of home.' }
		],
		caption: 'Light, shadow and form'
	},
	inSitu: {
		eyebrow: 'In situ',
		title: 'Pieces that complete the character of a room.',
		captions: ['Living room', 'Console', 'Reading corner']
	},
	trade: {
		eyebrow: 'For architects & interior designers',
		title: [{ text: 'Let’s curate' }, { text: 'for your project.', em: true }],
		lead: 'We value working alongside architects and interior designers on residential and boutique hospitality projects. Tell us about your project, and we’ll share suitable pieces with dimensions and material details.',
		topics: ['Project-specific curation', 'Dimensions & material details', 'Lead times & availability'],
		form: {
			name: 'Full name',
			email: 'Work email',
			studio: 'Studio / firm',
			projectType: 'Project type',
			projectTypes: ['Residential', 'Boutique hospitality', 'Office / commercial', 'Other'],
			object: 'Piece of interest',
			objectAny: 'Not decided yet',
			message: 'Message',
			messagePlaceholder: 'A few words about the project, the space and your timeline.',
			optional: 'optional',
			required: 'required',
			consent: 'I agree that my details will be used only to respond to this enquiry.',
			submit: 'Send enquiry',
			sending: 'Sending…',
			errors: {
				name: 'Please enter your name.',
				email: 'Please enter a valid email address.',
				consent: 'Please give your consent to continue.',
				generic: 'Your enquiry couldn’t be sent just now. Please try again shortly or email us directly.',
				summary: 'Please check the highlighted fields.'
			},
			successTitle: 'Thank you.',
			successSent: 'Your enquiry has reached us. We’ll be in touch shortly.',
			successMail: 'Your email app has opened with your enquiry — just press send.',
			again: 'Start a new enquiry',
			mailSubject: 'ARJE — Project enquiry'
		}
	},
	alt: {
		hero: 'The Duvar wall light: a copper-glazed ceramic disc with a glass globe, on a stone wall',
		approach: 'Stone columns casting strong shadows',
		approachDetail: 'Ceramic vessels in earthy tones on a wooden surface',
		inSitu: [
			'A bright living room with a large window',
			'A wooden sideboard styled with objects',
			'A table lamp beside a stack of books'
		]
	},
	footer: {
		tagline: 'Objects of quiet presence.',
		contactTitle: 'Contact',
		emailLabel: 'Email',
		exploreTitle: 'Explore',
		rights: 'All rights reserved.',
		credit: 'Temporary imagery: Unsplash',
		social: 'Social media',
		follow: 'Follow ARJE',
		emailNote: 'Project enquiries and press'
	}
};

export default en;

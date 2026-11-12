import type { Dict } from './tr';

const en: Dict = {
	meta: {
		title: 'ARJE — by architect Arzu Gürcan | Designer Objects for Your Spaces',
		description:
			'ARJE is a design studio by architect Arzu Gürcan. Sculptural forms, enduring lines and objects of quiet presence for your spaces.',
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
		eyebrow: 'Designer objects for your spaces',
		title: [{ text: 'Objects' }, { text: 'of quiet', em: true }, { text: 'presence.' }],
		lead: 'Unique designs by architect Arzu Gürcan, inspired by nature and tailored to each person and space.',
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
				text: 'Not seasonal, but lasting. Objects that become part of the memory of your spaces over the years.'
			}
		]
	},
	collection: {
		eyebrow: 'Collection',
		title: 'Selected objects',
		note: 'The first collection is in preparation. Prices, dimensions and materials on request.',
		status: 'Price on request',
		request: 'Request details',
		swipe: 'Swipe to explore',
		filterLabel: 'Product categories',
		all: 'All',
		categories: { sconce: 'Wall light', decor: 'Decorative object', plate: 'Plate' },
		productAlt: {
			masa: 'Looping cream ceramic sculpture styled with yellow flowers',
			duvar: 'Terracotta wall light with radiating ridges around a white globe',
			saksi: 'Blue planter with pink flowers on a speckled white ceramic panel',
			kitap: 'Speckled ceramic ribbon styled with yellow flowers',
			smallLeaf: 'Small green ceramic leaf with a gold-colored rim',
			heartLeaf: 'Heart-shaped green ceramic leaf with a gold-colored rim',
			terracottaFlower: 'Orange flower-shaped ceramic piece with a white globe',
			purplePlatter: 'Cream ceramic platter with purple flowers and a wavy rim',
			longLeaf: 'Narrow ceramic dish with a green leaf pattern',
			polkaDotVase: 'Green vase with white dots and a ruffled white rim',
			cobaltLeaf: 'Cobalt blue ceramic leaf with raised veins',
			bluePlatter: 'Cream ceramic platter with a gold-colored rim and blue foliage',
			speckledWave: 'Speckled ceramic wave with a white globe in the center',
			creamLeaf: 'Cream ceramic leaf with a gold-colored rim and a white globe'
		},
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
			{ title: 'Authorship', text: 'Each piece reflects its designer’s personal view of space.' }
		],
		caption: 'Light, shadow and form'
	},
	gallery: {
		title: 'Form and color in ceramics'
	},
	trade: {
		eyebrow: 'For architects & interior designers',
		title: [{ text: 'Let’s curate' }, { text: 'for your project.', em: true }],
		lead: 'We value the chance to collaborate on your projects. Tell us what you’re working on, and we’ll share suitable pieces with dimensions and material details.',
		topics: ['Project-specific curation', 'Dimensions & material details', 'Lead times & availability'],
		form: {
			name: 'Full name',
			email: 'Work email',
			studio: 'Studio / firm',
			projectType: 'Project type',
			projectTypes: ['Residential', 'Hotel', 'Café / restaurant', 'Office / commercial', 'Other'],
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
		hero: 'Sculptural open-form cream ceramic vase with yellow flowers',
		approach: 'Blue planter with yellow flowers on a speckled white ceramic panel',
		approachDetail: 'Orange flower-shaped ceramic piece with a white globe'
	},
	footer: {
		tagline: 'Objects of quiet presence.',
		contactTitle: 'Contact',
		emailLabel: 'Email',
		exploreTitle: 'Explore',
		rights: 'All rights reserved.',
		social: 'Social media',
		follow: 'Follow ARJE',
		emailNote: 'Project enquiries and press'
	}
};

export default en;

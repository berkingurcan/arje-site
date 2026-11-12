import type { ProductCategory, ProductId } from '$lib/media';

/** Türkçe — varsayılan dil. */
const tr = {
	meta: {
		title: 'ARJE — Mimar Arzu Gürcan | Mekânlarınız İçin Tasarım Objeleri',
		description:
			'ARJE, Mimar Arzu Gürcan imzalı bir tasarım stüdyosu. Mekânlarınız için heykelsi formlar, kalıcı çizgiler ve sessiz duruşlu objeler.',
		ogLocale: 'tr_TR'
	},
	a11y: {
		skip: 'İçeriğe geç',
		home: 'ARJE ana sayfa',
		menuOpen: 'Menüyü aç',
		menuClose: 'Menüyü kapat',
		language: 'Dil seçimi',
		themeToLight: 'Açık temaya geç',
		themeToDark: 'Koyu temaya geç',
		prev: 'Önceki',
		next: 'Sonraki',
		backToTop: 'Başa dön',
		mainNav: 'Ana menü'
	},
	ui: {
		menu: 'Menü',
		close: 'Kapat',
		themeLight: 'Açık',
		themeDark: 'Koyu',
		theme: 'Tema',
		language: 'Dil',
		enquire: 'Talep gönderin'
	},
	nav: {
		collection: 'Koleksiyon',
		approach: 'Yaklaşım',
		trade: 'Mimarlar İçin',
		contact: 'İletişim'
	},
	dock: {
		label: 'Bölümler',
		home: 'Ana sayfa',
		collection: 'Koleksiyon',
		approach: 'Yaklaşım',
		trade: 'Mimarlar',
		contact: 'İletişim'
	},
	attribution: 'Mimar Arzu Gürcan',
	attributionLead: 'Tasarım',
	hero: {
		eyebrow: 'Mekânlarınız için tasarım objeleri',
		title: [
			{ text: 'Sessiz' },
			{ text: 'duruşlu', em: true },
			{ text: 'nesneler.' }
		],
		lead: 'Doğadan ilham alan, eşsiz, kişiye ve mekâna özel, Mimar Arzu Gürcan’dan tasarımlar.',
		ctaPrimary: 'Koleksiyonu keşfedin',
		ctaSecondary: 'Mimarlar için',
		caption: 'İlk koleksiyon hazırlanıyor',
		scroll: 'Aşağı kaydırın'
	},
	manifesto: {
		eyebrow: 'Üç kelimeyle ARJE',
		items: [
			{
				word: 'Düşünülür.',
				text: 'Her oran, her kenar, her yüzey bir kez değil, defalarca ele alınır. İlk bakışta sade; ikinci bakışta incelikli.'
			},
			{
				word: 'Seçilir.',
				text: 'Bir konsolda, bir rafta ya da yemek masasında… Her parça, bulunduğu mekâna biçim verecek şekilde seçilir.'
			},
			{
				word: 'Saklanır.',
				text: 'Mevsimlik değil, kalıcı. Yıllar içinde mekânlarınızın hafızasına karışan nesneler.'
			}
		]
	},
	collection: {
		eyebrow: 'Koleksiyon',
		title: 'Seçili nesneler',
		note: 'İlk koleksiyon hazırlanıyor. Fiyat, ölçü ve malzeme bilgisi talep üzerine.',
		status: 'Fiyat talep üzerine',
		request: 'Bilgi isteyin',
		swipe: 'Kaydırarak keşfedin',
		filterLabel: 'Ürün kategorileri',
		all: 'Tümü',
		categories: { sconce: 'Aplik', decor: 'Dekoratif obje', plate: 'Tabak' } satisfies Record<ProductCategory, string>,
		productAlt: {
			masa: 'Sarı çiçeklerle süslenmiş, kıvrımlı krem seramik obje',
			duvar: 'Beyaz küreli, güneş ışınları gibi çizgili terrakota aplik',
			saksi: 'Benekli beyaz seramik levha üzerinde pembe çiçekli mavi saksı',
			kitap: 'Sarı çiçeklerle süslenmiş, şerit gibi kıvrılan benekli seramik',
			smallLeaf: 'Altın renkli kenarlı, küçük yeşil seramik yaprak',
			heartLeaf: 'Altın renkli kenarlı, kalp biçiminde yeşil seramik yaprak',
			terracottaFlower: 'Ortası beyaz küreli, çiçek biçiminde turuncu seramik',
			purplePlatter: 'Mor çiçek desenli, dalgalı kenarlı krem seramik tabak',
			longLeaf: 'Yeşil yaprak desenli, ince ve uzun seramik tabak',
			polkaDotVase: 'Beyaz puantiyeli, dalgalı beyaz ağızlı yeşil seramik vazo',
			cobaltLeaf: 'Yaprak damarları belirgin, kobalt mavisi seramik yaprak',
			bluePlatter: 'Mavi yaprak desenli, altın renkli kenarlı krem seramik tabak',
			speckledWave: 'Ortası beyaz küreli, dalga biçiminde benekli seramik',
			creamLeaf: 'Ortası beyaz küreli, altın renkli kenarlı krem seramik yaprak'
		} satisfies Record<ProductId, string>,
		endTitle: 'Koleksiyonun tamamı',
		endText: 'Yeni parçalar eklendikçe ilk siz haberdar olun.',
		endCta: 'Haber verin'
	},
	approach: {
		eyebrow: 'Yaklaşım',
		title: [{ text: 'Lüks, gösterişte değil;' }, { text: 'oranda, malzemede ve imzada.', em: true }],
		lead: 'ARJE’de her nesne önce mimari bir soru olarak ele alınır: Mekânda nasıl durur, ışığı nasıl karşılar, ele alındığında nasıl hissettirir? Yanıtı süslemede değil; ölçüde, dokuda ve sadelikte ararız.',
		pillars: [
			{ title: 'Oran', text: 'Mimari bir disiplinle kurulan ölçü ve denge.' },
			{ title: 'Malzeme', text: 'Dokusu, ağırlığı ve zamanla kazandığı karakter için seçilen yüzeyler.' },
			{ title: 'İmza', text: 'Her parça, tasarımcısının mekâna dair kişisel bakışını taşır.' }
		],
		caption: 'Işık, gölge ve form'
	},
	gallery: {
		title: 'Seramikte form ve renk'
	},
	trade: {
		eyebrow: 'Mimarlar ve iç mimarlar için',
		title: [{ text: 'Projeniz için' }, { text: 'birlikte seçelim.', em: true }],
		lead: 'Projelerinizde sizinle birlikte çalışmayı önemsiyoruz. Projenizi anlatın, size uygun parçaları ölçü ve malzeme bilgileriyle paylaşalım.',
		topics: ['Projeye özel seçki', 'Ölçü ve malzeme bilgisi', 'Teslim süresi ve stok durumu'],
		form: {
			name: 'Ad soyad',
			email: 'İş e-postası',
			studio: 'Stüdyo / firma',
			projectType: 'Proje türü',
			projectTypes: ['Konut', 'Otel', 'Kafe / restoran', 'Ofis / ticari mekân', 'Diğer'],
			object: 'İlgilendiğiniz parça',
			objectAny: 'Henüz karar vermedim',
			message: 'Mesajınız',
			messagePlaceholder: 'Proje, mekân ve zamanlama hakkında kısaca bilgi verin.',
			optional: 'isteğe bağlı',
			required: 'zorunlu',
			consent: 'Bilgilerimin yalnızca bu talebe yanıt vermek için kullanılmasını kabul ediyorum.',
			submit: 'Talebi gönder',
			sending: 'Gönderiliyor…',
			errors: {
				name: 'Lütfen adınızı yazın.',
				email: 'Lütfen geçerli bir e-posta adresi yazın.',
				consent: 'Devam etmek için onay vermeniz gerekiyor.',
				generic: 'Talebiniz şu an gönderilemedi. Lütfen biraz sonra tekrar deneyin ya da bize e-posta ile yazın.',
				summary: 'Lütfen işaretli alanları kontrol edin.'
			},
			successTitle: 'Teşekkürler.',
			successSent: 'Talebiniz bize ulaştı. En kısa sürede size dönüş yapacağız.',
			successMail: 'E-posta uygulamanız talebinizle birlikte açıldı; göndermeniz yeterli.',
			again: 'Yeni bir talep oluşturun',
			mailSubject: 'ARJE — Proje talebi'
		}
	},
	alt: {
		hero: 'Sarı çiçeklerle süslenmiş, heykelsi ve açık formlu krem seramik vazo',
		approach: 'Benekli beyaz seramik levha üzerinde sarı çiçekli mavi saksı',
		approachDetail: 'Ortası beyaz küreli, çiçek biçiminde turuncu seramik'
	},
	footer: {
		tagline: 'Sessiz duruşlu nesneler.',
		contactTitle: 'İletişim',
		emailLabel: 'E-posta',
		exploreTitle: 'Keşfedin',
		rights: 'Tüm hakları saklıdır.',
		social: 'Sosyal medya',
		follow: 'ARJE’yi takip edin',
		emailNote: 'Proje talepleri ve basın için'
	}
};

export type Dict = typeof tr;
export default tr;

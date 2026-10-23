/**
 * Türkçe — varsayılan dil.
 * Ürün adları ("Form I" vb.) çalışma adıdır; gerçek koleksiyon bilgileri gelince güncelleyin.
 */
const tr = {
	meta: {
		title: 'ARJE — Mimar Arzu Gürcan | Tasarım Ev Objeleri',
		description:
			'ARJE, Mimar Arzu Gürcan imzalı butik bir tasarım evi. Heykelsi formlar, kalıcı çizgiler ve sessiz duruşlu ev objeleri.',
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
		language: 'Dil'
	},
	nav: {
		collection: 'Koleksiyon',
		approach: 'Yaklaşım',
		atelier: 'Atölye',
		trade: 'Mimarlar İçin',
		contact: 'İletişim'
	},
	attribution: 'Mimar Arzu Gürcan',
	attributionLead: 'Tasarım',
	hero: {
		eyebrow: 'Ev için tasarım objeleri',
		title: [
			{ text: 'Sessiz' },
			{ text: 'duruşlu', em: true },
			{ text: 'nesneler.' }
		],
		lead: 'Heykelsi formlar, kalıcı çizgiler. Mimar Arzu Gürcan’dan eve dair kişisel bir yorum.',
		ctaPrimary: 'Koleksiyonu keşfedin',
		ctaSecondary: 'Mimarlar için',
		caption: 'İlk koleksiyon · Hazırlanıyor',
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
				text: 'Mevsimlik değil, kalıcı. Yıllar içinde evin hafızasına karışan nesneler.'
			}
		]
	},
	collection: {
		eyebrow: 'Koleksiyon',
		title: 'Seçili nesneler',
		note: 'İlk koleksiyon hazırlanıyor. Buradaki görseller temsilîdir; ürün fotoğrafları çok yakında burada.',
		status: 'Fiyat talep üzerine',
		request: 'Bilgi isteyin',
		representative: 'Temsilî görsel',
		swipe: 'Kaydırarak keşfedin',
		items: [
			{ type: 'Vazo', name: 'Form I' },
			{ type: 'Kase', name: 'Form II' },
			{ type: 'Şamdan', name: 'Form III' },
			{ type: 'Vazo üçlüsü', name: 'Form IV' },
			{ type: 'Vazo', name: 'Form V' }
		],
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
			{ title: 'İmza', text: 'Her parça, tasarımcısının eve dair kişisel bakışını taşır.' }
		],
		caption: 'Işık, gölge ve form'
	},
	atelier: {
		eyebrow: 'Atölye',
		role: 'Mimar',
		name: 'Arzu Gürcan',
		statement: 'Heykelsi nesneler, kalıcı formlar. Eve dair kişisel bir ifade.',
		body: 'ARJE, Mimar Arzu Gürcan’ın imzasını taşıyan butik bir tasarım evi. Mimarlığın oran duygusu burada odanın ölçeğinden, elde tutulan bir nesnenin ölçeğine taşınıyor. Her parça, bir mekânın karakterini tamamlamak için tasarlanıyor.',
		portraitNote: 'Portre yakında',
		sketchCaption: 'Çizimden nesneye'
	},
	inSitu: {
		eyebrow: 'Mekânda',
		title: 'Bir odanın karakterini tamamlayan parçalar.',
		captions: ['Salon', 'Konsol', 'Okuma köşesi']
	},
	trade: {
		eyebrow: 'Mimarlar ve iç mimarlar için',
		title: [{ text: 'Projeniz için' }, { text: 'birlikte seçelim.', em: true }],
		lead: 'Konut ve butik otel projelerinde mimarlar ve iç mimarlarla birlikte çalışmayı önemsiyoruz. Projenizi anlatın; size uygun parçaları ölçü ve malzeme bilgileriyle paylaşalım.',
		topics: ['Projeye özel seçki', 'Ölçü ve malzeme bilgisi', 'Teslim süresi ve stok durumu'],
		form: {
			name: 'Ad soyad',
			email: 'İş e-postası',
			studio: 'Stüdyo / firma',
			projectType: 'Proje türü',
			projectTypes: ['Konut', 'Butik otel', 'Ofis / ticari mekân', 'Diğer'],
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
		hero: 'Beyaz basamaklı sade bir merdiven ve sahanlıkta duran bir vazo',
		approach: 'Güçlü gölgeler düşen taş sütunlar',
		approachDetail: 'Ahşap bir yüzeyde toprak tonlarında seramik vazolar',
		sketch: 'Kalem ve cetvelle çizim yapan bir mimarın elleri',
		inSitu: [
			'Geniş pencereli, aydınlık bir oturma odası',
			'Ahşap bir konsol ve üzerindeki dekoratif objeler',
			'Bir masa lambası ve kitaplar'
		]
	},
	footer: {
		tagline: 'Sessiz duruşlu nesneler.',
		contactTitle: 'İletişim',
		emailLabel: 'E-posta',
		exploreTitle: 'Keşfedin',
		rights: 'Tüm hakları saklıdır.',
		credit: 'Geçici görseller: Unsplash'
	}
};

export type Dict = typeof tr;
export default tr;

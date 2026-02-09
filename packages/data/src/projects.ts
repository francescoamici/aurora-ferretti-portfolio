import type { Project, CaseStudy } from './types';

export const projects: Project[] = [
  {
    id: 'p1',
    slug: '19-40-3',
    title: '19.40.3',
    year: 2023,
    categories: ['Art Direction', 'Visual Identity', 'Editorial'],
    thumbnail: '/images/projects/19-40-3/thumb.jpg',
    images: [
      '/images/projects/19-40-3/01.jpg',
      '/images/projects/19-40-3/02.jpg',
      '/images/projects/19-40-3/03.jpg',
      '/images/projects/19-40-3/04.jpg',
    ],
    color: '#2D3436',
  },
  {
    id: 'p2',
    slug: 'moby-dick',
    title: 'Moby Dick',
    year: 2023,
    categories: ['Illustration', 'Editorial', 'Book Design'],
    thumbnail: '/images/projects/moby-dick/thumb.jpg',
    images: [
      '/images/projects/moby-dick/01.jpg',
      '/images/projects/moby-dick/02.jpg',
      '/images/projects/moby-dick/03.jpg',
      '/images/projects/moby-dick/04.jpg',
      '/images/projects/moby-dick/05.jpg',
    ],
    color: '#1B4965',
  },
  {
    id: 'p3',
    slug: 'lufthansa',
    title: 'Lufthansa Campaign',
    year: 2024,
    categories: ['Advertising', 'Art Direction'],
    client: 'Lufthansa',
    thumbnail: '/images/projects/lufthansa/thumb.jpg',
    images: [
      '/images/projects/lufthansa/01.jpg',
      '/images/projects/lufthansa/02.jpg',
      '/images/projects/lufthansa/03.jpg',
      '/images/projects/lufthansa/04.jpg',
    ],
    color: '#05164D',
  },
  {
    id: 'p4',
    slug: 'oreo',
    title: 'Oreo Campaign',
    year: 2024,
    categories: ['Visual Design', 'Social Media'],
    client: 'Oreo',
    thumbnail: '/images/projects/oreo/thumb.jpg',
    images: [
      '/images/projects/oreo/01.jpg',
      '/images/projects/oreo/02.jpg',
      '/images/projects/oreo/03.jpg',
      '/images/projects/oreo/04.jpg',
    ],
    color: '#0057A0',
  },
  {
    id: 'p5',
    slug: 'ups',
    title: 'UPS Campaign',
    year: 2024,
    categories: ['Visual Design', 'Branding'],
    client: 'UPS',
    thumbnail: '/images/projects/ups/thumb.jpg',
    images: [
      '/images/projects/ups/01.jpg',
      '/images/projects/ups/02.jpg',
      '/images/projects/ups/03.jpg',
      '/images/projects/ups/04.jpg',
    ],
    color: '#351C15',
  },
  {
    id: 'p6',
    slug: 'roma-poster-series',
    title: 'Roma Poster Series',
    year: 2023,
    categories: ['Illustration', 'Poster', 'Cultural'],
    isMock: true,
    thumbnail: '/images/projects/roma-poster/thumb.jpg',
    images: [
      '/images/projects/roma-poster/01.jpg',
      '/images/projects/roma-poster/02.jpg',
      '/images/projects/roma-poster/03.jpg',
      '/images/projects/roma-poster/04.jpg',
      '/images/projects/roma-poster/05.jpg',
      '/images/projects/roma-poster/06.jpg',
    ],
    color: '#C75B39',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    projectId: 'p1',
    overview: {
      it: 'Un progetto di art direction e identità visiva che esplora la relazione tra tempo, spazio e percezione umana attraverso un linguaggio visivo minimalista e d\'impatto.',
      en: 'An art direction and visual identity project exploring the relationship between time, space, and human perception through a minimalist and impactful visual language.',
    },
    challenge: {
      it: 'Creare un\'identità visiva che comunicasse concetti astratti di tempo e spazio in modo tangibile e accessibile, mantenendo un forte impatto emotivo.',
      en: 'Creating a visual identity that communicated abstract concepts of time and space in a tangible, accessible way while maintaining strong emotional impact.',
    },
    process: {
      it: 'Ricerca approfondita su rappresentazioni artistiche del tempo attraverso i secoli, seguita da sperimentazione tipografica e sviluppo di un sistema di griglie modulari.',
      en: 'In-depth research on artistic representations of time through the centuries, followed by typographic experimentation and development of a modular grid system.',
    },
    solution: {
      it: 'Un sistema di identità visiva basato su griglie matematiche e tipografia espressiva, dove ogni elemento grafico rappresenta una diversa dimensione temporale.',
      en: 'A visual identity system based on mathematical grids and expressive typography, where each graphic element represents a different temporal dimension.',
    },
    results: {
      it: 'Il progetto ha ricevuto riconoscimenti dalla comunità del design e ha generato interesse da parte di gallerie d\'arte contemporanea per una possibile esposizione.',
      en: 'The project received recognition from the design community and generated interest from contemporary art galleries for a potential exhibition.',
    },
    testimonial: {
      quote: {
        it: 'Un lavoro che trascende il design tradizionale per entrare nel territorio dell\'arte contemporanea.',
        en: 'A work that transcends traditional design to enter the territory of contemporary art.',
      },
      author: 'Marco Rossi',
      role: 'Direttore Creativo',
    },
  },
  {
    projectId: 'p2',
    overview: {
      it: 'Una reinterpretazione visiva del capolavoro di Herman Melville attraverso illustrazioni originali e un design editoriale che cattura l\'essenza epica del romanzo.',
      en: 'A visual reinterpretation of Herman Melville\'s masterpiece through original illustrations and editorial design that captures the epic essence of the novel.',
    },
    challenge: {
      it: 'Tradurre la potenza narrativa e l\'immaginario di Moby Dick in un linguaggio visivo contemporaneo, rispettando la profondità letteraria dell\'opera originale.',
      en: 'Translating the narrative power and imagery of Moby Dick into a contemporary visual language while respecting the literary depth of the original work.',
    },
    process: {
      it: 'Studio approfondito del testo originale, ricerca iconografica sulla tradizione dell\'illustrazione marittima, sviluppo di una palette cromatica ispirata all\'oceano e sperimentazione con tecniche miste.',
      en: 'In-depth study of the original text, iconographic research on maritime illustration tradition, development of an ocean-inspired color palette, and experimentation with mixed techniques.',
    },
    solution: {
      it: 'Una serie di illustrazioni che fondono realismo e astrazione, accompagnate da un design editoriale che guida il lettore attraverso le profondità della narrazione.',
      en: 'A series of illustrations blending realism and abstraction, accompanied by editorial design that guides the reader through the depths of the narrative.',
    },
    results: {
      it: 'Il progetto è stato selezionato per mostre di illustrazione editoriale e ha ricevuto menzioni in pubblicazioni di settore dedicate al book design.',
      en: 'The project was selected for editorial illustration exhibitions and received mentions in industry publications dedicated to book design.',
    },
    testimonial: {
      quote: {
        it: 'Le illustrazioni di Aurora danno nuova vita a un classico immortale con una sensibilità visiva straordinaria.',
        en: 'Aurora\'s illustrations breathe new life into an immortal classic with extraordinary visual sensitivity.',
      },
      author: 'Giulia Bianchi',
      role: 'Editrice, Casa Editrice Mediterranea',
    },
  },
  {
    projectId: 'p3',
    overview: {
      it: 'Campagna pubblicitaria multicanale per Lufthansa che celebra il piacere del viaggio e la connessione tra culture diverse attraverso un visual storytelling emozionale.',
      en: 'A multichannel advertising campaign for Lufthansa celebrating the joy of travel and the connection between diverse cultures through emotional visual storytelling.',
    },
    challenge: {
      it: 'Rivitalizzare la percezione del brand Lufthansa presso un pubblico giovane e cosmopolita, comunicando affidabilità e spirito d\'avventura contemporaneo.',
      en: 'Revitalizing Lufthansa\'s brand perception among a young, cosmopolitan audience, communicating reliability and contemporary spirit of adventure.',
    },
    process: {
      it: 'Workshop strategici con il team marketing Lufthansa, analisi dei competitor, sviluppo di concept creativi basati su insight di viaggio reali, produzione fotografica e post-produzione.',
      en: 'Strategic workshops with Lufthansa\'s marketing team, competitor analysis, creative concept development based on real travel insights, photo production and post-production.',
    },
    solution: {
      it: 'Una campagna visiva che racconta micro-storie di viaggio attraverso composizioni fotografiche cinematiche, con un sistema tipografico che bilancia eleganza tedesca e calore mediterraneo.',
      en: 'A visual campaign telling micro travel stories through cinematic photographic compositions, with a typographic system balancing German elegance and Mediterranean warmth.',
    },
    results: {
      it: 'Aumento del 23% dell\'engagement sui canali social europei, con la campagna selezionata per il portfolio creativo annuale dell\'agenzia Arkage.',
      en: '23% increase in engagement on European social channels, with the campaign selected for Arkage agency\'s annual creative portfolio.',
    },
    testimonial: {
      quote: {
        it: 'Aurora ha saputo catturare l\'essenza del nostro brand con una freschezza visiva che ha superato le nostre aspettative.',
        en: 'Aurora captured the essence of our brand with a visual freshness that exceeded our expectations.',
      },
      author: 'Stefan Weber',
      role: 'Marketing Director, Lufthansa',
    },
  },
  {
    projectId: 'p4',
    overview: {
      it: 'Strategia di contenuti visual e design per la presenza social media di Oreo nel mercato italiano, con focus su engagement e brand personality.',
      en: 'Visual content strategy and design for Oreo\'s social media presence in the Italian market, focusing on engagement and brand personality.',
    },
    challenge: {
      it: 'Adattare il linguaggio globale di Oreo al mercato italiano mantenendo la riconoscibilità del brand, creando contenuti che risuonassero con la cultura locale.',
      en: 'Adapting Oreo\'s global language to the Italian market while maintaining brand recognition, creating content that resonated with local culture.',
    },
    process: {
      it: 'Analisi dei trend social italiani, brainstorming creativo con il team, sviluppo di template visivi modulari, test A/B su formati e stili diversi.',
      en: 'Analysis of Italian social trends, creative brainstorming with the team, development of modular visual templates, A/B testing on different formats and styles.',
    },
    solution: {
      it: 'Un sistema di design flessibile che permette di creare rapidamente contenuti social on-brand, combinando l\'iconico biscotto con riferimenti alla cultura pop italiana.',
      en: 'A flexible design system enabling rapid creation of on-brand social content, combining the iconic cookie with Italian pop culture references.',
    },
    results: {
      it: 'Triplicato il tasso di engagement medio dei post, con diversi contenuti diventati virali nel mercato italiano raggiungendo oltre 2 milioni di impressioni.',
      en: 'Tripled the average post engagement rate, with several pieces of content going viral in the Italian market reaching over 2 million impressions.',
    },
    testimonial: {
      quote: {
        it: 'La creatività e l\'attenzione al dettaglio di Aurora hanno trasformato la nostra presenza social in Italia.',
        en: 'Aurora\'s creativity and attention to detail transformed our social presence in Italy.',
      },
      author: 'Maria Conti',
      role: 'Brand Manager, Mondelēz Italia',
    },
  },
  {
    projectId: 'p5',
    overview: {
      it: 'Progetto di visual design e branding per la comunicazione corporate di UPS, con focus sulla modernizzazione dell\'immagine e sulla comunicazione dei valori di sostenibilità.',
      en: 'Visual design and branding project for UPS corporate communications, focusing on image modernization and sustainability values communication.',
    },
    challenge: {
      it: 'Rinnovare il linguaggio visivo di UPS per comunicare innovazione e impegno ambientale, senza perdere la solidità e l\'affidabilità percepita del brand storico.',
      en: 'Renewing UPS\'s visual language to communicate innovation and environmental commitment without losing the perceived solidity and reliability of the historic brand.',
    },
    process: {
      it: 'Audit visivo del brand esistente, benchmark internazionale, co-design con stakeholder interni, prototipazione rapida di concept visivi, validazione con focus group.',
      en: 'Visual audit of existing brand, international benchmarking, co-design with internal stakeholders, rapid prototyping of visual concepts, focus group validation.',
    },
    solution: {
      it: 'Un\'evoluzione del linguaggio visivo che integra elementi di design sostenibile e data visualization, mantenendo il DNA del marrone iconico UPS con accenti contemporanei.',
      en: 'An evolution of the visual language integrating sustainable design elements and data visualization, maintaining the iconic UPS brown DNA with contemporary accents.',
    },
    results: {
      it: 'Il nuovo linguaggio visivo è stato adottato per le comunicazioni corporate europee, con feedback positivo dal 92% degli stakeholder interni.',
      en: 'The new visual language was adopted for European corporate communications, with positive feedback from 92% of internal stakeholders.',
    },
    testimonial: {
      quote: {
        it: 'Un approccio fresco e contemporaneo che rispetta la nostra heritage. Esattamente quello di cui avevamo bisogno.',
        en: 'A fresh, contemporary approach that respects our heritage. Exactly what we needed.',
      },
      author: 'James Thompson',
      role: 'Creative Lead, UPS Europe',
    },
  },
  {
    projectId: 'p6',
    overview: {
      it: 'Una serie di poster illustrati che celebrano l\'architettura, la cultura e l\'atmosfera unica di Roma attraverso uno stile visivo contemporaneo e poetico.',
      en: 'A series of illustrated posters celebrating Rome\'s architecture, culture, and unique atmosphere through a contemporary and poetic visual style.',
    },
    challenge: {
      it: 'Rappresentare Roma evitando cliché turistici, catturando invece l\'essenza vissuta della città attraverso gli occhi di chi la abita quotidianamente.',
      en: 'Representing Rome while avoiding tourist clichés, instead capturing the lived essence of the city through the eyes of those who inhabit it daily.',
    },
    process: {
      it: 'Passeggiate fotografiche nei quartieri meno conosciuti, raccolta di storie locali, sviluppo di uno stile illustrativo che fonde architettura e vita quotidiana.',
      en: 'Photographic walks through lesser-known neighborhoods, collection of local stories, development of an illustrative style blending architecture and daily life.',
    },
    solution: {
      it: 'Sei poster in edizione limitata che raccontano altrettanti quartieri romani, con un linguaggio visivo che combina illustrazione vettoriale, texture pittoriche e tipografia artigianale.',
      en: 'Six limited-edition posters depicting six Roman neighborhoods, with a visual language combining vector illustration, painterly textures, and artisanal typography.',
    },
    results: {
      it: 'La serie è stata esposta in una galleria del quartiere Trastevere e tutte le stampe in edizione limitata sono state vendute nelle prime due settimane.',
      en: 'The series was exhibited in a Trastevere gallery and all limited-edition prints sold out within the first two weeks.',
    },
    testimonial: {
      quote: {
        it: 'Aurora ha catturato la Roma che amiamo, quella nascosta dietro le cartoline. Un lavoro autentico e toccante.',
        en: 'Aurora captured the Rome we love, the one hidden behind postcards. An authentic and touching work.',
      },
      author: 'Luca Ferrara',
      role: 'Curatore, Galleria Trastevere',
    },
  },
];

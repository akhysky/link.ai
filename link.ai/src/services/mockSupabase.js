// Mock Supabase service for demonstration purposes
// In a real application, you would use the actual Supabase client

// Initial data
const db = {
  users: [
    {
      id: 101,
      name: 'TechFuture SAS',
      email: 'company@link.ai',
      password: 'password', // In a real app, this would be hashed
      accountType: 'client',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      location: 'Paris, France',
      description: 'Entreprise leader dans le développement de solutions technologiques innovantes, à la recherche de talents en IA.'
    },
    {
      id: 102,
      name: 'Sophie Martin',
      email: 'freelancer@link.ai',
      password: 'password', // In a real app, this would be hashed
      accountType: 'freelancer',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      location: 'Lyon, France',
      bio: 'Développeuse IA expérimentée, spécialisée en apprentissage automatique et traitement du langage naturel.',
      skills: ['Apprentissage Automatique', 'Python', 'NLP', 'Vision par Ordinateur']
    },
    {
      id: 103,
      name: 'DataSense',
      email: 'datasense@link.ai',
      password: 'password',
      accountType: 'client',
      avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
      location: 'Bordeaux, France',
      description: 'Startup spécialisée dans l\'analyse de données et l\'intelligence artificielle pour le secteur de la santé.'
    },
    {
      id: 104,
      name: 'Thomas Dubois',
      email: 'thomas@link.ai',
      password: 'password',
      accountType: 'freelancer',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      location: 'Marseille, France',
      bio: 'Expert en vision par ordinateur avec 5 ans d\'expérience dans le développement de solutions de reconnaissance d\'images.',
      skills: ['Vision par Ordinateur', 'TensorFlow', 'PyTorch', 'Deep Learning']
    },
    {
      id: 105,
      name: 'InnovIA',
      email: 'innovia@link.ai',
      password: 'password',
      accountType: 'client',
      avatar: 'https://randomuser.me/api/portraits/lego/5.jpg',
      location: 'Toulouse, France',
      description: 'Agence d\'innovation spécialisée dans l\'intégration de solutions d\'IA pour les entreprises industrielles.'
    },
    {
      id: 106,
      name: 'Émilie Leroy',
      email: 'emilie@link.ai',
      password: 'password',
      accountType: 'freelancer',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      location: 'Nantes, France',
      bio: 'Spécialiste en NLP et développement de chatbots intelligents pour améliorer l\'expérience client.',
      skills: ['NLP', 'Chatbots', 'Python', 'DialogFlow']
    },
    {
      id: 107,
      name: 'AIForFinance',
      email: 'aifinance@link.ai',
      password: 'password',
      accountType: 'client',
      avatar: 'https://randomuser.me/api/portraits/lego/7.jpg',
      location: 'Paris, France',
      description: 'Cabinet de conseil spécialisé dans l\'application de l\'IA au secteur financier et bancaire.'
    },
    {
      id: 108,
      name: 'Lucas Moreau',
      email: 'lucas@link.ai',
      password: 'password',
      accountType: 'freelancer',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      location: 'Lille, France',
      bio: 'Data scientist passionné par l\'analyse prédictive et les algorithmes de machine learning.',
      skills: ['Data Science', 'Machine Learning', 'Python', 'R']
    }
  ],
  services: [
    {
      id: 1,
      title: 'Développement de chatbots IA',
      description: 'Je crée des chatbots intelligents personnalisés pour votre entreprise, capables de comprendre le langage naturel et d\'apprendre au fil du temps.',
      price: 1500,
      category: 'Développement de Chatbot',
      userId: 102,
      image: 'https://placehold.co/600x400?text=Chatbot+IA',
      created_at: '2023-04-01T09:00:00Z'
    },
    {
      id: 2,
      title: 'Modèles de machine learning sur mesure',
      description: 'Je développe des modèles d\'apprentissage automatique adaptés à vos besoins spécifiques, avec une précision optimale pour vos données.',
      price: 2000,
      category: 'Apprentissage Automatique',
      userId: 108,
      image: 'https://placehold.co/600x400?text=Machine+Learning',
      created_at: '2023-04-03T10:30:00Z'
    },
    {
      id: 3,
      title: 'Solutions de vision par ordinateur',
      description: 'J\'implémente des solutions de vision par ordinateur pour la détection d\'objets, la reconnaissance d\'images et bien plus encore.',
      price: 1800,
      category: 'Vision par Ordinateur',
      userId: 104,
      image: 'https://placehold.co/600x400?text=Vision+Ordinateur',
      created_at: '2023-04-05T14:15:00Z'
    },
    {
      id: 4,
      title: 'Assistants virtuels intelligents',
      description: 'Je conçois des assistants virtuels personnalisés qui comprennent les intentions des utilisateurs et fournissent des réponses pertinentes.',
      price: 1600,
      category: 'Développement de Chatbot',
      userId: 106,
      image: 'https://placehold.co/600x400?text=Assistant+Virtuel',
      created_at: '2023-04-08T11:45:00Z'
    },
    {
      id: 5,
      title: 'Analyse prédictive de données',
      description: 'J\'utilise des techniques avancées d\'IA pour analyser vos données et prédire les tendances futures avec une grande précision.',
      price: 2200,
      category: 'Science des Données',
      userId: 108,
      image: 'https://placehold.co/600x400?text=Analyse+Prédictive',
      created_at: '2023-04-10T16:20:00Z'
    },
    {
      id: 6,
      title: 'Intégration d\'IA dans vos applications',
      description: 'J\'intègre des fonctionnalités d\'IA dans vos applications existantes pour les rendre plus intelligentes et plus efficaces.',
      price: 1900,
      category: 'Intégration IA',
      userId: 102,
      image: 'https://placehold.co/600x400?text=Intégration+IA',
      created_at: '2023-04-15T14:00:00Z'
    },
    {
      id: 7,
      title: 'Développement de systèmes de recommandation',
      description: 'Je crée des systèmes de recommandation personnalisés qui analysent le comportement de vos utilisateurs pour leur proposer des produits ou contenus pertinents.',
      price: 2600,
      category: 'Apprentissage Automatique',
      userId: 108,
      image: 'https://placehold.co/600x400?text=Système+Recommandation',
      created_at: '2023-04-18T09:30:00Z'
    },
    {
      id: 8,
      title: 'Consultation en stratégie d\'IA',
      description: 'Je vous aide à définir et mettre en œuvre une stratégie d\'IA adaptée à votre entreprise pour maximiser votre retour sur investissement.',
      price: 3500,
      category: 'Conseil en IA',
      userId: 102,
      image: 'https://placehold.co/600x400?text=Stratégie+IA',
      created_at: '2023-04-20T13:15:00Z'
    }
  ],
  jobs: [
    {
      id: 1,
      title: 'Ingénieur IA pour développement de chatbot',
      description: 'Nous recherchons un ingénieur IA expérimenté pour développer un chatbot personnalisé pour notre plateforme de service client. Le candidat idéal doit avoir de l\'expérience avec le NLP et l\'IA conversationnelle.',
      requirements: [
        'Expérience avec les frameworks NLP (BERT, GPT)',
        'Maîtrise de Python',
        'Connaissance de DialogFlow ou Rasa',
        'Expérience en développement de chatbots'
      ],
      budget: 3000,
      duration: 'Moins d\'1 mois',
      userId: 101,
      category: 'Développement de Chatbot',
      applications: 5,
      created_at: '2023-04-02T10:00:00Z'
    },
    {
      id: 2,
      title: 'Expert en machine learning pour système de recommandation',
      description: 'Nous avons besoin d\'un expert en machine learning pour construire un système de recommandation pour notre plateforme e-commerce. Le système devra analyser le comportement des utilisateurs et fournir des recommandations de produits personnalisées.',
      requirements: [
        'Solide expérience en algorithmes de machine learning',
        'Connaissance des systèmes de recommandation',
        'Maîtrise de Python et des bibliothèques ML',
        'Expérience avec les grands ensembles de données'
      ],
      budget: 4500,
      duration: '1-3 mois',
      userId: 103,
      category: 'Apprentissage Automatique',
      applications: 3,
      created_at: '2023-04-05T14:30:00Z'
    },
    {
      id: 3,
      title: 'Spécialiste en vision par ordinateur pour analyse retail',
      description: 'Nous recherchons un spécialiste en vision par ordinateur pour développer un système d\'analyse en magasin utilisant des flux de caméras. Le système devra suivre les mouvements des clients, analyser les comportements d\'achat et fournir des insights pour optimiser l\'agencement du magasin.',
      requirements: [
        'Expertise en algorithmes de vision par ordinateur',
        'Expérience avec OpenCV',
        'Connaissance des frameworks de deep learning (TensorFlow, PyTorch)',
        'Compétences en traitement d\'images et vidéos'
      ],
      budget: 5000,
      duration: '1-3 mois',
      userId: 105,
      category: 'Vision par Ordinateur',
      applications: 2,
      created_at: '2023-04-08T09:15:00Z'
    },
    {
      id: 4,
      title: 'Data scientist pour analyse prédictive financière',
      description: 'Nous cherchons un data scientist pour développer des modèles prédictifs pour notre département financier. Le projet implique l\'analyse de données historiques pour prédire les tendances du marché et optimiser les stratégies d\'investissement.',
      requirements: [
        'Formation en statistiques ou mathématiques',
        'Expérience en modélisation prédictive et séries temporelles',
        'Connaissance du secteur financier',
        'Maîtrise de Python et R'
      ],
      budget: 6000,
      duration: '3+ mois',
      userId: 107,
      category: 'Science des Données',
      applications: 4,
      created_at: '2023-04-12T11:00:00Z'
    },
    {
      id: 5,
      title: 'Développeur NLP pour analyse de sentiment',
      description: 'Nous cherchons un développeur spécialisé en traitement du langage naturel pour créer un système d\'analyse de sentiment pour notre plateforme de médias sociaux. Le système devra analyser les commentaires des utilisateurs en français et identifier les tendances émotionnelles.',
      requirements: [
        'Expertise en NLP et analyse de sentiment',
        'Expérience avec les modèles de langage pour le français',
        'Maîtrise de Python et des bibliothèques NLP',
        'Connaissance des techniques d\'apprentissage profond pour le texte'
      ],
      budget: 3500,
      duration: '1-3 mois',
      userId: 103,
      category: 'Traitement du Langage Naturel',
      applications: 6,
      created_at: '2023-04-15T15:45:00Z'
    },
    {
      id: 6,
      title: 'Consultant en stratégie d\'IA',
      description: 'Nous recherchons un consultant expérimenté pour nous aider à définir notre stratégie d\'adoption de l\'IA. Le consultant devra évaluer nos processus actuels, identifier les opportunités d\'amélioration grâce à l\'IA et proposer une feuille de route d\'implémentation.',
      requirements: [
        'Expérience en conseil stratégique',
        'Connaissance approfondie des technologies d\'IA',
        'Compétences en gestion de projet',
        'Excellentes capacités de communication'
      ],
      budget: 7000,
      duration: '1-3 mois',
      userId: 107,
      category: 'Conseil en IA',
      applications: 2,
      created_at: '2023-04-18T13:30:00Z'
    },
    {
      id: 7,
      title: 'Développeur IA pour application mobile de fitness',
      description: 'Nous développons une application mobile de fitness qui utilise l\'IA pour analyser les mouvements des utilisateurs et fournir des corrections en temps réel. Nous recherchons un développeur IA pour implémenter cette fonctionnalité.',
      requirements: [
        'Expérience en développement mobile (iOS/Android)',
        'Connaissance des frameworks d\'IA pour mobile (TensorFlow Lite, Core ML)',
        'Expertise en vision par ordinateur pour la reconnaissance de postures',
        'Compétences en optimisation de modèles pour appareils mobiles'
      ],
      budget: 4000,
      duration: '1-3 mois',
      userId: 105,
      category: 'Intégration IA',
      applications: 3,
      created_at: '2023-04-20T10:15:00Z'
    },
    {
      id: 8,
      title: 'Ingénieur ML pour optimisation de processus industriels',
      description: 'Nous cherchons un ingénieur en machine learning pour optimiser nos processus de production industrielle. Le projet vise à réduire les coûts et améliorer l\'efficacité en utilisant des techniques d\'apprentissage automatique.',
      requirements: [
        'Expérience en optimisation de processus industriels',
        'Connaissance des techniques d\'apprentissage par renforcement',
        'Maîtrise de PyTorch ou TensorFlow',
        'Compétences en analyse de données de capteurs'
      ],
      budget: 5500,
      duration: '3+ mois',
      userId: 101,
      category: 'Apprentissage Automatique',
      applications: 3,
      created_at: '2023-04-20T09:00:00Z'
    }
  ],
  applications: [],
  messages: [
    {
      id: 1,
      senderId: 102, // Sophie Martin
      receiverId: 101, // TechFuture SAS
      text: 'Bonjour ! Je suis disponible pour discuter de votre projet.',
      timestamp: '2023-04-01T10:30:00Z',
      read: true
    },
    {
      id: 2,
      senderId: 101, // TechFuture SAS
      receiverId: 102, // Sophie Martin
      text: 'Bonjour Sophie, merci pour votre message. Pouvez-vous me parler de votre expérience en IA ?',
      timestamp: '2023-04-01T11:15:00Z',
      read: true
    },
    {
      id: 3,
      senderId: 102, // Sophie Martin
      receiverId: 101, // TechFuture SAS
      text: 'Bien sûr ! J\'ai 5 ans d\'expérience en développement d\'IA, spécialisée en apprentissage automatique et NLP.',
      timestamp: '2023-04-01T11:30:00Z',
      read: true
    },
    {
      id: 4,
      senderId: 104, // Thomas Dubois
      receiverId: 101, // TechFuture SAS
      text: 'Merci pour votre message. Je vous envoie ma proposition demain.',
      timestamp: '2023-04-02T09:45:00Z',
      read: false
    },
    {
      id: 5,
      senderId: 106, // Émilie Leroy
      receiverId: 101, // TechFuture SAS
      text: 'Le projet est terminé. Voici les fichiers finaux.',
      timestamp: '2023-03-28T14:20:00Z',
      read: true
    },
    {
      id: 6,
      senderId: 101, // TechFuture SAS
      receiverId: 106, // Émilie Leroy
      text: 'Merci Émilie ! Le travail est excellent.',
      timestamp: '2023-03-28T15:10:00Z',
      read: true
    }
  ],
  contacts: [
    {
      userId: 101, // TechFuture SAS
      contactIds: [102, 104, 106] // Sophie, Thomas, Émilie
    },
    {
      userId: 102, // Sophie Martin
      contactIds: [101, 103] // TechFuture, DataSense
    },
    {
      userId: 104, // Thomas Dubois
      contactIds: [101, 105] // TechFuture, InnovIA
    },
    {
      userId: 106, // Émilie Leroy
      contactIds: [101, 107] // TechFuture, AIForFinance
    }
  ],
  categories: [
    'Développement IA',
    'Apprentissage Automatique',
    'Science des Données',
    'Vision par Ordinateur',
    'Traitement du Langage Naturel',
    'Développement de Chatbot',
    'Intégration IA',
    'Conseil en IA'
  ]
};

// Helper function to generate unique IDs
const generateId = (table) => {
  const maxId = db[table].reduce((max, item) => (item.id > max ? item.id : max), 0);
  return maxId + 1;
};

// Mock Supabase client
const mockSupabase = {
  // Auth methods
  auth: {
    signInWithPassword: async ({ email, password }) => {
      const user = db.users.find(user => user.email === email);
      
      if (user && user.password === password) {
        return {
          data: {
            user: { ...user, password: undefined },
            session: {
              access_token: 'mock-token',
              user: { ...user, password: undefined }
            }
          },
          error: null
        };
      } else {
        return {
          data: null,
          error: {
            message: 'Invalid login credentials'
          }
        };
      }
    },
    
    signUp: async ({ email, password, options }) => {
      const existingUser = db.users.find(user => user.email === email);
      
      if (existingUser) {
        return {
          data: null,
          error: {
            message: 'User already exists'
          }
        };
      }
      
      const newUser = {
        id: generateId('users'),
        email,
        password,
        name: options?.data?.name || 'New User',
        accountType: options?.data?.accountType || 'freelancer',
        avatar: `https://randomuser.me/api/portraits/lego/${db.users.length + 1}.jpg`,
        location: 'France',
        bio: '',
        skills: []
      };
      
      db.users.push(newUser);
      
      return {
        data: {
          user: { ...newUser, password: undefined },
          session: {
            access_token: 'mock-token',
            user: { ...newUser, password: undefined }
          }
        },
        error: null
      };
    },
    
    getSession: async () => {
      return {
        data: {
          session: null
        },
        error: null
      };
    }
  },
  
  // Database methods
  from: (table) => ({
    select: (columns = '*') => ({
      eq: (column, value) => {
        const results = db[table].filter(item => item[column] === value);
        
        return {
          data: results,
          error: null
        };
      },
      
      order: (column, { ascending = true } = {}) => {
        const results = [...db[table]].sort((a, b) => {
          if (ascending) {
            return a[column] > b[column] ? 1 : -1;
          } else {
            return a[column] < b[column] ? 1 : -1;
          }
        });
        
        return {
          data: results,
          error: null
        };
      },
      
      ilike: (column, value) => {
        const searchTerm = value.replace(/%/g, '').toLowerCase();
        const results = db[table].filter(item =>
          item[column] && item[column].toLowerCase().includes(searchTerm)
        );
        
        return {
          data: results,
          error: null
        };
      },
      
      then: (callback) => {
        const results = db[table];
        return Promise.resolve(callback({ data: results, error: null }));
      }
    }),
    
    insert: (data) => {
      const newItem = {
        id: generateId(table),
        ...data,
        created_at: new Date().toISOString()
      };
      
      db[table].push(newItem);
      
      return Promise.resolve({
        data: newItem,
        error: null
      });
    },
    
    update: (data) => ({
      eq: (column, value) => {
        const index = db[table].findIndex(item => item[column] === value);
        
        if (index !== -1) {
          db[table][index] = {
            ...db[table][index],
            ...data,
            updated_at: new Date().toISOString()
          };
          
          return {
            data: db[table][index],
            error: null
          };
        } else {
          return {
            data: null,
            error: {
              message: 'Item not found'
            }
          };
        }
      },
      
      in: (column, values) => {
        const updatedItems = [];
        
        for (const value of values) {
          const items = db[table].filter(item => item[column] === value);
          
          for (const item of items) {
            const index = db[table].findIndex(i => i.id === item.id);
            
            if (index !== -1) {
              db[table][index] = {
                ...db[table][index],
                ...data,
                updated_at: new Date().toISOString()
              };
              
              updatedItems.push(db[table][index]);
            }
          }
        }
        
        return {
          data: updatedItems,
          error: null
        };
      }
    })
  })
};

export default mockSupabase;

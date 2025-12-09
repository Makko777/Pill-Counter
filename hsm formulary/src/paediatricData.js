// Paediatric Protocols Data
// Based on: Paediatric Protocols For Malaysian Hospitals, 5th Edition
// Ministry of Health Malaysia

export const PAEDIATRIC_METADATA = {
    title: "Paediatric Protocols",
    subtitle: "For Malaysian Hospitals",
    edition: "5th Edition",
    publicationDate: "2025",
    authors: "Hussain Imam Hj Muhammad Ismail, Ng Hoong Phak, Sabeera Begum Kader Ibrahim, Muhammad Ghazali bin Ahmad Narihan, Janet Hii Lin Yee, Tan Yuong Chin",
    publisher: "Ministry of Health Malaysia",
    totalChapters: 119,
    totalSections: 22,
    disclaimer: "These protocols serve as a guideline for the management of some common childhood illnesses in Malaysia. The guideline is not a substitute for clinical judgement. Variation from the guideline, taking into account individual circumstances may be appropriate."
};

export const PAEDIATRIC_SECTIONS = [
    {
        id: "section-1",
        sectionNumber: 1,
        title: "General Paediatrics",
        icon: "Stethoscope",
        color: "blue",
        chapterCount: 2,
        chapters: [
            { number: 1, title: "Normal Values in Children", pageStart: 2 },
            { number: 2, title: "Childhood Immunisations", pageStart: 9 }
        ],
        description: "Essential paediatric reference values and immunisation schedules."
    },
    {
        id: "section-2",
        sectionNumber: 2,
        title: "Developmental Paediatrics",
        icon: "GraduationCap",
        color: "emerald",
        chapterCount: 4,
        chapters: [
            { number: 3, title: "Developmental Milestones in Normal Children", pageStart: 30 },
            { number: 4, title: "Global Developmental Delay", pageStart: 36 },
            { number: 5, title: "Communication Disorders and Sensory Impairment", pageStart: 38 },
            { number: 6, title: "Specific Learning Disorder", pageStart: 42 }
        ],
        description: "Developmental assessment, milestones, and management of developmental disorders."
    },
    {
        id: "section-3",
        sectionNumber: 3,
        title: "Adolescent Paediatrics",
        icon: "Users",
        color: "purple",
        chapterCount: 1,
        chapters: [
            { number: 7, title: "The H.E.A.D.S.S. Assessment", pageStart: 48 }
        ],
        description: "Adolescent health assessment and psychosocial screening."
    },
    {
        id: "section-4",
        sectionNumber: 4,
        title: "Palliative Care",
        icon: "HeartHandshake",
        color: "rose",
        chapterCount: 1,
        chapters: [
            { number: 8, title: "End of Life Care in Children", pageStart: 52 }
        ],
        description: "Palliative and end-of-life care for children with life-limiting conditions."
    },
    {
        id: "section-5",
        sectionNumber: 5,
        title: "Intensive Care",
        icon: "Activity",
        color: "red",
        chapterCount: 4,
        chapters: [
            { number: 9, title: "Paediatric Fluid and Electrolyte Guidelines", pageStart: 60 },
            { number: 10, title: "Acute Gastroenteritis", pageStart: 72 },
            { number: 11, title: "Sepsis and Septic Shock", pageStart: 80 },
            { number: 12, title: "Hypotension in Children", pageStart: 85 }
        ],
        description: "Critical care protocols for fluid management, sepsis, and shock."
    },
    {
        id: "section-6",
        sectionNumber: 6,
        title: "Neonatology",
        icon: "Baby",
        color: "pink",
        chapterCount: 18,
        chapters: [
            { number: 13, title: "Principles of Transport of the Sick Newborn", pageStart: 88 },
            { number: 14, title: "General Pointers of Care for Infants in NICU", pageStart: 94 },
            { number: 15, title: "The Preterm Infant", pageStart: 100 },
            { number: 16, title: "Enteral Feeding in Preterm and High-risk Infants", pageStart: 105 },
            { number: 17, title: "Parenteral Nutrition for Newborns", pageStart: 109 },
            { number: 18, title: "Neonatal Hypoglycemia", pageStart: 112 },
            { number: 19, title: "Neonatal Sepsis", pageStart: 118 },
            { number: 20, title: "Neonatal Encephalopathy and Hypothermia Therapy", pageStart: 122 },
            { number: 21, title: "Neonatal Jaundice", pageStart: 130 },
            { number: 22, title: "Exchange Transfusion", pageStart: 140 },
            { number: 23, title: "Vascular Spasm and Thrombosis", pageStart: 143 },
            { number: 24, title: "Patent Ductus Arteriosus in the Preterm", pageStart: 150 },
            { number: 25, title: "Persistent Pulmonary Hypertension of the Newborn", pageStart: 154 },
            { number: 26, title: "Ophthalmia Neonatorum", pageStart: 157 },
            { number: 27, title: "Perinatally Acquired Varicella and Postnatal exposure to Varicella infection", pageStart: 159 },
            { number: 28, title: "Management of Perinatal Hepatitis B Virus (HBV) transmission (Exposed Infants)", pageStart: 161 },
            { number: 29, title: "Bronchopulmonary Dysplasia", pageStart: 164 },
            { number: 30, title: "Non-invasive Ventilation in Preterm Infants", pageStart: 167 }
        ],
        description: "Comprehensive guidelines for newborn care including premature infants, feeding, sepsis, and common neonatal conditions."
    },
    {
        id: "section-7",
        sectionNumber: 7,
        title: "Respiratory",
        icon: "Wind",
        color: "cyan",
        chapterCount: 7,
        chapters: [
            { number: 31, title: "Asthma", pageStart: 170 },
            { number: 32, title: "Acute Bronchiolitis", pageStart: 188 },
            { number: 33, title: "Viral Croup", pageStart: 192 },
            { number: 34, title: "Pneumonia", pageStart: 195 },
            { number: 35, title: "Empyema Thoracis in Children", pageStart: 202 },
            { number: 36, title: "Sleep Disordered Breathing", pageStart: 207 },
            { number: 37, title: "Chronic Wet Cough and Bronchiectasis", pageStart: 214 }
        ],
        description: "Management protocols for respiratory conditions including asthma, bronchiolitis, croup, and pneumonia."
    },
    {
        id: "section-8",
        sectionNumber: 8,
        title: "Cardiology",
        icon: "Heart",
        color: "red",
        chapterCount: 8,
        chapters: [
            { number: 38, title: "Paediatric Electrocardiography (ECG)", pageStart: 224 },
            { number: 39, title: "Critical Congenital Heart Disease", pageStart: 229 },
            { number: 40, title: "Hypercyanotic Spell", pageStart: 232 },
            { number: 41, title: "Heart Failure", pageStart: 233 },
            { number: 42, title: "Rheumatic Heart Disease", pageStart: 237 },
            { number: 43, title: "Infective Endocarditis", pageStart: 240 },
            { number: 44, title: "Kawasaki Disease", pageStart: 247 },
            { number: 45, title: "Paediatric Arrhythmias", pageStart: 251 }
        ],
        description: "Cardiac conditions from congenital heart disease to acquired conditions like rheumatic fever and Kawasaki disease."
    },
    {
        id: "section-9",
        sectionNumber: 9,
        title: "Neurology",
        icon: "Brain",
        color: "purple",
        chapterCount: 12,
        chapters: [
            { number: 46, title: "Neonatal Seizures", pageStart: 258 },
            { number: 47, title: "Status Epilepticus: Management of Convulsive Status Epilepticus", pageStart: 264 },
            { number: 48, title: "Epilepsy", pageStart: 267 },
            { number: 49, title: "Febrile Seizures", pageStart: 278 },
            { number: 50, title: "Meningitis", pageStart: 280 },
            { number: 51, title: "Autoimmune Encephalitis (AE)", pageStart: 284 },
            { number: 52, title: "Status Dystonicus (SD)", pageStart: 287 },
            { number: 53, title: "Acquired Demyelinating Syndromes (ADS)", pageStart: 291 },
            { number: 54, title: "Acute Flaccid Paralysis", pageStart: 293 },
            { number: 55, title: "Approach to the Child with Altered Consciousness", pageStart: 297 },
            { number: 56, title: "Childhood Stroke", pageStart: 300 },
            { number: 57, title: "Infection-related Encephalopathies of Childhood", pageStart: 304 }
        ],
        description: "Neurological emergencies and chronic conditions including seizures, meningitis, encephalitis, and stroke."
    },
    {
        id: "section-10",
        sectionNumber: 10,
        title: "Endocrinology",
        icon: "Zap",
        color: "orange",
        chapterCount: 6,
        chapters: [
            { number: 58, title: "Approach to Short Stature", pageStart: 308 },
            { number: 59, title: "Congenital Hypothyroidism", pageStart: 312 },
            { number: 60, title: "Diabetes Mellitus", pageStart: 319 },
            { number: 61, title: "Diabetic Ketoacidosis and Hyperglycemic Hyperosmolar State", pageStart: 329 },
            { number: 62, title: "Disorders of Sexual Development", pageStart: 337 },
            { number: 63, title: "Congenital Adrenal Hyperplasia (CAH)", pageStart: 343 }
        ],
        description: "Endocrine disorders including growth, thyroid, diabetes management, and DKA protocols."
    },
    {
        id: "section-11",
        sectionNumber: 11,
        title: "Nephrology",
        icon: "Droplet",
        color: "teal",
        chapterCount: 10,
        chapters: [
            { number: 64, title: "Acute Glomerulonephritis", pageStart: 348 },
            { number: 65, title: "Nephrotic Syndrome", pageStart: 354 },
            { number: 66, title: "Acute Kidney Injury (AKI)", pageStart: 363 },
            { number: 67, title: "Acute Dialysis", pageStart: 367 },
            { number: 68, title: "Neurogenic Bladder", pageStart: 374 },
            { number: 69, title: "Urinary Tract Infection and Vesicoureteric Reflux", pageStart: 380 },
            { number: 70, title: "Perinatal Urinary Tract Dilatation", pageStart: 386 },
            { number: 71, title: "Hypertension (HTN) in Children", pageStart: 391 },
            { number: 72, title: "Chronic Kidney Disease (CKD) in Children", pageStart: 397 },
            { number: 73, title: "Congenital anomalies kidney and urinary tract (CAKUT)", pageStart: 402 }
        ],
        description: "Renal conditions including glomerulonephritis, nephrotic syndrome, AKI, dialysis, and hypertension."
    },
    {
        id: "section-12",
        sectionNumber: 12,
        title: "Haematology & Oncology",
        icon: "TestTube",
        color: "rose",
        chapterCount: 6,
        chapters: [
            { number: 74, title: "Approach to a Child with Anaemia", pageStart: 406 },
            { number: 75, title: "Thalassaemia", pageStart: 412 },
            { number: 76, title: "Immune Thrombocytopaenia", pageStart: 419 },
            { number: 77, title: "Haemophilia", pageStart: 422 },
            { number: 78, title: "Oncology Emergencies", pageStart: 427 },
            { number: 79, title: "Acute Lymphoblastic Leukaemia", pageStart: 433 }
        ],
        description: "Blood disorders and childhood cancers including anaemia, bleeding disorders, and leukaemia."
    },
    {
        id: "section-13",
        sectionNumber: 13,
        title: "Gastroenterology",
        icon: "Apple",
        color: "green",
        chapterCount: 7,
        chapters: [
            { number: 80, title: "Approach to Severely Malnourished Children", pageStart: 438 },
            { number: 81, title: "Gastro-Oesophageal Reflux Disease (GORD)", pageStart: 443 },
            { number: 82, title: "Chronic Diarrhoea", pageStart: 442 },
            { number: 83, title: "Functional Constipation (FC) in Children", pageStart: 455 },
            { number: 84, title: "Prolonged Jaundice and Neonatal Cholestasis", pageStart: 463 },
            { number: 85, title: "Evaluation and Management of Children with Liver Disease", pageStart: 475 },
            { number: 86, title: "Approach to Gastrointestinal Bleeding", pageStart: 494 }
        ],
        description: "GI conditions from malnutrition and diarrhoea to liver disease and GI bleeding."
    },
    {
        id: "section-14",
        sectionNumber: 14,
        title: "Infectious Disease",
        icon: "ShieldAlert",
        color: "amber",
        chapterCount: 8,
        chapters: [
            { number: 87, title: "Paediatric HIV", pageStart: 498 },
            { number: 88, title: "Malaria", pageStart: 509 },
            { number: 89, title: "Tuberculosis", pageStart: 514 },
            { number: 90, title: "BCG Lymphadenitis", pageStart: 521 },
            { number: 91, title: "Dengue Viral Infections", pageStart: 524 },
            { number: 92, title: "Diphtheria", pageStart: 538 },
            { number: 93, title: "Congenital Syphilis", pageStart: 541 },
            { number: 94, title: "Paediatric COVID-19", pageStart: 543 }
        ],
        description: "Major infectious diseases including HIV, malaria, TB, dengue, diphtheria, and COVID-19."
    },
    {
        id: "section-15",
        sectionNumber: 15,
        title: "Dermatology",
        icon: "Waves",
        color: "indigo",
        chapterCount: 5,
        chapters: [
            { number: 95, title: "Atopic Dermatitis", pageStart: 550 },
            { number: 96, title: "Common Cutaneous Infections", pageStart: 555 },
            { number: 97, title: "Infantile Haemangiomas (IH)", pageStart: 561 },
            { number: 98, title: "Scabies", pageStart: 564 },
            { number: 99, title: "Stevens-Johnson Syndrome", pageStart: 568 }
        ],
        description: "Common skin conditions in children including eczema, infections, hemangiomas, and severe reactions."
    },
    {
        id: "section-16",
        sectionNumber: 16,
        title: "Genetic & Metabolic",
        icon: "Dna",
        color: "violet",
        chapterCount: 3,
        chapters: [
            { number: 100, title: "Diagnosis and Management of Inborn Errors of Metabolism", pageStart: 572 },
            { number: 101, title: "Common Genetic Syndromes in Paediatrics", pageStart: 604 },
            { number: 102, title: "Investigating Children Suspected of Having a Condition with Genetic Basis", pageStart: 625 }
        ],
        description: "Metabolic and genetic disorders including IEM and genetic syndromes."
    },
    {
        id: "section-17",
        sectionNumber: 17,
        title: "Paediatric Surgery",
        icon: "Scissors",
        color: "slate",
        chapterCount: 8,
        chapters: [
            { number: 103, title: "Appendicitis", pageStart: 632 },
            { number: 104, title: "Vomiting in the Neonate and Child", pageStart: 635 },
            { number: 105, title: "Intussusception", pageStart: 641 },
            { number: 106, title: "Inguinal Hernias and Hydrocoele", pageStart: 644 },
            { number: 107, title: "Undescended Testis", pageStart: 646 },
            { number: 108, title: "The Acute Scrotum", pageStart: 647 },
            { number: 109, title: "Penile Conditions", pageStart: 651 },
            { number: 110, title: "Neonatal Surgery", pageStart: 653 }
        ],
        description: "Surgical conditions from appendicitis to neonatal surgical emergencies."
    },
    {
        id: "section-18",
        sectionNumber: 18,
        title: "Rheumatology",
        icon: "Bone",
        color: "stone",
        chapterCount: 2,
        chapters: [
            { number: 111, title: "Juvenile Idiopathic Arthritis (JIA)", pageStart: 666 },
            { number: 112, title: "Systemic Lupus Erythematosus", pageStart: 673 }
        ],
        description: "Paediatric rheumatological conditions including JIA and SLE."
    },
    {
        id: "section-19",
        sectionNumber: 19,
        title: "Poisons & Toxins",
        icon: "AlertTriangle",
        color: "red",
        chapterCount: 2,
        chapters: [
            { number: 113, title: "Snake Related Injuries & Envenomation", pageStart: 684 },
            { number: 114, title: "Common Poisons", pageStart: 693 }
        ],
        description: "Emergency management of poisoning and envenomation."
    },
    {
        id: "section-20",
        sectionNumber: 20,
        title: "Child Psychiatry",
        icon: "Brain",
        color: "purple",
        chapterCount: 1,
        chapters: [
            { number: 115, title: "Children & Young People's Mental Health", pageStart: 730 }
        ],
        description: "Mental health assessment and management in children and adolescents."
    },
    {
        id: "section-21",
        sectionNumber: 21,
        title: "Paediatric Emergency",
        icon: "Siren",
        chapterCount: 3,
        color: "red",
        chapters: [
            { number: 116, title: "Anaphylaxis", pageStart: 736 },
            { number: 117, title: "Recognition and Assessment of Pain", pageStart: 740 },
            { number: 118, title: "Sedation and Analgesia for Diagnostic and Therapeutic Procedures", pageStart: 741 }
        ],
        description: "Emergency protocols including anaphylaxis, pain management, and sedation."
    },
    {
        id: "section-22",
        sectionNumber: 22,
        title: "Practical Procedures",
        icon: "Syringe",
        color: "violet",
        chapterCount: 1,
        chapters: [
            { number: 119, title: "Practical Procedures", pageStart: 746 }
        ],
        description: "Practical procedural guidance for common paediatric procedures."
    }
];

// Helper function to get icon component name for each section
export const getSectionIcon = (iconName) => {
    const iconMap = {
        'Stethoscope': 'Stethoscope',
        'GraduationCap': 'GraduationCap',
        'Users': 'Users',
        'HeartHandshake': 'HeartHandshake',
        'Activity': 'Activity',
        'Baby': 'Baby',
        'Wind': 'Wind',
        'Heart': 'Heart',
        'Brain': 'Brain',
        'Zap': 'Zap',
        'Droplet': 'Droplets',
        'TestTube': 'TestTube2',
        'Apple': 'Apple',
        'ShieldAlert': 'ShieldAlert',
        'Waves': 'Waves',
        'Dna': 'Dna',
        'Scissors': 'Scissors',
        'Bone': 'Bone',
        'AlertTriangle': 'AlertTriangle',
        'Siren': 'Siren',
        'Syringe': 'Syringe'
    };
    return iconMap[iconName] || 'FileText';
};

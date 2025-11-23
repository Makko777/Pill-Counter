// Paediatric Medications Database
// Extracted from Paedi atric Protocols 5th Edition For Malaysian Hospitals
// Contains common emergency and ward medications with age-based dosing

export const PAEDIATRIC_MEDICATION_METADATA = {
    title: "Paediatric Medications",
    edition: "Compiled from 5th Edition",
    publicationDate: "2024",
    publisher: "Hospital Seri Manjung",
    disclaimer: "These are quick reference dosing guidelines. Always refer to the full Paediatric Protocols PDF for complete clinical context, contraindications, and special circumstances. Dosing must be individualized based on patient condition.",
    totalMedications: 75
};

export const PAEDIATRIC_MEDICATIONS = [
    // EMERGENCY & RESUSCITATION
    {
        id: "med-001",
        name: "Adrenaline (Epinephrine)",
        category: "Emergency & Resuscitation",
        indications: ["Anaphylaxis", "Cardiac arrest", "Severe bradycardia", "Croup"],
        dosing: {
            anaphylaxis: {
                route: "IM",
                dose: "0.01 mL/kg of 1:1000 (0.01 mg/kg)",
                maxDose: "0.5 mL (0.5 mg)",
                notes: "Repeat every 5-15 minutes as needed"
            },
            cardiacArrest: {
                route: "IV/IO",
                dose: "0.01 mg/kg of 1:10,000",
                maxDose: "1 mg",
                notes: "Repeat every 3-5 minutes"
            },
            croup: {
                route: "Nebulized",
                dose: "0.5 mL/kg of 1:1000 (max 5 mL)",
                notes: "Dilute in NS to total 5 mL"
            }
        },
        contraindications: ["Hypovolemic shock without fluid resuscitation"],
        monitoring: ["Heart rate", "Blood pressure", "ECG"],
        pdfChapters: [11]
    },

    // ANTIBIOTICS - NEONATAL
    {
        id: "med-002",
        name: "Ampicillin",
        category: "Antibiotics - Neonatal",
        indications: ["Neonatal sepsis", "Meningitis", "Group B Strep prophylaxis"],
        dosing: {
            neonate_0_7days: {
                sepsis: "50 mg/kg IV q12h",
                meningitis: "100 mg/kg IV q12h"
            },
            neonate_8_28days: {
                sepsis: "75 mg/kg IV q8h",
                meningitis: "100 mg/kg IV q6-8h"
            }
        },
        route: ["IV"],
        contraindications: ["Penicillin allergy"],
        monitoring: ["Renal function"],
        pdfChapters: [19]
    },

    {
        id: "med-003",
        name: "Gentamicin",
        category: "Antibiotics - Neonatal",
        indications: ["Neonatal sepsis", "Gram-negative infections"],
        dosing: {
            neonate: {
                dose: "4-5 mg/kg IV q24-48h",
                notes: "Extended interval dosing preferred. Adjust based on gestational age and postnatal age"
            }
        },
        route: ["IV"],
        contraindications: ["Aminoglycoside allergy"],
        monitoring: ["Renal function", "Peak and trough levels", "Hearing"],
        sideEffects: ["Nephrotoxicity", "Ototoxicity"],
        pdfChapters: [19]
    },

    // ANTIBIOTICS - PAEDIATRIC
    {
        id: "med-004",
        name: "Ceftriaxone",
        category: "Antibiotics",
        indications: ["Meningitis", "Sepsis", "Pneumonia", "UTI"],
        dosing: {
            infant_child: {
                standard: "50-75 mg/kg/day IV/IM once daily",
                meningitis: "100 mg/kg/day IV once daily (max 4g/day)",
                maxDose: "4 g/day"
            }
        },
        route: ["IV", "IM"],
        contraindications: ["Hyperbilirubinemia in neonates", "Concurrent calcium administration"],
        monitoring: ["Renal function", "LFTs"],
        pdfChapters: [11, 49, 50]
    },

    {
        id: "med-005",
        name: "Cefotaxime",
        category: "Antibiotics",
        indications: ["Neonatal sepsis", "Meningitis", "Sepsis"],
        dosing: {
            neonate: {
                standard: "50 mg/kg IV q8-12h",
                meningitis: "50 mg/kg IV q6-8h"
            },
            infant_child: {
                standard: "50 mg/kg/dose IV q6-8h",
                meningitis: "75-100 mg/kg/dose IV q6h"
            }
        },
        route: ["IV", "IM"],
        notes: "Preferred over ceftriaxone in neonates with hyperbilirubinemia",
        pdfChapters: [19, 50]
    },

    // BRONCHODILATORS
    {
        id: "med-006",
        name: "Salbutamol (Albuterol)",
        category: "Bronchodilators",
        indications: ["Asthma", "Bronchiolitis", "Hyperkalemia"],
        dosing: {
            nebulized: {
                dose: "2.5-5 mg nebulized",
                frequency: "q20min x 3 doses, then q1-4h as needed",
                notes: "Continuous nebulization for severe exacerbations"
            },
            iv_hyperkalemia: {
                dose: "4-5 mcg/kg IV over 20 minutes",
                notes: "For hyperkalemia management"
            }
        },
        route: ["Nebulized", "IV", "MDI"],
        contraindications: ["Hypersensitivity"],
        sideEffects: ["Tachycardia", "Tremor", "Hypokalemia"],
        pdfChapters: [31, 32]
    },

    {
        id: "med-007",
        name: "Ipratropium Bromide",
        category: "Bronchodilators",
        indications: ["Moderate-severe asthma exacerbation"],
        dosing: {
            nebulized: {
                dose: "250-500 mcg nebulized with salbutamol",
                frequency: "q20min x 3 doses for acute exacerbation"
            }
        },
        route: ["Nebulized", "MDI"],
        notes: "Add to salbutamol in moderate-severe exacerbations",
        pdfChapters: [31]
    },

    // STEROIDS
    {
        id: "med-008",
        name: "Dexamethasone",
        category: "Corticosteroids",
        indications: ["Croup", "Asthma", "Meningitis", "BPD"],
        dosing: {
            croup: {
                dose: "0.15-0.6 mg/kg PO/IV/IM (max 16 mg)",
                notes: "Single dose usually sufficient"
            },
            meningitis: {
                dose: "0.15 mg/kg IV q6h for 2-4 days",
                notes: "Give before or with first antibiotic dose"
            },
            bpd_dart: {
                day1_3: "75 mcg/kg/dose q12h",
                day4_6: "50 mcg/kg/dose q12h",
                day7_8: "25 mcg/kg/dose q12h",
                day9_10: "10 mcg/kg/dose q12h",
                notes: "Low-dose DART regimen for BPD"
            }
        },
        route: ["PO", "IV", "IM"],
        contraindications: ["Systemic fungal infection"],
        sideEffects: ["Hyperglycemia", "Hypertension", "Immunosuppression"],
        pdfChapters: [29, 33, 50]
    },

    {
        id: "med-009",
        name: "Prednisolone",
        category: "Corticosteroids",
        indications: ["Asthma exacerbation", "Croup", "Nephrotic syndrome"],
        dosing: {
            asthma: {
                dose: "1-2 mg/kg/day PO (max 40-60 mg)",
                duration: "3-5 days",
                notes: "No need to taper for short courses"
            },
            croup: {
                dose: "1 mg/kg PO (max 50 mg)",
                notes: "Alternative to dexamethasone"
            }
        },
        route: ["PO"],
        pdfChapters: [31, 33, 64]
    },

    {
        id: "med-010",
        name: "Hydrocortisone",
        category: "Corticosteroids",
        indications: ["Adrenal insufficiency", "Septic shock", "Anaphylaxis"],
        dosing: {
            stress_dose: {
                dose: "50-100 mg/m²/day IV divided q6-8h",
                notes: "For adrenal crisis or stress dosing"
            },
            septic_shock: {
                dose: "50 mg/m² IV q6h or 1-2 mg/kg/dose IV q6h",
                notes: "Consider in refractory septic shock"
            }
        },
        route: ["IV", "IM", "PO"],
        pdfChapters: [11, 63]
    },

    // ANTI-SEIZURE
    {
        id: "med-011",
        name: "Midazolam",
        category: "Anti-Seizure / Sedative",
        indications: ["Status epilepticus", "Seizures", "Sedation"],
        dosing: {
            buccal_im: {
                dose: "0.2-0.5 mg/kg (max 10 mg)",
                route: "Buccal or IM",
                notes: "First-line for seizures outside hospital"
            },
            iv: {
                dose: "0.1-0.2 mg/kg IV (max 10 mg)",
                notes: "For status epilepticus"
            },
            infusion: {
                dose: "0.05-0.4 mg/kg/hr IV",
                notes: "For refractory status epilepticus"
            }
        },
        route: ["IV", "IM", "Buccal", "IN"],
        contraindications: ["Acute narrow-angle glaucoma"],
        sideEffects: ["Respiratory depression", "Hypotension"],
        pdfChapters: [47]
    },

    {
        id: "med-012",
        name: "Levetiracetam (Keppra)",
        category: "Anti-Seizure",
        indications: ["Status epilepticus", "Seizure prophylaxis"],
        dosing: {
            loading: {
                dose: "40-60 mg/kg IV over 15 minutes (max 3000 mg)",
                notes: "For status epilepticus"
            },
            maintenance: {
                dose: "10-30 mg/kg/dose PO/IV q12h"
            }
        },
        route: ["IV", "PO"],
        advantages: ["Minimal side effects", "No significant drug interactions"],
        pdfChapters: [46, 47]
    },

    {
        id: "med-013",
        name: "Phenytoin",
        category: "Anti-Seizure",
        indications: ["Status epilepticus", "Seizures"],
        dosing: {
            loading: {
                dose: "20 mg/kg IV at max rate 1 mg/kg/min or 50 mg/min",
                notes: "Requires cardiac monitoring, use NS only"
            },
            maintenance: {
                dose: "5-8 mg/kg/day divided q8-12h PO/IV"
            }
        },
        route: ["IV", "PO"],
        contraindications: ["Heart block", "Sinus bradycardia"],
        monitoring: ["ECG during loading", "Drug levels"],
        sideEffects: ["Hypotension", "Arrhythmias", "Purple glove syndrome"],
        pdfChapters: [46, 47]
    },

    // INOTROPES / VASOPRESSORS
    {
        id: "med-014",
        name: "Dopamine",
        category: "Inotropes & Vasopressors",
        indications: ["Septic shock", "Cardiogenic shock", "Hypotension"],
        dosing: {
            infusion: {
                lowDose: "2-5 mcg/kg/min (renal dose)",
                moderateDose: "5-10 mcg/kg/min (inotropic)",
                highDose: "10-20 mcg/kg/min (vasopressor)",
                notes: "High doses may worsen pulmonary hypertension"
            }
        },
        route: ["IV continuous infusion"],
        contraindications: ["Pheochromocytoma", "Uncorrected tachyarrhythmias"],
        monitoring: ["Heart rate", "Blood pressure", "Urine output"],
        pdfChapters: [11, 25]
    },

    {
        id: "med-015",
        name: "Noradrenaline (Norepinephrine)",
        category: "Inotropes & Vasopressors",
        indications: ["Septic shock", "Hypotension", "PPHN"],
        dosing: {
            infusion: {
                dose: "0.05-2 mcg/kg/min IV",
                notes: "May selectively reduce PVR and increase SVR in PPHN"
            }
        },
        route: ["IV continuous infusion - central line preferred"],
        monitoring: ["Blood pressure", "Peripheral perfusion"],
        sideEffects: ["Tissue necrosis if extravasation"],
        pdfChapters: [11, 25]
    },

    // FLUIDS & ELECTROLYTES
    {
        id: "med-016",
        name: "Calcium Gluconate 10%",
        category: "Electrolytes",
        indications: ["Hypocalcemia", "Hyperkalemia", "Magnesium toxicity"],
        dosing: {
            hypocalcemia: {
                dose: "0.5-1 mL/kg IV slow push (50-100 mg/kg elemental Ca)",
                rate: "Over 15-20 minutes if stable, 2-5 minutes if unstable"
            },
            hyperkalemia: {
                dose: "0.5 mL/kg IV (max 20 mL)",
                rate: "Over 2-5 minutes with cardiac monitoring",
                notes: "Cardioprotective, does not lower K+"
            }
        },
        route: ["IV"],
        contraindications: ["Hypercalcemia", "Digoxin toxicity"],
        monitoring: ["ECG", "Serum calcium"],
        notes: "0.5 mL/kg = 0.1 mmol/kg elemental calcium",
        pdfChapters: [9]
    },

    {
        id: "med-017",
        name: "Potassium Chloride",
        category: "Electrolytes",
        indications: ["Hypokalemia"],
        dosing: {
            oral: {
                dose: "Up to 2 mmol/kg/day in divided doses",
                notes: "For mild-moderate hypokalemia"
            },
            iv: {
                dose: "0.2 mmol/kg/hr IV infusion",
                maxConcentration: "40 mmol/L (peripheral), 60 mmol/L (central)",
                notes: "NEVER give IV bolus"
            },
            severe: {
                dose: "0.4 mmol/kg/hr into central vein",
                notes: "For K+ <2.5 mmol/L, requires ICU setting"
            }
        },
        route: ["IV infusion", "PO"],
        contraindications: ["Hyperkalemia", "Renal failure"],
        monitoring: ["Serum potassium", "ECG", "Urine output"],
        pdfChapters: [9]
    },

    // DIURETICS
    {
        id: "med-018",
        name: "Furosemide (Lasix)",
        category: "Diuretics",
        indications: ["Heart failure", "Pulmonary edema", "Hyperkalemia", "Fluid overload"],
        dosing: {
            infant_child: {
                iv: "0.5-2 mg/kg/dose IV q6-12h",
                oral: "1-4 mg/kg/day PO divided 1-2 times daily",
                infusion: "0.05-0.4 mg/kg/hr continuous IV"
            }
        },
        route: ["IV", "PO"],
        sideEffects: ["Hypokalemia", "Hyponatremia", "Dehydration", "Ototoxicity"],
        monitoring: ["Electrolytes", "Renal function", "Fluid balance"],
        pdfChapters: [41]
    },

    // ANALGESICS
    {
        id: "med-019",
        name: "Paracetamol (Acetaminophen)",
        category: "Analgesics & Antipyretics",
        indications: ["Fever", "Pain"],
        dosing: {
            neonate: {
                oral: "10-15 mg/kg/dose q6-8h",
                iv: "7.5-10 mg/kg/dose q6h"
            },
            infant_child: {
                oral: "10-15 mg/kg/dose q4-6h (max 75 mg/kg/day or 4g/day)",
                iv: "<10kg: 7.5 mg/kg q6h, 10-50kg: 15 mg/kg q6h (max 60 mg/kg/day)",
                rectal: "15-20 mg/kg/dose q6-8h"
            }
        },
        route: ["PO", "IV", "PR"],
        contraindications: ["Severe hepatic impairment"],
        toxicity: "Hepatotoxicity with overdose",
        antidote: "N-acetylcysteine",
        pdfChapters: [109]
    },

    {
        id: "med-020",
        name: "Morphine",
        category: "Analgesics - Opioid",
        indications: ["Moderate-severe pain", "Sedation", "PPHN"],
        dosing: {
            neonate: {
                iv: "0.05-0.1 mg/kg/dose q3-4h",
                infusion: "10-20 mcg/kg/hr"
            },
            infant_child: {
                iv: "0.05-0.2 mg/kg/dose q2-4h",
                infusion: "10-40 mcg/kg/hr",
                oral: "0.2-0.5 mg/kg/dose q4-6h"
            }
        },
        route: ["IV", "PO", "SC"],
        contraindications: ["Respiratory depression", "Paralytic ileus"],
        sideEffects: ["Respiratory depression", "Hypotension", "Constipation"],
        monitoring: ["Respiratory rate", "Sedation level", "Blood pressure"],
        reversal: "Naloxone",
        pdfChapters: [25, 112]
    },

    // INSULIN & GLUCOSE
    {
        id: "med-021",
        name: "Insulin (Regular/Actrapid)",
        category: "Endocrine - Insulin",
        indications: ["Diabetic ketoacidosis", "Hyperglycemia", "Hyperkalemia"],
        dosing: {
            dka: {
                infusion: "0.05-0.1 units/kg/hr IV",
                notes: "Start after initial fluid bolus, adjust to drop glucose 4-5 mmol/L/hr"
            },
            hyperkalemia: {
                dose: "0.05 units/kg/hr with glucose 10% at 5 mL/kg/hr",
                notes: "Monitor blood glucose closely"
            }
        },
        route: ["IV infusion"],
        contraindications: ["Hypoglycemia"],
        monitoring: ["Blood glucose q1h", "Electrolytes", "Ketones"],
        sideEffects: ["Hypoglycemia", "Hypokalemia"],
        pdfChapters: [9, 61]
    },

    {
        id: "med-022",
        name: "Glucose (Dextrose)",
        category: "Fluids & Nutrition",
        indications: ["Hypoglycemia", "With insulin therapy"],
        dosing: {
            hypoglycemia_neonate: {
                bolus: "200-250 mg/kg IV (2-2.5 mL/kg of D10%)",
                maintenance: "6-8 mg/kg/min IV infusion"
            },
            hypoglycemia_child: {
                bolus: "0.5-1 g/kg IV (5-10 mL/kg of D10% or 2-5 mL/kg of D25%)",
                maintenance: "Variable based on response"
            }
        },
        route: ["IV"],
        monitoring: ["Blood glucose"],
        notes: "Use D10% in neonates, D25% or D50% in children",
        pdfChapters: [9, 18, 61]
    },

    // ANTICONVULSANTS - MAINTENANCE
    {
        id: "med-023",
        name: "Phenobarbital",
        category: "Anti-Seizure",
        indications: ["Neonatal seizures", "Status epilepticus"],
        dosing: {
            loading: {
                dose: "20 mg/kg IV over 20-30 minutes",
                additionalDoses: "10 mg/kg q15-20min (max total 40 mg/kg)",
                notes: "For neonatal seizures or status epilepticus"
            },
            maintenance: {
                dose: "3-5 mg/kg/day divided q12h PO/IV",
                notes: "Start 12-24 hours after loading"
            }
        },
        route: ["IV", "PO"],
        sideEffects: ["Sedation", "Respiratory depression"],
        monitoring: ["Drug levels", "Respiratory status"],
        pdfChapters: [46, 47]
    },

    // ANTIVIRAL
    {
        id: "med-024",
        name: "Acyclovir",
        category: "Antivirals",
        indications: ["HSV infection", "Varicella", "Neonatal herpes"],
        dosing: {
            hsv_encephalitis: {
                dose: "20 mg/kg/dose IV q8h for 14-21 days",
                notes: "For CNS HSV infection"
            },
            neonatal_hsv: {
                dose: "20 mg/kg/dose IV q8h for 14-21 days",
                notes: "Disseminated or CNS disease"
            },
            varicella: {
                dose: "10-15 mg/kg/dose IV q8h or 20 mg/kg PO qid",
                notes: "For severe or immunocompromised patients"
            }
        },
        route: ["IV", "PO"],
        contraindications: ["Hypersensitivity"],
        sideEffects: ["Nephrotoxicity", "Neurotoxicity"],
        monitoring: ["Renal function", "Adequate hydration"],
        pdfChapters: [26, 27]
    },

    // GASTROINTESTINAL
    {
        id: "med-025",
        name: "Ondansetron",
        category: "Antiemetics",
        indications: ["Nausea", "Vomiting", "Gastroenteritis"],
        dosing: {
            infant_child: {
                dose: "0.15 mg/kg/dose IV/PO q8h (max 16 mg/day)",
                weight_based: {
                    "8-15kg": "2 mg",
                    "15-30kg": "4 mg",
                    ">30kg": "8 mg"
                }
            }
        },
        route: ["IV", "PO"],
        contraindications: ["Congenital long QT syndrome"],
        sideEffects: ["QT prolongation", "Constipation"],
        pdfChapters: [10]
    },

    // Oral Rehydration Solution
    {
        id: "med-026",
        name: "Oral Rehydration Solution (ORS)",
        category: "Fluids & Rehydration",
        indications: ["Mild-moderate dehydration", "Gastroenteritis"],
        dosing: {
            mild_dehydration: {
                volume: "50 mL/kg over 4 hours",
                replacement: "10 mL/kg for each loose stool"
            },
            moderate_dehydration: {
                volume: "100 mL/kg over 4 hours",
                replacement: "Plus ongoing losses"
            }
        },
        route: ["PO"],
        composition: "WHO-ORS: 75 mmol/L Na+, 75 mmol/L glucose",
        pdfChapters: [10]
    },

    // SODIUM BICARBONATE
    {
        id: "med-027",
        name: "Sodium Bicarbonate",
        category: "Electrolytes & Buffers",
        indications: ["Metabolic acidosis", "Hyperkalemia", "TCA overdose"],
        dosing: {
            metabolic_acidosis: {
                dose: "1-2 mmol/kg IV over 30-60 minutes",
                calculation: "Dose (mEq) = 0.3 × weight (kg) × base deficit",
                notes: "Give half the calculated dose initially"
            },
            hyperkalemia: {
                dose: "1-2 mmol/kg IV over 5-30 minutes",
                notes: "For severe hyperkalemia with acidosis"
            }
        },
        route: ["IV"],
        contraindications: ["Metabolic/respiratory alkalosis", "Hypocalcemia"],
        monitoring: ["pH", "Electrolytes", "Ionized calcium"],
        pdfChapters: [9]
    },

    // MAGNESIUM SULFATE
    {
        id: "med-028",
        name: "Magnesium Sulfate",
        category: "Electrolytes",
        indications: ["Hypomagnesemia", "Torsades de pointes", "PPHN"],
        dosing: {
            hypomagnesemia: {
                dose: "25-50 mg/kg/dose IV over 15-30 minutes",
                maxDose: "2 g/dose"
            },
            pphn: {
                loading: "200 mg/kg IV over 20 minutes",
                maintenance: "20-50 mg/kg/hr to maintain level 3-5.5 mmol/L"
            }
        },
        route: ["IV"],
        sideEffects: ["Hypotension", "Bradycardia", "Respiratory depression"],
        monitoring: ["Magnesium levels", "Deep tendon reflexes", "Blood pressure"],
        antidote: "Calcium gluconate",
        pdfChapters: [9, 25]
    }
];

// Helper function to search medications
export function searchMedications(query) {
    const searchLower = query.toLowerCase();
    return PAEDIATRIC_MEDICATIONS.filter(med =>
        med.name.toLowerCase().includes(searchLower) ||
        med.category.toLowerCase().includes(searchLower) ||
        med.indications.some(ind => ind.toLowerCase().includes(searchLower))
    );
}

// Get medications by category
export function getMedicationsByCategory(category) {
    return PAEDIATRIC_MEDICATIONS.filter(med => med.category === category);
}

// Get all unique categories
export function getCategories() {
    const categories = [...new Set(PAEDIATRIC_MEDICATIONS.map(med => med.category))];
    return categories.sort();
}

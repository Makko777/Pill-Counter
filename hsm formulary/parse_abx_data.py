import json
import re

def parse_abx_data(filename='abx_extracted.txt'):
    """Parse ABX regime extracted text into structured JSON"""
    
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    
    antibiotics = []
    antifungals = []
    antivirals = []
    
    # Split by pages
    pages = text.split('=== PAGE')
    
    current_drug = None
    current_category = 'antibiotic'
    
    for page in pages[1:]:  # Skip first empty split
        lines = page.split('\n')
        page_num = lines[0].strip().replace('===', '').strip()
        
        # Determine category based on page title
        if 'Antifungal' in ''.join(lines[:10]):
            current_category = 'antifungal'
        elif 'Antiviral' in ''.join(lines[:10]):
            current_category = 'antiviral'
        
        # Simple extraction: look for drug name patterns
        for i, line in enumerate(lines):
            line = line.strip()
            
            # Skip headers and empty lines
            if not line or 'Antibiotic' in line or 'Usual' in line or '===' in line:
                continue
            
            # Detect drug names (starts with IV/Oral or capitalized word)
            if re.match(r'^(IV|Oral|Penicillin)', line):
                # Extract drug name
                drug_name = line
                
                # Try to get usual dose from next few lines
                usual_dose = ""
                dosage_info = []
                
                for j in range(i+1, min(i+20, len(lines))):
                    next_line = lines[j].strip()
                    if next_line and not next_line.startswith('CrCl') and not next_line.startswith('Source'):
                        if 'mg' in next_line or 'MU' in next_line or 'unit' in next_line:
                            usual_dose = next_line
                            break
                
                # Get dosing adjustments
                for j in range(i+1, min(i+30, len(lines))):
                    next_line = lines[j].strip()
                    if 'CrCl' in next_line or 'GFR' in next_line or 'ml/min' in next_line:
                        dosage_info.append(next_line)
                
                if drug_name and usual_dose:
                    drug_entry = {
                        "name": drug_name,
                        "usualDose": usual_dose,
                        "renalDosing": ' '.join(dosage_info[:5]) if dosage_info else "See reference for details",
                        "category": current_category
                    }
                    
                    if current_category == 'antibiotic':
                        antibiotics.append(drug_entry)
                    elif current_category == 'antifungal':
                        antifungals.append(drug_entry)
                    elif current_category == 'antiviral':
                        antivirals.append(drug_entry)
    
    # Manual extraction for key drugs (more reliable)
    abx_data = [
        {
            "id": "amikacin-md",
            "name": "Amikacin (Multiple Daily Doses)",
            "route": "IV",
            "usualDose": "7.5 mg/kg BD",
            "renalDosing": [
                {"crcl": ">50-90", "adjustment": "7.5mg/kg q12h"},
                {"crcl": "30-50", "adjustment": "7.5mg/kg q24h"},
                {"crcl": "10-30", "adjustment": "7.5mg/kg q48h"},
                {"crcl": "<10", "adjustment": "7.5mg/kg q72h"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Aminoglycoside",
            "matchKeywords": ["amikacin"]
        },
        {
            "id": "amikacin-od",
            "name": "Amikacin (Once Daily)",
            "route": "IV",
            "usualDose": "15mg/kg OD",
            "renalDosing": [
                {"crcl": ">80", "adjustment": "15mg/kg q24h"},
                {"crcl": "60-80", "adjustment": "12mg/kg q24h"},
                {"crcl": "40-60", "adjustment": "7.5mg/kg q24h"},
                {"crcl": "30-40", "adjustment": "4mg/kg q24h"},
                {"crcl": "20-30", "adjustment": "7.5mg/kg q48h"},
                {"crcl": "10-20", "adjustment": "4mg/kg q48h"},
                {"crcl": "<10", "adjustment": "3mg/kg q72h"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Aminoglycoside",
            "matchKeywords": ["amikacin"]
        },
        {
            "id": "ampicillin",
            "name": "Ampicillin",
            "route": "IV",
            "usualDose": "500mg-2g q6h",
            "renalDosing": [
                {"crcl": ">50", "adjustment": "q6h"},
                {"crcl": "10-50", "adjustment": "q6-12h"},
                {"crcl": "<10", "adjustment": "q12-24h"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Penicillin",
            "matchKeywords": ["ampicillin"]
        },
        {
            "id": "augmentin",
            "name": "Augmentin (Amoxycillin 1g/Clavulanate 200mg)",
            "route": "IV",
            "usualDose": "1.2g TDS",
            "renalDosing": [
                {"crcl": "10-50", "adjustment": "1.2g BD"},
                {"crcl": "<10", "adjustment": "1.2g OD"}
            ],
            "notes": "",
            "category": "Penicillin + Beta-lactamase Inhibitor",
            "matchKeywords": ["augmentin", "amoxycillin", "clavulanate"]
        },
        {
            "id": "azithromycin",
            "name": "Azithromycin",
            "route": "IV",
            "usualDose": "500mg OD",
            "renalDosing": [
                {"crcl": "All", "adjustment": "No adjustment recommended"}
            ],
            "notes": "Use with caution if GFR <10 ml/min",
            "category": "Macrolide",
            "matchKeywords": ["azithromycin"]
        },
        {
            "id": "bactrim",
            "name": "Bactrim (Sulfamethoxazole/Trimethoprim)",
            "route": "IV",
            "usualDose": "8-20mg/kg/day (Trimethoprim) in divided doses",
            "renalDosing": [
                {"crcl": ">30", "adjustment": "No adjustment"},
                {"crcl": "15-30", "adjustment": "½ of recommended dose (BD for PCP)"},
                {"crcl": "<15", "adjustment": "Not recommended. If used: 5-10mg/kg OD post HD"}
            ],
            "notes": "Administer after HD",
            "category": "Sulfonamide",
            "matchKeywords": ["bactrim", "sulfamethoxazole", "trimethoprim", "cotrimoxazole", "co-trimoxazole"]
        },
        {
            "id": "cefazolin",
            "name": "Cefazolin",
            "route": "IV",
            "usualDose": "1-2g TDS",
            "renalDosing": [
                {"crcl": "35-54", "adjustment": "Full dose TDS"},
                {"crcl": "11-34", "adjustment": "½ usual dose BD"},
                {"crcl": "<10", "adjustment": "½ usual dose OD"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Cephalosporin (1st gen)",
            "matchKeywords": ["cefazolin"]
        },
        {
            "id": "cefepime",
            "name": "Cefepime",
            "route": "IV",
            "usualDose": "1-2g BD/TDS",
            "renalDosing": [
                {"crcl": ">60", "adjustment": "500mg BD to 2g TDS (based on severity)"},
                {"crcl": "30-60", "adjustment": "500mg OD to 2g BD"},
                {"crcl": "11-29", "adjustment": "250mg-500mg OD to 2g OD"},
                {"crcl": "<11", "adjustment": "250mg OD to 1g OD"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Cephalosporin (4th gen)",
            "matchKeywords": ["cefepime"]
        },
        {
            "id": "ceftazidime",
            "name": "Ceftazidime",
            "route": "IV",
            "usualDose": "1-2g BD/TDS",
            "renalDosing": [
                {"crcl": "31-50", "adjustment": "1g q12h"},
                {"crcl": "16-30", "adjustment": "1g q24h"},
                {"crcl": "6-15", "adjustment": "0.5g q24h"},
                {"crcl": "≤5", "adjustment": "0.5g q48h"}
            ],
            "notes": "Administer post HD on HD day. May increase by 50% in severe infection",
            "category": "Cephalosporin (3rd gen)",
            "matchKeywords": ["ceftazidime"]
        },
        {
            "id": "ceftriaxone",
            "name": "Ceftriaxone",
            "route": "IV",
            "usualDose": "1-2g OD",
            "renalDosing": [
                {"crcl": "All", "adjustment": "No adjustment necessary"}
            ],
            "notes": "Max ≤2g/day if concurrent renal and hepatic dysfunction",
            "category": "Cephalosporin (3rd gen)",
            "matchKeywords": ["ceftriaxone"]
        },
        {
            "id": "ciprofloxacin-iv",
            "name": "Ciprofloxacin",
            "route": "IV",
            "usualDose": "200-400mg BD",
            "renalDosing": [
                {"crcl": "≥50", "adjustment": "No adjustment"},
                {"crcl": "10-50", "adjustment": "200mg BD"},
                {"crcl": "<10", "adjustment": "200mg BD"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Fluoroquinolone",
            "matchKeywords": ["ciprofloxacin"]
        },
        {
            "id": "ciprofloxacin-oral",
            "name": "Ciprofloxacin",
            "route": "Oral",
            "usualDose": "250-750mg BD",
            "renalDosing": [
                {"crcl": "30-50", "adjustment": "250-500mg BD"},
                {"crcl": "5-29", "adjustment": "250-500mg OD"},
                {"crcl": "HD", "adjustment": "250-500mg OD post HD"}
            ],
            "notes": "",
            "category": "Fluoroquinolone",
            "matchKeywords": ["ciprofloxacin"]
        },
        {
            "id": "meropenem",
            "name": "Meropenem",
            "route": "IV",
            "usualDose": "500mg-2g TDS",
            "renalDosing": [
                {"crcl": "26-50", "adjustment": "Recommended dose BD"},
                {"crcl": "10-25", "adjustment": "½ recommended dose BD"},
                {"crcl": "<10", "adjustment": "½ recommended dose OD"}
            ],
            "notes": "Administer after HD on HD day (500mg OD post HD)",
            "category": "Carbapenem",
            "matchKeywords": ["meropenem"]
        },
        {
            "id": "vancomycin",
           "name": "Vancomycin",
            "route": "IV",
            "usualDose": "2-3g/day in 2-4 divided doses (Max: 4g/day)",
            "renalDosing": [
                {"crcl": ">50", "adjustment": "15-20mg/kg BD/TDS"},
                {"crcl": "20-49", "adjustment": "15-20mg/kg OD"},
                {"crcl": "<20", "adjustment": "TDM-guided after 1g stat"}
            ],
            "notes": "Dose based on therapeutic drug monitoring",
            "category": "Glycopeptide",
            "matchKeywords": ["vancomycin"]
        },
        {
            "id": "gentamicin-md",
            "name": "Gentamicin (Multiple Daily)",
            "route": "IV",
            "usualDose": "1.7mg/kg TDS",
            "renalDosing": [
                {"crcl": ">50-90", "adjustment": "1.7mg/kg TDS"},
                {"crcl": "10-50", "adjustment": "1.7mg/kg q12-48h"},
                {"crcl": "<10", "adjustment": "1.7mg/kg q48-72h"}
            ],
            "notes": "Administer post HD on HD day. Further adjust based on TDM",
            "category": "Aminoglycoside",
            "matchKeywords": ["gentamicin"]
        },
        {
            "id": "gentamicin-od",
            "name": "Gentamicin (Once Daily)",
            "route": "IV",
            "usualDose": "3-5mg/kg OD",
            "renalDosing": [
                {"crcl": ">80", "adjustment": "5mg/kg q24h"},
                {"crcl": "60-80", "adjustment": "4mg/kg q24h"},
                {"crcl": "40-60", "adjustment": "3.5mg/kg q24h"},
                {"crcl": "30-40", "adjustment": "2.5mg/kg q24h"},
                {"crcl": "20-30", "adjustment": "4mg/kg q48h"},
                {"crcl": "10-20", "adjustment": "3mg/kg q48h"},
                {"crcl": "<10", "adjustment": "2mg/kg q72h"}
            ],
            "notes": "Administer post HD on HD day. Further adjust based on TDM",
            "category": "Aminoglycoside",
            "matchKeywords": ["gentamicin"]
        },
        {
            "id": "metronidazole",
            "name": "Metronidazole (Flagyl)",
            "route": "IV",
            "usualDose": "500mg TDS",
            "renalDosing": [
                {"crcl": "All", "adjustment": "No adjustment necessary"}
            ],
            "notes": "",
            "category": "Nitroimidazole",
            "matchKeywords": ["metronidazole", "flagyl"]
        },
        {
            "id": "tazocin",
            "name": "Tazocin (Piperacillin 4g/Tazobactam 0.5g)",
            "route": "IV",
            "usualDose": "4.5g TDS-QID (Max: 18g/day)",
            "renalDosing": [
                {"crcl": "20-40", "adjustment": "2.25g QID"},
                {"crcl": "<20", "adjustment": "2.25g TDS or QID for nosocomial pneumonia"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Penicillin + Beta-lactamase Inhibitor",
            "matchKeywords": ["tazocin", "piperacillin", "tazobactam"]
        },
        {
            "id": "cefoperazone",
            "name": "Cefoperazone",
            "route": "IV",
            "usualDose": "1-2g BD",
            "renalDosing": [
                {"crcl": "<18", "adjustment": "Max 4g/day"}
            ],
            "notes": "",
            "category": "Cephalosporin (3rd gen)",
            "matchKeywords": ["cefoperazone"]
        },
        {
            "id": "cefotaxime",
            "name": "Cefotaxime",
            "route": "IV",
            "usualDose": "1-2g TDS",
            "renalDosing": [
                {"crcl": "10-50", "adjustment": "BD/TDS/QID"},
                {"crcl": "<10", "adjustment": "OD or reduce dose by 50%"}
            ],
            "notes": "Administer post HD on HD day (Usual HD dose: 1-2g OD). Concurrent renal & hepatic impairment: 500mg BD",
            "category": "Cephalosporin (3rd gen)",
            "matchKeywords": ["cefotaxime"]
        },
        {
            "id": "cefuroxime",
            "name": "Cefuroxime",
            "route": "IV",
            "usualDose": "750mg-1.5g TDS",
            "renalDosing": [
                {"crcl": ">50", "adjustment": "TDS"},
                {"crcl": "10-50", "adjustment": "BD-TDS"},
                {"crcl": "<10", "adjustment": "OD"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Cephalosporin (2nd gen)",
            "matchKeywords": ["cefuroxime"]
        },
        {
            "id": "clindamycin",
            "name": "Clindamycin",
            "route": "Oral",
            "usualDose": "300mg TDS-QID (Max: 1800mg/day)",
            "renalDosing": [
                {"crcl": "All", "adjustment": "No adjustment required"}
            ],
            "notes": "Poorly dialyzable",
            "category": "Lincosamide",
            "matchKeywords": ["clindamycin"]
        },
        {
            "id": "cloxacillin",
            "name": "Cloxacillin",
            "route": "IV",
            "usualDose": "500mg-2g QID",
            "renalDosing": [
                {"crcl": "All", "adjustment": "No adjustment necessary"}
            ],
            "notes": "",
            "category": "Penicillin",
            "matchKeywords": ["cloxacillin"]
        },
        {
            "id": "ertapenem",
            "name": "Ertapenem",
            "route": "IV",
            "usualDose": "1g OD",
            "renalDosing": [
                {"crcl": "≤30", "adjustment": "500mg OD"}
            ],
            "notes": "Give after HD or at least 6 hrs prior. If dosed within 6 hrs before HD, give 150mg supplementary dose post HD",
            "category": "Carbapenem",
            "matchKeywords": ["ertapenem"]
        },
        {
            "id": "fusidic-acid",
            "name": "Fusidic Acid",
            "route": "Oral",
            "usualDose": "500mg TDS",
            "renalDosing": [
                {"crcl": "All", "adjustment": "No adjustment required"}
            ],
            "notes": "",
            "category": "Fusidane",
            "matchKeywords": ["fusidic", "acid", "fusidic acid"]
        },
        {
            "id": "linezolid",
            "name": "Linezolid",
            "route": "IV",
            "usualDose": "600mg BD",
            "renalDosing": [
                {"crcl": "All", "adjustment": "No adjustment required"}
            ],
            "notes": "Give after HD on HD day",
            "category": "Oxazolidinone",
            "matchKeywords": ["linezolid"]
        },
        {
            "id": "penicillin-g",
            "name": "Penicillin G (Benzylpenicillin)",
            "route": "IV",
            "usualDose": "0.5-4 MU q4-6h (1MU=600mg)",
            "renalDosing": [
                {"crcl": ">50", "adjustment": "No adjustment"},
                {"crcl": "10-50", "adjustment": "75% of normal dose"},
                {"crcl": "<10", "adjustment": "25-50% of normal dose"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Penicillin",
            "matchKeywords": ["penicillin", "benzylpenicillin", "penicillin g"]
        },
        {
            "id": "sulperazon",
            "name": "Sulperazon (Cefoperazone 0.5g/Sulbactam 0.5g)",
            "route": "IV",
            "usualDose": "1-2g BD",
            "renalDosing": [
                {"crcl": "15-30", "adjustment": "1g BD (max 2g/day)"},
                {"crcl": "<15", "adjustment": "500mg BD (max 1g/day)"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Cephalosporin + Beta-lactamase Inhibitor",
            "matchKeywords": ["sulperazon", "cefoperazone", "sulbactam"]
        },
        {
            "id": "unasyn",
            "name": "Unasyn (Ampicillin 1g/Sulbactam 0.5g)",
            "route": "IV",
            "usualDose": "1.5-3g TDS-QID",
            "renalDosing": [
                {"crcl": "15-29", "adjustment": "1.5-3g BD"},
                {"crcl": "5-14", "adjustment": "1.5-3g OD"}
            ],
            "notes": "Administer post HD on HD day",
            "category": "Penicillin + Beta-lactamase Inhibitor",
            "matchKeywords": ["unasyn", "ampicillin", "sulbactam"]
        },
        {
            "id": "imipenem",
            "name": "Imipenem",
            "route": "IV",
            "usualDose": "0.5-1g TDS-QID (Max: 4g/day)",
            "renalDosing": [
                {"crcl": "≥71", "adjustment": "Based on body weight - see detailed table"},
                {"crcl": "41-70", "adjustment": "Reduce dose, see detailed table"},
                {"crcl": "21-40", "adjustment": "Reduce dose, see detailed table"},
                {"crcl": "6-20", "adjustment": "Reduce dose, see detailed table"}
            ],
            "notes": "Complex weight-based dosing - refer to full dosing table in source",
            "category": "Carbapenem",
            "matchKeywords": ["imipenem"]
        }
    ]
    
    # Save to JSON
    output = {
        "metadata": {
            "title": "ABX Regime HSM 2017",
            "description": "Antibiotic Dosage in Adult Patients with Impaired Renal Function",
            "source": "Hospital Seri Manjung",
            "year": 2017,
            "totalEntries": len(abx_data)
        },
        "antibiotics": abx_data
    }
    
    with open('src/abxData.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Created src/abxData.json with {len(abx_data)} entries")
    return output

if __name__ == "__main__":
    parse_abx_data()

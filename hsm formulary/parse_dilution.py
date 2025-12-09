#!/usr/bin/env python3
"""
Parse the dilution guideline PDF text and create a JSON data structure
"""
import json
import re

# Read the extracted text
with open('dilution_extracted.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Split by pages
pages = content.split('=== PAGE')

drugs = []
current_drug = None

# Define the drugs we know from the table of contents
drug_names = [
    "Acyclovir", "Amikacin", "Amoxicillin & Clavulanate", "Amphotericin B",
    "Ampicillin", "Ampicillin & Sulbactam", "Anidulafungin", "Artesunate",
    "Azithromycin", "Benzathine Penicillin", "Benzylpenicillin", 
    "Caspofungin Acetate", "Cefazolin", "Cefepime", "Cefoperazone",
    "Cefoperazone & Sulbactam", "Cefotaxime", "Ceftazidime", "Ceftriaxone",
    "Cefuroxime", "Clindamycin", "Cloxacillin", "Ertapenem",
    "Erythromycin Lactobionate", "Ganciclovir", "Gentamicin",
    "Imipenem & Cilastatin", "Meropenem", "Micafungin", "Netilmicin",
    "Pentamidine Isethionate", "Piperacillin & Tazobactam",
    "Sulphamethoxazole-Trimethoprim", "Vancomycin", "Voriconazole", "Zidovudine"
]

for page in pages:
    if not page.strip():
        continue
    
    # Check if this page contains a drug profile
    for drug_name in drug_names:
        if f"{drug_name} Injection" in page:
            # Extract information
            drug_data = {
                "id": f"dilution-{len(drugs) + 1}",
                "genericName": drug_name,
                "brandName": "",
                "reconstitution": "",
                "furtherDilution": "",
                "diluents": "",
                "administration": "",
                "storage": "",
                "remarks": "",
                "category": "Injectable Antimicrobial"
            }
            
            # Extract brand name
            brand_match = re.search(r'Brand Name\s+([^\n]+)', page)
            if brand_match:
                drug_data["brandName"] = brand_match.group(1).strip()
            
            # Extract reconstitution
            recon_match = re.search(r'Reconstitution\s+([^■\n]+(?:\n[^■\n]+)*)', page, re.MULTILINE)
            if recon_match:
                drug_data["reconstitution"] = ' '.join(recon_match.group(1).strip().split())
            
            # Extract further dilution
            dilution_match = re.search(r'Further Dilution\s+([^Diluent]+)', page, re.MULTILINE)
            if dilution_match:
                drug_data["furtherDilution"] = ' '.join(dilution_match.group(1).strip().split())
            
            # Extract diluents
            diluent_match = re.search(r'Diluents?\s+([^\n]+)', page)
            if diluent_match:
                drug_data["diluents"] = diluent_match.group(1).strip()
            
            # Extract administration
            admin_match = re.search(r'Administration\s+([^Storage]+)', page, re.MULTILINE)
            if admin_match:
                drug_data["administration"] = ' '.join(admin_match.group(1).strip().split())
            
            # Extract storage
            storage_match = re.search(r'Storage.*?Stability\s+([^Remarks]+)', page, re.MULTILINE)
            if storage_match:
                drug_data["storage"] = ' '.join(storage_match.group(1).strip().split())
            
            # Extract remarks
            remarks_match = re.search(r'Remarks\s+([^References]+)', page, re.MULTILINE)
            if remarks_match:
                drug_data["remarks"] = ' '.join(remarks_match.group(1).strip().split())
            
            drugs.append(drug_data)
            break

# Save to JSON
output_data = {
    "title": "MOH Dilution Guideline for Injectable Drugs",
    "version": "December 2020",
    "source": "Ministry of Health Malaysia - Pharmaceutical Services Programme",
    "drugs": drugs
}

with open('dilution_data.json', 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=2, ensure_ascii=False)

print(f"✅ Parsed {len(drugs)} drugs from dilution guideline")
print(f"📄 Saved to dilution_data.json")
print("\nSample drugs extracted:")
for drug in drugs[:5]:
    print(f"  - {drug['genericName']}")

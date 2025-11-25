import re
import json
import unicodedata

def normalize_unicode(text):
    """Convert Unicode characters to ASCII where possible"""
    # Normalize Unicode to decomposed form, then remove combining characters
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    return text

def clean_text(text):
    """Comprehensive text cleaning with OCR error correction"""
    # First, normalize Unicode
    text = normalize_unicode(text)
    
    # Remove page artifacts and headers/footers
    text = re.sub(r'=== PAGE \d+ ===', ' ', text)
    text = re.sub(r'\$\d+\.\d+ \+ postage from orders@drugdoses\.com Page \d+', ' ', text)
    text = re.sub(r'drugdoses\.com', ' ', text)
    text = re.sub(r'Page \d+', ' ', text)
    
    # Fix common OCR character confusions - UNITS (comprehensive)
    # mg variations
    text = re.sub(r'(?<=\d)\s*rng\b', 'mg', text)
    text = re.sub(r'(?<=\d)\s*rn\s*g\b', 'mg', text)
    text = re.sub(r'(?<=\d)\s*rnq\b', 'mg', text)
    text = re.sub(r'\brng\b', 'mg', text)
    text = re.sub(r'\bmg\s+(?=\d)', 'mg/', text)  # "mg 12" -> "mg/12"
    
    # mcg variations
    text = re.sub(r'(?<=\d)\s*rncg\b', 'mcg', text)
    text = re.sub(r'(?<=\d)\s*mc\s*g\b', 'mcg', text)
    text = re.sub(r'\brncg\b', 'mcg', text)
    
    # kg variations (extensive)
    text = re.sub(r'(?<=\d)\s*l<g\b', 'kg', text)
    text = re.sub(r'(?<=\d)\s*1<g\b', 'kg', text)
    text = re.sub(r'(?<=\d)\s*I<g\b', 'kg', text)
    text = re.sub(r'(?<=\d)\s*k\(J\b', 'kg', text)
    text = re.sub(r'(?<=\d)\s*1\(g\b', 'kg', text)
    text = re.sub(r'(?<=\d)\s*k\[J\b', 'kg', text)
    text = re.sub(r'(?<=\d)\s*kq\b', 'kg', text)
    text = re.sub(r'\bl<g\b', 'kg', text)
    text = re.sub(r'\bI<g\b', 'kg', text)
    text = re.sub(r'\bk\(J\b', 'kg', text)
    text = re.sub(r'\bk\[J\b', 'kg', text)
    text = re.sub(r'\bkq\b', 'kg', text)
    
    # ml variations
    text = re.sub(r'(?<=\d)\s*rnl\b', 'ml', text)
    text = re.sub(r'(?<=\d)\s*rn I\b', 'ml', text)
    text = re.sub(r'\brnl\b', 'ml', text)
    text = re.sub(r'\bm\s+l\b', 'ml', text)
    text = re.sub(r'\bmll\b', 'ml', text)
    
    # min/hr/H variations
    text = re.sub(r'(?<=\d)\s*rnin\b', 'min', text)
    text = re.sub(r'\brnin\b', 'min', text)
    text = re.sub(r'\bllr\b', 'hr', text)
    text = re.sub(r'\blhr\b', 'hr', text)
    text = re.sub(r'\b1hr\b', '1hr', text)
    text = re.sub(r'(?<=\d)\s*/H\b', 'H', text)  # "6-12/H" -> "6-12H"
    text = re.sub(r'\bti-1\s*/H\b', '6-12H', text)  # Common pattern
    text = re.sub(r'\b8-l2H\b', '8-12H', text)
    
    # Fix spacing around numbers and units
    text = re.sub(r'(\d+)\s+(\.\s*\d+)', r'\1\2', text)  # "0 . 5" -> "0.5"
    text = re.sub(r'(\d+)\s*\.\s*(\d+)', r'\1.\2', text)  # "0 . 5" -> "0.5"
    text = re.sub(r'0_\s*1', '0.1', text)  # "0_ 1" -> "0.1"
    text = re.sub(r'(\d+)\s*_\s*(\d+)', r'\1.\2', text)  # "0_ 1" -> "0.1"
    
    # Common word OCR errors
    text = re.sub(r'\bornl\b', 'oral', text, flags=re.IGNORECASE)
    text = re.sub(r'\boml\b', 'oral', text, flags=re.IGNORECASE)
    text = re.sub(r'\borul\b', 'oral', text, flags=re.IGNORECASE)
    text = re.sub(r'\bOrnin\b', '0min', text)
    text = re.sub(r'\bOmin\b', '0min', text)
    text = re.sub(r'\bbeforo\b', 'before', text)
    text = re.sub(r'\btl1on\b', 'then', text)
    text = re.sub(r'\btl1en\b', 'then', text)
    text = re.sub(r'\bparacetarno1\b', 'paracetamol', text, flags=re.IGNORECASE)
    text = re.sub(r'\bparacetarnol\b', 'paracetamol', text, flags=re.IGNORECASE)
    text = re.sub(r'\bangioplasly\b', 'angioplasty', text)
    text = re.sub(r'\bsoltn\b', 'solution', text)
    text = re.sub(r'\bintratrac:l1eal\b', 'intratracheal', text)
    text = re.sub(r'\bumoi\b', 'umol', text)
    text = re.sub(r'\bumolll\b', 'umol/L', text)
    text = re.sub(r'\burnoi\b', 'umol', text)
    text = re.sub(r'\brnux\b', 'max', text)
    text = re.sub(r'\brnax\b', 'max', text)
    text = re.sub(r'\btub\b', 'tab', text)
    text = re.sub(r'\brepoat\b', 'repeat', text)
    text = re.sub(r'\bdni!y\b', 'daily', text)
    text = re.sub(r'\bdnily\b', 'daily', text)
    
    # IV/IM variations
    text = re.sub(r'\bUlV\b', 'IV', text)
    text = re.sub(r'\bIVl\b', 'IM', text)
    text = re.sub(r'\blVl\b', 'IM', text)
    
    # Common letter/number confusions in dosages
    text = re.sub(r'\b1\s*!\s*i\s*0', '150', text)  # "1!i0" -> "150"
    text = re.sub(r'\b!\s*i', '5', text)  # "!i" -> "5"
    # Fix exclamation marks and special character confusions FIRST (before other substitutions)
    # Most ! should be 't', but need to handle special cases
    text = re.sub(r'!i', '5i', text)  # Temporarily mark "!i" pattern  
    text = re.sub(r'!', 't', text)  # Convert remaining ! to t
    text = re.sub(r'5i', 'ti', text)  # Convert back, now it's "ti"
    text = re.sub(r'ti-1', '6-1', text)  # Fix "ti-1" -> "6-1"
    
    # Common letter/number confusions in dosages (do early)
    text = re.sub(r'\b1\s*0\s*-\s*/\s*0', '10-20', text)  # "1 0-/0" or "10-/0" -> "10-20"
    text = re.sub(r'\b([12]?\d)-/0', r'\1-20', text)  # "X-/0" -> "X-20"  
    text = re.sub(r'/0mg', '20mg', text)  # "/0mg" -> "20mg"
    text = re.sub(r'\b1 OO\s*(?=mg|mcg|ml|kg)', '100', text)
    text = re.sub(r'\b1 O\s*(?=mg|mcg|ml|kg)', '10', text)
    text = re.sub(r'\b0\s*\.\s*1\b', '0.1', text)
    text = re.sub(r'\b0\s*\.\s*2\b', '0.2', text)
    text = re.sub(r'\b0\s*\.\s*5\b', '0.5', text)
    text = re.sub(r'\b1\s*\.\s*0\b', '1.0', text)
    text = re.sub(r'\b2\.\s*5', '2.5', text)
    
    # Time intervals cleanup
    text = re.sub(r'\b8-24ft\b', '8-24H', text)
    text = re.sub(r'\b6-12JI\b', '6-12H', text)
    text = re.sub(r'\b4wl<\b', '4wk', text)
    text = re.sub(r'\b2wl<\b', '2wk', text)
    text = re.sub(r'\b(\d+)wl<\b', r'\1wk', text)
    text = re.sub(r'\bwl<\b', 'wk', text)
    text = re.sub(r'\b(\d+)hr\b', r'\1H', text)  # Standardize to H
    text = re.sub(r'\b21lr\b', '2hr', text)
    text = re.sub(r'\b241lr\b', '24hr', text)
    
    # Fix "See X" references
    text = re.sub(r'\bSee\s+([a-z])', r'See \1', text)
    text = re.sub(r'\bSec\s+', 'See ', text)
    text = re.sub(r'\bSoo\s+', 'See ', text)
    text = re.sub(r'\bSeu\s+', 'See ', text)
    
    # Clean up common garbage patterns
    text = re.sub(r'\b[A-Z]{1}\\\\\w+\b', '', text)  # Remove patterns like "A\\dtJit"
    text = re.sub(r'\\u00b7', '-', text)
    text = re.sub(r'~', '-', text)
    text = re.sub(r'--+', '-', text)
    
    # Remove soft hyphens and other invisible characters
    text = re.sub(r'[\u00ad\u200b\u200c\u200d]', '', text)
    
    # Remove obvious garbage patterns
    text = re.sub(r'\$\d+\.\d+\s+\+\s+po;;lnqc.*?drugd?u?sos\.com', '', text, flags=re.IGNORECASE)
    text = re.sub(r'from\s+oniom.*?drugdosos\.com', '', text, flags=re.IGNORECASE)
    text = re.sub(r'ordors@.*?\.com', '', text)
    text = re.sub(r'Pane\s+\d+', '', text)
    text = re.sub(r'turnourlysis:', 'tumour lysis:', text)
    
    # Fix double periods
    text = re.sub(r'\.\.+', '.', text)
    
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\s+\.', '.', text)
    text = re.sub(r'\.\s+\.', '.', text)
    
    return text.strip()

def is_valid_drug_name(name):
    """Check if a name looks like a valid drug name"""
    # Must have letters
    if not any(c.isalpha() for c in name):
        return False
    
    # Not too long or too short
    if len(name) < 2 or len(name) > 100:
        return False
    
    # Not too many special characters
    if name.count('.') > 3 or name.count('\\') > 0:
        return False
    
    # Check for gibberish patterns
    gibberish_patterns = [
        r'\\[a-zA-Z]+',  # Backslash commands
        r'[^\x00-\x7F]{3,}',  # Multiple non-ASCII characters in a row
        r'\d{5,}',  # Too many digits
        r'[^a-zA-Z0-9\s\-\+\(\),\.]{3,}',  # Too many special chars
    ]
    
    for pattern in gibberish_patterns:
        if re.search(pattern, name):
            return False
    
    return True

def is_valid_dosage(dosage):
    """Check if dosage text looks valid"""
    if not dosage:
        return True  # Empty dosage is okay for cross-references
    
    if len(dosage) < 3:
        return False
    
    # Check for excessive gibberish
    # Count non-standard characters
    clean = re.sub(r'[a-zA-Z0-9\s\-\+\(\),\.\:/]', '', dosage)
    if len(clean) > len(dosage) * 0.3:  # More than 30% gibberish
        return False
    
    return True

def parse_frank_shann(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    parsed_data = []
    current_entry = None
    
    # Common non-drug words that might start a sentence
    NON_DRUG_STARTS = {
        'Monitor', 'Note', 'Caution', 'Warning', 'See', 'Adult', 'Child', 'Infant', 'Neonatal', 'Preterm', 'Term', 
        'Give', 'Stop', 'Repeat', 'Max', 'Min', 'Total', 'Daily', 'Weekly', 'Monthly', 'If', 'Then', 'For', 'Use', 
        'Avoid', 'Adjust', 'Check', 'Measure', 'Keep', 'Protect', 'Dilute', 'Dissolve', 'Infuse', 'Inject', 'Take', 
        'Administer', 'Apply', 'In', 'On', 'At', 'To', 'By', 'With', 'Without', 'Or', 'And', 'But', 'However', 
        'Although', 'Because', 'Since', 'When', 'Where', 'Why', 'How', 'What', 'Who', 'Which', 'That', 'This', 
        'These', 'Those', 'It', 'They', 'We', 'You', 'He', 'She', 'The', 'A', 'An', 'My', 'Your', 'His', 'Her', 
        'Its', 'Our', 'Their', 'NB', 'IV', 'IM', 'SC', 'PO', 'PR', 'PV', 'SL', 'TOP', 'INH', 'NEB', 'Contents',
        'Drug', 'Doses', 'Infusion', 'Rates', 'Table', 'Haemofiltration', 'Cytochrome', 'Alveolar', 'Muscle',
        'Pacemaker', 'Intravenous', 'Haematology', 'Fluid', 'Dialysis', 'Ventilation', 'Immunisation', 'Antibiotic',
        'Normal', 'Values', 'Resuscitation', 'Pharmacokinetic', 'Prophylaxis', 'Treatment', 'Loading', 'Maintenance',
        'Severe', 'Slow', 'Extended', 'Newborn', 'NOT'
    }

    start_processing = False
    skipped_count = 0
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if "DRUGS ARE LISTED BY GENERIC NAME" in line:
            start_processing = True
            continue
            
        if not start_processing:
            continue

        # Skip obvious junk lines
        if '=== PAGE' in line or '$9.95' in line or 'drugdoses.com' in line or line.isdigit():
            continue
        
        # Skip lines that are clearly page numbers or headers
        if re.match(r'^\d+$', line) or len(line) > 500:
            continue
            
        # OCR cleanup for malformed starts
        if line.startswith('1\\') or line.startswith('|'):
             line = 'A' + line[2:]
        
        # Check for new drug entry
        is_new_entry = False
        first_word = line.split(' ')[0].strip('.,:;()')
        
        # Improved heuristics for drug name detection
        if first_word and len(first_word) > 1 and first_word[0].isupper() and first_word not in NON_DRUG_STARTS:
            # Pattern 1: "Name. dosage..."
            if re.match(r'^[A-Z][a-zA-Z0-9\+\-\s\(\)]{2,60}?(\.|\:)\s', line):
                is_new_entry = True
            # Pattern 2: Combination drugs with +
            elif '+' in line and len(line.split('+')[0]) < 50 and not line.startswith('Adult'):
                 is_new_entry = True
            # Pattern 3: Short capitalized line ending with period
            elif len(line) < 60 and line.endswith('.') and not any(word in line for word in ['Adult', 'NOT/kg']):
                 is_new_entry = True

        if is_new_entry:
            # Handle split between name and dosage
            if '.' in line:
                parts = line.split('.', 1)
                name = parts[0].strip()
                dosage = parts[1].strip() if len(parts) > 1 else ""
                
                # Validation: name shouldn't be too long
                if len(name) > 80 or not is_valid_drug_name(name):
                    is_new_entry = False
            else:
                name = line
                dosage = ""
                
            if is_new_entry:
                current_entry = {
                    "id": f"fs-{str(len(parsed_data)+1).zfill(4)}",
                    "name": name,
                    "dosage": dosage
                }
                parsed_data.append(current_entry)
        
        if not is_new_entry:
            if current_entry:
                # Check for "hidden" drug entry in this line (merged by OCR)
                # Look for pattern: ". Name. " where Name is capitalized
                potential_split = re.search(r'\.\s+([A-Z][a-z]{3,30})\.\s', line)
                if potential_split:
                    possible_name = potential_split.group(1)
                    if possible_name not in NON_DRUG_STARTS and is_valid_drug_name(possible_name):
                        # Found a merged entry - split it
                        pre_split = line[:potential_split.start()+1]
                        post_split = line[potential_split.start()+1:].strip()
                        
                        # Add pre_split to current entry
                        if current_entry['dosage']:
                            current_entry['dosage'] += " " + pre_split
                        else:
                            current_entry['dosage'] = pre_split
                            
                        # Create new entry from post_split
                        parts = post_split.split('.', 1)
                        new_name = parts[0].strip()
                        new_dosage = parts[1].strip() if len(parts) > 1 else ""
                        
                        current_entry = {
                            "id": f"fs-{str(len(parsed_data)+1).zfill(4)}",
                            "name": new_name,
                            "dosage": new_dosage
                        }
                        parsed_data.append(current_entry)
                        continue

                # Append to current entry's dosage
                if current_entry['dosage']:
                    current_entry['dosage'] += " " + line
                else:
                    current_entry['dosage'] = line

    # Post-processing and validation
    final_data = []
    rejected_count = 0
    
    for entry in parsed_data:
        # Clean the text
        entry['name'] = clean_text(entry['name'])
        entry['dosage'] = clean_text(entry['dosage'])
        
        # Validate entry
        if not is_valid_drug_name(entry['name']):
            rejected_count += 1
            continue
            
        if not is_valid_dosage(entry['dosage']):
            rejected_count += 1
            continue
        
        # Skip entries in the NON_DRUG_STARTS list
        if entry['name'] in NON_DRUG_STARTS:
            rejected_count += 1
            continue
        
        # Fix common drug name OCR errors
        name_fixes = {
            "Abaca vir": "Abacavir",
            "Abalacept": "Abatacept", 
            "Ace!ylcysteinu": "Acetylcysteine",
            "Acetylcysteine": "Acetylcysteine",
            "Acyclovir": "Aciclovir",
            "AlbuteroL": "Albuterol",
        }
        
        for wrong, correct in name_fixes.items():
            if wrong in entry['name']:
                entry['name'] = entry['name'].replace(wrong, correct)
        
        final_data.append(entry)
    
    # Save to file
    output_file = 'src/frankShannData.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=4, ensure_ascii=False)
    
    print(f"✓ Extracted {len(final_data)} entries")
    print(f"✓ Rejected {rejected_count} invalid entries")
    print(f"✓ Output saved to {output_file}")

if __name__ == "__main__":
    parse_frank_shann('frank_shann_extracted.txt')

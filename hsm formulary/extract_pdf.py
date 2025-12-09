#!/usr/bin/env python3
import PyPDF2
import json

# Extract text from PDF
pdf_path = "public/dilution guideline.pdf"
output_path = "dilution_extracted.txt"

with open(pdf_path, 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    num_pages = len(pdf_reader.pages)
    
    print(f"Total pages: {num_pages}")
    
    all_text = []
    for page_num in range(num_pages):
        page = pdf_reader.pages[page_num]
        text = page.extract_text()
        all_text.append(f"\n\n=== PAGE {page_num + 1} ===\n\n{text}")
    
    # Save to file
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write('\n'.join(all_text))
    
    print(f"Extracted {num_pages} pages to {output_path}")
    
    # Show first 3000 characters
    preview = '\n'.join(all_text)[:3000]
    print("\n=== PREVIEW ===")
    print(preview)

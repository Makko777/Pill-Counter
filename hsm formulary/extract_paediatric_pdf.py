import PyPDF2

def extract_paediatric_pdf_text(pdf_path, output_path):
    """Extract text from the Paediatric Protocols PDF"""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        total_pages = len(pdf_reader.pages)
        
        print(f"Total pages: {total_pages}")
        
        with open(output_path, 'w', encoding='utf-8') as output_file:
            for page_num in range(total_pages):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                
                output_file.write(f"\n=== PAGE {page_num + 1} ===\n\n")
                output_file.write(text)
                
                if (page_num + 1) % 50 == 0:
                    print(f"Processed {page_num + 1} pages...")
        
        print(f"Extraction complete! Saved to {output_path}")

if __name__ == "__main__":
    pdf_path = "public/Paediatric Protocols 5th Edition PDF_compressed.pdf"
    output_path = "paediatric_pdf_content.txt"
    extract_paediatric_pdf_text(pdf_path, output_path)

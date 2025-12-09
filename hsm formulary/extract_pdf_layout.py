import PyPDF2
import os

pdf_path = 'public/borang-penilaian-kemahiran-kaunseling-pegawai-farmasi.pdf'
output_path = 'counseling_pdf_layout.txt'

try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)
        print(f"Number of pages: {num_pages}")
        
        with open(output_path, 'w') as out_file:
            # Extract TOC (first 10 pages)
            for i in range(10):
                page = reader.pages[i]
                text = page.extract_text(extraction_mode="layout")
                out_file.write(f"=== PAGE {i+1} ===\n\n")
                out_file.write(text)
                out_file.write("\n\n")
            
            # Extract a sample medication page (e.g., page 23 for Amlodipine based on TOC)
            # Note: TOC page numbers might differ from PDF index. TOC said Amlodipine is page 23.
            # Let's extract a range around there.
            for i in range(20, 30):
                page = reader.pages[i]
                text = page.extract_text(extraction_mode="layout")
                out_file.write(f"=== PAGE {i+1} ===\n\n")
                out_file.write(text)
                out_file.write("\n\n")
                
    print(f"Successfully extracted layout text to {output_path}")

except Exception as e:
    print(f"Error extracting text: {e}")

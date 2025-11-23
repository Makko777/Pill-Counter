import json
from datetime import datetime

def format_special_considerations(special_dict):
    """Format special considerations object for JavaScript"""
    if not special_dict:
        return "{}"
    
    lines = []
    for key, value in special_dict.items():
        if key == 'other' and isinstance(value, list):
            if value:
                formatted_list = json.dumps(value)
                lines.append(f'        {key}: {formatted_list}')
        elif value:  # Only include non-empty values
            # Escape quotes and format as string
            escaped_value = str(value).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
            lines.append(f'        {key}: "{escaped_value}"')
    
    if not lines:
        return "{}"
    
    return "{\n" + ",\n".join(lines) + "\n      }"

def generate_counseling_js(json_file, output_file):
    """Generate counselingData.js from extracted JSON"""
    with open(json_file, 'r') as f:
        medications = json.load(f)
    
    # Start building the JS file
    js_content = "// Counseling Medications Data\n"
    js_content += "// Extracted from: borang-penilaian-kemahiran-kaunseling-pegawai-farmasi.pdf\n\n"
    js_content += "export const COUNSELING_MEDICATIONS = [\n"
    
    for med in medications:
        js_content += "  {\n"
        js_content += f'    id: "{med["id"]}",\n'
        js_content += f'    name: "{med["name"]}",\n'
        js_content += f'    pharmacologicalGroup: "{med["pharmacologicalGroup"]}",\n'
        
        # Escape quotes in strings
        indication = med["indication"].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        dosage = med["dosage"].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        method = med["methodOfAdministration"].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        
        js_content += f'    indication: "{indication}",\n'
        js_content += f'    dosage: "{dosage}",\n'
        js_content += f'    methodOfAdministration: "{method}",\n'
        
        # Format special considerations as object
        js_content += f'    specialConsiderations: {format_special_considerations(med["specialConsiderations"])},\n'
        
        # Format side effects as array
        side_effects_json = json.dumps(med["sideEffects"])
        js_content += f'    sideEffects: {side_effects_json},\n'
        
        # Format others
        storage = med["others"]["storage"].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        other_points = med["others"]["other_points"].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        
        js_content += f'    others: {{"storage": "{storage}", "other_points": "{other_points}"}}\n'
        js_content += "  },\n"
    
    js_content += "];\n\n"
    
    # Add metadata
    js_content += "export const COUNSELING_METADATA = {\n"
    js_content += '  title: "Borang Penilaian Kaunseling",\n'
    js_content += '  subtitle: "Pegawai Farmasi",\n'
    js_content += f'  totalMedications: {len(medications)},\n'
    js_content += f'  lastUpdated: "{datetime.now().strftime("%Y-%m-%d")}",\n'
    js_content += '  source: "borang-penilaian-kemahiran-kaunseling-pegawai-farmasi.pdf"\n'
    js_content += "};\n"
    
    # Write to file
    with open(output_file, 'w') as f:
        f.write(js_content)
    
    print(f"Updated {output_file} with {len(medications)} medications.")

if __name__ == "__main__":
    generate_counseling_js('counseling_data_extracted.json', 'src/counselingData.js')

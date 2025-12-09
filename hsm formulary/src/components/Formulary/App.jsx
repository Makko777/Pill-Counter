import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    Search,
    Filter,
    Info,
    AlertTriangle,
    Heart,
    X,
    Pill,
    ChevronRight,
    Activity,
    ShieldAlert,
    Thermometer,
    Baby,
    Clock,
    Stethoscope,
    Upload,
    FileText,
    DollarSign,
    UserCheck,
    Database,
    RefreshCw,
    BookOpen,
    ExternalLink,
    Shield,
    Syringe,
    Stethoscope as StethIcon
} from 'lucide-react';

// --- INITIAL DATA ---
const INITIAL_FORMULARY = [];

// --- NAG DATA STRUCTURE & URLs ---
const NAG_BASE = "https://sites.google.com/moh.gov.my/nag/contents";
const NAG_APP_BASE = "https://sites.google.com/moh.gov.my/nag/appendices";

const NAG_SECTIONS = {
    adult: [
        { id: "A1", title: "Cardiovascular Infections", url: `${NAG_BASE}/section-a-adult/a1-cardiovascular-infections` },
        { id: "A2", title: "Central Nervous Infections", url: `${NAG_BASE}/section-a-adult/a2-central-nervous-infections` },
        { id: "A3", title: "Chemoprophylaxis", url: `${NAG_BASE}/section-a-adult/a3-chemoprophylaxis` },
        { id: "A4", title: "Gastrointestinal Infections", url: `${NAG_BASE}/section-a-adult/a4-gastrointestinal-infections` },
        { id: "A5", title: "Immunocompromised Patients", url: `${NAG_BASE}/section-a-adult/a5-infections-in-immunocompromised-patients` },
        { id: "A6", title: "Obs & Gynae Infections", url: `${NAG_BASE}/section-a-adult/a6-obstetrics-gyneacological-infections` }, // Note: URL uses 'gyneacological' typo in official site usually
        { id: "A7", title: "Ocular Infections", url: `${NAG_BASE}/section-a-adult/a7-ocular-infections` },
        { id: "A8", title: "Oral / Dental Infections", url: `${NAG_BASE}/section-a-adult/a8-oral-dental-infections` },
        { id: "A9", title: "Orthopaedic Infections", url: `${NAG_BASE}/section-a-adult/a9-orthopaedic-infections` },
        { id: "A10", title: "ORL Infections", url: `${NAG_BASE}/section-a-adult/a10-otorhinolaryngology-infections` },
        { id: "A11", title: "Respiratory Infections", url: `${NAG_BASE}/section-a-adult/a11-respiratory-infections` },
        { id: "A12", title: "Sepsis", url: `${NAG_BASE}/section-a-adult/a12-sepsis` },
        { id: "A13", title: "STIs", url: `${NAG_BASE}/section-a-adult/a13-sexually-transmitted-infections` },
        { id: "A14", title: "Skin & Soft Tissue", url: `${NAG_BASE}/section-a-adult/a14-skin-soft-tissue-infections` },
        { id: "A15", title: "Trauma Related", url: `${NAG_BASE}/section-a-adult/a15-trauma-related-infections` },
        { id: "A16", title: "Tropical Infections", url: `${NAG_BASE}/section-a-adult/a16-tropical-infections` },
        { id: "A17", title: "Urinary Tract Infections", url: `${NAG_BASE}/section-a-adult/a17-urinary-tract-infections` },
    ],
    paeds: [
        { id: "B1", title: "Cardiovascular", url: `${NAG_BASE}/section-b-paediatrics/b1-cardiovascular-infections` },
        { id: "B2", title: "CNS Infections", url: `${NAG_BASE}/section-b-paediatrics/b2-central-nervous-infections` },
        { id: "B6", title: "Neonatal Infections", url: `${NAG_BASE}/section-b-paediatrics/b6-neonatal-infections` },
        { id: "B10", title: "Respiratory Infections", url: `${NAG_BASE}/section-b-paediatrics/b10-respiratory-infections` },
        { id: "B13", title: "Urinary Tract Infections", url: `${NAG_BASE}/section-b-paediatrics/b13-urinary-tract-infections` },
        { id: "B14", title: "Vascular Infections", url: `${NAG_BASE}/section-b-paediatrics/b14-vascular-infections` }
    ],
    primary: [
        { id: "C1", title: "Acute Bronchitis/Pneumonia", url: `${NAG_BASE}/section-c-clinical-pathways-in-primary-care/c1-acute-bronchitis-and-pneumonia` },
        { id: "C2", title: "Acute Otitis Media", url: `${NAG_BASE}/section-c-clinical-pathways-in-primary-care/c2-acute-otitis-media` },
        { id: "C3", title: "Acute Pharyngitis", url: `${NAG_BASE}/section-c-clinical-pathways-in-primary-care/c3-acute-pharyngitis` },
        { id: "C4", title: "Acute Rhinosinusitis", url: `${NAG_BASE}/section-c-clinical-pathways-in-primary-care/c4-acute-rhinosinusitis` },
        { id: "C5", title: "Acute Gastroenteritis", url: `${NAG_BASE}/section-c-clinical-pathways-in-primary-care/c5-acute-gastroenteritis` },
        { id: "C7", title: "UTI (Non-Pregnancy)", url: `${NAG_BASE}/section-c-clinical-pathways-in-primary-care/c7-urinary-tract-infection-in-non-pregnancy` },
    ]
};

// --- COMPONENTS ---

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all scale-100">
                <div className="relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

const Badge = ({ children, type = "default" }) => {
    const styles = {
        default: "bg-gray-100 text-gray-800",
        highAlert: "bg-red-100 text-red-700 border border-red-200",
        category: "bg-blue-50 text-blue-700",
        form: "bg-emerald-50 text-emerald-700",
        prescriber: "bg-purple-50 text-purple-700 border border-purple-100"
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}>
            {children}
        </span>
    );
};

const DetailRow = ({ icon: Icon, label, value, warning = false }) => (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-50 last:border-0">
        <div className={`p-2 rounded-lg ${warning ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
            <Icon size={18} />
        </div>
        <div className="flex-1">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</h4>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{value || "N/A"}</p>
        </div>
    </div>
);

// --- NAG VIEW COMPONENT ---
const NAGView = () => {
    const openLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
            {/* Hero Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            <Shield size={28} /> National Antimicrobial Guideline
                        </h2>
                        <p className="text-blue-100 max-w-xl">
                            Official Ministry of Health Malaysia guidelines for antibiotic prescribing.
                            Access the latest protocols for Adult, Paediatric, and Primary Care.
                        </p>
                    </div>
                    <button
                        onClick={() => openLink("https://sites.google.com/moh.gov.my/nag/home")}
                        className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                        Open Official Site <ExternalLink size={18} />
                    </button>
                </div>
            </div>

            {/* Quick Categories */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Adult Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
                        <UserCheck className="text-blue-600" size={20} />
                        <h3 className="font-bold text-slate-800">Section A: Adult</h3>
                    </div>
                    <div className="p-2 max-h-[300px] overflow-y-auto">
                        {NAG_SECTIONS.adult.map(section => (
                            <button
                                key={section.id}
                                onClick={() => openLink(section.url)}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center justify-between group transition-colors"
                            >
                                <span className="text-sm text-slate-600 group-hover:text-blue-700">{section.title}</span>
                                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{section.id}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Paediatrics Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
                        <Baby className="text-emerald-600" size={20} />
                        <h3 className="font-bold text-slate-800">Section B: Paediatrics</h3>
                    </div>
                    <div className="p-2">
                        {NAG_SECTIONS.paeds.map(section => (
                            <button
                                key={section.id}
                                onClick={() => openLink(section.url)}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center justify-between group transition-colors"
                            >
                                <span className="text-sm text-slate-600 group-hover:text-emerald-700">{section.title}</span>
                                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{section.id}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Care Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
                        <StethIcon className="text-purple-600" size={20} />
                        <h3 className="font-bold text-slate-800">Section C: Primary Care</h3>
                    </div>
                    <div className="p-2">
                        {NAG_SECTIONS.primary.map(section => (
                            <button
                                key={section.id}
                                onClick={() => openLink(section.url)}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center justify-between group transition-colors"
                            >
                                <span className="text-sm text-slate-600 group-hover:text-purple-700">{section.title}</span>
                                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{section.id}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Tools */}
            <div className="grid md:grid-cols-2 gap-6">
                <div
                    onClick={() => openLink(`${NAG_APP_BASE}/appendix-2-antibiotic-dosages-in-patients-with-impaired-renal-function`)}
                    className="bg-amber-50 rounded-xl p-5 border border-amber-100 cursor-pointer hover:shadow-md transition-all group"
                >
                    <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                        <Activity size={18} /> Renal Dosage Adjustment
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-sm text-amber-700">
                        Guidance on adjusting antibiotic doses for patients with impaired renal function (CrCl based).
                    </p>
                </div>

                <div
                    onClick={() => openLink(`${NAG_APP_BASE}/appendix-4-antibiotic-in-pregnancy-lactation`)}
                    className="bg-rose-50 rounded-xl p-5 border border-rose-100 cursor-pointer hover:shadow-md transition-all group"
                >
                    <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                        <Baby size={18} /> Pregnancy & Lactation
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-sm text-rose-700">
                        Safety profiles and category references for antimicrobial use during pregnancy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function FormularyApp() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [favorites, setFavorites] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [view, setView] = useState('list'); // 'list' or 'favorites'
    const [appMode, setAppMode] = useState('formulary'); // 'formulary' or 'nag'
    const [formularyData, setFormularyData] = useState(INITIAL_FORMULARY);
    const fileInputRef = useRef(null);

    // --- DYNAMIC CATEGORIES ---
    const categories = useMemo(() => {
        const uniqueCats = new Set(formularyData.map(d => d.category));
        const sortedCats = Array.from(uniqueCats).sort();
        const finalCats = ["All", ...sortedCats.filter(c => c !== "Others")];
        if (uniqueCats.has("Others")) finalCats.push("Others");
        return finalCats;
    }, [formularyData]);

    // Load favorites
    useEffect(() => {
        const saved = localStorage.getItem('formulary_favorites');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse favorites");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('formulary_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (e, drugId) => {
        e.stopPropagation();
        if (favorites.includes(drugId)) {
            setFavorites(prev => prev.filter(id => id !== drugId));
        } else {
            setFavorites(prev => [...prev, drugId]);
        }
    };

    // --- CSV PARSING LOGIC ---
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            parseCSV(text);
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const parseCSV = (csvText) => {
        const rows = [];
        let currentRow = [];
        let currentCell = '';
        let inQuotes = false;

        // 1. Robust Character-based parser
        for (let i = 0; i < csvText.length; i++) {
            const char = csvText[i];
            const nextChar = csvText[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    currentCell += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                currentRow.push(currentCell.trim());
                currentCell = '';
            } else if ((char === '\r' || char === '\n') && !inQuotes) {
                if (currentCell || currentRow.length > 0) {
                    currentRow.push(currentCell.trim());
                    rows.push(currentRow);
                    currentRow = [];
                    currentCell = '';
                }
                if (char === '\r' && nextChar === '\n') i++;
            } else {
                currentCell += char;
            }
        }
        if (currentCell) currentRow.push(currentCell.trim());
        if (currentRow.length > 0) rows.push(currentRow);

        // 2. Dynamic Header Detection
        let headerIdx = -1;
        let colMap = { atc: 0, name: 1, ind: 2, dose: 3, cat: 4, dept: 5, notes: 6, brand: 7, price: 8 }; // Defaults

        // Scan first 20 rows for a header signature
        for (let i = 0; i < Math.min(rows.length, 20); i++) {
            const rowStr = rows[i].join(" ").toUpperCase();
            if (rowStr.includes("ATC") && (rowStr.includes("GENERIK") || rowStr.includes("GENERIC") || rowStr.includes("NAME"))) {
                headerIdx = i;
                // Dynamic Mapping
                const r = rows[i].map(c => c.toUpperCase());

                // Helper to find column index by keyword
                const findIdx = (keywords) => r.findIndex(cell => keywords.some(k => cell.includes(k)));

                const atc = findIdx(["ATC"]);
                const name = findIdx(["GENERIK", "GENERIC", "NAME", "UBAT"]);
                const ind = findIdx(["INDIKASI", "INDICATION"]);
                const dose = findIdx(["DOS", "DOSE"]);
                const brand = findIdx(["BRAND"]);
                const price = findIdx(["PRICE", "HARGA", "RM"]);
                const cat = findIdx(["KATEGORI", "CAT", "PRESCRIBER"]);
                const notes = findIdx(["CATATAN", "NOTE", "REMARK"]);

                if (atc > -1) colMap.atc = atc;
                if (name > -1) colMap.name = name;
                if (ind > -1) colMap.ind = ind;
                if (dose > -1) colMap.dose = dose;
                if (brand > -1) colMap.brand = brand;
                if (price > -1) colMap.price = price;
                if (cat > -1) colMap.cat = cat;
                if (notes > -1) colMap.notes = notes;

                break;
            }
        }

        const startRow = headerIdx === -1 ? 0 : headerIdx + 1;

        // State for tracking the current section header while iterating
        let currentSection = "Others";
        const newDrugs = [];

        // 3. Data Extraction Loop
        for (let i = startRow; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length === 0) continue;

            // --- SECTION DETECTION ---
            const firstCell = row[0] ? row[0].trim() : "";

            if (firstCell && firstCell.match(/^\d+/)) {
                currentSection = firstCell.replace(/[\r\n]+/g, " ").replace(/["]+/g, "").trim();
                continue;
            }

            // --- DRUG ROW VALIDATION ---
            if (!row[colMap.name]) continue;

            const rawName = row[colMap.name].trim();
            if (!rawName) continue;
            if (rawName.toUpperCase().includes("NAMA GENERIK")) continue;

            const price = row[colMap.price] ? row[colMap.price].replace(/[\r\n]+/g, " ").trim() : "N/A";

            newDrugs.push({
                id: `csv-${Date.now()}-${i}`,
                genericName: rawName,
                brandName: row[colMap.brand] || "Generic",
                category: currentSection,
                forms: [rawName.split(" ").pop() || "Unit"],
                indications: row[colMap.ind] || "See detailed info",
                dosing: row[colMap.dose] || "See detailed info",
                renalDose: "Check guidelines",
                pregnancy: "Not specified",
                highAlert: false,
                notes: `${row[colMap.notes] || ""} ${row[colMap.dept] ? `(Dept: ${row[colMap.dept]})` : ""}`,
                price: price,
                prescriberCat: row[colMap.cat] || "N/A"
            });
        }

        if (newDrugs.length === 0) {
            alert("No valid medication rows found. Please check CSV format.");
            return;
        }

        setFormularyData(prev => [...prev, ...newDrugs]);
        alert(`Success! Imported ${newDrugs.length} medications.`);
    };

    const filteredDrugs = useMemo(() => {
        let data = formularyData;

        if (view === 'favorites') {
            data = data.filter(d => favorites.includes(d.id));
        }

        return data.filter(drug => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                (drug.genericName && drug.genericName.toLowerCase().includes(searchLower)) ||
                (drug.brandName && drug.brandName.toLowerCase().includes(searchLower));

            const matchesCategory = selectedCategory === "All" || drug.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, favorites, view, formularyData]);

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all imported data and reset to default?")) {
            setFormularyData(INITIAL_FORMULARY);
            setFavorites([]);
            localStorage.removeItem('formulary_favorites');
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
                                <Stethoscope className="text-white" size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800 leading-none">MediFormulary HSM</h1>
                                <p className="text-xs text-slate-500 font-medium mt-1">Hospital Drug Database 2025</p>
                            </div>
                        </div>

                        {/* Mode Switcher & Tools */}
                        <div className="flex items-center gap-2 flex-wrap bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setAppMode('formulary')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${appMode === 'formulary' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                HSM Formulary
                            </button>
                            <button
                                onClick={() => setAppMode('nag')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 ${appMode === 'nag' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <Shield size={14} /> NAG Guideline
                            </button>
                        </div>
                    </div>

                    {/* SHOW SEARCH ONLY IN FORMULARY MODE */}
                    {appMode === 'formulary' && (
                        <>
                            <div className="flex items-center gap-2 mb-3 justify-end">
                                <input
                                    type="file"
                                    accept=".csv"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-xs flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium"
                                >
                                    <Upload size={12} /> Import CSV
                                </button>
                                <button
                                    onClick={handleClearData}
                                    className="text-xs flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-500 rounded hover:bg-slate-200 font-medium"
                                >
                                    <RefreshCw size={12} /> Reset
                                </button>
                                <button
                                    onClick={() => setView(view === 'list' ? 'favorites' : 'list')}
                                    className={`p-1.5 rounded-full transition-colors ${view === 'favorites' ? 'bg-red-50 text-red-600' : 'hover:bg-slate-100 text-slate-300'}`}
                                >
                                    <Heart size={18} fill={view === 'favorites' ? "currentColor" : "none"} />
                                </button>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by generic or brand name..."
                                    className="w-full pl-10 pr-4 py-3 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-slate-800 placeholder-slate-400 transition-all outline-none text-base"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex space-x-2 overflow-x-auto mt-4 pb-2 scrollbar-hide -mx-4 px-4">
                                {categories.length > 0 ? categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                                                ? 'bg-slate-800 text-white shadow-md'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                )) : (
                                    <div className="text-sm text-slate-400 px-4 py-1.5 italic">Categories will appear after import</div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="pb-20">
                {appMode === 'nag' ? (
                    <NAGView />
                ) : (
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        {/* Results Count */}
                        {formularyData.length > 0 && (
                            <div className="flex items-center justify-between mb-4 px-2">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Showing {filteredDrugs.length} of {formularyData.length} medications
                                </span>
                            </div>
                        )}

                        {formularyData.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    <Database className="text-blue-500" size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Database Empty</h3>
                                <p className="text-slate-500 max-w-sm mx-auto mb-8">
                                    Please import your <strong>HSM Formulary 2025</strong> CSV file to access medication data.
                                </p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all shadow-lg shadow-blue-200"
                                >
                                    <Upload size={20} />
                                    <span>Import CSV File</span>
                                </button>
                            </div>
                        ) : filteredDrugs.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                    <Search className="text-slate-400" size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-slate-600">No medications found</h3>
                                <p className="text-slate-400">Try adjusting your search or filters</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                                {filteredDrugs.map(drug => (
                                    <div
                                        key={drug.id}
                                        onClick={() => setSelectedDrug(drug)}
                                        className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group relative"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1 pr-2">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                                                        {drug.genericName}
                                                    </h3>
                                                    {drug.highAlert && (
                                                        <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">{drug.brandName}</p>
                                            </div>
                                            <button
                                                onClick={(e) => toggleFavorite(e, drug.id)}
                                                className={`p-2 rounded-full transition-all flex-shrink-0 ${favorites.includes(drug.id) ? 'text-red-500 bg-red-50' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'}`}
                                            >
                                                <Heart size={20} fill={favorites.includes(drug.id) ? "currentColor" : "none"} />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge type="category">{drug.category}</Badge>
                                            {drug.prescriberCat && drug.prescriberCat !== "N/A" && (
                                                <Badge type="prescriber">Cat: {drug.prescriberCat}</Badge>
                                            )}
                                            {drug.highAlert && <Badge type="highAlert">High Alert</Badge>}
                                        </div>

                                        <div className="space-y-2 text-sm text-slate-600 mb-4">
                                            <p className="flex items-start gap-2">
                                                <Activity size={14} className="text-slate-400 mt-1 flex-shrink-0" />
                                                <span className="line-clamp-2">{drug.indications}</span>
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <span className="text-xs font-medium text-slate-400">
                                                {drug.price && drug.price !== "N/A" ? `RM ${drug.price}` : "Price N/A"}
                                            </span>
                                            <div className="flex items-center text-blue-600 text-sm font-medium">
                                                Details <ChevronRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Drug Detail Modal */}
            <Modal isOpen={!!selectedDrug} onClose={() => setSelectedDrug(null)}>
                {selectedDrug && (
                    <div className="bg-white w-full">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                            <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedDrug.genericName}</h2>
                                    {selectedDrug.highAlert && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">
                                            <AlertTriangle size={12} /> HIGH ALERT
                                        </span>
                                    )}
                                </div>
                                <p className="text-lg text-slate-500 font-medium">{selectedDrug.brandName}</p>
                            </div>
                            <button
                                onClick={(e) => toggleFavorite(e, selectedDrug.id)}
                                className={`p-2 rounded-full ${favorites.includes(selectedDrug.id) ? 'text-red-500 bg-red-50' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'}`}
                            >
                                <Heart size={24} fill={favorites.includes(selectedDrug.id) ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Quick Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <Badge type="category">{selectedDrug.category}</Badge>
                                {selectedDrug.prescriberCat && selectedDrug.prescriberCat !== "N/A" && (
                                    <Badge type="prescriber">Prescriber: {selectedDrug.prescriberCat}</Badge>
                                )}
                                {selectedDrug.forms.map((form, i) => (
                                    <Badge key={i} type="form">{form}</Badge>
                                ))}
                            </div>

                            {/* Detailed Information Grid */}
                            <div className="space-y-1">
                                <DetailRow
                                    icon={Activity}
                                    label="Indications"
                                    value={selectedDrug.indications}
                                />
                                <DetailRow
                                    icon={Clock}
                                    label="Dosing Regimen"
                                    value={selectedDrug.dosing}
                                />
                                <DetailRow
                                    icon={ShieldAlert}
                                    label="Renal Adjustments"
                                    value={selectedDrug.renalDose}
                                    warning={true}
                                />
                                <DetailRow
                                    icon={Baby}
                                    label="Pregnancy Category"
                                    value={selectedDrug.pregnancy}
                                />
                                <DetailRow
                                    icon={Info}
                                    label="Notes & Remarks"
                                    value={selectedDrug.notes}
                                />
                                <DetailRow
                                    icon={DollarSign}
                                    label="Price / Unit"
                                    value={selectedDrug.price ? `RM ${selectedDrug.price}` : "N/A"}
                                />
                                <DetailRow
                                    icon={UserCheck}
                                    label="Prescriber Category"
                                    value={selectedDrug.prescriberCat}
                                />
                            </div>
                        </div>

                        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 text-xs text-center text-slate-400">
                            Reference ID: {selectedDrug.id} • Source: HSM Formulary 2025
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}